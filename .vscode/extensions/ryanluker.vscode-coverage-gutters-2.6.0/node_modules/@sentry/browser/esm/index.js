import * as tslib_1 from "tslib";
export * from './exports';
import { Integrations as CoreIntegrations } from '@sentry/core';
import { getGlobalObject } from '@sentry/utils';
import * as BrowserIntegrations from './integrations';
import * as Transports from './transports';
var windowIntegrations = {};
// This block is needed to add compatibility with the integrations packages when used with a CDN
// tslint:disable: no-unsafe-any
var _window = getGlobalObject();
if (_window.Sentry && _window.Sentry.Integrations) {
    windowIntegrations = _window.Sentry.Integrations;
}
// tslint:enable: no-unsafe-any
var INTEGRATIONS = tslib_1.__assign({}, windowIntegrations, CoreIntegrations, BrowserIntegrations);
export { INTEGRATIONS as Integrations, Transports };
//# sourceMappingURL=index.js.map