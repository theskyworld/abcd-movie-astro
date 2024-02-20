<script setup lang="ts">
import { ref, watch } from "vue";
import verifyImg from "@assets/imgs/verify.jpg";
import useAxiso from "@hooks/useAxios";
// import Notification from "../notification/Notification.vue";
import type { AxiosResponse } from "axios";
import SlideVerify from "vue3-slide-verify";
import type { SlideVerifyInstance } from "vue3-slide-verify";
import "vue3-slide-verify/dist/style.css";
import useStorage from "@hooks/useStorage";
import throttle from "lodash/throttle";
import useMainStore from "@store";
import { storeToRefs } from "pinia";

const { setStorage } = useStorage();
const { isInLogin } = storeToRefs(useMainStore());

const { post } = useAxiso();
const isLoginDisabled = ref(false);
const isRegisterDisabled = ref(false);
const isRegister = ref(false);
const isLogin = ref(true);
const isEmailLoginValid = ref(true);
const isPasswordLoginValid = ref(true);
const isEmailRegisterValid = ref(true);
const isPasswordRegisterValid = ref(true);
const isUsernameValid = ref(true);
const emailLoginVal = ref("");
const passwordLoginVal = ref("");
const emailMessage = ref("请输入合法的邮箱地址");
const passwordMessage = ref(
  "密码长度应当至少8位,且包含大小写字母、数字和特殊符号",
);
const emailRegisterVal = ref("");
const passwordRegisterVal = ref("");
const usernameVal = ref("");
const usernameMessage = ref("用户名为必填项");

const curActive = ref("login");

const text = ref("向右滑动");
const msg = ref("");
const bgImgs = ref([verifyImg.src]);
const slideVerifyInstance = ref<SlideVerifyInstance>();
const accuracy = ref(3);
const isVerifing = ref(false);
const verifyTarget = ref("");

interface BackError {
  response: {
    data: {
      err: {
        message: string;
      };
    };
  };
}

