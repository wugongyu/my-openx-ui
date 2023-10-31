# note

## vite的打包构建与esbuild

1. 打包
   利用工具抓取、处理，并将源码串联成可以在浏览器中运行的文件。

2. vite
   vite主要利用了生态系统的新进展：浏览器原生支持esm，越来越多的js工具使用编译型语言实现。
   vite特点：预加载依赖（使用esbuild）、在浏览器请求源码（如jsx，ts等会被频繁编辑的源码文件）时进行转换并按需提供源码。

【动态模块热替换（HMR）】：允许一个模块热替换它自己而不影响页面其他部分。
但随着应用体积的增大，hmr的相应时间也会增加。

在 Vite 中，HMR 是在原生 ESM 上执行的。当编辑一个文件时，
Vite 只需要精确地使已编辑的模块与其最近的 HMR 边界之间的链失活（大多数时候只是模块本身），
使得无论应用大小如何，HMR 始终能保持快速更新。

Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：
源码模块的请求会根据 304 Not Modified 进行协商缓存，
而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，
因此一旦被缓存它们将不需要再次请求。

3. esbuild与vite预构建依赖
   esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。
   【依赖预构建目的】：实现commonJS、umd的兼容、提高性能。

   - commonJS、umd兼容
     在预构建过程中，将以commonJS或umd形式提供的依赖项转换为es模块。
     因为在开发阶段，vite服务器将所有代码视为em原生模块。

   - 提高性能
     为提高性能，vite将那些内部具有许多模块的esm依赖项转换为单个模块。

## package.json相关配置项说明

1. 基本信息配置项

```json
{
  "name": "vue",
  // 一句话简介，可以作为关键字搜索的依据
  "description": "The progressive JavaScript framework for building modern web UI.",
  // 关键字、标签，正确设置可以提高在 npm 的搜索权重与曝光度
  "keywords": ["vue"],
  // 包的作者，主要 Owner
  "author": "Evan You",
  // 开源许可证
  "license": "MIT",
  // 项目主页
  "homepage": "https://github.com/vuejs/core/tree/main/packages/vue#readme",
  // 源码仓库
  "repository": {
    "type": "git",
    "url": "git+https://github.com/vuejs/core.git"
  },
  // BUG 反馈方式，支持 `bugs.email` 邮箱字段
  "bugs": {
    "url": "https://github.com/vuejs/core/issue"
  }
}
```

2. 入口信息配置项

   - cjs 规范
     main 和 exports['.'].require 字段用于设置 require() 方式的加载入口

   ```json
   // 入口定义
   {
     "name": "my-module",
     "main": "index.js",
     "exports": {
       ".": {
         "require": "index.js"
       }
       // ...
     }
   }
   ```

   - esm 规范

   module 和 exports.\*.import 字段用于设置 import 的加载入口(esm 规范 import { ref } from 'vue')

   ```json
   // 入口定义
   {
     "name": "my-module",
     "main": "index.js",
     "module": "index.mjs",
     "exports": {
       ".": {
         "require": "index.js",
         "import": "index.mjs"
       }
       // ...
     }
   }
   ```

   - typescript类型声明
     types 和 exports.\*.types 字段用于设置 d.ts 类型声明的加载入口(TypeScript 专属)

   ```json
   // 入口定义
   {
     "name": "my-module",
     "main": "index.js",
     "module": "index.mjs",
     "types": "index.d.ts",
     "exports": {
       ".": {
         "require": "index.js",
         "import": "index.mjs",
         "types": "index.d.ts"
       }
       // ...
     }
   }
   ```

   - exports
     exports 比起 main、module、types，它可以暴露更多的出口，而后者只能定义主出口。

   ```json
   // 入口定义
   {
     "name": "my-module",
     "main": "index.js",
     "exports": {
       ".": {
         "require": "index.js"
       },
       "./locale/*": {
         "require": "./locale/*"
       },
       "./plugins/*": {
         "require": "./dist/plugins/*"
       }
       // ...
     }
   }
   ```

3. 依赖信息
   dependencies、devDependencies、peerDependencies

4. 发布信息

   - file
     files 指定了发布为 npm 包时，哪些文件或目录需要被提交到 npm 服务器中。
   - private
     private 用于指定项目是否为私有包。当我们的项目不想被意外发布到公共 npm 仓库时，就设置 private: true。
   - publicConfig
     当项目发布到私有npm时（如公司内网仓库），需配置publicConfig

5. 脚本信息

   - scripts
     可给复杂的命令赋予别名，便于操作。

## package 脚本命令含义

