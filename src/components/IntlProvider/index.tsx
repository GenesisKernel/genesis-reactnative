import * as React from 'react';
import Text from 'components/ui/Text';
import { IntlProvider } from 'react-intl';

interface IIntlProviderComponentProps {
  children?: any[];
  currentLocale?: string
};

export default class IntlProviderComponent extends React.Component<IIntlProviderComponentProps> {

  public render() {
    const locale = this.props.currentLocale ? this.props.currentLocale.substr(0, 2) : 'en';
    return (
      <IntlProvider
        locale={locale}
        defaultLocale="en"
        textComponent={Text}>
        {this.props.children}
      </IntlProvider>
    );
  }
}