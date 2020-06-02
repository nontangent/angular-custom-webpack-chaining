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

export function ngAdd(options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
		const customWebpackOption: CustomWebpackSchema = {
			path: 'angular-custom-webpack-chaining'
		};

		context.addTask(new RunSchematicTask(
			'ng-add-custom-webpack', 
			customWebpackOption
		));

		setAllCustomWebpackChainingToAngularJson(host, 'test');
  };
}

