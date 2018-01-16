import { match } from 'ramda';

const matchIconFontAwesome = (name: string = ''): string =>
  match(/fa fa\-(.+)/)(name)[1];

const matchIconSimpleLine = (name: string = ''): string =>
  match(/(?:fa )?icon\-(.+)/)(name)[1];

interface IIconParams {
  name: string;
  type: string;
}

export const isIcon = (name: string = ''): boolean => name.indexOf('fa') !== -1;

export const extractIconParams = (name: string = ''): IIconParams => {
  const iconFontAwesome = matchIconFontAwesome(name);
  const iconSimpleLine = matchIconSimpleLine(name);

  return {
    name: iconFontAwesome ? iconFontAwesome : iconSimpleLine,
    type: iconFontAwesome ? 'font-awesome' : 'simple-line-icon'
  };
};
