import { createAction } from "redux-actions";
import { isEmptyString } from "utils/stringUtils";
import {
  createLabelApi,
  fetchAllLabelsApi,
  updateLabelApi,
  deleteLabelApi,
  registerMemoToLabelApi,
  deregisterMemoFromLabelApi,
  fetchMemosByLabelApi
} from "restApi";
import {
  CREATE_LABEL,
  FETCH_ALL_LABELS,
  UPDATE_LABEL,
  DELETE_LABEL,
  PENDING_LABEL,
  FAILURE_LABEL,
  REGISTER_MEMO_TO_LABEL,
  DEREGISTER_MEMO_TO_LABEL
} from "actions/types";
import { fetchMemosByLabelSuccess } from "./memoActions";

export const pendingLabel = createAction(PENDING_LABEL);
export const failureLabel = createAction(FAILURE_LABEL, (error) => error);

export const createLabelSuccess = createAction(CREATE_LABEL, (data) => data);
export const fetchAllLabelsSuccess = createAction(
  FETCH_ALL_LABELS,
  (data) => data
);
export const updateLabelSuccess = createAction(UPDATE_LABEL, (data) => data);
export const deleteLabelSuccess = createAction(DELETE_LABEL, (data) => data);

export const registerMemoToLabelSuccess = createAction(
  REGISTER_MEMO_TO_LABEL,
  (data) => data
);
export const deregisterMemoFromLabelSuccess = createAction(
  DEREGISTER_MEMO_TO_LABEL,
  (data) => data
);

export const createLabel = (title, content) => async (dispatch) => {
  if (isEmptyString(title)) {
    return null;
  }

  dispatch(pendingLabel());
  try {
    const { data } = await createLabelApi(title, content);
    dispatch(createLabelSuccess(data));
  } catch (err) {
    dispatch(failureLabel(err));
  }
};

export const registerMemoToLabel = (labelId, memoId) => async (dispatch) => {
  dispatch(pendingLabel());
  try {
    const { data } = await registerMemoToLabelApi(labelId, memoId);
    dispatch(registerMemoToLabelSuccess(data));
  } catch (err) {
    dispatch(failureLabel(err));
  }
};

export const deregisterMemoFromLabel = (labelId, memoId) => async (
  dispatch
) => {
  dispatch(pendingLabel());
  try {
    const { data } = await deregisterMemoFromLabelApi(labelId, memoId);
    dispatch(deregisterMemoFromLabelSuccess(data));

    const { data: memoData } = await fetchMemosByLabelApi(labelId);
    dispatch(fetchMemosByLabelSuccess(memoData));
  } catch (err) {
    dispatch(failureLabel(err));
  }
};

export const fetchAllLabels = () => async (dispatch) => {
  dispatch(pendingLabel());

  try {
    const { data } = await fetchAllLabelsApi();
    dispatch(fetchAllLabelsSuccess(data));
  } catch (err) {
    dispatch(failureLabel(err));
  }
};

export const updateLabel = (labelId, title) => async (dispatch) => {
  dispatch(pendingLabel());

  try {
    const { data } = await updateLabelApi(labelId, title);
    dispatch(updateLabelSuccess(data));
  } catch (err) {
    dispatch(failureLabel(err));
  }
};

export const deleteLabel = (labelId) => async (dispatch) => {
  dispatch(pendingLabel());

  try {
    const { data } = await deleteLabelApi(labelId);
    dispatch(deleteLabelSuccess(data));
  } catch (err) {
    dispatch(failureLabel(err));
  }
};
