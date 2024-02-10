import { defineStore } from "pinia";
import { ref } from "vue";
import useStorage from "@hooks/useStorage";

const useLoginStore = defineStore("loginStore", {
  state: () => {
    const { getStorage } = useStorage();
    // 当token（且有效）和isLogin都存在时，认为已登录
    const isLogin = ref(
      Boolean(getStorage("isLogin")) && Boolean(getStorage("token")),
    );
    const loginedUser = ref(JSON.parse(getStorage("user") || "{}"));
    return {
      isLogin,
      loginedUser,
    };
  },
  actions: {
    setIsLogin(val: boolean) {
      this.isLogin = val;
    },
  },
});

export default useLoginStore;
