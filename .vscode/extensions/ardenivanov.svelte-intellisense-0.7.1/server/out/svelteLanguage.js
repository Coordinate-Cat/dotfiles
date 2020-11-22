"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_1 = require("vscode-languageserver");
var SvelteDocument_1 = require("./SvelteDocument");
function getVersionSpecificSelection(document, versionsSpecific) {
    var requiredVersion = document.svelteVersion();
    return versionsSpecific.find(function (versionSpecific) {
        return versionSpecific.version === requiredVersion;
    }).specific;
}
exports.getVersionSpecificSelection = getVersionSpecificSelection;
function getVersionSpecificMetadataForMarkup(document) {
    if (!document.metadata) {
        return [];
    }
    return document.svelteVersion() === SvelteDocument_1.SVELTE_VERSION_2 ? document.metadata.helpers : document.metadata.methods;
}
exports.getVersionSpecificMetadataForMarkup = getVersionSpecificMetadataForMarkup;
function getVersionSpecificDocForMarkup(document) {
    if (!document.sveltedoc) {
        return [];
    }
    return document.svelteVersion() === SvelteDocument_1.SVELTE_VERSION_2 ? document.sveltedoc.helpers : document.sveltedoc.methods;
}
exports.getVersionSpecificDocForMarkup = getVersionSpecificDocForMarkup;
function getHtmlTagDefaultBindCompletionItems(tagName, versionSpecificItems) {
    var result = [];
    var populator = function (list) {
        list.forEach(function (rule) {
            if (rule.restrictedHtmlTags) {
                if (rule.restrictedHtmlTags.some(function (restrictedTagName) { return restrictedTagName === tagName; })) {
                    return;
                }
            }
            if (rule.allowedHtmlTags) {
                if (rule.allowedHtmlTags.every(function (allowedTagName) { return allowedTagName !== tagName; })) {
                    return;
                }
            }
            result.push.apply(result, rule.items);
        });
    };
    populator(exports.DefaultHtmlTagBindCompletionItems);
    populator(versionSpecificItems);
    return result;
}
exports.getHtmlTagDefaultBindCompletionItems = getHtmlTagDefaultBindCompletionItems;
exports.DefaultHtmlTagBindCompletionItems = [
    {
        allowedHtmlTags: ['input', 'textarea', 'select'],
        items: [{
                label: 'value',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                detail: '[Svelte] bind:value={data}',
                documentation: {
                    kind: vscode_languageserver_1.MarkupKind.Markdown,
                    value: "Handle HTML input controls `value` binding."
                }
            }]
    },
    {
        allowedHtmlTags: ['input'],
        items: [
            {
                label: 'checked',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                detail: '[Svelte] bind:checked={data}',
                documentation: {
                    kind: vscode_languageserver_1.MarkupKind.Markdown,
                    value: "Handle HTML input with `type=\"checkbox\"` attribute check-state binding."
                }
            },
            {
                label: 'group',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                detail: '[Svelte] bind:group={data}',
                documentation: {
                    kind: vscode_languageserver_1.MarkupKind.Markdown,
                    value: "`group` bindings allow you to capture the current value of a set of radio inputs, or all the selected values of a set of checkbox inputs."
                }
            },
        ]
    },
    {
        allowedHtmlTags: ['audio', 'video'],
        items: [
            {
                label: 'currentTime',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                detail: '[Svelte] bind:currentTime={data}',
            },
            {
                label: 'paused',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                detail: '[Svelte] bind:paused={data}',
            },
            {
                label: 'played',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                detail: '[Svelte] bind:played={data}',
            },
            {
                label: 'volume',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                detail: '[Svelte] bind:volume={data}',
            },
            {
                label: 'buffered',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
                detail: '[Svelte] bind:buffered={data} (One-Way)',
            },
            {
                label: 'duration',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
                detail: '[Svelte] bind:duration={data} (One-Way)',
            },
            {
                label: 'seekable',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
                detail: '[Svelte] bind:seekable={data} (One-Way)',
            }
        ]
    },
    {
        allowedHtmlTags: ['svelte:window'],
        items: [
            {
                label: 'scrollX',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                detail: '[Svelte] bind:scrollX={data}',
            },
            {
                label: 'scrollY',
                kind: vscode_languageserver_1.CompletionItemKind.Property,
                detail: '[Svelte] bind:scrollX={data}',
            },
            {
                label: 'online',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
                detail: '[Svelte] bind:online={data} (One-Way)',
            },
            {
                label: 'innerWidth',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
                detail: '[Svelte] bind:innerWidth={data} (One-Way)',
            },
            {
                label: 'innerHeight',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
                detail: '[Svelte] bind:innerHeight={data} (One-Way)',
            },
            {
                label: 'outerWidth',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
                detail: '[Svelte] bind:outerWidth={data} (One-Way)',
            },
            {
                label: 'outerHeight',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
                detail: '[Svelte] bind:outerHeight={data} (One-Way)',
            }
        ]
    }
];
exports.DefaultTransitionCompletionItems = [
    {
        label: 'transiontion:...',
        kind: vscode_languageserver_1.CompletionItemKind.Keyword,
        detail: '[Svelte] transition:<function>="{ settings }"',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "Transitions allow elements to enter and leave the DOM gracefully, rather than suddenly appearing and disappearing."
        },
        insertText: 'transition:',
        preselect: true
    },
    {
        label: 'in:...',
        kind: vscode_languageserver_1.CompletionItemKind.Keyword,
        detail: '[Svelte] transition:<function>="{ settings }"',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "In transitions allow elements to enter the DOM gracefully, rather than suddenly appearing."
        },
        insertText: 'in:',
        preselect: true
    },
    {
        label: 'out:...',
        kind: vscode_languageserver_1.CompletionItemKind.Keyword,
        detail: '[Svelte] transition:<function>="{ settings }"',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "Out transitions allow elements to leave the DOM gracefully, rather than suddenly disappearing."
        },
        insertText: 'out:',
        preselect: true
    }
];
exports.DefaultBindCompletionItem = {
    label: 'bind:...',
    kind: vscode_languageserver_1.CompletionItemKind.Keyword,
    detail: '[Svelte] bind:<data>={data}',
    documentation: {
        kind: vscode_languageserver_1.MarkupKind.Markdown,
        value: "\nComponent bindings keep values in sync between a parent and a child.\n"
    },
    insertText: 'bind:',
    preselect: true,
};
exports.DefaultSlotCompletionItem = {
    label: 'slot="..."',
    kind: vscode_languageserver_1.CompletionItemKind.Keyword,
    detail: '[Svelte] slot="name"',
    documentation: {
        kind: vscode_languageserver_1.MarkupKind.Markdown,
        value: "\nAllows the current component to inject content into this component.\n"
    },
    insertText: 'slot='
};
exports.markupBlockInnerCompletitionItems = {
    'each': [
        {
            label: 'else',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: 'Svelte {:else}',
            documentation: {
                kind: vscode_languageserver_1.MarkupKind.Markdown,
                value: "Handle specific case of each statement when list are empty."
            },
        },
    ],
    'await': [
        {
            label: 'then',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: 'Svelte {:then data}',
            documentation: {
                kind: vscode_languageserver_1.MarkupKind.Markdown,
                value: "Handle state when JS Promise object are resolved."
            },
            insertText: 'then ${0:data}',
            insertTextFormat: vscode_languageserver_1.InsertTextFormat.Snippet,
            sortText: '1'
        },
        {
            label: 'catch',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: 'Svelte {:catch e}',
            documentation: {
                kind: vscode_languageserver_1.MarkupKind.Markdown,
                value: "Handle state when JS Promise object are rejected."
            },
            insertText: 'catch ${0:error}',
            insertTextFormat: vscode_languageserver_1.InsertTextFormat.Snippet,
            sortText: '2'
        },
    ]
};
exports.markupBlockCompletitionItems = [
    {
        label: 'await',
        kind: vscode_languageserver_1.CompletionItemKind.Keyword,
        detail: 'Svelte {#await promise}',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "Construction to handle JS Promise object with pending, resolved and rejected states.\n\n### Example\n```\n{#await promise}\n<!-- Pending -->\n{:then data}\n<!-- Resolved -->\n{:catch error}\n<!-- Rejected -->\n{/await}\n```\n"
        },
        insertText: 'await ${1:promise}}\n\t${2:loading}\n{:then ${3:data}}\n\t$0\n{/await',
        insertTextFormat: vscode_languageserver_1.InsertTextFormat.Snippet,
        sortText: '3',
        preselect: true
    },
];
exports.SpecialComponentNamespace = 'svelte';
exports.PlaceholderModifiers = [
    {
        label: '@html',
        kind: vscode_languageserver_1.CompletionItemKind.Keyword,
        insertText: 'html',
        detail: '[Svelte] Expression',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "Ordinary tags render expressions as plain text. If you need your expression interpreted as HTML, wrap it in a special `@html` tag."
        },
        sortText: '1',
    },
    {
        label: '@debug',
        kind: vscode_languageserver_1.CompletionItemKind.Keyword,
        insertText: 'debug',
        detail: '[Svelte] Expression',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "To inspect data as it changes and flows through your app, use a `{@debug ...}` tag.\nYou can debug multiple values simultaneously (`{@debug foo, bar, baz}`), or use `{@debug}` to pause execution whenever the surrounding markup is updated.\n\n**Keep attention!**\nDebug tags only have an effect when compiling with the `dev: true` compiler option.\n"
        },
        sortText: '2',
    },
];
exports.EventModifiers = [
    {
        label: 'preventDefault',
        kind: vscode_languageserver_1.CompletionItemKind.Keyword,
        detail: '[Svelte] Event modifiers',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "Calls `event.preventDefault()` before running the handler"
        },
    },
    {
        label: 'stopPropagation',
        kind: vscode_languageserver_1.CompletionItemKind.Keyword,
        detail: '[Svelte] Event modifiers',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "Calls `event.stopPropagation()`, preventing the event reaching the next element"
        },
    },
    {
        label: 'passive',
        kind: vscode_languageserver_1.CompletionItemKind.Keyword,
        detail: '[Svelte] Event modifiers',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "Improves scrolling performance on touch/wheel events (Svelte will add it automatically where it's safe to do so)"
        },
    },
    {
        label: 'capture',
        kind: vscode_languageserver_1.CompletionItemKind.Keyword,
        detail: '[Svelte] Event modifiers',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "Fires the handler during the capture phase instead of the bubbling phase"
        },
    },
    {
        label: 'once',
        kind: vscode_languageserver_1.CompletionItemKind.Keyword,
        detail: '[Svelte] Event modifiers',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "Removes the handler after the first time it runs"
        },
    },
];
//# sourceMappingURL=svelteLanguage.js.map