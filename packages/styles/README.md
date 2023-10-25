## 组件库样式模块

📦styles
┣ 📂dist # 产物目录
┣ 📂node_modules # 依赖目录
┣ 📂src
┃ ┃
┃ ┃ # 第一部分：UnoCSS 部分，运行在 Node.js 环境
┃ ┃
┃ ┣ 📂unocss
┃ ┃ ┣ 📂utils # 生成 UnoCSS 预设需要的工具类
┃ ┃ ┃ ┣ 📜index.ts
┃ ┃ ┃ ┣ 📜shortcuts.ts
┃ ┃ ┃ ┗ 📜toSafeList.ts
┃ ┃ ┣ 📂button # button 组件的 UnoCSS 预设
┃ ┃ ┃ ┣ 📜index.ts
┃ ┃ ┃ ┣ 📜rules.ts
┃ ┃ ┃ ┗ 📜shortcuts.ts
┃ ┃ ┣ 📜base.ts # 组件库基础 UnoCSS 预设  
 ┃ ┃ ┣ 📜theme.ts # 主题 UnoCSS 预设
┃ ┃ ┣ 📜... # 更多组件的 UnoCSS 预设
┃ ┃ ┗ 📜index.ts  
 ┃ ┣ 📜unoPreset.ts # 实现组件库专用的 UnoCSS 预设：openxuiPreset
┃ ┃
┃ ┃ # 第二部分：主题部分，运行在混合环境(SSR 场景下的 Node.js 环境或者浏览器运行环境)
┃ ┃
┃ ┣ 📂theme # Vue 插件，实现主题的全局切换
┃ ┃ ┣ 📂presets # 主题预设
┃ ┃ ┃ ┣ 📜index.ts
┃ ┃ ┃ ┗ 📜tiny.ts # tiny 的主题预设
┃ ┃ ┗ 📜index.ts
┃ ┣ 📂utils # 实现样式生成相关的工具方法
┃ ┃ ┣ 📜colors.ts
┃ ┃ ┣ 📜cssVars.ts
┃ ┃ ┣ 📜index.ts
┃ ┃ ┗ 📜toTheme.ts
┃ ┣ 📂vars # 定义每个组件与模块的主题变量
┃ ┃ ┣ 📜button.ts # 按钮的主题变量
┃ ┃ ┣ 📜theme.ts # 基础主题变量
┃ ┃ ┣ 📜... # 更多组件的主题变量
┃ ┃ ┗ 📜index.ts
┃ ┗ 📜index.ts
┃
┣ 📜package.json
┗ 📜vite.config.ts

## summery

1、首先我们通过用户的使用习惯，以及观察学习其他组件库，认为一个合格的组件库样式应该做到：支持分组件引入样式、定义语义化的 class 名称，并具有严格的命名空间、使用 CSS 变量以支持主题切换。
2、对于新的 CSS 领域的技术方案 UnoCSS，由于它不仅仅是原子 CSS 框架，而是 CSS 生成器，因此它完全可以参与到组件库的样式构建中。
但是由于 UnoCSS 组装 CSS 的语法 Rules、Shortcut 的可读性不够高，我们还是决定仅用 UnoCSS 实现 CSS 变量注入、主题原子类的提供，语义化 CSS 的定义依然交给预处理器。
3、我们实现 @openxui/styles 包对组件库的样式做整体处理，样式模块计划分为两部分，一部分是参与构建过程的 UnoCSS 部分，另一部分是与运行时相关的主题、样式工具方法部分。它们将被分为两个不同的入口分别构建。
4、为了适应更复杂的构建模式，我们调整了 @openxui/build 构建体系，使其支持为 package.json 写入多产物入口。并重点改造了 vue 组件的构建预设，主要在其中加入了 UnoCSS 相关的 Vite 插件。
5、之后我们具体实现了 @openxui/styles 的基础部分，随后以 @openxui/button 单组件为例子，演示如何集成这种样式方案。
6、最后，我们对样式方案做了进一步的拓展和优化：使用 Vue 的 provide/inject 功能实装了主题切换的能力；使用 iconify 工具辅助实现了组件库的矢量 icon 方案。
