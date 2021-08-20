import { CustomWebpackBuilderConfig as BaseCustomWebpackBuilderConfig } from '@angular-builders/custom-webpack/dist/custom-webpack-builder-config';

export interface CustomWebpackBuilderConfig extends BaseCustomWebpackBuilderConfig {
	chain?: string[];
}
