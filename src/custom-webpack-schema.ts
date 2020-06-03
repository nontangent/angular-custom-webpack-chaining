import { 
	CustomWebpackSchema as OriginalCustomWebpackSchema 
} from '@angular-builders/custom-webpack/dist/custom-webpack-schema';
import { CustomWebpackBuilderConfig } from './custom-webpack-builder-config';

export interface CustomWebpackSchema extends OriginalCustomWebpackSchema {
	customWebpackConfig: CustomWebpackBuilderConfig;
}
