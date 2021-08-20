import { CustomWebpackSchema as BaseCustomWebpackSchema } from '@angular-builders/custom-webpack/dist/custom-webpack-schema';
import { CustomWebpackBuilderConfig } from './custom-webpack-builder-config';

export interface CustomWebpackSchema extends BaseCustomWebpackSchema {
	customWebpackConfig: CustomWebpackBuilderConfig;
}
