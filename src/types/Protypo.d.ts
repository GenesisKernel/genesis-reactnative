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
