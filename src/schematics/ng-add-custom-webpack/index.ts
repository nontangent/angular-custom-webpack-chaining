import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { 
	addPackageToPackageJson, 
	getPackageVersionFromPackageJson,
	setAllCustomWebpackBuilderToAngularJson 
} from '../utils';
import { Schema } from './schema';

export function ngAddCustomWebpack(options: Schema): Rule {
	return (host: Tree, context: SchematicContext) => {
		const ngCoreVersionTag = getPackageVersionFromPackageJson(host, '@angular/core');
		const angularDependencyVersion = ngCoreVersionTag || '0.0.0-NG';

		addPackageToPackageJson(
			host, '@angular-builders/custom-webpack', 
			tilderize(angularDependencyVersion), 
			'devDependencies'
		);

		setAllCustomWebpackBuilderToAngularJson(
			host, 
			options.project,
			options.path
		);

		context.addTask(new NodePackageInstallTask());
	};
}

function tilderize(version: string): string {
	version = ['~', '^'].indexOf(version[0]) != -1 ? version.substring(1) : version 
	const [major, minor, patch] = version.split('.');
	return `~${major}.${minor}.0`
}

