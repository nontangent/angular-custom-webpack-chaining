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
    const ngCoreVersionTag = getPackageVersionFromPackageJson(host, '@angular/core');
    const angularDependencyVersion = ngCoreVersionTag || `0.0.0-NG`;

    if (angularDependencyVersion === '0.0.0-NG') {
      throw new Error('@angular/core version is not supported.');
    }

    addPackageToPackageJson(
      host,
      'angular-custom-webpack-chaining',
      getCustomWebpackVersion(angularDependencyVersion),
      'devDependencies'
    );

    context.addTask(new NodePackageInstallTask());

    context.addTask(new RunSchematicTask<any>(
      'angular-custom-webpack-chaining',
      'ng-add-custom-webpack', 
      {
        project: options.project,
        path: 'extra-webpack.config.js'
      }
    ));

    /* context.addTask(new RunSchematicTask( */
    /* 	'add-chain', */
    /* 	{ */
    /* 		project: options.project, */	
    /* 		path: 'webpack1.config.js', */ 
    /* 		architect: 'build' */ 
    /* 	} */
    /* )); */

    setAllCustomWebpackChainingToAngularJson(
      host, options.project
    );
  };
}

export function getCustomWebpackVersion(ver: string): string {
  const [major, minor, patch] = (ver.replace(/(\^|\~)/, '')).split('.');
  switch (major) {
    case '10': return '~0.1000.0';
    case '11': return '~0.1100.0';
    default: throw new Error('@angular/core version is not supported.');
  }
}
