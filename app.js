// const fs = require("fs");
const path = require("path");
const fs = require('fs-extra')

const [ srcFolder, distFolder, staticFolder ] = ["src", "dist", "static"];

// recreate the dist folder
fs.rmdirSync(distFolder, { recursive: true });
fs.mkdirSync(distFolder);
fs.mkdirSync(path.join(distFolder, staticFolder));

const srcFiles = fs
  .readdirSync(srcFolder)
  .filter((file) => !path.basename(file).endsWith(".config.json") );

srcFiles.forEach((file) => {
  const sourcePath = path.join(srcFolder, file);
  const extname = path.extname(file);
  const htmlTargetFile = path.basename(file.replace(extname, ".html"));
  const targetPath = path.join(distFolder, htmlTargetFile);

  let config = {};
  try {
    let configFilePath = path.join(srcFolder, file.replace(path.extname(file), ".config.json"));
    config = fs.readJsonSync(configFilePath, "utf8")
  }
  catch {}
  console.log({ config })
  copyAndPaste(sourcePath, targetPath, renderHtmlWithConfig(config));
});

fs.copySync(path.join(staticFolder), path.join(distFolder, staticFolder));

function copyAndPaste(sourcePath, targetPath = sourcePath, template) {
  let content = fs.readFileSync(sourcePath, "utf8");
  if (template) content = template(content);
  fs.writeFileSync(targetPath, content);
  console.log(`Copied ->  ${sourcePath} to ${targetPath}`);
}

function renderHtmlWithConfig(config = {}) {
  return function renderHTML(js) {
    let content = fs.readFileSync("./template.html", "utf8");
    content = content.replace("%code%", js);
    let lines = "";
    if (config && config.highlightLines) {
      lines = config.highlightLines.map(Number).join();
    }
    content = content.replace("%lines-to-highlight%", lines);
    content = content.replace("%line-number-start-at%", config.lineNumberStartAt);

    return content
  }
}
