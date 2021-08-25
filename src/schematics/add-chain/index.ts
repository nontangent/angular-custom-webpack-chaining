import { Rule, Tree } from '@angular-devkit/schematics';
import { addChainToAngularJson } from '../utils';
import { Schema } from './schema';

export function addChain(options: Schema): Rule {
  return (host: Tree) => addChainToAngularJson(host, options.project, options.path, options.architect);
}
