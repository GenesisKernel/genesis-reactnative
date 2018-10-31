declare interface IValidation {
  [validator: string]: string;
}

declare interface IAttributes {
  [key: string]: any;
}

declare interface IElement {
  id: string;
  tag: string;
  text?: string;
  attr?: IAttributes;
  children?: IElement[];
}

declare interface IElementProps {
  id: string;
  tag: string;
  text?: string;
  attr: IAttributes;
  style?: any;
  children?: React.ReactChild | React.ReactChild[];
}

// interaction manager
declare type TReaction = 'show' | 'hide';
declare type ICondition = { [inputName: string]: string; };

declare type IInteractions = {
  [K in TReaction]?: Array<ICondition>;
}
