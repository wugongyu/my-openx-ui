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
