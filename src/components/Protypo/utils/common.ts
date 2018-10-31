import { isEmpty } from 'ramda';
import { INTERACTIONS } from "../../../constants";

export function getInteractions(attr?: { [key: string]: any }): IInteractions | undefined {
  let interactions: IInteractions = {};
  if (attr) {
    for(let key of INTERACTIONS) {
      if (attr[key]) {
        interactions[key] = attr[key];
      }
    }
  }
  if (!isEmpty(interactions)) {
    return interactions;
  };
}
