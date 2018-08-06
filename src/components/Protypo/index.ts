import Div from './Div';
import P from './P';
import Protypo from './Protypo';
import ButtonContainer from 'containers/Protypo/ButtonContainer';
import LinkPageContainer from 'containers/Protypo/LinkPageContainer';
import Data from './Data';
import DBFind from './DBFind';
import Em from './Em';
import Form from './Form';
// import Image from './Image';
import Input from './Input';
import InputError from './InputError';
import InputImage from './InputImage';
import Label from './Label';
import Span from './Span';
import Text from './Text';
import Strong from './Strong';
import Table from './Table';
import Select from './Select';
import Title from 'containers/Protypo/TitleContainer';
import RadioGroup from './RadioGroup';
import * as constatns from './constants';
import ImageContainer from 'containers/Protypo/ImageContainer';

type ProtypoComponent = React.Component<any> | React.SFC<any>;

const handlers: { [tag: string]: ProtypoComponent } = {
  [constatns.TAG_DIV]: Div,
  [constatns.TAG_P]: P,
  [constatns.TAG_SPAN]: Span,
  [constatns.TAG_EM]: Em,
  [constatns.TAG_LABEL]: Label,
  [constatns.TAG_STRONG]: Strong,
  [constatns.TAG_TEXT]: Text,
  [constatns.TAG_IMAGE]: ImageContainer,
  [constatns.TAG_FORM]: Form,
  [constatns.TAG_BUTTON]: ButtonContainer,
  [constatns.TAG_LINK_PAGE]: LinkPageContainer,
  [constatns.TAG_INPUT]: Input,
  [constatns.TAG_INPUT_IMAGE]: InputImage,
  [constatns.TAG_INPUT_ERROR]: InputError,
  [constatns.TAG_RADIO_GROUP]: RadioGroup,
  [constatns.TAG_DATA]: Data,
  [constatns.TAG_TABLE]: Table,
  [constatns.TAG_DBFIND]: DBFind,
  [constatns.TAG_SELECT]: Select,
  [constatns.FUNCTION_SET_TITLE]: Title
};

export const resolveHandler = (tag: string): ProtypoComponent => {
  return handlers[tag];
};

export default Protypo;
