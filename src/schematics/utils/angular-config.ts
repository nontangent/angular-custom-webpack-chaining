import { Tree } from '@angular-devkit/schematics';

/* const BUILDERS = { */
/* 	'build': '@angular-builders/custom-webpack:browser', */
/* 	'serve': '@angular-builders/custom-webpack:dev-server', */			
/* 	'server': '@angular-builders/custom-webpack:server', */
/* 	'test': '@angular-builders/custom-webpack:karma' */
/* }; */

const BUILDERS = {
	'build': 'angular-custom-webpack-chaining:browser',
	'serve': 'angular-custom-webpack-chaining:dev-server',			
	'server': 'angular-custom-webpack-chaining:server',
	'test': 'angular-custom-webpack-chaining:karma'
};


export function setCustomWebpackBuilderToAngularJson(
	host: Tree,
	projectName: string,
	architect: string = BUILDERS['build'],
	builder: string = 'browser',
	webpackConfigPath: string = './extra-webpack.config.js'
) {
	if (host.exists('angular.json')) {
		const json = JSON.parse(host.read('angular.json')!.toString('utf-8'));		
	
		json.projects[projectName].architect[architect].builder = builder;

		if (!json.projects[projectName].architect[architect].options.customWebpackConfig) {
			json.projects[projectName].architect[architect].options['customWebpackConfig'] = {
				'path': webpackConfigPath,
			};
		}

		host.overwrite('angular.json', JSON.stringify(json, null, 2));
	}

	return host;
}

export function setAllCustomWebpackBuilderToAngularJson(
	host: Tree,
	projectName: string,
	webpackConfigPath: string = './extra-webpack.config.js'
) {
	if (host.exists('angular.json')) {
		const json = JSON.parse(host.read('angular.json')!.toString('utf-8'));

		for (const architect of Object.keys(json.projects[projectName].architect)) {
			if (architect in BUILDERS){

				host = setCustomWebpackBuilderToAngularJson(
					host, projectName, 
					architect, BUILDERS[architect],
					webpackConfigPath
				);

			}
		}
	}

	return host;
}

export function setCustomWebpackChainingToAngularJson(
	host: Tree,
	projectName: string,
	architect: string = 'build'
) {
	if (host.exists('angular.json')) {
		const json = JSON.parse(host.read('angular.json')!.toString('utf-8'));

		if (!json.projects[projectName].architect[architect].options.customWebpackChaining) {
			json.projects[projectName].architect[architect].options['customWebpackChaining'] = {
				'chain': []
			};
		}

		host.overwrite('angular.json', JSON.stringify(json, null, 2));
		
	}
	return host;
}

export function setAllCustomWebpackChainingToAngularJson(
	host: Tree,
	projectName: string
) {
	if (host.exists('angular.json')) {
		const json = JSON.parse(host.read('angular.json')!.toString('utf-8'));

		for (const architect of Object.keys(json.projects[projectName].architect)) {
			if (architect in BUILDERS) {
				host = setCustomWebpackChainingToAngularJson(host, projectName, architect);
			}
		}
	}

	return host;
}

export function addCustomWebpackChainToAngularJson(
	host: Tree,
	projectName: string,
	webpackConfigPath: string,
	architect: string = 'build'
) {
	if (host.exists('angular.json')) {
		const json = JSON.parse(host.read('angular.json')!.toString('utf-8'));

		if (!json.projects[projectName].architect[architect].options.customWebpackChaining) {
			json.projects[projectName].architect[architect].options.customWebpackChaining = [];
		}

		json.projects[projectName].architect[architect].options.customWebpackChaining.push(webpackConfigPath);
		host.overwrite('angular.json', JSON.stringify(json, null, 2));
	}

	return host;
}

