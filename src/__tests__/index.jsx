import 'should';
const { describe, it } = global;

import parse from '../';

describe('consistency', () => {
  it('should not throw', () => null);

  it('should parse empty string', () => {
    const ast = parse('');
    ast.should.be.an.Object;
    JSON.stringify(ast).should.be.exactly(JSON.stringify({
      type: 'root',
      children: [
        {
          type: 'text',
          text: '',
        },
      ],
    }));
  });

  it('should parse simple text string', () => {
    JSON.stringify(parse('hello world')).should.be.exactly(JSON.stringify({
      type: 'root',
      children: [
        {
          type: 'text',
          text: 'hello world',
        },
      ],
    }));
  });
});
