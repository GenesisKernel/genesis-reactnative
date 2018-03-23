import * as React from 'react';
import Text from 'components/ui/Text';
import { getTranslations } from 'utils/translations';
import { IntlProvider } from 'react-intl';

interface IIntlProviderComponentProps {
  children?: any[];
  currentLocale: string
};

export default class IntlProviderComponent extends React.Component<IIntlProviderComponentProps> {

  public render() {
    const locale = this.props.currentLocale.substr(0, 2) || 'en';
    const translations = getTranslations(this.props.currentLocale);

    return (
      <IntlProvider
        locale={locale}
        defaultLocale="en"
        messages={translations}
        textComponent={Text}>
        {this.props.children}
      </IntlProvider>
    );
  }
}