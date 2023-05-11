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
    const [link] = matchedTarget

    textToRender = addAttrToLink(textToRender
      .replace(link, link.replace(targetRegex, '')), target)
  }

  return textToRender;
}
