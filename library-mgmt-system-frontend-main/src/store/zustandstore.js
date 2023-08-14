import { create } from "zustand";
const useCSRFstore = create((set) => ({
  csrfValue: "",
  setCSRF: (data) =>
    set(() => {
      return { csrfValue: data };
    }),
}));

export { useCSRFstore };
