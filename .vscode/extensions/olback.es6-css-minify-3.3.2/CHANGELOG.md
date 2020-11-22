# 3.3.2
* Bump terser to `4.6.2`.

## 3.3.1
* Bumb required VS Code version to `1.30.0`.

## 3.3.0
* Added ability to minify file from explorer (file list to the left). Fixes [#90](https://github.com/olback/es6-css-minify/issues/90).
* Fixed issue [#92](https://github.com/olback/es6-css-minify/issues/92). (Thanks @Tim-Veestraeten)
* Added file watcher for config files.
* Fixed [#93](https://github.com/olback/es6-css-minify/issues/93).

## 3.2.0
* Added language and auto-complete support for `.autoprefixerrc`, `.cleancssrc`, `.uglifyrc` and `.terserrc`.
* Added `Minify: Export Configuration` command.

## 3.1.1
* Removed console.log.
* Hopefully fixed issue [#78](https://github.com/olback/es6-css-minify/issues/78) (Thanks @CubeRanch)

## 3.1.0
* Fixed issue [#84](https://github.com/olback/es6-css-minify/issues/84). (Thanks @0arra0)
* Fixed issue [#83](https://github.com/olback/es6-css-minify/issues/83). (Thanks @CubeRanch)
* Fixed error in package.json.

## 3.0.3
* Fixed issue [#81](https://github.com/olback/es6-css-minify/issues/81).

## 3.0.2
* Issue [#78](https://github.com/olback/es6-css-minify/issues/78) fixed. (Thanks @CubeRanch)
* Minify button is always visible by default. Button visibility can be set to either `"always"`, `"never"` or `"auto"`.

## 3.0.1
* Issue [#76](https://github.com/olback/es6-css-minify/issues/76) fixed. (Thanks @EvlBlackmask)

## 3.0.0
* Complete re-write. The extension is now divided into multiple files. This makes it easier to maintain.
* Bump dependency versions. (Closes [#74](https://github.com/olback/es6-css-minify/issues/74))
* You can now see warnings and errors directly from clean-css and terser.
* No breaking changes from `2.7.0`.
* `es6-css-minify.hideButton` is set to `true` by default.
* New settigns:
    - `es6-css-minify.showLogOnWarning` Show output if there are any warnings. Defualt: `true`.
    - `es6-css-minify.showLogOnError` Show output if there are any errors. Defualt: `true`.
    - `es6-css-minify.onSaveDelay` Delay in milliseconds before the file is minified. Default: `0`
    - `es6-css-minify.enableAutoprefixerSelection` Enable autoprefixer when minifying a selection. Default: `false`
    - `es6-css-minify.autoprefixerConfigFile` Specify a autoprefixer config file. Default: `".autoprefixerrc"`

## 2.7.0
* Fixed issue [#57](https://github.com/olback/es6-css-minify/issues/57). (Thanks for the PR @MuTsunTsai)

## 2.6.0
* Package extension with Webpack to improve performance. See [#66](https://github.com/olback/es6-css-minify/issues/66).

## 2.5.0
* Implemented JSON minification. See [#54](https://github.com/olback/es6-css-minify/issues/54).

## 2.4.0
* Implemented Autoprefixer as requested in Issue#59. This can be enabled in the config.

## 2.3.0
* Implemented 'Minify selection' as requested by @dwelle in issue#56.

## 2.2.0
* Implemented postfix. [See this PR](https://github.com/olback/es6-css-minify/pull/51)

## 2.1.0
* You no longer have to run `Minify: Reload config` when updating your config. It's done automatically.
* Hide Minify button when the filetype isn't supported. This can be enable by changing `es6-css-minify.hideButton` to `true`.
* Use [terser](https://www.npmjs.com/package/terser) instead of uglify-es since it's deprecated. (#46)
* Inform the user when Javascript minify fails about syntax errors. (#45)

## 2.0.3
* Merged PR [#36](https://github.com/olback/es6-css-minify/issues/36)
* Fixed bug [#35](https://github.com/olback/es6-css-minify/issues/35)

## 2.0.2
* Added some tests.
* You can no longer minify minified files

## 2.0.1
* Fixed bug [#28](https://github.com/olback/es6-css-minify/issues/28)

## 2.0.0
* Rewritten in Typescript
* Fixed bugs [#24](https://github.com/olback/es6-css-minify/issues/24), [#26](https://github.com/olback/es6-css-minify/issues/26), [#27](https://github.com/olback/es6-css-minify/issues/27)
* Changed default value of `es6-css-minify.minifyOnSave` to `no`

## 0.1.6
* Added feature from issue [#23](https://github.com/olback/es6-css-minify/issues/23)
* Changed default value of `es6-css-minify.minifyOnSave` to `exists`

## 0.1.5
* Fixed issue [#19](https://github.com/olback/es6-css-minify/issues/19)

## 0.1.4
* Reference original file in sourcemap instead of minified file

## 0.1.3
* Fixed issue [#18](https://github.com/olback/es6-css-minify/issues/18) (Windows)

## 0.1.2
* Fixed js sourcemap url [#16](https://github.com/olback/es6-css-minify/issues/16)
* Sourcemap sources fixed [#15](https://github.com/olback/es6-css-minify/issues/15)

## 0.1.1
* Added "exists" as an option to `es6-css-minify.minifyOnSave`
* Change the JavaScript Mapping URL. `es6-css-minify.jsMapUrl`

## 0.1.0
* Source map support. Enable/Disable in settings

## 0.0.11
* Fixed bug [#10](https://github.com/olback/es6-css-minify/issues/10)

## 0.0.10
* README changes

## 0.0.9
* Added support for uglify-es and clean-css config files!

## 0.0.8
* Attempt two on fixing the issue!

## 0.0.7
* Failed attempt to fix the plugin

## 0.0.6
* Minify JS on save bug fixed

## 0.0.5
* Typo

## 0.0.4
* Fixed issue [#5](https://github.com/olback/es6-css-minify/issues/5)
* Added support for minify on save
* Settings

## 0.0.3
* Fixed issue [#3](https://github.com/olback/es6-css-minify/issues/3)

## 0.0.2
* Fixed issue [#1](https://github.com/olback/es6-css-minify/issues/1)

## 0.0.1
* Initial release!
