import { createLocalStorage } from "localstorage-ponyfill";

const localStorage = createLocalStorage({
  storeFilePath: "./storage",
});

export default function useStorage() {
  return {
    setStorage: (key: string, value: string) => {
      localStorage.setItem(key, value);
    },
    getStorage: (key: string) => {
      return localStorage.getItem(key);
    },
  };
}
