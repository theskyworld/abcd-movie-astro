<script setup lang="ts">
import { storeToRefs } from "pinia";
import useMainStore from "@store";
import useAxios from "@hooks/useAxios";
import useStorage from "@hooks/useStorage";
import type { AxiosResponse } from "axios";
import Profile from "@components/Profile";

const mainStore = useMainStore();
const { loginedUser, isLogin } = storeToRefs(mainStore);
const { getStorage, setStorage } = useStorage();
const { post } = useAxios();

function logout() {
  if (isLogin.value) {
    post("/user/logout", null, {
      headers: {
        Authorization: "Bearer " + getStorage("token"),
      },
    })
      .then((res: AxiosResponse) => {
        if (res.status >= 200 && res.status < 300) {
          mainStore.setIsLogin(false);
          // 清空token和user
          setStorage("token", "");
          setStorage("user", "");
          setStorage("isLogin", "false");
          // 展示Notification
          mainStore.setIsShow(true);
        }
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }
}
</script>
<template>
  <div class="profile-card-container">
    <div class="top-wrapper">
      <div class="profile-wrapper">
        <Profile imgURL="https://imgapi.xl0408.top/index.php" />
        <span>{{ loginedUser?.name }}</span>
      </div>
      <div class="log-out-wrapper">
        <button @click="logout">退出登录</button>
      </div>
    </div>
    <div class="bottom-wrapper">
      <div class="personal-center">
        <!-- 添加个人中心iconfont图标 -->
        <i class="iconfont icon-gerenzhongxin"></i>

        <p>个人中心</p>
      </div>
      <div class="personal-center">
        <!-- 添加个人中心iconfont图标 -->
        <i class="iconfont icon-gerenzhongxin"></i>

        <p>个人中心</p>
      </div>
      <div class="personal-center">
        <!-- 添加个人中心iconfont图标 -->
        <i class="iconfont icon-gerenzhongxin"></i>
        <p>个人中心</p>
      </div>
      <div class="personal-center">
        <!-- 添加个人中心iconfont图标 -->
        <i class="iconfont icon-gerenzhongxin"></i>

        <p>个人中心</p>
      </div>
      <div class="personal-center">
        <!-- 添加个人中心iconfont图标 -->
        <i class="iconfont icon-gerenzhongxin"></i>
        <p>个人中心</p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "./profileCard.scss";
</style>
