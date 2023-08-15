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
  loading: true,
  setBookList: (data) =>
    set((state) => {
      return { loading: state.loading, bookList: data };
    }),
  setBookImportLoading: (isloading) =>
    set((state) => {
      return { bookList: state.bookList, loading: isloading };
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

const useBookData = create((set) => ({
  bookData: [],
  setBookData: (data) =>
    set((state) => {
      return { bookData: data };
    }),
  setDecreaseBookStock: (index) =>
    set((state) => {
      state.bookData[index].stock = state.bookData[index].stock - 1;
      return { bookData: [...state.bookData] };
    }),
  setNewbookData: (data) =>
    set((state) => {
      const index = [];
      const repeatData = state.bookData.map((book) => {
        // console.log("from Zustand data", data);
        const repeatedObj = data.find((el, i) => {
          if (el.isbn == book.isbn) {
            index.push(i);
          }
          return el.isbn == book.isbn;
        });
        // console.log("from Zustand", repeatedObj, book);
        if (repeatedObj) {
          return { ...book, stock: repeatedObj.stock };
        } else return book;
      });
      const newData = data.filter((el, i) => !index.includes(i));
      console.log("from zust", newData);
      return { bookData: [...newData, ...repeatData] };
    }),
}));

export {
  useCSRFstore,
  useSnabarStore,
  useBookImport,
  useMemberStore,
  useBookData,
};
