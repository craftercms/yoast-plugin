import fs from 'fs/promises';
import fsPromises from 'fs/promises';

// There's an issue in the bundling of the react app due to a circular dependency in the library 'yoastseo'
// causing a variable (lib$1) to be defined after its usage.
// This rollup plugin reads the built file (index.modern.js), gets the variable definition, and moves it
// before its usage. Then, replaces the built file with the fixed one.
const yoastPostBuild = (filePath = './dist/index.modern.js') => {
  return {
    name: 'yoast-post-build',
    writeBundle: async () => {
      const content = await fsPromises.readFile(filePath, 'utf8');
      const contentToMoveInitialPosition = content.indexOf('var lib$1 =');
      const contentToMoveFinalPosition = content.indexOf('var htmlParser =');
      const contentToMove = content.slice(contentToMoveInitialPosition, contentToMoveFinalPosition);
      let contentEdited = content.replace(contentToMove, '');

      const movePosition = contentEdited.indexOf('var EVENTS = lib$1.EVENTS;');
      contentEdited = contentEdited.slice(0, movePosition) + contentToMove + contentEdited.slice(movePosition);

      fs.writeFile(filePath, contentEdited, (err) => {
        if (err) {
          throw err;
        }
      });
    }
  }
}

export default yoastPostBuild;