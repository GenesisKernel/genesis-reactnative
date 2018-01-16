import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IDBFindProps extends IElementProps {
  attr: {
    name: string;
    source: string;
    data: string[][];
    types: string[];
    columns: string[];
  };
}

const DBFind: React.SFC<IDBFindProps> = ({ attr }, context) => {
  context.dataSource.set(attr.source, {
    data: attr.data,
    types: attr.types,
    columns: attr.columns
  });

  return null;
};

DBFind.contextTypes = {
  dataSource: PropTypes.object.isRequired
};

export default DBFind;
