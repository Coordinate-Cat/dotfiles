# config-profiler

> Find configuration for the current file from provided path, settings, `package.json`, workspace, HOME directory or env variable.

## Donate

If you want to thank me, or promote your Issue.

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/mrmlnc)

> Sorry, but I have work and support for plugins and modules requires some time after work. I will be glad of your support or PR's.

## Install

```shell
$ npm i -S config-profiler
```

## Why?

  * Originally designed for my VS Code plugins, because many plugins use similar code.
  * The ability to add your parsers for specific files or for one file.
  * The ability to setup predefined configs and use they from configs.
  * Less dependencies and more features.

## How it works?

For example, if your config name is "my-cofig" we will search out configuration in the following places and order:

  1. Settings (if you set `options.settings`):
    * Return `options.settings` if they are the object.
    * Return config from `oprions.predefinedConfigs` by name in the `options.settings` if is a string and it is found.
    * Return config from filepath defined in the `options.settings`.
  2. Trying to get the path to the config file from environment variable (if you set `options.envVariableName`)
  3. Trying to find the config file in the current workspace (cwd). Closest config file to the current file. File from the following list:
    * `options.configFiles`
    * `package.json` if you set `options.packageProp`
  4. Trying to find the config file in the HOME directory.
  5. If no configuration object is found then we return `null`.

## Usage

```js
const ConfigProfiler = require('config-profiler');

const configProfiler = new ConfigProfiler('./path/to/current/workspace', {
  configFiles: ['my-super-module-config.json', 'my-super-module-config.js']
});

configProfiler.getConfig('./path/to/current/file').then((result) => {
  console.log(result);
  // { from: './bla/bla/my-super-module-config.json', config: { ok: true } }
});
```

## API

See [`/docs/api.md`](docs/api.md).

## Options

See [`/docs/options.md`](docs/options.md).

## Changelog

See the [Releases section of our GitHub project](https://github.com/mrmlnc/config-profiler/releases) for changelogs for each release version.

## License

This software is released under the terms of the MIT license.
