import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { 
	addPackageToPackageJson, 
	getPackageVersionFromPackageJson,
	parseVersion,
	setAllCustomWebpackChainingToAngularJson
} from '../utils';
import { Schema } from './schema';

export function ngAdd(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const ngCoreVersionTag = getPackageVersionFromPackageJson(host, '@angular/core');
    const angularDependencyVersion = ngCoreVersionTag || `0.0.0-NG`;
    const packageName = 'angular-custom-webpack-chaining';
    const version = getCustomWebpackVersion(angularDependencyVersion);

    addPackageToPackageJson(host, packageName, version, 'devDependencies');

    context.addTask(new NodePackageInstallTask());

    context.addTask(new RunSchematicTask<any>(packageName, 'ng-add-custom-webpack', {
      project: options.project,
      path: 'extra-webpack.config.js'
    }));

    setAllCustomWebpackChainingToAngularJson(host, options.project);
  };
}

export function getCustomWebpackVersion(version: string): string {
	const [major, minor] = parseVersion(version);
  switch (major) {
    case '10': return '~0.1000.x';
    case '11': return '~0.1100.x';
    case '12': return '~0.1200.x';
    default: throw new Error(`custom-webpack chaining is not support Angular ${version}.`);
  }
}
