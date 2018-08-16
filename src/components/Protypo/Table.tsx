import * as React from 'react';
import * as PropTypes from 'prop-types';
import { forEachObjIndexed } from 'ramda';
import { stylable } from 'react-native-stylable';
import { StyleSheet, View, Text } from 'react-native';

import { renderElement } from './Protypo';
import defaultStyles from './Table.style';

export interface ITableProps extends IElementProps {
  style?: any;
  attr: {
    source?: string;
    columns?: Array<{ Name: string; Title: string }>;
  };
}

interface IContext {
  dataSource: any;
}

interface IColumn {
  title: string;
  index: number;
}

const RowLabel = ({ children, style }) => (
  <View style={[defaultStyles.rowLabel, style]}>
    <Text style={defaultStyles.rowLabelText} numberOfLines={1} ellipsizeMode="tail">
      {children}
    </Text>
  </View>
);

const RowValue = ({ children, style }) => (
  <View style={[defaultStyles.rowValue, style]}>{children}</View>
);

const renderValue = (type: string, value: any) => {
  switch (type) {
    default:
      return null;

    case 'text':
      return (
        <Text numberOfLines={1} ellipsizeMode="tail">
          {value}
        </Text>
      );

    case 'tags':
      try {
        const payload = JSON.parse(value);
        return payload.map((child: IElement) => renderElement(child));
      } catch (e) {
        return null;
      }
  }
};

class Table extends React.PureComponent<ITableProps> {
  public static contextTypes = {
    dataSource: PropTypes.object.isRequired
  };

  public render() {
    let columns: IColumn[] = [];
    const { attr } = this.props;
    const source = this.context.dataSource.get(attr.source);

    if (!source) {
      return null;
    }

    if (attr.columns) {
      attr.columns.forEach(col => {
        const index = source.columns.indexOf(col.Name);

        if (index !== -1) {
          columns.push({
            title: col.Title,
            index
          });
        }
      });
    } else {
      columns = source.columns.map((columnName: string, index: number) => ({
        title: columnName,
        index
      }));
    }

    return (
      <View style={[defaultStyles.container, this.props.style]}>
        {source.data.map((row: any[], rowIndex: number) => {
          return columns.map((column, columnIndex) => {
            const isHead = columnIndex === 0;

            return (
              <View
                key={`${rowIndex}_${columnIndex}`}
                style={defaultStyles.row}
              >
                <RowLabel style={isHead && defaultStyles.rowHead}>
                  {column.title}
                </RowLabel>
                <RowValue style={isHead && defaultStyles.rowHead}>
                  {renderValue(source.types[column.index], row[column.index])}
                </RowValue>
              </View>
            );
          });
        })}
      </View>
    );
  }
}

export default stylable('Table')(Table);
