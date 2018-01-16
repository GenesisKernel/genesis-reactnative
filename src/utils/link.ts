export function extractParamsFromLink(link: string) {
  const [key, ecosystem, ...params] = link.split(';');

  return {
    key,
    ecosystem,
    params
  };
}
