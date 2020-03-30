import { handleActions } from "redux-actions";

import {
  CREATE_LABEL,
  DELETE_LABEL,
  UPDATE_LABEL,
  FETCH_ALL_LABELS,
  FETCH_LABEL,
  PENDING_LABEL,
  FAILURE_LABEL,
  REGISTER_MEMO_TO_LABEL,
  DEREGISTER_MEMO_TO_LABEL
} from "actions/types";

export const labelInitialState = {
  labels: [],
  selectedLabel: undefined,
  pending: false,
  failure: false
};

export default handleActions(
  {
    [FETCH_ALL_LABELS]: (state, { payload }) => {
      return {
        ...state,
        labels: payload.data,
        pending: false,
        failure: false
      };
    },
    [CREATE_LABEL]: (state, { payload }) => {
      return {
        ...state,
        labels: state.labels.concat(payload.data),
        pending: false,
        failure: false
      };
    },
    [DELETE_LABEL]: (state, { payload }) => {
      return {
        ...state,
        labels: state.labels.filter((lbl) => {
          return lbl.id !== payload.data.id;
        }),
        pending: false,
        failure: false
      };
    },
    [UPDATE_LABEL]: (state, { payload }) => {
      return {
        ...state,
        labels: state.labels.map((lbl) => {
          if (lbl.id === payload.data.id) {
            return { ...payload.data };
          }
          return lbl;
        }),
        pending: false,
        failure: false
      };
    },
    [FETCH_LABEL]: (state, { payload }) => {
      return state;
    },
    [REGISTER_MEMO_TO_LABEL]: (state, { payload }) => {
      return {
        ...state,
        labels: state.labels.map((lbl) => {
          if (lbl.id === payload.data.id) {
            return { ...payload.data };
          }
          return lbl;
        }),
        pending: false,
        failure: false
      };
    },
    [DEREGISTER_MEMO_TO_LABEL]: (state, { payload }) => {
      return {
        ...state,
        labels: state.labels.map((lbl) => {
          if (lbl.id === payload.data.id) {
            return { ...payload.data };
          }
          return lbl;
        }),
        pending: false,
        failure: false
      };
    },
    [PENDING_LABEL]: (state, { payload }) => {
      return { ...state, pending: true, failure: false };
    },
    [FAILURE_LABEL]: (state, { payload }) => {
      return { ...state, pending: false, failure: true };
    }
  },
  labelInitialState
);
