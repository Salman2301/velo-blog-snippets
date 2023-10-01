# Code snippets template
  A simple boiler plate repo to stores all the code snippets and display it as an iframe. For now just tested javascript and with Dracula theme. Update `template.html` file to change the base content of the website. Under the hood it uses highlight.js with line-number plugin and dracula theme. Use github action and update the gh-page.

## How to
1. Clone this repo
1. Create a file in `src` folder
1. Commit or Push ( if you are using local )
1. That will create a html file with exact name in the `dist` folder using github action.

## Sample

<img src="./docs/highlight.png">

## With line highlighter

<img src="./docs/line-highlight.png">

## Config
To customize the code that's in the source folder, create a file with the same name with `.config.json` ext.

sample-file.js => sample-file.config.json

```json
{
  "highlightLines": [1,2,3],
  "lineNumberStartAt": 10
}
```

> Remove the `sample-file.js` and `sample-file.config.json`

