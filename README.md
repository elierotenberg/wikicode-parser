(Work in progress. Do not use.)


WikiCode parser
==============

WikiCode to AST pure JS parser.

Takes a wikicode string and returns a JS Object representing an DOM-like AST.

### Output format

```
Node := RootNode | ChildNode
ChildNode := TagNode | TextNode
RootNode := { type: 'root', children: ChildNode[] }
TagNode := { type: 'tag', tagName: String, attrs: Object, children: ChildNode[] }
TextNode := { type: 'text', text: String }
```

### Example input and output

```
parse(`== Hello *world*. <my-Custom-Tag my-custom-attribute='zz' /> ==`) === {
  type: 'root',
  children: [
    {
      type: 'tag',
      tagName: 'h2',
      attrs: {},
      children: [
        {
          type: 'text',
          text: 'Hello ',
        },
        {
          type: 'tag',
          tagName: 'strong',
          attrs: {},
          children: [
            {
              type: 'text',
              text: 'world',
            },
          ],
        },
        {
          type: 'text',
          text: '.',
        },
        {
          type: 'tag',
          tagName: 'my-Custom-Tag',
          attrs: {
            'my-custom-attribute': 'zz',
          },
          children: [],
        },
      ],
    },
  ],
};
```

#### License

MIT [Elie Rotenberg](http://elie.rotenberg.io) <[elie@rotenberg.io](mailto:elie@rotenberg.io)>
