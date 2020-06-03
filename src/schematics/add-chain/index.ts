import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { addChainToAngularJson } from '../utils';
import { Schema } from './schema';

export function addChain(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
		addChainToAngularJson(
			host, options.project, options.path, options.architect
		);
  };
}


