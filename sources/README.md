# sample-craftercms-plugin

> Crafter CMS UI plugin example (work in progress).

Instructions:
- Run `yarn` on the root
- Run `yarn build` on the root
- Run `yarn` on `example` (the test app)
- Use the `example` test app to test & develop your plugins
- When ready, deploy `dist/{index.modern,index,script}.{js,css}` to your Crafter site by
  copying these files into your site's /config/studio/plugins/{type}/{name}
  - e.g. /config/studio/plugins/apps/library
    - `apps` & `library` can be what ever naming you wish to use
  - {type} represents the type — or category — of plugin
  - {name} represents the plugin name
- Update your site's `ui.xml` to include the plugins where ever you want them to show
```xml
<siteUi>
  ...
  <widget id="craftercms.components.ToolsPanel">
    <configuration>
      <widgets>
        ...
        <widget id="org.craftercms.sampleComponentLibraryPlugin.components.reactComponent">
          <plugin site="{site}" type="apps" name="library" file="index.modern.js" />
        </widget>
        <widget id="org.craftercms.sampleComponentLibraryPlugin.components.nonReactComponent">
          <plugin site="{site}" type="apps" name="library" file="index.modern.js" />
        </widget>
```

Apps:
=====
- example: test app to test & develop your plugins.
- yoastseo-react-ts: react-app with the yoastseo analyzer.
- guest: guest-side script that handles comunication between plugin app and guest.
