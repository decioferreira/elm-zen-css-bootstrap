#!/usr/bin/env node
'use strict';

// https://getbootstrap.com/docs/5.2/getting-started/introduction/#cdn-links
// https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css

import https from 'https';
import fs from 'fs';
import Parser from 'css-simple-parser';
import { camelCase } from 'change-case';
import { program } from 'commander';

program
  .option('-d, --download <url>')
  .parse();

const tmpFilePath = 'tmp/bootstrap.min.css';
const options = program.opts();

const extractSelectors = (previous, current) => {
  const selectors = [current.selector].concat(current.children.reduce(extractSelectors, []))
  return previous.concat(selectors);
};

const cleanSelector = (selector) => {
  return selector
    // remove comments
    .replace(/\/\*([\s\S]*?)\*\//g, '')
    // split by comma
    .split(',')
    // extract classes
    .map(s => {
      return s.match(/\.[_a-z\-][_a-z0-9\-]*/gi) || [];
    })
    // flatten array
    .flat(1)
    // remove dot
    .map(s => {
      return s.replace(/^\./, '')
    });
};

const convertToElm = () => {
  fs.readFile(tmpFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const ast = Parser.parse(data);
    const selectors = ast.children.reduce(extractSelectors, []);
    const cleanSelectors = selectors.map(cleanSelector).flat(1);
    const uniqueClassnames = [...new Set(cleanSelectors)];

    const exports = uniqueClassnames.sort().map(classname => {
      return camelCase(classname).replace('_', '');
    }).join(", ");

    let elmModuleContent = `module CSS.Bootstrap exposing (${exports})

{-| \`elm-zen-css-bootstrap\` provides all the [Bootstrap](https://getbootstrap.com/) classes for using with
[\`elm-zen-css\`](https://package.elm-lang.org/packages/decioferreira/elm-zen-css/latest/).

@docs ${exports}

-}

import CSS
`;

    uniqueClassnames.sort().forEach(classname => {
      elmModuleContent += `

{-| -}
${camelCase(classname).replace('_', '')} : CSS.ClassName
${camelCase(classname).replace('_', '')} =
    CSS.className "${classname}"
`;
    });

    fs.writeFileSync('src/CSS/Bootstrap.elm', elmModuleContent);

    console.log(`Upgrade complete! Total classes: ${uniqueClassnames.length}`);
  });
};

if (options.download) {
  const file = fs.createWriteStream(tmpFilePath);

  https.get(options.download, function (response) {
    response.pipe(file);

    file.on('finish', () => {
      file.close();
      console.log(`Download completed! Url: ${options.download}`);

      convertToElm();
    });
  });
} else {
  convertToElm();
}