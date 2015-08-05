import { RootNode, TagNode, TextNode } from './ast';
import assert from 'assert';
const __DEV__ = process.env.NODE_ENV === 'development';

function parse(input) {
  if(__DEV__) {
    assert(typeof input === 'string');
  }

  const children = [];

  // do some magic
  children.push(new TextNode({
    text: input,
  }));
  //

  return new RootNode({
    children,
  });
}

export default parse;
