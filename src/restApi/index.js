import instance from "utils/rest";
import { strfy } from "utils/stringUtils";

const LABEL = "labels";
const MEMO = "memos";

/**
 * Fetch All Data
 */
export const fetchAllLabelsApi = (isPopulated = false) => {
  return instance.get(`/${LABEL}?populate=${isPopulated}`);
};

export const fetchAllMemosApi = () => {
  return instance.get(`/${MEMO}`);
};

/**
 * Label Related
 */
export const createLabelApi = (title, content) => {
  return instance.post(`/${LABEL}`, strfy({ title, content }));
};

export const fetchLabelApi = (labelId) => {
  return instance.get(`/${LABEL}/${labelId}`);
};

export const updateLabelApi = (labelId, title) => {
  return instance.put(`/${LABEL}/${labelId}`, strfy({ title }));
};

export const deleteLabelApi = (labelId) => {
  return instance.delete(`/${LABEL}/${labelId}`);
};

/**
 * Memo Related
 */

/**
 * @todo Add JOI support
 * @todo do we need JSON stringify?
 */
export const createMemoApi = (title, content) => {
  return instance.post(`/${MEMO}`, strfy({ title, content }));
};

export const fetchMemoApi = (memoId) => {
  return instance.get(`/${MEMO}/${memoId}`);
};

export const updateMemoApi = (memoId, title, content) => {
  return instance.put(`/${MEMO}/${memoId}`, strfy({ title, content }));
};

export const fetchMemosByLabelApi = (labelId) => {
  return instance.get(`/${LABEL}/${labelId}`);
};

export const deleteMemoApi = (memoId) => {
  return instance.delete(`/${MEMO}/${memoId}`);
};

/**
 * Memo to Label Related
 */

export const registerMemoToLabelApi = (labelId, memoId) => {
  return instance.post(
    `/${LABEL}/${labelId}/memos`,
    strfy({ memoIds: [memoId] })
  );
};
