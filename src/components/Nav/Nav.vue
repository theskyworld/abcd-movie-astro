<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import useMainStore from "@store";
import Logo from "@components/Logo";
import Search from "@components/Search";
import Profile from "@components/Profile";

const watchHistoryToggleElemRef = ref();
const profileCardToggleElemRef = ref();
const watchHistoryElemRef = ref();
const isShowWatchHistory = ref(false);
const isShowProfileCard = ref(false);
const { isLogin } = storeToRefs(useMainStore());

onMounted(() => {
  watchHistoryToggleElemRef.value.onmouseover = () => {
    isShowWatchHistory.value = true;
  };
  watchHistoryToggleElemRef.value.onmouseleave = () => {
    isShowWatchHistory.value = false;
  };
  if (profileCardToggleElemRef.value) {
    profileCardToggleElemRef.value.onmouseover = () => {
      isShowProfileCard.value = true;
    };
    profileCardToggleElemRef.value.onmouseleave = () => {
      isShowProfileCard.value = false;
    };
  }
});

const imgURL = ref("https://imgapi.xl0408.top/index.php");
</script>
<template>
  <div class="nav-bar-container">
    <div class="left">
      <div class="logo">
        <Logo />
      </div>
      <div class="search">
        <Search />
      </div>
    </div>
    <div class="right">
      <div class="watch-history-wrapper">
        <span ref="watchHistoryToggleElemRef">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-history_line"></use>
          </svg>
          <p>观看记录</p>
        </span>
        <div
          class="watch-history"
          ref="watchHistoryElemRef"
          v-if="isShowWatchHistory"
        >
          <!-- <WatchHistoryPart /> -->
        </div>
      </div>
      <div class="profile-wrapper">
        <span
          @click="useMainStore().setIsInLogin()"
          v-if="!isLogin"
          style="color: var(--color-hover)"
          >登录</span
        >
        <div v-else ref="profileCardToggleElemRef">
          <Profile :imgURL="imgURL" />
        </div>
        <div class="profile-card-wrapper" v-if="isShowProfileCard">
          <!-- <ProfileCard /> -->
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "./nav.scss";
</style>
