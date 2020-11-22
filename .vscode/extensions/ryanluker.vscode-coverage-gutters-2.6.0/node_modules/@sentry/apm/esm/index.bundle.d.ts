export { Breadcrumb, Request, SdkInfo, Event, Exception, Response, Severity, StackFrame, Stacktrace, Status, Thread, User, } from '@sentry/types';
export { addGlobalEventProcessor, addBreadcrumb, captureException, captureEvent, captureMessage, configureScope, getHubFromCarrier, getCurrentHub, Hub, Scope, setContext, setExtra, setExtras, setTag, setTags, setUser, Transports, withScope, } from '@sentry/browser';
export { BrowserOptions } from '@sentry/browser';
export { BrowserClient, ReportDialogOptions } from '@sentry/browser';
export { defaultIntegrations, forceLoad, init, lastEventId, onLoad, showReportDialog, flush, close, wrap, } from '@sentry/browser';
export { SDK_NAME, SDK_VERSION } from '@sentry/browser';
import * as ApmIntegrations from './integrations';
export { Span, TRACEPARENT_REGEXP } from './span';
declare const INTEGRATIONS: {
    Tracing: typeof ApmIntegrations.Tracing;
    GlobalHandlers: typeof import("../../browser/dist/integrations").GlobalHandlers;
    TryCatch: typeof import("../../browser/dist/integrations").TryCatch;
    Breadcrumbs: typeof import("../../browser/dist/integrations").Breadcrumbs;
    LinkedErrors: typeof import("../../browser/dist/integrations").LinkedErrors;
    UserAgent: typeof import("../../browser/dist/integrations").UserAgent;
    FunctionToString: typeof import("@sentry/core/dist/integrations").FunctionToString;
    InboundFilters: typeof import("@sentry/core/dist/integrations").InboundFilters;
};
export { INTEGRATIONS as Integrations };
//# sourceMappingURL=index.bundle.d.ts.map