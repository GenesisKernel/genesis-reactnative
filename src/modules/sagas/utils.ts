import { pick, pickBy, contains } from 'ramda';
import { Action, AnyAction } from 'typescript-fsa';
import { NavigationAction } from 'react-navigation';

export function waitForRoute(route: string) {
  return (action: NavigationAction) => {
    return (
      action.type.indexOf('Navigation') !== -1 &&
      ((action.routeName && action.routeName === route) ||
        (action.actions &&
          action.actions.find(
            ({ routeName }: { routeName: string }) => route === routeName
          )))
    );
  };
}

export function waitForError() {
  return (action: AnyAction) => {
    return action.type && action.type.indexOf('_FAILED') !== -1;
  };
}

export const resolveParams = (
  values: { [key: string]: any } = {},
  formValues?: { [key: string]: any }
) => {
  const result: { [key: string]: string } = {};
  const keys = Object.keys(values);

  keys.forEach(key => {
    const param = values[key];
    switch (param.type) {
      case 'text':
        result[key] = param.text;
        break;
      case 'Val':
        const inputName = param.params[0];
        const inputValue = formValues && formValues[inputName];
        result[key] = inputValue;
        break;
      default:
        break;
    }
  });

  return result;
};

export const waitForActionWithParams = (
  actionType: string,
  params: string[] = []
) => (action: Action<any>): boolean => {
  return (
    action &&
    action.type === actionType &&
    Object.keys(
      pickBy((value, key) => contains(key, params) && !!value)(action.payload) //@TODO: Find better solution :)
    ).length === params.length
  );
};

const HISTORY_SAGA = Symbol('@@redux-saga/HISTORY');

export const hasHistoryMarker = (action: AnyAction) => action[HISTORY_SAGA];

export const addHistoryMarker = (action: AnyAction) => ({
  [HISTORY_SAGA]: true,
  ...action
});
