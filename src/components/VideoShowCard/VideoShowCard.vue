<script setup lang="ts">
import { computed } from "vue";
import type { VideoShowCardProps } from "./types";

const {
  title,
  imgURL,
  tag,
  type,
  score,
  episode,
  isRow,
  isColumn,
  isDefault,
  rank,
} = defineProps<VideoShowCardProps>();

const rankBgColor = computed(() => {
  switch (rank) {
    case 1:
      return "red";
    case 2:
      return "#FF752A";
    case 3:
      return "#FFA721";
    default:
      return "#9E9E9E";
  }
});

// 传入title作为参数，避免在追剧周表中不同天数但同一次序下的卡片跳转播放页面时相同标题的问题
async function toPlayingPage(title: string) {
  location.assign(`/playing/${title}`);
}
</script>
<template>
  <div
    class="video-show-card-container"
    :class="{ row: isRow, column: isColumn, default: isDefault }"
    @click="toPlayingPage(title)"
  >
    <div class="img-wrapper">
      <img :src="imgURL" :alt="title" />
      <span v-if="rank" class="rank">
        <p>{{ rank }}</p>
      </span>
      <span v-if="type" class="type">{{ type }}</span>
      <span v-if="tag" class="label">{{ tag }}</span>
      <span v-if="score" class="score">{{ score }}</span>
      <span v-if="episode" class="episodes">{{ episode }}</span>
    </div>
    <div class="video-info-wrapper">
      <div class="title">
        <span>{{ title }}</span>
      </div>
      <div class="watch-percent">
        <!-- <span>看至{{ watchPercent }}集</span> -->
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "./videoShowCard.scss";
.rank {
  background-color: v-bind(rankBgColor);
}
</style>
