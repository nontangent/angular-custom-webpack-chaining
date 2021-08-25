import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { 
	addPackageToPackageJson, 
	getPackageVersionFromPackageJson,
	parseVersion,
	setAllCustomWebpackBuilderToAngularJson 
} from '../utils';
import { Schema } from './schema';

export function ngAdd(options: Schema): Rule {
	return (host: Tree, context: SchematicContext) => {
		const ngCoreVersionTag = getPackageVersionFromPackageJson(host, '@angular/core');
		const angularDependencyVersion = ngCoreVersionTag || '0.0.0-NG';
		const packageName = '@angular-builders/custom-webpack';
		const version = tilderize(angularDependencyVersion);

		addPackageToPackageJson(host, packageName, version, 'devDependencies');

		const installTask = context.addTask(new NodePackageInstallTask());
		context.addTask(new RunSchematicTask('angular-custom-webpack-chaining', 'setup-custom-webpack', options), [installTask]);
	};
}

export function setup(options: Schema): Rule {
	return (host: Tree) => setAllCustomWebpackBuilderToAngularJson(host, options.project, options.path);
}

function tilderize(version: string): string {
	const [major] = parseVersion(version);
	return `~${major}.0.0`;
}

