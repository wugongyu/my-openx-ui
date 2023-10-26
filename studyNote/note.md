# study note

## 1、monorepo

单一存储库，包含多个有明确关系的项目
有利于：代码复用，提高协作效率，实现集中管理和统一构建，快速定位问题，一个版本（无版本冲突）。

## 2、pnpm

优势：
硬链接节约磁盘资源，
软链接（可以理解为快捷方式）优化依赖管理，更安全地访问依赖（解决幽灵依赖的问题）。
项目代码在某些情况下可以在代码中使用没有被定义在 package.json 中的包，这种情况即【幽灵依赖】。

相关指令：
i 即install缩写，安装指定依赖包；
-D, 即--save-dev 将指定依赖包安装至devDependencies中
-S, 即--save 将指定依赖包安装至dependencies中
-w, --workspace-root，可以将依赖包安装到工程的根目录下，作为所有 package 的公共依赖。
-wD，表示这是一个开发依赖，会装到根目录pacakage.json 中的 devDependencies 中
-wS，会将依赖包安装到根目录pacakage.json 中的 dependencies 中
--filter 参数，可以用来对特定的package进行某些操作

## 3、vite

新型前端构建工具，显著提升前端开发体验。

Vite 的快捷和优秀体验更多地体现在配置与操作上，而非开发服务器的效率。

## 4、typescript

集成 TypeScript，为组件库的开发注入类型系统的支持

整体思路：

1）首先我们要在项目的根目录安装公共依赖，公司内网的项目可以使用 .npmrc 文件指定特殊网络环境下的 npm 配置，并提交到仓库中方便他人安装依赖。
2）接着我们为每一个子包预设了源码，填写了 vite.config 文件，在 package.json 中配置 build 构建脚本。添加 @vitejs/plugin-vue 插件可以使 Vite 识别 Vue SFC 语法；用 pnpm 过滤器选中所有子包执行 build 命令，可以达到整体构建的目的。
3）之后，我们在 monorepo 项目下搭建了一个 web 应用作为临时样例，展示我们的组件。
4）我们发现即使没有配置 TypeScript，仅仅 Vite 也能够成功构建 ts 代码。经过研究后，我们明确了 Vite 只负责转译，tsconfig 的配置大部分对于 Vite 是不生效的，这些配置主要影响 IDE 语言服务以及 tsc 的类型检查。
5）我们没有采用每个子项目一个 tsconfig 的组织方式，而是按照代码用途的区别(node脚本和源码)划分不同的 tsconfig 配置，在根目录下集中管理。但对于 demo 样例应用，由于其不参与集中构建，我们独立为其设置了 tsconfig.json。
6）我们通过将 tsconfig 的 paths 路径别名设置得与 monorepo 下的包名一致，使得 IDE 将内部依赖解析到对应的源码而非产物，又对 Vite 的 resolve.alias 别名做了同样的设置，最终我们的 demo 样例项目实现了热更新——修改其依赖的组件源码，能够立即反馈在页面上。
7）vue-tsc 是 vue 语言服务的核心模块之一，我们用它实现了类型检查和声明文件 d.ts 导出。为了适应 monorepo 项目的目录结构，我们实现了一个脚本将集中的声明文件移动到对应模块的产物目录下。
8）完成 TypeScript 的集成后，我们进一步优化了先前的整体构建流程，通过 npm script 加入了清理产物、类型检查、导出类型声明的步骤，至此一个比较完善的组件库构建模式成型了。
9）最后，我们集成了 IDE 插件 Volar、TypeScript Vue Plugin，开启了 takeover 模式，获得了编写 vue - ts 代码的最佳体验。还通过在 .vscode 目录下加入项目级 IDE 配置文件 settings.json 和 extensions.json，引导其他贡献者安装插件，获取推荐的预设。

## 5、eslint

代码风格规范化

## 6、stylelint

Stylelint 是一个强大的 CSS 格式化工具

