import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface ITitleProps extends IElementProps {
  receiveTitle: (title?: string) => void;
}

class Title extends React.Component<ITitleProps> {
  public componentDidMount() {
    this.props.receiveTitle(this.props.attr.title);
  }

  public render() {
    return null;
  }
}

export default Title;
