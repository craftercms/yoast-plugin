#!/usr/bin/env bash

echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
echo ">>> Starting app build"
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
echo ""

rollup --config rollup.config.js

echo "Deleting prior build"
rm ../authoring/static-assets/plugins/org/craftercms/plugin/sidebar/yoast-plugin/index.modern.js || true

echo "Copying build to authoring folder"
cp ./dist/index.modern.js ../authoring/static-assets/plugins/org/craftercms/plugin/sidebar/yoast-plugin/

git add ../authoring/static-assets/plugins/org/craftercms/plugin/sidebar/yoast-plugin/index.modern.js

echo ""
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
echo "<<< Build completed successfully :)"
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
