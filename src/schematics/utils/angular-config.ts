import { Tree } from '@angular-devkit/schematics';
import * as _ from 'lodash';

const BUILDERS = {
	'build': 'angular-custom-webpack-chaining:browser',
	'serve': 'angular-custom-webpack-chaining:dev-server',			
	'server': 'angular-custom-webpack-chaining:server',
	'test': 'angular-custom-webpack-chaining:karma'
};

const customWebpackPath = (projectName: string, architect: string): string[] => {
	return ['projects', projectName, 'architect', architect, 'options', 'customWebpack'];
}

const getConfig = (json: object, projectName: string, architect: string): {path?: string, chain?: string[]} => {
	return _.get(json, customWebpackPath(projectName, architect));
}

const configExists = (json: object, projectName: string, architect: string): boolean => {
	return !!getConfig(json, projectName, architect);
}

const setConfig = (json: object, projectName: string, architect: string, config: object) => {
	return _.set(json, customWebpackPath(projectName, architect), config);
}

const setConfigIfNotExists = (json: object, projectName: string, architect: string, config: object): void => {
	if (!configExists(json, projectName, architect)) setConfig(json, projectName, architect, config);
}

export function setCustomWebpackBuilderToAngularJson(
	host: Tree,
	projectName: string,
	architect: string = BUILDERS['build'],
	builder: string = 'browser',
	webpackConfigPath: string = './extra-webpack.config.js'
): Tree {
	return exists(host, 'angular.json', () => {
		const json = JSON.parse(host.read('angular.json')!.toString('utf-8'));		
		_.set(json, ['projects', projectName, 'architect', architect, 'builder'], builder);		
		setConfigIfNotExists(json, projectName, architect, {path: webpackConfigPath});
		host.overwrite('angular.json', JSON.stringify(json, null, 2));
		return host;
	});
}

export function setAllCustomWebpackBuilderToAngularJson(
	host: Tree,
	projectName: string,
	webpackConfigPath: string = './extra-webpack.config.js'
) {
	return exists(host, 'angular.json', () => {
		const json = JSON.parse(host.read('angular.json')!.toString('utf-8'));
		return Object.keys(_.get(json, ['projects', projectName, 'architect']) ?? [])
			.filter(arch => arch in BUILDERS)
			.reduce((host, architect) => setCustomWebpackBuilderToAngularJson(
				host, 
				projectName, 
				architect,
				BUILDERS[architect],
				webpackConfigPath
			), host);
	});
}

export function setCustomWebpackChainingToAngularJson(
	host: Tree,
	projectName: string,
	architect: string = 'build'
): Tree {
	return exists(host, 'angular.json', () => {
		const json = JSON.parse(host.read('angular.json')!.toString('utf-8'));
		let config = getConfig(json, projectName, architect);
		setConfig(json, projectName, architect, config?.path ? {chain: [config.path]} : config ?? {chain: []});
		host.overwrite('angular.json', JSON.stringify(json, null, 2));
		return host;
	});
}

export function setAllCustomWebpackChainingToAngularJson(host: Tree, projectName: string): Tree {
	return exists(host, 'angular.json', () => {
		const json = JSON.parse(host.read('angular.json')!.toString('utf-8'));
		return Object.keys(_.get(json, ['projects', projectName, 'architect']) ?? [])
			.filter(arch => arch in BUILDERS)
			.reduce((host, architect) => setCustomWebpackChainingToAngularJson(host, projectName, architect), host);
	});
}

export function addChainToAngularJson(
	host: Tree,
	projectName: string,
	webpackConfigPath: string,
	architect: string = 'build'
): Tree {
	return exists(host, 'angular.json', () => {
		const json = JSON.parse(host.read('angular.json')!.toString('utf-8'));
		setConfigIfNotExists(json, projectName, architect, {chain: []});
		const config = getConfig(json, projectName, architect);
		if(config?.chain && !config.chain.includes(webpackConfigPath)) {
			config.chain.push(webpackConfigPath);
		}
		host.overwrite('angular.json', JSON.stringify(json, null, 2));
		return host;
	})
}

function exists(host: Tree, path: string, callback: () => Tree): Tree {
	return host.exists(path) ? callback() : host;
}
