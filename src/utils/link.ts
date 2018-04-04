export function extractParamsFromLink(link: string): { privateKey: string; ecosystems: string[] } | null {
  const tokens = link.split(';');
  if (tokens.length) {
    const privateKey = tokens[0].trim();
    const ecosystems: string[] = [];

    for (let i = 1; i < tokens.length; i++) {
      const ecosystemToken = parseInt(tokens[i], 10);
      if (ecosystemToken === ecosystemToken) {
        ecosystems.push(ecosystemToken.toString());
      }
    }

    return {
      privateKey,
      ecosystems
    };
  } else {
    return null;
  }
}