## 7、commitlint 提交格式化

## 8、lint-staged

增量检查

## 9、文件路径、Node核心API的path模块

1. 绝对路径与相对路径

- 绝对路径
  是指文件在磁盘上真正存在的路径，是从根目录开始的，一定是以 / 开头(~也是绝对路径，因为~是 /c/users/Luo这类路径的缩写）。网页编程中较少使用绝对路径。

- 相对路径
  是相对于当前目录的，不能以/ 开头。相对路径有三种情况：当前目录，上级目录，下级目录。

  - 当前目录：以"./"或者省略开头。例如 ./image/1.jpg和image/1.jpg.
  - 上一级目录，以"../"或者".."开头，如果是上上级目录，就是"../../"
  - 下级目录，目标文件在当前目录下。

2. node

- node路径
  node中的路径大致分5类，dirname,filename,process.cwd(),./,../,
  其中dirname,filename,process.cwd()为绝对路径

  - \_\_dirname： 获得当前执行文件所在目录的完整目录名
  - \_\_filename： 获得当前执行文件的带有完整绝对路径的文件名
  - process.cwd()：获得当前执行node命令时候的文件夹目录名
  - ./： 不使用require时候，./与process.cwd()一样，使用require时候，与\_\_dirname一样
  - 【注】只有在 require() 时才使用相对路径(./, ../) 的写法，其他地方一律使用绝对路径

- node path相关常用api

  - path.sep属性
    路径片段分隔符'\'或者'/'
    Windows 上是 \ 。
    Linux 上是 / 。

  - path.normalize(pathString)
    规范化路径，把不规范的路径规范化
  - path.join([...pathString])
    进行路径的拼接
    参数为字符串路径片段，可多个，参数中存在非字符串时会直接报错；
    返回值为拼接好的路径（会根据系统的不同进行规范化），
    返回值路径字符串长度为0时,会返回默认值'.'，代表当前文件夹。

  - path.parse(pathString)
    将字符串路径转换为路径对象
    返回值对象格式： {
    root: 代表根目录
    dir: 代表文件所在的文件夹
    base: 代表整一个文件
    name: 代表文件名
    ext: 代表文件的后缀名
    }

  - path.basename(pathString[, ext])
    path.basename()方法会返回 pathString的最后一部分，类似于 Unix 的 basename命令。 尾部的目录分隔符会被忽略
    参数一pathString：表示路径字符串
    参数二ext： 表示可选的文件扩展名

  - path.dirname(pathString)
    返回pathString的目录名，尾部目录的分隔符会被忽略

  - path.extname(pathString)
    path.extname()方法会返回 pathString的扩展名，
    即 pathString的最后一部分中，从最后一次出现 .（句点）字符直到字符串结束。
    如果在 pathString的最后一部分中没有 .（句点），
    或者如果 pathString的基本名称（参见 path.basename()）除了第一个字符以外没有 .（句点），则返回空字符串。

  - path.resolve([from ...], to)
    用于拼接路径，但却和path.join()方法却很多不同，而且path.resolve()方法本身就自带一个to的绝对路径参数，
    也会自动转换分隔符，在某些场景用起来也方便很多。
  - path.relative(from, to)
    从from路径，到to路径的相对路径。
    边界：
    - 如果from、to指向同个路径，那么，返回空字符串。
    - 如果from、to中任一者为空，那么，返回当前工作路径。

## 10、es、umd、amd、systemJs、commonJs

- [学习链接](https://blog.csdn.net/hanyanshuo/article/details/110134788)
  AMD、CMD、ES6规范则继CommonJS规范之后逐渐诞生，因为CommonJS规范更适合服务器端，而其他三种则更好的适用于浏览器端。

- 基本定义

  - ES模块。
    ES模块是ECMAScript2015（ES6）语言规范中的一部分。在模块出现之前，引入多个JavaScript文件，JavaScript文件中定义的顶层的变量都是全局的，开发人员必须使用IIFE（Immediately Invoked Function Expression立即调用函数表达式）或者定义命名空间等方式来避免共享的全局变量可能引发的问题。而模块出现后，每一个（包含export/import的）JavaScript文件都是一个模块，在模块中定义的变量的作用域被限制在了文件中。
  - CommonJS。
    在JavaScript只能编写网页应用的时候，CommonJS提供了一些API，能够让JavaScript编写不同的JavaScript解释器和主机运行环境的程序。
    **CommonJS一般用于服务端（Node.js）**。浏览器不支持CommonJS，需要进行转译。CommonJS规范中的模块使用require引入，exports导出。
  - AMD。
    AMD（Asynchronous Module Definition 异步模块定义）提供的API指定了一种定义模块的机制，**目的是让模块以及它的依赖能被异步加载**。
    AMD使用define定义模块，主要用于浏览器环境。require.js使用的就是AMD。
  - CMD
    CMD (Common Module Definition), 是seajs推崇的规范，CMD则是依赖就近，用的时候再require。
    CMD与AMD一样，也是采用特定的define()函数来定义,用require方式来引用模块。
    AMD和CMD最大的区别是对依赖模块的执行时机处理不同，而不是加载的时机或者方式不同，二者皆为异步加载模块。
    AMD依赖前置，js可以方便知道依赖模块是谁，立即加载；
    而CMD就近依赖，需要使用把模块变为字符串解析一遍才知道依赖了那些模块，
    这也是很多人诟病CMD的一点，牺牲性能来带来开发的便利性，实际上解析模块用的时间短到可以忽略。
  - UMD。
    UMD（Universal Module Definition 通用模块定义）是一种模式，提供对当今最流行的脚本加载器的兼容。
    （虽然说是当今，但从仓库看UMD代码最新更新已是多年前了，UMD当时主要支持的是AMD和CommonJS，可以使用UMD的思想，比如考虑兼容ES6模块）
  - SystemJS。
    SystemJS是可配置的模块加载器。使用System.register方法注册模块，使用System.import方法导入模块。

- es module
  导入：import
  导出：export
  异步加载：import()
  【注】import和export只能在文件的最顶层使用，而import()可以在文件的任何位置使用，对模块进行异步加载

- commonJs
  导入require

  - require(相对路径)
    比如在 /root/src/moduleA.js文件中使用var x = require('./moduleB') ，Node.js会以如下顺序处理文件。

    - 在同级目录下查找moduleB.js文件。（即/root/src/moduleB.js）
    - 查看上级目录中是否有moduleB文件夹（ /root/src/moduleB ），文件夹下是否有package.json文件，package.json中是否有main属性，
      假如main属性的值如下：{ "main": "lib/mainModule.js" }，那么Node.js会指向/root/src/moduleB/lib/mainModule.js.。
    - 查看文件夹 /root/src/moduleB下是否有index.js文件，这个index.js文件被隐式地认为是文件夹的“主”模块。

  - require(非相对的模块名称)
    在 /root/src/moduleA.js 文件中使用var x = require("moduleB");引入非相对路径的一个模块名称，
    会按照如下顺序处理模块，先在当前目录的node_modules中去查找有没有moduleB，
    再在上一级目录中的node_modules中去查找，最后去全局的node_modules中去查找。（逐级往外查找）
    - /root/src/node_modules/moduleB.js
    - /root/src/node_modules/moduleB/package.json (如果声明了 "main" 属性)
    - /root/src/node_modules/moduleB/index.js
    - /root/node_modules/moduleB.js
    - /root/node_modules/moduleB/package.json (如果声明了 "main" 属性)
    - /root/node_modules/moduleB/index.js
    - /node_modules/moduleB.js
    - /node_modules/moduleB/package.json (如果声明了 "main" 属性)
    - /node_modules/moduleB/index.js
    - 导出 exports

- AMD\CMD
  define 定义模块
  exports 导出模块内容
  require 引用模块
