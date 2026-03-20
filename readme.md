# researchability

Archive articles as markdown using mozilla readability and turndown

## build

```
$ npm run build
```

Get `dist/content.js` into your browser, i.e. using [Code
Injector](https://github.com/Lor-Saba/Code-Injector) or a bookmark.

```
javascript:fetch("https://raw.githubusercontent.com/toluschr/researchability/d80bc1e1eb83f532ed46d5571f2b62f69297002d/dist/content.js").then(e => e.text()).then(eval)
```

Notes regarding this bookmark:

* The project does not fit into a bookmark directly, so it downloads and executes remote code.
* Obviously, you have to trust me.
* You should prefer to build and host it yourself.
