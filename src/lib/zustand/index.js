import { create } from "zustand";

export const useAppStore = create((set) => {
  return {
    filter: "",
    invoices: [],
    themes: ["default", "rose", "blue"],
    items: [],
    setInvoices(invoices) {
      return set((state) => {
        return { invoices };
      });
    },
    setFilter(value) {
      return set(() => {
        return { filter: value };
      });
    },
    setItems(items) {
      return set(() => {
        return { items };
      });
    },
  };
});
