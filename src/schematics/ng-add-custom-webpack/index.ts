import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { 
	addPackageToPackageJson, 
	getPackageVersionFromPackageJson,
	parseVersion,
	setAllCustomWebpackBuilderToAngularJson 
} from '../utils';
import { Schema } from './schema';

export function ngAddCustomWebpack(options: Schema): Rule {
	return (host: Tree, context: SchematicContext) => {
		const ngCoreVersionTag = getPackageVersionFromPackageJson(host, '@angular/core');
		const angularDependencyVersion = ngCoreVersionTag || '0.0.0-NG';
		const packageName = '@angular-builders/custom-webpack';
		const version = tilderize(angularDependencyVersion);

		addPackageToPackageJson(host, packageName, version, 'devDependencies');

		setAllCustomWebpackBuilderToAngularJson(host, options.project, options.path);

		context.addTask(new NodePackageInstallTask());
	};
}

function tilderize(version: string): string {
	const [major, minor] = parseVersion(version);
	return `~${major}.${minor}.0`
}

