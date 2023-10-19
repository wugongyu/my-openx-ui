# packages/build/src

📦src
┣ 📂generateConfig # 实现生成构建配置的主体方法
┃ ┣ 📜external.ts # 依赖外部化相关，获取构建配置的 build.rollupOptions.external 字段
┃ ┣ 📜index.ts # 模块出口，主体方法实现，整合构建配置
┃ ┣ 📜lib.ts # 产物相关，获取构建配置的 build.lib 字段
┃ ┣ 📜options.ts # 配置项对象声明
┃ ┣ 📜pluginMoveDts.ts # 移动 d.ts 产物的自定义插件
┃ ┣ 📜pluginSetPackageJson.ts # 自动将产物路径写入 package.json 的自定义插件
┃ ┗ 📜plugins.ts # 插件相关，获取构建配置的 plugins 字段
┃
┣ 📂utils # 存放本模块用到的公共方法
┃ ┣ 📜formatVar.ts # 变量名格式转换方法，如驼峰式，连字符式等
┃ ┣ 📜index.ts # 公共方法统一出口
┃ ┣ 📜json.ts # JSON 文件的读写
┃ ┣ 📜resolvePath.ts # 路径的处理方法
┃ ┗ 📜typeCheck.ts # 判断对象类型的方法
┃
┗ 📜index.ts # 模块出口
