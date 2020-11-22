[![travis build](https://img.shields.io/travis/com/SimonSiefke/vscode-svg-preview.svg)](https://travis-ci.com/SimonSiefke/vscode-svg-preview) [![Version](https://vsmarketplacebadge.apphb.com/version/SimonSiefke.svg-preview.svg)](https://marketplace.visualstudio.com/items?itemName=SimonSiefke.svg-preview) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)

# Svg Preview for VSCode

![demo](https://github.com/SimonSiefke/vscode-svg-preview/raw/master/./demo_images/demo.gif)

<!-- TODO better demo gif -->
<!-- TODO need to figure out why animation is restarted so often / prevent unnecessary updates -->
<!-- TODO update content when just opened / handle active text editor before extension is activated-->
<!-- TODO vscode live share -->
<!-- TODO don't zoom/pan outside of the window -->
<!-- TODO improve external css -->
<!-- TODO add tests -->
<!-- TODO bug with commented out </svg> inside html/js etc -->
<!-- TODO sometimes buggy when new version is installed -->
<!-- TODO bug: when deleted file and open another file, preview is not updated -->
<!-- TODO feature idea: zoom with ctrl+arrow key up/down -->
<!-- TODO bug: no reset preview icon when only preview is open -->
<!-- TODO doesn't work with emmet:increment (only works when cursor is moved afterwards) -->
<!-- TODO thinner icons (because of new vscode icons) -->
<!-- TODO infinite zoom -->
<!-- TODO still open a new tab when the tab is left and hidden -->
<!-- TODO fix themify icons -->
<!-- TODO always scaleToFit -->
<!-- TODO rename style.body to style.html or vice versa (currently the setting is names style.html but in the code it is referred to as style.body) -->

## Features

- Live editing of svg files and svg's inside files
- Panning and zooming of the preview (up to 32767%)

## Commands

| Command                               | Keybinding   |
| ------------------------------------- | ------------ |
| Svg Preview: Open Preview to the Side | `ctrl+alt+p` |
| Svg Preview: Reload Preview           | none         |

## Settings

| Property              | Description                                                                           | Default |
| --------------------- | ------------------------------------------------------------------------------------- | ------- |
| svgPreview.autoOpen   | Automatically open the preview when a svg file is opened                              | `false` |
| svgPreview.scaleToFit | Whether or not the svg should be scaled to fit the viewport or keep its original size | `true`  |
| svgPreview.style      | Custom style for the preview                                                          | `{}`    |

## How to use the `svgPreview.style` setting

You can change the background color:

![demo of the svg preview with white background](https://github.com/SimonSiefke/vscode-svg-preview/raw/master/./demo_images/demo_white_background.png)

```json
{
  "svgPreview.style": {
    "html": {
      "background": "white"
    }
  }
}
```

Or you can make a checkerboard background:

![demo of the svg preview with a checkerboard pattern background](https://github.com/SimonSiefke/vscode-svg-preview/raw/master/./demo_images/demo_checkerboard_background.png)

```json
{
  "svgPreview.style": {
    "html": {
      "background-position": "0 0, 13px 13px",
      "background-size": "26px 26px",
      "background-image": "linear-gradient(45deg, #141414 25%, transparent 25%, transparent 75%, #141414 75%, #141414), linear-gradient(45deg, #141414 25%, transparent 25%, transparent 75%, #141414 75%, #141414)"
    }
  }
}
```
