"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_1 = require("vscode-languageserver");
exports.svelte3DefaultHtmlTagBindCompletionItems = [
    {
        allowedHtmlTags: null,
        restrictedHtmlTags: ['svelte:window', 'svelte:body', 'svelte:head', 'svelte:options'],
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
            },
            {
                label: 'this',
                kind: vscode_languageserver_1.CompletionItemKind.Constant,
                detail: '[Svelte] bind:this={variable}',
                documentation: {
                    kind: vscode_languageserver_1.MarkupKind.PlainText,
                    value: "Gets a reference to a DOM node"
                },
            },
        ]
    },
];
exports.svelte3DefaultClassCompletionItem = {
    label: 'class:...',
    kind: vscode_languageserver_1.CompletionItemKind.Keyword,
    detail: '[Svelte] class:<css-class>="{condition}"',
    documentation: {
        kind: vscode_languageserver_1.MarkupKind.Markdown,
        value: "\nClasses let you toggle element classes on and off. \nTo use classes add the directive class followed by a colon and the class name you want toggled (`class:the-class-name=\"{anExpression}\"`). \nThe expression inside the directive's quotes will be evaluated and toggle the class on and off depending on the truthiness of the expression's result. \nYou can only add class directives to elements.\n"
    },
    insertText: 'class:',
    preselect: true,
};
exports.svelte3DefaultActionCompletionItem = {
    label: 'use:...',
    kind: vscode_languageserver_1.CompletionItemKind.Keyword,
    detail: '[Svelte] use:<action>={parameters}',
    documentation: {
        kind: vscode_languageserver_1.MarkupKind.Markdown,
        value: "\nActions are functions that are called when an element is created. \nThey can return an object with a destroy method that is called after the element is unmounted.\n\nAn action can have parameters. \nIf the returned value has an `update` method, it will be called whenever those parameters change, immediately after Svelte has applied updates to the markup.\n\nUse actions for things like:\n\n- tooltips\n- lazy loading images as the page is scrolled, e.g. `<img use:lazyload data-src='giant-photo.jpg'/>`\n- capturing link clicks for your client router\n- adding drag and drop\n"
    },
    insertText: 'use:',
    preselect: true,
};
exports.svelte3DefaultEventHandlerCompletionItem = {
    label: 'on:...',
    kind: vscode_languageserver_1.CompletionItemKind.Keyword,
    detail: '[Svelte] on:<event>="{handler}"',
    documentation: {
        kind: vscode_languageserver_1.MarkupKind.Markdown,
        value: "\nIn most applications, you'll need to respond to the user's actions. In Svelte, this is done with the `on:[event]` directive.\nYou can call any method belonging to the component (whether built-in or custom), and any data property (or computed property) that's in scope.\n"
    },
    insertText: 'on:',
    preselect: true,
};
exports.svelte3DefaultBindInstanceCompletionItem = {
    label: 'bind:this...',
    kind: vscode_languageserver_1.CompletionItemKind.Keyword,
    detail: '[Svelte] bind:this={component_instance}',
    documentation: {
        kind: vscode_languageserver_1.MarkupKind.Markdown,
        value: "\nAllows to interact with component instances programmatically..\n"
    },
    insertText: 'bind:this={${0:instance}}',
    insertTextFormat: vscode_languageserver_1.InsertTextFormat.Snippet,
};
exports.svelte3DefaultSlotPropertyCompletionItem = {
    label: 'let:...',
    kind: vscode_languageserver_1.CompletionItemKind.Keyword,
    detail: '[Svelte] let:item="item"',
    documentation: {
        kind: vscode_languageserver_1.MarkupKind.Markdown,
        value: "\nSlots can be rendered zero or more times, and can pass values back to the parent using props. \nThe parent exposes the values to the slot template using this directive.\n"
    },
    insertText: 'let:'
};
exports.svelte3MarkupBlockInnerCompletitionItems = {
    'if': [
        {
            label: 'else if',
            kind: vscode_languageserver_1.CompletionItemKind.Keyword,
            detail: 'Svelte {:else if condition}',
            documentation: {
                kind: vscode_languageserver_1.MarkupKind.Markdown,
                value: "Handle additional condition if previous one are failed."
            },
            insertText: 'else if ${0:condition}',
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
exports.svelte3MarkupBlockCompletitionItems = [
    {
        label: 'if',
        kind: vscode_languageserver_1.CompletionItemKind.Keyword,
        detail: 'Svelte {#if condition}',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "Standart language conditional block construction with supporting `else` and `else if` blocks.\n\n### Example\n```\n{#if condition1}\n<!-- Handle this case when condition1 is true -->\n{:else if condition2}\n<!-- Handle this case when condition2 is true -->\n{:else}\n<!-- Handle this case when all conditions are failed -->\n{/if}\n```\n"
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
            value: "```\n{#each expression as name}...{/each}\n{#each expression as name, index}...{/each}\n{#each expression as name, index (key)}...{/each}\n{#each expression as name}...{:else}...{/each}\n```\n\nIterating over lists of values can be done with an each block.\nAn each block can also specify an `index`, equivalent to the second argument in an `array.map(...)` callback.\nIf a `key` expression is provided \u2014 which must uniquely identify each list item \u2014 \nSvelte will use it to diff the list when data changes, rather than adding or removing items at the end. \nThe key can be any object, but strings and numbers are recommended since they allow identity to persist when the objects themselves change.\nYou can freely use destructuring patterns in each blocks.\nAn each block can also have an `{:else}` clause, which is rendered if the list is empty.\n\n### Example\n```\n{#each items as { id, name, qty }, i (id)}\n\t<li>{i + 1}: {name} x {qty}</li>\n{:else}\n    <li>No items!</li>\n{/each}\n```\n"
        },
        insertText: 'each ${1:list} as ${2:item}}\n\t$0\n{/each',
        insertTextFormat: vscode_languageserver_1.InsertTextFormat.Snippet,
        sortText: '2',
        preselect: true
    },
];
exports.svelte3SpecialComponents = [
    {
        label: 'self',
        kind: vscode_languageserver_1.CompletionItemKind.Class,
        detail: '[Svelte] Special component',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "Allows a component to include itself, recursively.\nIt cannot appear at the top level of your markup; it must be inside an if or each block to prevent an infinite loop."
        },
    },
    {
        label: 'component',
        kind: vscode_languageserver_1.CompletionItemKind.Class,
        detail: '[Svelte] Special component',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "```\n<svelte:component this={expression}>\n```\n\nRenders a component dynamically, using the component constructor specified as the `this` property. \nWhen the property changes, the component is destroyed and recreated.\n\nIf `this` is falsy, no component is rendered."
        },
    },
    {
        label: 'body',
        kind: vscode_languageserver_1.CompletionItemKind.Class,
        detail: '[Svelte] Special component',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "```\n<svelte:body on:event={handler}/>\n```\nAllows you to add listeners to events on `document.body`, such as `mouseenter` and `mouseleave` which don't fire on window."
        },
    },
    {
        label: 'window',
        kind: vscode_languageserver_1.CompletionItemKind.Class,
        detail: '[Svelte] Special component',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "```\n<svelte:window on:event={handler}/>\n<svelte:window bind:prop={value}/>\n```\nAllows you to add event listeners to the window object without worrying about removing them when the component is destroyed, \nor checking for the existence of window when server-side rendering."
        },
    },
    {
        label: 'head',
        kind: vscode_languageserver_1.CompletionItemKind.Class,
        detail: '[Svelte] Special component',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "This element makes it possible to insert elements into `document.head`. During server-side rendering, `head` content exposed separately to the main `html` content."
        },
    },
    {
        label: 'options',
        kind: vscode_languageserver_1.CompletionItemKind.Class,
        detail: '[Svelte] Special component',
        documentation: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: "```\n<svelte:options option={value}>\n```\n\nProvides a place to specify per-component compiler options. The possible options are: \n- `immutable={true}` \u2014 you never use mutable data, so the compiler can do simple referential equality checks to determine if values have changed.\n- `immutable={false}` \u2014 the default. Svelte will be more conservative about whether or not mutable objects have changed.\n- `accessors={true}` \u2014 adds getters and setters for the component's props.\n- `accessors={false}` \u2014 the default\n- `namespace=\"...\"` \u2014 the namespace where this component will be used, most commonly \"svg\"\n- `tag=\"...\"` \u2014 the name to use when compiling this component as a custom element"
        },
    },
];
//# sourceMappingURL=svelte3Language.js.map