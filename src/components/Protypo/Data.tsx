import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IDataProps extends IElementProps {
  attr: {
    name: string;
    source: string;
    data: string[][];
    types: string[];
    columns: string[];
  };
}

const Data: React.SFC<IDataProps> = ({ attr }, context) => {
  context.dataSource.set(attr.source, {
    data: attr.data,
    types: attr.types,
    columns: attr.columns
  });

  return null;
};

Data.contextTypes = {
  dataSource: PropTypes.object.isRequired
};

export default Data;
