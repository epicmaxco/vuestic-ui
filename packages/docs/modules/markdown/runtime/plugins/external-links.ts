import { Renderer, Parser } from 'marked'

const addAttrToLink = (str: string, attr: string) => {
  const [start, end] = str.split('<a')
  return start + '<a ' + attr + end
}

export const fixTargetLinks = (textToRender: string) => {
  const targetRegex = /\[\[(.*?)\]\]/g;  // Search for the [[target="_blank"]] in the markdown.
  const linkRegexPattern = /<a[^>]*>.*<\/a>\[\[(.*)\]\]/g; // Searching for all <a href=""> tags

  let matchedTarget;

  while ((matchedTarget = linkRegexPattern.exec(textToRender)) !== null) {
    let target = matchedTarget[1].trim().replaceAll('&quot;', '"')
    if (target === 'target=_blank') {
      target = 'target="_blank"';
    }
    const [link, attr] = matchedTarget

    textToRender = addAttrToLink(textToRender
      .replace(link, link.replace(targetRegex, '')), target)
  }

  return textToRender;
}

export function externalLinkMarkedPlugin() {
  const renderer = new Renderer();
  const paragraphRenderer = renderer.html;

  renderer.html = function (text) {
    let textToRender = paragraphRenderer.call(renderer, text);

    const targetRegex = /\[\[(.*?)\]\]/g;  // Search for the [[target="_blank"]] in the markdown.
    const linkRegexPattern = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g; // Searching for all <a href=""> tags

    const targets: string[] = [];

    const links = [];

    let matchedTarget;

    let matchedLink;

    while ((matchedTarget = targetRegex.exec(textToRender)) !== null) {
      let target = matchedTarget[1].trim().replaceAll('&quot;', '"')
      if (target === 'target=_blank') {
        target = 'target="_blank"';
      }
      targets.push(target);
    }

    if (targets.length > 0) {
      while ((matchedLink = linkRegexPattern.exec(textToRender)) !== null) {
        links.push(matchedLink[0]);
      }

      links.forEach((fndLink, index) => {
        const link = fndLink.replace(/^<a /, `<a ${targets[index]} rel="nofollow" `);
        textToRender = textToRender.replaceAll(targetRegex, '').replace(fndLink, link);
      });
    }

    return textToRender;
  };

  return { renderer };
}