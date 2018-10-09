import * as React from 'react';
import * as PropTypes from 'prop-types';
import { View, Text, WebView } from 'react-native';
import { omit } from 'ramda';
import { StyleProvider } from 'react-native-stylable';

import { resolveHandler } from 'components/Protypo';
import Mask from 'components/Mask';
import StaticProtypo from 'components/StaticProtypo';

import DataSource from './utils/DataSource';
import { STATIC_PAGES, STATIC_PAGE } from "../../constants";

import styles from './styles';
import containerStyles from './protypoContainerStyles';

let INNER_ELEMENT_KEY = '';
let counter = 0;

const defaultAttrs = {};

const extractVariants = (className?: string): string[] =>
  className ? className.split(' ') : [];

export function renderElement(
  element: IElement,
  parent?: IElement
): React.ReactNode {
  const Handler = resolveHandler(element.tag);

  const { id, attr, ...tagProps } = element;
  const key = id || `${INNER_ELEMENT_KEY}_${counter++}`;

  if (Handler) {
    return (
      <Handler
        {...tagProps}
        key={key}
        attr={attr || defaultAttrs}
        variant={extractVariants(attr && attr.class)}
        componentKey={key}
      >
        {element.children &&
          element.children.map(child => renderElement(child, element))}
      </Handler>
    );
  }

  return null;
}

interface IProtypoProps {
  id: string;
  payload: IElement[];
  pending: boolean;
  getStaticPage: string;
}

export default class Protypo extends React.PureComponent<IProtypoProps> {
  public static childContextTypes = {
    dataSource: PropTypes.object.isRequired
  };

  private dataSource: DataSource;

  constructor(props: IProtypoProps) {
    super(props);

    this.dataSource = new DataSource();
  }

  public getChildContext() {
    return {
      dataSource: this.dataSource
    };
  }

  public componentDidCatch() {
    console.log('here');
  }

  public renderElement = (element: IElement) => renderElement(element);

  public render() {
    const { getStaticPage, id, payload, pending } = this.props;
    INNER_ELEMENT_KEY = id;

    if (STATIC_PAGES[getStaticPage]) {
      return <StaticProtypo staticPageName={getStaticPage} />;
    }
    if (pending) {
      return (
        <View style={containerStyles.container}>
          <Mask />
        </View>
      );
    }
    return (
      <StyleProvider
        style={containerStyles.container}
        styleSheet={styles}
      >
        <View>{payload.map(this.renderElement)}</View>
      </StyleProvider>
    );
  }
}
