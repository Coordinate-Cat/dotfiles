"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_1 = require("vscode-languageserver");
exports.svelte2DefaultHtmlTagBindCompletionItems = [
    {
        allowedHtmlTags: null,
        restrictedHtmlTags: ['svelte:window'],
        items: [
            {
                label: 'offsetWidth',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
                detail: '[Svelte] bind:offsetWidth={data} (One-Way)',
            },
            {
                label: 'offsetHeight',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
                detail: '[Svelte] bind:offsetHeight={data} (One-Way)',
            },
            {
                label: 'clientWidth',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
                detail: '[Svelte] bind:clientWidth={data} (One-Way)',
            },
            {
                label: 'clientHeight',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
                detail: '[Svelte] bind:clientHeight={data} (One-Way)',
            }
        ]
    },
];
exports.svelte2DefaultScriptRefsCompletionItem = {
    label: 'refs',
    kind: vscode_languageserver_1.CompletionItemKind.Property,
    detail: '[Svelte] refs',
    documentation: {
        kind: vscode_languageserver_1.MarkupKind.Markdown,
        value: "\nRefs are a convenient way to store a reference to particular DOM nodes or components.\nDeclare a ref with `ref:[name]`, and access it inside your component's methods with `this.refs.[name]`.\n```\n        "
    },
    insertText: 'refs'
};
exports.svelte2DefaultRefCompletionItem = {
    label: 'ref:...',
    kind: vscode_languageserver_1.CompletionItemKind.Keyword,
    detail: '[Svelte] ref:<name>',
    documentation: {
        kind: vscode_languageserver_1.MarkupKind.Markdown,
        value: "\nRefs are a convenient way to store a reference to particular DOM nodes or components. \nDeclare a ref with `ref:[name]`, and access it inside your component's methods with `this.refs.[name]`.\n\n**Keep Attention!**\nSince only one element or component can occupy a given ref, don't use them in `{#each ...}` blocks. \nIt's fine to use them in `{#if ...}` blocks however.\n\nNote that you can use refs in your `<style>` blocks.\n```\n"
    },
    insertText: 'ref:',
    preselect: true,
};
exports.svelte2DefaultClassCompletionItem = {
    label: 'class:...',
    kind: vscode_languageserver_1.CompletionItemKind.Keyword,
    detail: '[Svelte] class:<css-class>="condition"',
    documentation: {
        kind: vscode_languageserver_1.MarkupKind.Markdown,
        value: "\nClasses let you toggle element classes on and off. \nTo use classes add the directive class followed by a colon and the class name you want toggled (`class:the-class-name=\"anExpression\"`). \nThe expression inside the directive's quotes will be evaluated and toggle the class on and off depending on the truthiness of the expression's result. \nYou can only add class directives to elements.\n"
    },
    insertText: 'class:',
    preselect: true,
};
exports.svelte2DefaultActionCompletionItem = {
    label: 'use:...',
    kind: vscode_languageserver_1.CompletionItemKind.Keyword,
    detail: '[Svelte] use:<action>="data"',
    documentation: {
        kind: vscode_languageserver_1.MarkupKind.Markdown,
        value: "\nActions let you decorate elements with additional functionality. \nActions are functions which may return an object with lifecycle methods, `update` and `destroy`. \nThe action will be called when its element is added to the DOM.\n\nUse actions for things like:\n\n- tooltips\n- lazy loading images as the page is scrolled, e.g. `<img use:lazyload data-src='giant-photo.jpg'/>`\n- capturing link clicks for your client router\n- adding drag and drop\n"
    },
    insertText: 'use:',
    preselect: true,
};
exports.svelte2DefaultEventHandlerCompletionItem = {
    label: 'on:...',
    kind: vscode_languageserver_1.CompletionItemKind.Keyword,
    detail: '[Svelte] on:<event>="handler"',
    documentation: {
        kind: vscode_languageserver_1.MarkupKind.Markdown,
        value: "\nIn most applications, you'll need to respond to the user's actions. In Svelte, this is done with the `on:[event]` directive.\nYou can call any method belonging to the component (whether built-in or custom), and any data property (or computed property) that's in scope.\n"
    },
    insertText: 'on:',
    preselect: true,
};
exports.svelte2DefaultComponentGetMethodCompletionItem = {
    label: 'get',
    kind: vscode_languageserver_1.CompletionItemKind.Method,
    detail: '[Svelte] get()',
    documentation: {
        kind: vscode_languageserver_1.MarkupKind.Markdown,
        value: "\nReturns the component's current state. This will also retrieve the value of computed properties.\n"
    },
    insertText: 'get()'
};
exports.svelte2DefaultComponentMethods = [
    {
        label: 'set',
        kind: vscode_languageserver_1.CompletionItemKind.Method,
        detail: '[Svelte] set({...})',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "\nThis updates the component's state with the new values provided and causes the DOM to update. \nState must be a plain old JavaScript object (POJO). \nAny properties not included in state will remain as they were.\n"
        },
        insertText: 'set({$0})',
        insertTextFormat: vscode_languageserver_1.InsertTextFormat.Snippet
    },
    {
        label: 'fire',
        kind: vscode_languageserver_1.CompletionItemKind.Method,
        detail: '[Svelte] fire(name: string, event?: any)',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "\nTrigger the event with specified name to parent component.\nOptionally you can specify event object as a second parameter.\n"
        },
        insertText: 'fire(\'$0\')',
        insertTextFormat: vscode_languageserver_1.InsertTextFormat.Snippet
    }
];
exports.svelte2MarkupBlockInnerCompletitionItems = {
    'if': [
        {
            label: 'elseif',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: 'Svelte {:elseif condition}',
            documentation: {
                kind: vscode_languageserver_1.MarkupKind.Markdown,
                value: "Handle additional condition if previous one are failed."
            },
            insertText: 'elseif ${0:condition}',
            insertTextFormat: vscode_languageserver_1.InsertTextFormat.Snippet,
            sortText: '1'
        },
        {
            label: 'else',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: 'Svelte {:else}',
            documentation: {
                kind: vscode_languageserver_1.MarkupKind.Markdown,
                value: "Handle case when all previous conditions of if statement are failed."
            },
            sortText: '2'
        }
    ],
};
exports.svelte2MarkupBlockCompletitionItems = [
    {
        label: 'if',
        kind: vscode_languageserver_1.CompletionItemKind.Keyword,
        detail: 'Svelte {#if condition}',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "Standart language conditional block construction with supporting `else` and `elseif` blocks.\n\n### Example\n```\n{#if condition1}\n<!-- Handle this case when condition1 is true -->\n{:elseif condition2}\n<!-- Handle this case when condition2 is true -->\n{:else}\n<!-- Handle this case when all conditions are failed -->\n{/if}\n```\n"
        },
        insertText: 'if ${1:condition}}\n\t$0\n{/if',
        insertTextFormat: vscode_languageserver_1.InsertTextFormat.Snippet,
        sortText: '1',
        preselect: true
    },
    {
        label: 'each',
        kind: vscode_languageserver_1.CompletionItemKind.Keyword,
        detail: 'Svelte {#each list as item}',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "Iterates by each items in the list with possibility to handle empty state of list.\n\n### Example\n```\n{#each list as item}\n<!-- Handle item markup -->\n{:else}\n<!-- Handle empty list state -->\n{/each}\n```\n"
        },
        insertText: 'each ${1:list} as ${2:item}}\n\t$0\n{/each',
        insertTextFormat: vscode_languageserver_1.InsertTextFormat.Snippet,
        sortText: '2',
        preselect: true
    },
];
exports.svelte2SpecialComponents = [
    {
        label: 'self',
        kind: vscode_languageserver_1.CompletionItemKind.Class,
        detail: '[Svelte] Special component',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "Sometimes, a component needs to embed itself recursively \u2014 for example if you have a tree-like data structure."
        },
    },
    {
        label: 'component',
        kind: vscode_languageserver_1.CompletionItemKind.Class,
        detail: '[Svelte] Special component',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "If you don't know what kind of component to render until the app runs \u2014 in other words, it's driven by state."
        },
    },
    {
        label: 'document',
        kind: vscode_languageserver_1.CompletionItemKind.Class,
        detail: '[Svelte] Special component',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: ""
        },
    },
    {
        label: 'window',
        kind: vscode_languageserver_1.CompletionItemKind.Class,
        detail: '[Svelte] Special component',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "The `<svelte:window>` tag gives you a convenient way to declaratively add event listeners to window. \nEvent listeners are automatically removed when the component is destroyed."
        },
    },
    {
        label: 'head',
        kind: vscode_languageserver_1.CompletionItemKind.Class,
        detail: '[Svelte] Special component',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "If you're building an application with Svelte \u2014 particularly if you're using Sapper \u2014 then it's likely you'll need to add some content to the `<head>` of your page, such as adding a `<title>` element."
        },
    }
];
//# sourceMappingURL=svelte2Language.js.map