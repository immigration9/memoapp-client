import axios from "axios";
import { createAction } from "redux-actions";
import {
  createMemoApi,
  updateMemoApi,
  fetchMemoApi,
  fetchAllMemosApi,
  deleteMemoApi,
  fetchMemosByLabelApi
} from "restApi";
import {
  CREATE_MEMO,
  UPDATE_MEMO,
  FETCH_MEMOS_BY_LABEL,
  DELETE_MEMO,
  PENDING_MEMO,
  FAILURE_MEMO,
  FETCH_ALL_MEMOS
} from "actions/types";
import { registerMemoToLabel } from "./labelActions";
import { message } from "antd";

export const pendingMemo = createAction(PENDING_MEMO);
export const failureMemo = createAction(FAILURE_MEMO, (error) => error);

export const createMemoSuccess = createAction(CREATE_MEMO, (data) => data);
export const fetchAllMemosSuccess = createAction(
  FETCH_ALL_MEMOS,
  (data) => data
);
export const fetchMemosByLabelSuccess = createAction(
  FETCH_MEMOS_BY_LABEL,
  (data) => data
);
export const updateMemosSuccess = createAction(UPDATE_MEMO, (data) => data);
export const deleteMemoSuccess = createAction(DELETE_MEMO, (data) => data);

export const createMemo = (title, content, labelId) => async (dispatch) => {
  dispatch(pendingMemo());

  try {
    const data = await createMemoApi(title, content);
    dispatch(createMemoSuccess(data));

    /**
     * All이 아니라면, 해당 Label에도 Memo 등록을 진행해야 한다.
     */
    if (labelId !== "all") {
      dispatch(registerMemoToLabel(labelId, data.data._id));
    }
  } catch (err) {
    dispatch(failureMemo(err));
  }
};

export const fetchAllMemos = () => async (dispatch) => {
  dispatch(pendingMemo());

  try {
    const data = await fetchAllMemosApi();
    dispatch(fetchAllMemosSuccess(data));
  } catch (err) {
    dispatch(failureMemo(err));
  }
};

export const fetchMemosByLabel = (labelId) => async (dispatch) => {
  dispatch(pendingMemo());

  try {
    const data = await fetchMemosByLabelApi(labelId);
    dispatch(fetchMemosByLabelSuccess(data));
  } catch (err) {
    dispatch(failureMemo(err));
  }
};

export const updateMemo = (memoId, title, content) => async (dispatch) => {
  dispatch(pendingMemo());

  try {
    const data = await updateMemoApi(memoId, title, content);
    dispatch(updateMemosSuccess(data));
    message.info("메모가 저장되었습니다");
  } catch (err) {
    dispatch(failureMemo(err));
  }
};

export const deleteMemo = (memoId, labelId) => async (dispatch) => {
  dispatch(pendingMemo());
  try {
    const data = await deleteMemoApi(memoId);
    dispatch(deleteMemoSuccess(data));

    /**
     * @todo
     */
    // dispatch(deleteMemoReference(memoId));
  } catch (err) {
    dispatch(failureMemo(err));
  }
};
