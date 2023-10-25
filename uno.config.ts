/* eslint-disable import/no-relative-packages */
// uno.config.ts
import {
  defineConfig, presetUno, UserConfig,
  presetIcons,
} from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';
import { openxuiPreset } from './packages/styles/src/unoPreset';

export default defineConfig({
  presets: [
    presetUno(),

    // 集成完整预设。include 默认情况下集成全部组件的预设配置。
    openxuiPreset(),
    presetIcons({
      collections: {
        // Iconify json 集成，后续支持通过 <i class="i-op-xxx"> 来使用图标原子类，并支持按需打包
        op: () => import('./packages/icons/dist/icons.json').then((i) => i.default),
      },
    }),
    // 只集成 theme、button、input 组件的预设
    /*
    openxuiPreset({
      include: ['theme', 'button', 'input']
    })
    */

    // 只集成基础预设(包含预置预设、主题)
    // openxuiPreset({
    //   include: [],
    // }),
  ],
  transformers: [
    transformerDirectives(),
  ],
  // //  preflights 功能，支持注入原生 CSS，可以用来定义主题变量
  // preflights: [
  //   {
  //     getCSS: () => `
  //       :root {
  //         --color-primary: #c7000b;
  //         --color-success: #50d4ab;
  //         --color-warning: #fbb175;
  //         --color-danger: #f66f6a;
  //         --color-info: #526ecc;
  //       }
  //     `,
  //   },
  // ],
  // //  theme 主题 功能，将 CSS 变量与主题结合起来
  // theme: {
  //   colors: {
  //     primary: 'var(--color-primary)',
  //     success: 'var(--color-success)',
  //     warning: 'var(--color-warning)',
  //     danger: 'var(--color-danger)',
  //     info: 'var(--color-info)',
  //   },
  // },
  // // Rules定义 class 名称与 CSS 属性的对应关系。
  // rules: [
  //   ['button-base', {
  //     cursor: 'pointer',
  //     display: 'inline-flex',
  //     padding: '6px 12px',
  //   }],
  // ],
  // // shortcuts: 将一系列 class 对应的样式聚合到另一个 class 中
  // shortcuts: [
  //   ['button', `
  //     'button-base text-14px c-primary bg-success'
  //     hover:bg-warning
  //     before:text-14px
  //     [&.button-danger]:bg-danger
  //     [&.button-info]:bg-info
  //   `],
  //   ['button-danger', 'c-danger'],
  //   ['button-info', 'c-info'],
  // ],
  // // safelist: 使特定的 CSS 类任何时候都生成
  // safelist: [
  //   'button',
  //   'button-danger',
  //   'button-info',
  // ],
} as UserConfig);
