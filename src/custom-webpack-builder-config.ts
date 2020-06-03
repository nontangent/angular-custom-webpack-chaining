import { 
	CustomWebpackBuilderConfig as OriginalCustomWebpackBuilderConfig 
} from '@angular-builders/custom-webpack/dist/custom-webpack-builder-config';

export interface CustomWebpackBuilderConfig extends OriginalCustomWebpackBuilderConfig {
	chain?: string[];
}
