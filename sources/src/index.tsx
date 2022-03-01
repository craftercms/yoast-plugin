 import Yoast from './Yoast';

const plugin /*: PluginDescriptor */ = {
  id: 'org.craftercms.yoastPlugin',
  name: 'Yoast Plugin',
  description: '',
  author: '',
  logo: null,
  widgets: {
    'org.craftercms.yoastPlugin.components.yoast': Yoast
  },
  themes: []
};

export { Yoast }

export default plugin
