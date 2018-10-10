import * as React from 'react';
import Text from 'components/ui/Text';
import { getTranslations, SUPPORTED_LOCALES } from 'utils/translations';
import { IntlProvider, addLocaleData } from 'react-intl';
import * as ru from 'react-intl/locale-data/ru';
import * as en from 'react-intl/locale-data/en';

interface IIntlProviderComponentProps {
  children?: any[];
  currentLocale?: string;
}

export default class IntlProviderComponent extends React.Component<IIntlProviderComponentProps> {
  public componentWillMount() {
    addLocaleData([...ru, ...en]);
  }

  public render() {
    if (this.props.currentLocale) {
      const locale = this.props.currentLocale.substr(0, 2) || 'en';
      const intlLocale = SUPPORTED_LOCALES.indexOf(locale) === -1 ? 'en' : locale;

      const translations = getTranslations(this.props.currentLocale);

      return (
        <IntlProvider
          locale={intlLocale}
          defaultLocale="en"
          messages={translations}
          textComponent={Text}
        >
          {this.props.children}
        </IntlProvider>
      );
    }
    return null;
  }
}
