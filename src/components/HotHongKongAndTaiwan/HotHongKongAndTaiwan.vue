<script setup lang="ts">
import { ref } from "vue";
import VideoShowCard from "@components/VideoShowCard";
import type { HotHongKongAndTaiwanProps } from "./types";

const { videoTitles, imgURLs, videoEpisodes, videoScores } =
  defineProps<HotHongKongAndTaiwanProps>();

const videoShowCardWrapperElemRef = ref();
const curCardsIndex = ref(1);
const allCardsIndex = ref(Math.ceil(videoTitles.length / 5));

// 控制因数量过多而被隐藏的卡片的显示和隐藏
function showHiddenCards() {
  if (curCardsIndex.value < allCardsIndex.value) {
    curCardsIndex.value += 1;
    videoShowCardWrapperElemRef.value.style.transform =
      "translateX(-" + videoShowCardWrapperElemRef.value.offsetWidth + "px)";
  }
}

function hideHiddenCards() {
  if (curCardsIndex.value > 1) {
    curCardsIndex.value -= 1;
    videoShowCardWrapperElemRef.value.style.transform = "translateX(0px)";
  }
}
</script>
<template>
  <div class="hot-hongkong-and-taiwan-container">
    <div class="header-wrapper">
      <div class="title-wrapper">
        <h3 class="title">热播港台剧</h3>
        <span class="show-hidden-cards">
          <!-- 添加向左的图标 -->
          <i @click="hideHiddenCards()" class="iconfont icon-left"></i>
          {{ curCardsIndex }} / {{ allCardsIndex }}
          <i @click="showHiddenCards()" class="iconfont icon-Right"></i>
        </span>
      </div>
    </div>
    <div class="video-show-card-wrapper" ref="videoShowCardWrapperElemRef">
      <VideoShowCard
        v-for="(i, index) in videoTitles.length"
        :key="index"
        :title="videoTitles[index]"
        :imgURL="imgURLs[index]"
        :episode="videoEpisodes[index]"
        :score="videoScores[index]"
        is-column
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "./hotHongKongAndTaiwan.scss";
</style>
