import 'should';
const { describe, it } = global;

import { Node } from '../ast';
import parse from '../';

function expectShape(input, shape) {
  const ast = parse(input);
  ast.should.be.an.Object;
  ast.should.be.an.instanceOf(Node);
  JSON.stringify(ast).should.be.exactly(JSON.stringify(shape));
}

describe('consistency', () => {
  it('should not throw', () => null);

  it('should parse empty string', () =>
    expectShape('', {
      type: 'root',
      children: [
        {
          type: 'text',
          text: '',
        },
      ],
    })
  );

  it('should parse simple text string', () =>
    expectShape('hello world', {
      type: 'root',
      children: [
        {
          type: 'text',
          text: 'hello world',
        },
      ],
    })
  );

  it('should parse simple heading', () =>
    expectShape('== hello world ==', {
      type: 'root',
      children: [
        {
          type: 'tag',
          tagName: 'h2',
          attrs: {},
          children: [
            {
              type: 'text',
              text: 'hello world',
            },
          ],
        },
      ],
    })
  );

  it('should parse strong text', () =>
    expectShape('*hello world*', {
      type: 'root',
      children: [
        {
          type: 'tag',
          tagName: 'strong',
          attrs: {},
          children: [
            {
              type: 'text',
              text: 'hello world',
            },
          ],
        },
      ],
    })
  );

  it('should parse emphasized text', () =>
    expectShape('*hello world*', {
      type: 'root',
      children: [
        {
          type: 'tag',
          tagName: 'em',
          attrs: {},
          children: [
            {
              type: 'text',
              text: 'hello world',
            },
          ],
        },
      ],
    })
  );
});
