import {
  NavigationActions,
  NavigationNavigateActionPayload
} from 'react-navigation';

export const navigate = (routeName: string, params = {}) =>
  NavigationActions.navigate({ routeName, params });

export const navigateWithReset = (
  routes: NavigationNavigateActionPayload[] = []
) => {
  return NavigationActions.reset({
    index: 0,
    actions: routes.map(route => NavigationActions.navigate(route))
  });
};

export const back = () => NavigationActions.back();
