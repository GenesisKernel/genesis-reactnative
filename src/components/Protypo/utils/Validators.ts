import { isLength, isEmpty } from 'validator';
import { ruleMap } from './rules';

interface IOptions {
  message: string;
  value: string | number;
}

class Validators {
  private rules: {
    [field: string]: {
      [rule: string]: IOptions;
    };
  };

  constructor() {
    this.rules = {};
  }

  public setRule(field: string, rule: string, options: IOptions): void {
    const previousRules = this.getRules(field);

    this.rules = {
      ...this.rules,
      [field]: {
        ...previousRules,
        [rule]: { ...previousRules[rule], ...options }
      }
    };
  }

  public hasRule(name: string): boolean {
    return !!this.rules[name];
  }

  public getRules(name: string) {
    return this.rules[name] || {};
  }

  public validateRule(field: string, value: any) {
    const fieldRules = this.getRules(field);

    return Object.keys(fieldRules).reduce((acc: any, rule: string) => {
      if (acc) {
        return acc; // return first error
      }

      const validator = ruleMap[rule];

      if (validator) {
        return validator(
          value,
          fieldRules[rule].message,
          fieldRules[rule].value
        );
      }

      return undefined;
    }, undefined);
  }
}

export default Validators;
