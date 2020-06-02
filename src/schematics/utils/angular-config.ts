import { Tree } from '@angular-devkit/schematics';

const CUSTOM_WEBPACK_BUILDERS = {
	'build': 'browser',
	'serve': 'dev-server',			
	'server': 'server',
	'test': 'karma'
};

export function setCustomWebpackBuilderToAngularJson(
	host: Tree,
	projectName: string,
	architect: string = 'build',
	builder: string = 'browser',
	webpackConfigPath: string = './extra-webpack.config.js'
) {
	if (host.exists('angular.json')) {
		const json = JSON.parse(host.read('angular.json')!.toString('utf-8'));		
	
		json.projects[projectName].architect[architect].builder 
			= `@angular-builders/custom-webpack:${builder}`;

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
			if (architect in CUSTOM_WEBPACK_BUILDERS){

				host = setCustomWebpackBuilderToAngularJson(
					host, projectName, 
					architect, CUSTOM_WEBPACK_BUILDERS[architect],
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
			if (architect in CUSTOM_WEBPACK_BUILDERS) {
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

