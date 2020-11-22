import { findHex } from './hex';
import { findWords } from './words';
import { findFn } from './functions';
import { parseImports } from '../lib/sass-importer'

const setVariable = /^\s*\$([-\w]+)\s*:\s*(.*)$/gm;

/**
 * @export
 * @param {string} text
 * @returns {{
 *  start: number,
 *  end: number,
 *  color: string
 * }}
 */
export async function findScssVars(text, importerOptions) {
  let textWithImports = text;

  try {
    textWithImports = await parseImports(importerOptions);
  } catch(err) {
    console.log('Error during imports loading, falling back to local variables parsing');
  }

  let match = setVariable.exec(textWithImports);
  let result = [];

  const varColor = {};
  const varNames = [];

  while (match !== null) {
    const name = match[1];
    const value = match[2];
    const values = await Promise.race([
      findHex(value),
      findWords(value),
      findFn(value)
    ]);

    if (values.length) {
      varNames.push(name);
      varColor[name] = values[0].color;
    }

    match = setVariable.exec(textWithImports);
  }

  if (!varNames.length) {
    return [];
  }

  const varNamesRegex = new RegExp(`\\$(${varNames.join('|')})(?!-|\\s*:)`, 'g')

  match = varNamesRegex.exec(text);

  while (match !== null) {
    const start = match.index;
    const end = varNamesRegex.lastIndex;
    const varName = match[1];

    result.push({
      start,
      end,
      color: varColor[varName]
    });

    match = varNamesRegex.exec(text);
  }


  return result;
}
