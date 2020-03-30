import { handleActions } from "redux-actions";

import {
  CREATE_MEMO,
  DELETE_MEMO,
  UPDATE_MEMO,
  FETCH_ALL_MEMOS,
  FETCH_MEMOS_BY_LABEL,
  FETCH_ALL_MEMOS_COUNT,
  PENDING_MEMO,
  FAILURE_MEMO
} from "actions/types";

export const memoInitialState = {
  memos: [],
  memosCount: 0,
  pending: false,
  failure: false
};

export default handleActions(
  {
    [FETCH_ALL_MEMOS]: (state, { payload }) => {
      return {
        ...state,
        memos: payload.data,
        pending: false,
        failure: false
      };
    },
    [FETCH_ALL_MEMOS_COUNT]: (state, { payload }) => {
      return {
        ...state,
        memosCount: payload.data,
        pending: false,
        failure: false
      };
    },
    [FETCH_MEMOS_BY_LABEL]: (state, { payload }) => {
      return {
        ...state,
        memos: payload.data || [],
        pending: false,
        failure: false
      };
    },
    [CREATE_MEMO]: (state, { payload }) => {
      return {
        ...state,
        memos: state.memos.concat(payload.data),
        pending: false,
        failure: false
      };
    },
    [DELETE_MEMO]: (state, { payload }) => {
      return {
        ...state,
        memos: state.memos.filter((memo) => {
          return memo.id !== payload.data.id;
        }),
        pending: false,
        failure: false
      };
    },
    [UPDATE_MEMO]: (state, { payload }) => {
      return {
        ...state,
        memos: state.memos.map((memo) => {
          if (memo.id === payload.data.id) {
            return { ...payload.data };
          }
          return memo;
        }),
        pending: false,
        failure: false
      };
    },
    [PENDING_MEMO]: (state, { payload }) => {
      return { ...state, pending: true, failure: false };
    },
    [FAILURE_MEMO]: (state, { payload }) => {
      return { ...state, pending: false, failure: true };
    }
  },
  memoInitialState
);
