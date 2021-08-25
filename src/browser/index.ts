import { createBuilder } from '@angular-devkit/architect';
import { executeBrowserBuilder } from '@angular-devkit/build-angular';
import { getTransforms } from '../transform-factories';
import { BrowserBuilderOptions as Options } from '../custom-webpack-schema';

export default createBuilder<Options>((options, context) => {
  return executeBrowserBuilder(options, context, getTransforms(options, context));
})
