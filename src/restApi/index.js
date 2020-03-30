import instance from "utils/rest";
import { strfy } from "utils/stringUtils";

const LABEL = "labels";
const MEMO = "memos";

/**
 * Fetch All Data
 */
export const fetchAllLabelsApi = () => {
  return instance.get(`/${LABEL}`);
};

export const fetchAllMemosApi = (countOnly = false) => {
  return instance.get(`/${MEMO}${countOnly ? "?countOnly=" + countOnly : ""}`);
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

export const fetchLabelsByMemoApi = (memoId) => {
  return instance.get(`/${MEMO}/${memoId}/${LABEL}`);
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
  return instance.get(`/${LABEL}/${labelId}/${MEMO}`);
};

export const deleteMemoApi = (memoId) => {
  return instance.delete(`/${MEMO}/${memoId}`);
};

/**
 * Memo to Label Related
 */

export const registerMemoToLabelApi = (labelId, memoIds) => {
  return instance.post(
    `/${LABEL}/${labelId}/memos`,
    strfy({ memoIds: Array.isArray(memoIds) ? memoIds : [memoIds] })
  );
};

export const deregisterMemoFromLabelApi = (labelId, memoId) => {
  return instance.post(
    `/${LABEL}/${labelId}/memos/delete`,
    strfy({ memoIds: [memoId] })
  );
};