1. "lint-staged": 增量代码规范检查,
2. "prepare": 使得每次完成依赖安装后都会执行 husky 的初始化，实现规范的代码提交信息,
3. "clean:type": 清空构建后d.ts 类型声明文件所在的文件夹，如./dist,
4. "type:node": 用tsc 进行tsconfig.node.json 的类型检查,
5. "type:src": 用vue-tsc进行 tsconfig.src.json构建/检查类型,
6. "build:ui": 类型检查并构建产物,
7. "lint:script": js代码的规范检查,
8. "lint:style": css代码的规范检查

## 项目组织结构

📦openx-ui
┣ 📂docs
┃ ┗ 📜package.json
┣ 📂demo # 展示组件效果的 Web 应用
┃ ┣ 📂node_modules
┃ ┣ 📂dist
┃ ┣ 📂public
┃ ┣ 📂src
┃ ┣ 📜index.html
┃ ┣ 📜vite.config.ts
┃ ┣ 📜tsconfig.json
┃ ┗ 📜package.json
┣ 📂packages
┃ ┣ 📂button
┃ ┃ ┣ 📂node_modules
┃ ┃ ┣ 📂dist # 组件产物目录
┃ ┃ ┣ 📂src # 组件源码目录
┃ ┃ ┃ ┣ 📜Button.vue
┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┣ 📜package.json
┃ ┃ ┗ 📜vite.config.ts
┃ ┣ 📂input
┃ ┃ ┗ 📜...
┃ ┣ 📂shared
┃ ┃ ┗ 📜...
┃ ┗ 📂ui # 组件库主包，各组件的统一出口
┃ ┗ 📜...
┣ 📜package.json
┣ 📜tsconfig.json
┣ 📜tsconfig.base.json
┣ 📜tsconfig.node.json
┣ 📜tsconfig.src.json
┣ 📜pnpm-workspace.yaml
┗ 📜README.md

## 【typescript集成】summery

1. 首先我们要在项目的根目录安装公共依赖，公司内网的项目可以使用 .npmrc 文件指定特殊网络环境下的 npm 配置，并提交到仓库中方便他人安装依赖。
2. 接着我们为每一个子包预设了源码，填写了 vite.config 文件（后续优化为统一生成配置），在 package.json 中配置 build 构建脚本。添加 @vitejs/plugin-vue 插件可以使 Vite 识别 Vue SFC 语法；用 pnpm 过滤器（--filter）选中所有子包执行 build 命令，可以达到整体构建的目的。
3. 之后，我们在 monorepo 项目下搭建了一个 web 应用作为临时样例，展示我们的组件。
4. 我们发现即使没有配置 TypeScript，仅仅 Vite 也能够成功构建 ts 代码。经过研究后，我们明确了 Vite 只负责转译，tsconfig 的配置大部分对于 Vite 是不生效的，这些配置主要影响 IDE 语言服务以及 tsc 的类型检查。
5. 我们没有采用每个子项目一个 tsconfig 的组织方式，而是按照代码用途的区别(node脚本和源码)划分不同的 tsconfig 配置，在根目录下集中管理。但对于 demo 样例应用，由于其不参与集中构建，我们独立为其设置了 tsconfig.json。
6. 我们通过将 tsconfig 的 paths 路径别名设置得与 monorepo 下的包名一致，使得 IDE 将内部依赖解析到对应的源码而非产物，又对 Vite 的 resolve.alias 别名做了同样的设置，最终我们的 demo 样例项目实现了热更新——修改其依赖的组件源码，能够立即反馈在页面上。
7. vue-tsc 是 vue 语言服务的核心模块之一，我们用它实现了类型检查和声明文件 d.ts 导出。为了适应 monorepo 项目的目录结构，我们实现了一个脚本将集中的声明文件移动到对应模块的产物目录下。
8. 完成 TypeScript 的集成后，我们进一步优化了先前的整体构建流程，通过 npm script 加入了清理产物、类型检查、导出类型声明的步骤，至此一个比较完善的组件库构建模式成型了。
9. 最后，我们集成了 IDE 插件 Volar、TypeScript Vue Plugin，开启了 takeover 模式，获得了编写 vue - ts 代码的最佳体验。还通过在 .vscode 目录下加入项目级 IDE 配置文件 settings.json 和 extensions.json，引导其他贡献者安装插件，获取推荐的预设。

## 【集中lint代码规范】summery

