'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_1 = require("vscode-languageserver");
var cosmiconfig_1 = __importDefault(require("cosmiconfig"));
var SvelteDocument_1 = require("./SvelteDocument");
var sveltedoc_parser_1 = require("sveltedoc-parser");
var path = __importStar(require("path"));
var utils = __importStar(require("./utils"));
var DocumentService_1 = require("./services/DocumentService");
var DocumentsCache_1 = require("./DocumentsCache");
var NodeModulesImportResolver_1 = require("./importResolvers/NodeModulesImportResolver");
var WebpackImportResolver_1 = require("./importResolvers/WebpackImportResolver");
var RollupImportResolver_1 = require("./importResolvers/RollupImportResolver");
// run babel for rollup config
require('@babel/register')({
    only: [/rollup.config.js/],
    presets: ["@babel/preset-env"],
    cwd: __dirname
});
var connection = vscode_languageserver_1.createConnection(vscode_languageserver_1.ProposedFeatures.all);
var documents = new vscode_languageserver_1.TextDocuments();
var mappingConfigurations = [
    { completionItemKind: vscode_languageserver_1.CompletionItemKind.Field, metadataName: 'data', hasPublic: true },
    { completionItemKind: vscode_languageserver_1.CompletionItemKind.Event, metadataName: 'events', hasPublic: true },
    { completionItemKind: vscode_languageserver_1.CompletionItemKind.Reference, metadataName: 'slots', hasPublic: true },
    { completionItemKind: vscode_languageserver_1.CompletionItemKind.Method, metadataName: 'methods', hasPublic: true },
    { completionItemKind: vscode_languageserver_1.CompletionItemKind.Method, metadataName: 'helpers', hasPublic: false },
    { completionItemKind: vscode_languageserver_1.CompletionItemKind.Method, metadataName: 'actions', hasPublic: false },
    { completionItemKind: vscode_languageserver_1.CompletionItemKind.Reference, metadataName: 'refs', hasPublic: false },
    { completionItemKind: vscode_languageserver_1.CompletionItemKind.Event, metadataName: 'transitions', hasPublic: false },
    { completionItemKind: vscode_languageserver_1.CompletionItemKind.Property, metadataName: 'computed', hasPublic: false },
    { completionItemKind: vscode_languageserver_1.CompletionItemKind.Class, metadataName: 'components', hasPublic: true }
];
connection.onInitialize(function () {
    return {
        capabilities: {
            completionProvider: {
                triggerCharacters: ['<', '.', ':', '#', '/', '@', '"', '|']
            },
            textDocumentSync: documents.syncKind,
            hoverProvider: true,
            definitionProvider: true
        }
    };
});
var documentsCache = new DocumentsCache_1.DocumentsCache();
var cosmicWebpack = cosmiconfig_1.default('webpack', { packageProp: false });
var cosmicRollup = cosmiconfig_1.default('rollup', { packageProp: false });
documents.onDidChangeContent(function (change) {
    reloadDocument(change.document);
});
documents.onDidClose(function (event) {
    var document = documentsCache.getOrCreateDocumentFromCache(utils.fileUriToPath(event.document.uri));
    // remove content to free some space
    document.content = null;
    // TODO remove also document or imported documents which are not required in other opened documents
});
function reloadDocument(textDocument) {
    var document = documentsCache.getOrCreateDocumentFromCache(utils.fileUriToPath(textDocument.uri));
    if (!document.document) {
        document.document = textDocument;
    }
    document.content = textDocument.getText();
    document.sveltedoc = undefined;
    sveltedoc_parser_1.parse({
        fileContent: document.content,
        ignoredVisibilities: [],
        includeSourceLocations: true,
        defaultVersion: SvelteDocument_1.SVELTE_VERSION_3
    }).then(function (sveltedoc) {
        if (sveltedoc.name === null) {
            sveltedoc.name = path.basename(document.path, path.extname(document.path));
        }
        if (document.importResolver === null) {
            try {
                var config = cosmicWebpack.searchSync(document.path).config;
                if (config && config.resolve && config.resolve.alias) {
                    document.importResolver = new WebpackImportResolver_1.WebpackImportResolver(documentsCache, document.path, config.resolve.alias);
                }
            }
            catch (_a) { }
            if (document.importResolver === null) {
                try {
                    var config = cosmicRollup.searchSync(document.path).config;
                    if (config && config.default && config.default.plugins) {
                        document.importResolver = new RollupImportResolver_1.RollupImportResolver(documentsCache, document.path, config.default.plugins);
                    }
                }
                catch (er) {
                    //console.log(er);
                }
            }
            if (document.importResolver === null) {
                document.importResolver = new NodeModulesImportResolver_1.NodeModulesImportResolver(documentsCache, document.path);
            }
        }
        reloadDocumentImports(document, sveltedoc.components || []);
        reloadDocumentMetadata(document, sveltedoc);
    }).catch(function () {
        // supress error
    });
}
function reloadDocumentMetadata(document, componentMetadata) {
    document.sveltedoc = componentMetadata;
    var metadata = {};
    mappingConfigurations.forEach(function (value) {
        metadata[value.metadataName] = [];
        if (value.hasPublic) {
            metadata['public_' + value.metadataName] = [];
        }
        if (!componentMetadata[value.metadataName]) {
            componentMetadata[value.metadataName] = [];
        }
        componentMetadata[value.metadataName].forEach(function (item) {
            var completionItem = {
                label: item.name,
                kind: value.completionItemKind,
                documentation: item.description,
                preselect: true
            };
            metadata[value.metadataName].push(completionItem);
            if (value.hasPublic && item.visibility === 'public') {
                metadata['public_' + value.metadataName].push(completionItem);
            }
        });
    });
    // Special handling for slots and parameters
    metadata['slotsMetadata'] = [];
    if (componentMetadata.slots && componentMetadata.slots.length > 0) {
        componentMetadata.slots.forEach(function (slot) {
            var slotMetadata = {
                name: slot.name,
                parameters: slot.parameters.map(function (param) {
                    return {
                        label: param.name,
                        kind: vscode_languageserver_1.CompletionItemKind.Field,
                        documentation: param.description,
                        preselect: true
                    };
                })
            };
            metadata['slotsMetadata'].push(slotMetadata);
        });
    }
    document.metadata = metadata;
}
function reloadDocumentImports(document, components) {
    document.importedComponents = [];
    components.forEach(function (c) {
        var importedDocument = document.importResolver.resolve(c.value);
        if (importedDocument !== null) {
            document.importedComponents.push({ name: c.name, filePath: importedDocument.path });
            if (!document.document) {
                document.document = utils.createTextDocument(importedDocument.path);
            }
            sveltedoc_parser_1.parse({
                filename: importedDocument.path,
                ignoredVisibilities: [],
                includeSourceLocations: true,
                defaultVersion: SvelteDocument_1.SVELTE_VERSION_3
            }).then(function (sveltedoc) {
                reloadDocumentMetadata(importedDocument, sveltedoc);
            }).catch(function () {
                // supress error
            });
        }
    });
}
var svelteDocumentService = new DocumentService_1.DocumentService();
function executeActionInContext(_textDocumentPosition, action) {
    // The pass parameter contains the position of the text document in
    // which code complete got requested. For the example we ignore this
    // info and always provide the same completion items.
    if (!svelteDocumentService) {
        return null;
    }
    var path = utils.fileUriToPath(_textDocumentPosition.textDocument.uri);
    var document = documentsCache.getOrCreateDocumentFromCache(path);
    if (!document.sveltedoc) {
        reloadDocument(utils.createTextDocument(path, _textDocumentPosition.textDocument.uri));
        // Ignore this request until document is loaded
        return null;
    }
    var offset = document.offsetAt(_textDocumentPosition.position);
    var scopeContext = {
        documentOffset: offset,
        content: document.content,
        offset: offset
    };
    var workspaceContext = {
        documentsCache: documentsCache
    };
    return action(document, scopeContext, workspaceContext);
}
// This handler provides the initial list of the completion items.
connection.onCompletion(function (_textDocumentPosition) {
    return executeActionInContext(_textDocumentPosition, function (document, scopeContext, workspaceContext) {
        return svelteDocumentService.getCompletitionItems(document, scopeContext, workspaceContext);
    });
});
// This handler provides the hover information.
connection.onHover(function (_textDocumentPosition) {
    return executeActionInContext(_textDocumentPosition, function (document, scopeContext, workspaceContext) {
        return svelteDocumentService.getHover(document, scopeContext, workspaceContext);
    });
});
connection.onDefinition(function (_textDocumentPosition) {
    return executeActionInContext(_textDocumentPosition, function (document, scopeContext, workspaceContext) {
        return svelteDocumentService.getDefinitions(document, scopeContext, workspaceContext);
    });
});
documents.listen(connection);
connection.listen();
//# sourceMappingURL=server.js.map