/* eslint-disable no-await-in-loop */
import {
  defineConfig,
  PluginOption,
  ConfigEnv,
} from 'vite';
import {
  readdir,
  readFile,
  writeFile,
  cp,
} from 'node:fs/promises';
import { resolve, join } from 'node:path';
import {
  usePathAbsolute,
  absoluteCwd,
  relativeCwd,
  GenerateConfigOptions,
} from '../build/src';
import { generateVueConfig } from '../build/scripts';

/** 本包产物相对本包根目录的路径 */
const OUT_REL = 'dist';

/** 本包样式相对本包根目录的路径 */
const STYLE_OUT_REL = join(OUT_REL, 'style');

/** 子包产物相对目录 */
const PACKAGE_OUT_REL = 'dist';

// 移动样式文件
function pluginMoveStyles(mode: string): PluginOption {
  if (mode !== 'package') {
    return null;
  }
  // 当前ui包的上一级文件夹路径，获取到所有包的路径
  const absPackages = usePathAbsolute(resolve(process.cwd(), '..'));

  return {
    name: 'move-styles',
    // 只在构建模式下执行
    apply: 'build',
    async closeBundle() {
      // 遍历所有 packages 目录下的子包
      const packages = await readdir(absPackages());
      // 在待处理的子包中排除掉自己
      const uiIndex = packages.findIndex((pkg) => pkg === 'ui');
      if (uiIndex > 0) {
        packages.splice(uiIndex, 1);
      }

      // 主题样式放到队首，在合并 CSS 时具有最高优先级
      const themeIndex = packages.findIndex((pkg) => pkg === 'theme');
      if (themeIndex > 0) {
        packages.splice(themeIndex, 1);
        packages.unshift('theme');
      }

      // 一边移动每个组件各自的样式，一边拼接全量样式 index.css
      let indexCss = '';
      for (let i = 0; i < packages.length; i++) {
        const pkg = packages[i];

        console.log(`moving css of package: ${pkg}...`);
        const source = absPackages(pkg, PACKAGE_OUT_REL, 'style.css');
        const target = absoluteCwd(STYLE_OUT_REL, `${pkg}.css`);
        try {
          // 只处理产物目录下有 index.css 的子包，不满足条件会被跳过
          // 将子包复制到STYLE_OUT_REL目录下
          const styleCss = await readFile(source, 'utf-8');
          indexCss += styleCss;
          await cp(source, target, { recursive: true, force: true });
          console.log(`${source} moved successfully!`);
        } catch (err) {
          console.log(`${source} not found!`);
        }
      }
      // 生成全量样式index.css文件
      console.log('generating index.css...');
      await writeFile(absoluteCwd(STYLE_OUT_REL, 'index.css'), indexCss, 'utf-8');
    },
  };
}

export default defineConfig(({ mode }: ConfigEnv) => generateVueConfig(
  {
    outDir: OUT_REL,
    mode: mode as GenerateConfigOptions['mode'],
    // 样式都来自构建好的子包，无需 UnoCSS 生成样式
    pluginUno: false,
    // 在 package.json 的 exports 字段声明样式文件的人口
    onSetPkg: (pkg, options) => {
      const exports: Record<string, string> = {
        './style/*': relativeCwd(absoluteCwd(options.outDir, 'style/*'), false),
      };
      Object.assign(
        pkg.exports as Record<string, any>,
        exports,
      );
    },
  },
  {
    plugins: [
      // 使用 Vite 插件处理 css 移动的行为
      pluginMoveStyles(mode),
    ],
  },
));
