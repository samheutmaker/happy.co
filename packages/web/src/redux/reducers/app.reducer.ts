import { PurchasePortalActionTypes, PurchasePortalActionCreatorTypes } from '../actions/app.actions';

type PurchasePortalReducerState = {
  intercomEnabled: boolean;
};

function purchasePortalReducerState(): PurchasePortalReducerState {
  return {
    intercomEnabled: false,
  };
}

export default function reducer(state = purchasePortalReducerState(), action: PurchasePortalActionCreatorTypes) {
  return state;
  // const { type, payload } = action;

  // switch (type) {
  //   default:
  //     return state;
  // }
}