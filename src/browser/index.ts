import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { BrowserBuilderOptions, executeBrowserBuilder } from '@angular-devkit/build-angular';
import { json } from '@angular-devkit/core';
import { Observable } from 'rxjs';
import { getTransformsChaining } from '../common';
import { CustomWebpackSchema } from '../custom-webpack-schema';

export type CustomWebpackBrowserSchema = BrowserBuilderOptions & CustomWebpackSchema;

export function buildCustomWebpackChainingBrowser(
  options: CustomWebpackBrowserSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return executeBrowserBuilder(options, context, getTransformsChaining(options, context));
}

export default createBuilder<json.JsonObject & CustomWebpackBrowserSchema>(
  buildCustomWebpackChainingBrowser
);
