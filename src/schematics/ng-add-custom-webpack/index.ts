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
			major(angularDependencyVersion) , 
			'devDependencies'
		);

		setAllCustomWebpackBuilderToAngularJson(
			host, 
			'test',
			options.path
		);

		context.addTask(new NodePackageInstallTask());
	};
}

function major(version: string): string {
	const [ma, mi, pa] = version.split('.');
	return `${ma}.${mi}.0`
}

