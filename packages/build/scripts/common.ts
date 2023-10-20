import { UserConfig } from 'vite';
import {
  generateConfig as baseGenerateConfig,
  GenerateConfigOptions,
  absoluteCwd,
} from '../src';

/** 构建普通的纯 TS / JS 模块的预设 */
export function generateConfig(
  customOptions?: GenerateConfigOptions,
  viteConfig?: UserConfig,
) {
  return baseGenerateConfig({
    // 指定 d.ts 文件相关 tsconfig 的位置
    dts: absoluteCwd('../../tsconfig.src.json'),
    ...customOptions,
  }, viteConfig);
}
