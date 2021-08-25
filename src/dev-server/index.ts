import { createBuilder, targetFromTargetString } from '@angular-devkit/architect';
import { executeDevServerBuilder } from '@angular-devkit/build-angular';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DevServerBuilderOptions as Options } from '../custom-webpack-schema';
import { getTransforms } from '../transform-factories';

export default createBuilder<Options>((options, context) => {
  const target = targetFromTargetString(options.browserTarget);
  return from(context.getTargetOptions(target)).pipe(
    switchMap(schema => executeDevServerBuilder(options, context, getTransforms(schema as Options, context))),
  );
});
