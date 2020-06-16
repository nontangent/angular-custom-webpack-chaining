/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Tree } from '@angular-devkit/schematics';

/**
 * Sorts the keys of the given object.
 * @returns A new object instance with sorted keys
 */
function sortObjectByKeys(obj: object) {
  return Object.keys(obj).sort().reduce((result, key) => (result[key] = obj[key]) && result, {});
}

export function addPackageToPackageJson(
	host: Tree, 
	pkg: string, 
	version: string, 
	dependencies: string = 'dependencies'
): Tree {

	return savePackageJson(host, (json: object): object => {
		if (!json[dependencies]) {
      json[dependencies] = {};
    }

    if (!json[dependencies][pkg]) {
      json[dependencies][pkg] = version;
      json[dependencies] = sortObjectByKeys(json[dependencies]);
    }

		return json;
	});

}

/** Gets the version of the specified package by looking at the package.json in the given tree. */
export function getPackageVersionFromPackageJson(
	tree: Tree,
 	name: string
): string | null {
  if (!tree.exists('package.json')) {
    return null;
  }

  const packageJson = JSON.parse(tree.read('package.json')!.toString('utf8'));

  if (packageJson.dependencies && packageJson.dependencies[name]) {
    return packageJson.dependencies[name];
  }

  return null;
}


export function savePackageJson(
	host: Tree,
	callback: (json: object) => object
): Tree {
	return saveJson(host, 'package.json', callback);
}

export function saveJson(
	host: Tree, 
	path: string, 
	callback: (json: object) => object
): Tree {

	return saveFile(host, path, (src: string) => {
		const json = JSON.parse(src);
		return JSON.stringify(callback(json));
	});

}

export function saveFile(
	host: Tree, 
	path: string, 
	callback: (src: string) => string
): Tree {
	
	if (host.exists(path)) {
		const src = host.read(path)!.toString('utf-8');
		const dest = callback(src);
		host.overwrite(path, dest);
	} else {
		host.create(path, callback(''));
	}

	return host;
}

