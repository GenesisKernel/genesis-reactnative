import { isLength, isEmpty } from 'validator';

export interface IRuleMapOptions {
  [rule: string]: (
    str: string | undefined,
    message: string,
    optionValue?: any
  ) => undefined | boolean | string;
}

export const RULE_REQUIRED = 'required';
export const RULE_MIN_LENGTH = 'minlength';
export const RULE_MAX_LENGTH = 'maxlength';

export const ruleMap: IRuleMapOptions = {
  [RULE_REQUIRED]: (str, message, optionValue) => {
    return isEmpty(str || '') && message;
  },
  [RULE_MIN_LENGTH]: (str, message, optionValue) => {
    return (
      str && !isLength(str, { min: optionValue, max: undefined }) && message
    );
  },
  [RULE_MAX_LENGTH]: (str, message, optionValue) => {
    return str && !isLength(str, { min: 0, max: optionValue }) && message;
  }
};
