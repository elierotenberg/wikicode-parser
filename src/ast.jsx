import assert from 'assert';
import escapeHTML from 'escape-html';
const __DEV__ = process.env.NODE_ENV === 'development';

class Node {
  constructor({ type }) {
    if(__DEV__) {
      assert(typeof type === 'string');
      assert(type === 'root' || type === 'tag' || type === 'text');
    }
    Object.assign(this, {
      type,
    });
  }
}

let _ChildNode = null;

class RootNode extends Node {
  constructor({ children = [] }) {
    if(__DEV__) {
      assert(children instanceof Array);
      children.forEach((c) => assert(c instanceof _ChildNode));
    }
    super({ type: 'root' });
    Object.assign(this, {
      children,
    });
  }

  toHTML() {

  }
}

class ChildNode extends Node {
  constructor({ type }) {
    if(__DEV__) {
      assert(typeof type === 'string');
      assert(type === 'tag' || type === 'text');
    }
    super({ type });
  }
}

_ChildNode = ChildNode;

class TagNode extends ChildNode {
  constructor({ tagName, attrs = {}, children = [] }) {
    if(__DEV__) {
      assert(typeof tagName === 'string');
      assert(typeof attrs === 'object' && attrs !== null);
      assert(children instanceof Array);
      children.forEach((c) => assert(c instanceof ChildNode));
    }
    super({ type: 'tag' });
    Object.assign(this, {
      tagName,
      attrs,
      children,
    });
  }
}

class TextNode extends ChildNode {
  constructor({ text }) {
    if(__DEV__) {
      assert(typeof text === 'string');
    }
    super({ type: 'text' });
    Object.assign(this, {
      text,
    });
  }
}

function toStaticMarkup(node, knownTags = {}, options = { strict: false, escapeHTML: true }) {
  if(__DEV__) {
    assert(node instanceof Node);
    assert(typeof knownTags === 'object' && knownTags !== null);
  }

  if(node instanceof RootNode) {
    const { children } = node;
    return children.map((childNode) => toStaticMarkup(childNode, knownTags)).join('');
  }

  if(node instanceof TagNode) {
    const { tagName, attrs, children } = node;
    const isKnownTag = knownTags.hasOwnProperty(tagName);
    const isSelfClosing = children.length === 0;
    if(options.strict) {
      assert(isKnownTag);
    }
    if(!isKnownTag) {
      return '';
    }
    const convertedTag = knownTags[tagName] || tagName;
    const escapedAttrs = Object.keys(attrs).map((attrKey) =>
      `${attrKey}="${attrs[attrKey].replace(/"/g, '\\"')}"`
    ).join(' ');
    const coreTag = `${convertedTag} ${escapedAttrs}`;
    if(isSelfClosing) {
      return `<${coreTag} />`;
    }
    return `<${coreTag}>${
      children.map((childNode) => toStaticMarkup(childNode, knownTags)).join('')
    }</${convertedTag}>`;
  }

  if(node instanceof TextNode) {
    const { text } = node;
    return (options.escapeHTML ? escapeHTML : (x) => x)(text);
  }

  if(options.strict) {
    assert(false);
  }

  return '';
}

export default {
  Node,
  RootNode,
  ChildNode,
  TagNode,
  TextNode,
  toStaticMarkup,
};
