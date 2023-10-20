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
