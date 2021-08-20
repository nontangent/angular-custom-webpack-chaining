import { normalize } from '@angular-devkit/core';
import { CustomWebpackBuilder } from '@angular-builders/custom-webpack/dist/custom-webpack-builder';
import { CustomWebpackSchema } from './custom-webpack-schema';
import { CustomWebpackBuilderConfig	} from './custom-webpack-builder-config';

export async function resolveChaining(
	options: CustomWebpackSchema, 
	workspaceRoot, 
	target,
	browserWebpackConfig
) {
	const customWebpackConfig: CustomWebpackBuilderConfig 
		= options.customWebpackConfig;
	const chain = customWebpackConfig.chain || [];

	for (const path of chain) {
		browserWebpackConfig = await CustomWebpackBuilder.buildWebpackConfig(
	    normalize(workspaceRoot),
			{...customWebpackConfig, path: path},
			browserWebpackConfig,
			options,
			target
		);
	}
	return browserWebpackConfig;
}



