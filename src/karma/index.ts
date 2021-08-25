import { createBuilder } from '@angular-devkit/architect';
import { executeKarmaBuilder } from '@angular-devkit/build-angular';
import { webpackConfigurationTransformFactory } from '../transform-factories';
import { KarmaBuilderOptions as Options } from '../custom-webpack-schema';

export default createBuilder<Options>((options, context) => executeKarmaBuilder(options, context, {
  webpackConfiguration: webpackConfigurationTransformFactory(options, context),
}));
