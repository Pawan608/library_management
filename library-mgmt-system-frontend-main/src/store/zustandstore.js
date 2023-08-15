import { create } from "zustand";
const useCSRFstore = create((set) => ({
  csrfValue: "",
  setCSRF: (data) =>
    set(() => {
      return { csrfValue: data };
    }),
}));

const useSnabarStore = create((set) => ({
  message: "",
  status: "",
  openSnackbar: false,
  setSuccess: (message) =>
    set(() => {
      return { message: message, status: "success", openSnackbar: true };
    }),
  setError: (message) =>
    set(() => {
      return { message: message, status: "error", openSnackbar: true };
    }),
  setCloseSnackbar: () =>
    set(() => {
      return { message: "", status: "", openSnackbar: false };
    }),
}));

const useBookImport = create((set) => ({
  bookList: [],
  setBookList: (data) =>
    set(() => {
      return { bookList: data };
    }),
}));

const useMemberStore = create((set) => ({
  members: [],
  setMember: (data) =>
    set(() => {
      return { members: data };
    }),
  setNewMember: (data) =>
    set((state) => {
      return {
        members: [...state.members, { ...data, debt: 0, current_issue: 0 }],
      };
    }),
}));

export { useCSRFstore, useSnabarStore, useBookImport, useMemberStore };
