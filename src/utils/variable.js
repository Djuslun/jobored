export const parseOptions = {
  withDomLvl1: true,
  replace: (domNode) => {
    if (domNode.type === 'tag' && domNode.name === 'p') {
      domNode.attribs.class = 'vacancy-page__p'
    }
    if (domNode.type === 'tag' && domNode.name === 'ul') {
      domNode.attribs.class = 'vacancy-page__list'
    }
    if (domNode.type === 'tag' && domNode.name === 'li') {
      domNode.attribs.class = 'vacancy-page__list-item'
    }
    return domNode;
  },
};