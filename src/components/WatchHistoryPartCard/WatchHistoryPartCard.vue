<script setup lang="ts">
import { computed } from "vue";
import type { WatchHistoryPartCardProps } from "./types";

const { imgURL, title, watchPercent, watchTime } =
  defineProps<WatchHistoryPartCardProps>();
// 判断是否为今天
function isToday(time: number | Date) {
  if (typeof time === "number") time = new Date(time);

  const now = new Date();
  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth();
  const todayDate = now.getDate();
  const year = time.getFullYear();
  const month = time.getMonth();
  const date = time.getDate();
  const hour = time.getHours();
  if (
    todayYear === year &&
    todayMonth === month &&
    todayDate === date &&
    hour <= 24
  )
    return true;
  return false;
}
// 格式化观看时间
function formatWatchTime(time: number | Date) {
  if (typeof time === "number") time = new Date(time);

  const date = time.getDate();
  const month = time.getMonth() + 1;
  const hour = time.getHours();
  if (isToday(time)) {
    return `今天  ${hour}:00`;
  } else {
    return `${month}-${date}  ${hour}:00`;
  }
}

// 格式化观看进度
function formatWatchPercent(watchPercent: number) {
  if (watchPercent <= 1) {
    return "观看不足1%";
  } else if (watchPercent > 1 && watchPercent < 99) {
    return `观看至${watchPercent}%`;
  } else {
    return "已看完";
  }
}

const formattedWatchPercent = computed(() => formatWatchPercent(watchPercent));
const formattedWatchTime = computed(() => formatWatchTime(watchTime));
</script>
<template>
  <div class="watch-history-card-container">
    <div class="img-wrapper">
      <img :src="imgURL" :alt="title" />
    </div>
    <div class="watch-infos-wrapper">
      <div class="title">{{ title }}</div>
      <div class="watch-details">
        <span class="watch-percent">{{ formattedWatchPercent }}</span>
        <span class="watch-time">{{ formattedWatchTime }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "./watchHistoryPartCard.scss";
</style>
