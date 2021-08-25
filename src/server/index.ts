import { createBuilder } from '@angular-devkit/architect';
import { executeServerBuilder } from '@angular-devkit/build-angular';
import { webpackConfigurationTransformFactory } from '../transform-factories';
import { ServerBuilderOptions as Options } from '../custom-webpack-schema';

export default createBuilder<Options>((options, context) => executeServerBuilder(options, context, {
  webpackConfiguration: webpackConfigurationTransformFactory(options, context),
}));