1. 我们首先简单地了解了 ESLint 的功用和原理。ESLint 是对 ECMAScript 代码进行规范化的工具。它通过 parser 解析代码；通过 plugin 聚合多条检查规则的实现逻辑；通过 rules 开启 / 关闭 / 配置 各条检查规则；通过 extends 继承配置预设。
2. 我们以 Airbnb 规则集为基础，添加了许多周边插件使 ESLint 支持了对 vue、TypeScript、import 语法的支持，最终确定了基本的 .eslintrc.js 配置文件。
3. Stylelint 与 ESLint 原理类似，我们也按照类似的方式确定了基本的 .stylelintrc.js 配置文件。我们配好的 Stylelint 具有识别 vue、识别 sass、对 css 属性自动排序的能力。
4. 对于 Prettier，我们分析了其优劣，不准备将其集成到 ESLint、Stylelint 中，只是单独负责 json、md 等其他文件的处理。
5. 我们安装了 ESLint、Stylelint、Prettier 相关的 IDE 插件，并做了许多插件相关的编辑器配置，实现了代码规范与 IDE 的高度结合，使 Lint 工具的使用体验得到飞跃。
6. commitlint 和 husky 配合使用，可以使我们的 Git 提交信息规范化，不合规的提交信息将在 Git Hooks 的 commit-msg 钩子中被拦截。
7. 我们尝试使用 lint-staged 工具，配合 husky，在 Git Hooks 的 pre-commit 钩子中只对暂存区的代码进行 Lint 检查，实现了本地提交代码规范增量检查门禁。
8. 进一步探索 lint-staged，发现其 --diff 选项可以获取任意两个分支之间的文件变化列表，由此初步确定了代码合并的场景下进行代码规范增量检查的方案。

## 【定制组件库打包体系】（build包）summery

1. 我们首先明晰了定制自己的打包体系的目的：将重复部分抽取为预设、集中管理构建配置、提高自动化程度、支持复杂的构建行为。
2. 在分析目的的过程中，我们提出了全量构建的概念。与产出构建场景专用产物的常规构建不同，全量构建主要产出适用于非构建场景的产物。（常规构建的产物一般通过npm/包管理器引入，而全量构建产物一般可以直接利用script引入）。
3. 之后，我们选取开源 monorepo 仓库作为案例，研究其构建过程：获取并遍历子包 -> 读取 package.json -> 拼接构建配置 -> 调用构建 API。
4. 我们计划用 pnpm --filter 的能力实现子包的获取与遍历，用 vite build 自然执行构建，因而明确了自己的打包体系只需要实现上述两个特性：读取 package.json、拼接构建配置。
5. 之后，我们创建 @openxui/build 包，结合先前分析的思路以及我们的特殊需求，一步步实现了打包体系。我们的打包体系具有以下能力：

   - 读取各包的 package.json，自动用其中的重要字段合成构建配置。
   - 配合 vue-tsc，支持为各子包生成 d.ts 类型声明产物。
   - 结合产物信息，自动更新 package.json 文件。
   - 支持不同的构建模式：常规构建与全量构建。
   - 支持与原始 Vite 配置合并，具有高度拓展性。

6. 最后使用全新的打包体系替代了先前零散的 vite.config，使整体构建流程得到进一步优化。

## 【设计组件库的样式方案】（styles包、config-provider包（提供全局主题）、icons包）summery

1. 首先我们通过用户的使用习惯，以及观察学习其他组件库，认为一个合格的组件库样式应该做到：支持分组件引入样式、定义语义化的 class 名称，并具有严格的命名空间、使用 CSS 变量以支持主题切换。
2. 对于新的 CSS 领域的技术方案 UnoCSS，由于它不仅仅是原子 CSS 框架，而是 CSS 生成器，因此它完全可以参与到组件库的样式构建中。
   但是由于 UnoCSS 组装 CSS 的语法 Rules、Shortcut 的可读性不够高，我们还是决定仅用 UnoCSS 实现 CSS 变量注入、主题原子类的提供，语义化 CSS 的定义依然交给预处理器。
3. 我们实现 @openxui/styles 包对组件库的样式做整体处理，样式模块计划分为两部分，一部分是参与构建过程的 UnoCSS 部分，另一部分是与运行时相关的主题、样式工具方法部分。它们将被分为两个不同的入口分别构建。
4. 为了适应更复杂的构建模式，我们调整了 @openxui/build 构建体系，使其支持为 package.json 写入多产物入口。并重点改造了 vue 组件的构建预设，主要在其中加入了 UnoCSS 相关的 Vite 插件。
5. 之后我们具体实现了 @openxui/styles 的基础部分，随后以 @openxui/button 单组件为例子，演示如何集成这种样式方案。
6. 最后，我们对样式方案做了进一步的拓展和优化：使用 Vue 的 provide/inject 功能实装了主题切换的能力；使用 iconify 工具辅助实现了组件库的矢量 icon 方案。
