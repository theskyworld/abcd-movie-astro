import { defineStore } from "pinia";
import { ref } from "vue";

const useNavStore = defineStore("navStore", {
  state: () => {
    const isInLogin = ref(false);
    return {
      isInLogin,
    };
  },

  actions: {
    setIsInLogin() {
      this.isInLogin = !this.isInLogin;
    },
  },
});

export default useNavStore;