function onAgain() {
  msg.value = "再试一次";
  slideVerifyInstance.value?.refresh();
}
function onSuccess(times: number) {
  msg.value = `验证通过,耗时${(times / 1000).toFixed(1)}s,${
    verifyTarget.value === "login" ? "登录中" : "注册中"
  }...`;
  setTimeout(() => {
    if (verifyTarget.value === "login") {
      login();
    } else if (verifyTarget.value === "register") {
      register();
    }
    isVerifing.value = false;
  }, 1000);
}
function onFail() {
  msg.value = "验证失败";
}
function validateEmail(email: string) {
  const reg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(email);
}
function validatePassword(password: string) {
  return (
    password.length >= 8 &&
    Boolean(password.match(/[a-z]/)) &&
    Boolean(password.match(/[A-Z]/)) &&
    Boolean(password.match(/[0-9]/)) &&
    Boolean(
      password.match(
        /[`~!@#$%^&*()_\-+=<>?:"{}|,.;'\\[\]·！#￥（——）：；“”‘、，|《。》？、【】[\]]/,
      ),
    )
  );
}
function validateUsername(username: string) {
  return username.length > 0;
}

function toLogin() {
  isLogin.value = true;
  isRegister.value = false;
  curActive.value = "login";
  // 清空输入框
  emailRegisterVal.value = "";
  passwordRegisterVal.value = "";
  usernameVal.value = "";
  // 重置有效值
  isEmailLoginValid.value = true;
  isPasswordLoginValid.value = true;
}
function toRegister() {
  isRegister.value = true;
  isLogin.value = false;
  curActive.value = "register";
  // 清空输入框
  emailLoginVal.value = "";
  passwordLoginVal.value = "";
  // 重置有效值
  isEmailRegisterValid.value = true;
  isPasswordRegisterValid.value = true;
  isUsernameValid.value = true;
}

function showNotification(content: string, type: string) {
  // // 将Notification组件挂载到body上
  // const notificationContainerElem = document.createElement("div");
  // notificationContainerElem.style.position = "absolute";
  // notificationContainerElem.style.top = "0";
  // notificationContainerElem.style.left = "50%";
  // notificationContainerElem.style.zIndex = "10000";
  // const app = createApp(Notification, {
  //   content,
  //   type,
  // });
  // app.mount(notificationContainerElem);
  // // 添加到body最前面
  // document.body.prepend(notificationContainerElem);
  console.log(content, type);
}

function register() {
  if (
    isEmailRegisterValid.value &&
    isPasswordRegisterValid.value &&
    isUsernameValid.value &&
    emailRegisterVal.value &&
    passwordRegisterVal.value &&
    usernameVal.value
  ) {
    isRegisterDisabled.value = true;
    post("user/register", {
      username: usernameVal.value,
      email: emailRegisterVal.value,
      password: passwordRegisterVal.value,
    })
      .then((res: AxiosResponse) => {
        if (res.status >= 200 && res.status < 300) {
          showNotification("注册成功,即将前往登录", "success");
          // 为登录界面中的邮箱地址和密码填值
          emailLoginVal.value = emailRegisterVal.value;
          passwordLoginVal.value = passwordRegisterVal.value;
          isRegisterDisabled.value = false;
          // 前往登录
          setTimeout(toLogin, 3000);
        }
      })
      .catch((err) => {
        showNotification(err.response.data.err.message, "error");
        isRegisterDisabled.value = false;
      });
  }
}

function login() {
  if (
    isEmailLoginValid.value &&
    isPasswordLoginValid.value &&
    emailLoginVal.value &&
    passwordLoginVal.value
  ) {
    isLoginDisabled.value = true;
    post("user/login", {
      email: emailLoginVal.value,
      password: passwordLoginVal.value,
    })
      .then((res: AxiosResponse) => {
        if (res.status >= 200 && res.status < 300) {
          showNotification("登录成功", "success");
          // 在本地存储token
          setStorage("token", res.data.token);
          // 存储user
          setStorage("user", JSON.stringify(res.data.user));
          // 设置为已登录
          setStorage("isLogin", "true");
          isLoginDisabled.value = false;
          useMainStore().setIsLogin(false);
          // 将登录卡片隐藏
          useMainStore().setIsInLogin();
          // 刷新首页
          location.reload();
        }
      })
      .catch((err: BackError) => {
        showNotification(err.response.data.err.message, "error");
        isLoginDisabled.value = false;
      });
  }
}
function verify(target: string) {
  if (
    (isEmailLoginValid.value &&
      isPasswordLoginValid.value &&
      emailLoginVal.value &&
      passwordLoginVal.value) ||
    (isEmailRegisterValid.value &&
      isPasswordRegisterValid.value &&
      isUsernameValid.value &&
      emailRegisterVal.value &&
      passwordRegisterVal.value &&
      usernameVal.value)
  ) {
    isVerifing.value = true;
    if (target === "login") {
      isLoginDisabled.value = true;
      verifyTarget.value = "login";
    } else if (target === "register") {
      isRegisterDisabled.value = true;
      verifyTarget.value = "register";
    }
  }
}

const throttledVerify = throttle(verify, 3000, { leading: true });

watch(emailLoginVal, () => {
  isEmailLoginValid.value = validateEmail(emailLoginVal.value);
});
watch(passwordLoginVal, () => {
  isPasswordLoginValid.value = validatePassword(passwordLoginVal.value);
});
watch(emailRegisterVal, () => {
  isEmailRegisterValid.value = validateEmail(emailRegisterVal.value);
});
watch(passwordRegisterVal, () => {
  isPasswordRegisterValid.value = validatePassword(passwordRegisterVal.value);
});
watch(usernameVal, () => {
  isUsernameValid.value = validateUsername(usernameVal.value);
});
</script>
<template>
  <div class="login-card-container" v-if="isInLogin">
    <div class="column" :class="{ image: curActive !== 'login' }">
      <div class="guide" v-if="!isLogin">
        <h1>登录</h1>
        <p>使用邮箱和密码登录</p>
        <button @click="toLogin">登录</button>
      </div>
      <div class="login" v-else>
        <h1>登录</h1>
        <form>
          <div class="form-item">
            <input
              type="email"
              v-model="emailLoginVal"
              class="form-element"
              placeholder="邮箱"
            />
            <div v-show="!isEmailLoginValid" class="message">
              {{ emailMessage }}
            </div>
          </div>
          <div class="form-item">
            <input
              type="password"
              class="form-element"
              placeholder="密码"
              v-model="passwordLoginVal"
            />
            <div class="message" v-show="!isPasswordLoginValid">
              {{ passwordMessage }}
            </div>
          </div>
          <div class="flex">
            <button
              :disabled="isLoginDisabled"
              @click="throttledVerify('login')"
              type="button"
            >
              登录
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="column" :class="{ image: curActive !== 'register' }">
      <div class="guide" v-if="!isRegister">
        <h1>注册</h1>
        <p>如果还没有账号,在这里进行注册</p>
        <button @click="toRegister">注册</button>
      </div>
      <div class="register" v-else>
        <h1>注册</h1>
        <form>
          <div class="form-item">
            <input
              type="text"
              v-model="usernameVal"
              class="form-element"
              placeholder="请输入用户名"
            />
            <div v-show="!isUsernameValid" class="message">
              {{ usernameMessage }}
            </div>
          </div>
          <div class="form-item">
            <input
              type="email"
              v-model="emailRegisterVal"
              class="form-element"
              placeholder="请输入邮箱"
            />
            <div v-show="!isEmailRegisterValid" class="message">
              {{ emailMessage }}
            </div>
          </div>
          <div class="form-item">
            <input
              type="password"
              class="form-element"
              placeholder="请输入密码"
              v-model="passwordRegisterVal"
            />
            <div v-show="!isPasswordRegisterValid" class="message">
              {{ passwordMessage }}
            </div>
          </div>
          <div class="flex">
            <button
              :disabled="isRegisterDisabled"
              type="button"
              @click="throttledVerify('register')"
            >
              注册
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="verify-wrapper" v-if="isVerifing">
      <slide-verify
        class="silde_box"
        ref="slideVerifyInstance"
        :slider-text="text"
        :accuracy="accuracy"
        @again="onAgain"
        @success="onSuccess"
        @fail="onFail"
        :imgs="bgImgs"
      ></slide-verify>
      <div class="msg">{{ msg }}</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "./loginCard.scss";
</style>
