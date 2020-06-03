import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { 
	addPackageToPackageJson, 
	getPackageVersionFromPackageJson,
	setAllCustomWebpackBuilderToAngularJson,
	setAllCustomWebpackChainingToAngularJson
} from '../utils';
import {
	Schema as CustomWebpackSchema
} from '../ng-add-custom-webpack/schema';
import { Schema } from './schema';

export function ngAdd(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
		const customWebpackOption: CustomWebpackSchema = {
			project: options.project,
			path: 'extra-webpack.config.js'
		};

		context.addTask(new RunSchematicTask(
			'ng-add-custom-webpack', 
			customWebpackOption
		));

		context.addTask(new RunSchematicTask(
			'add-chain',
			{
				project: options.project,	
				path: 'webpack1.config.js', 
				architect: 'build' 
			}
		));

		setAllCustomWebpackChainingToAngularJson(
			host, options.project
		);
  };
}

