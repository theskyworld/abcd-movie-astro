<script setup lang="ts">
defineOptions({
  name: "LoadingSkeleton",
});
import { ref } from "vue";

// 决定要渲染的skeleton卡片的数量
const cardCount = ref(12);
</script>
<template>
  <div class="loading-skeleton-container">
    <div
      class="video-show-card-wrapper"
      v-for="(i, index) in cardCount"
      :key="index"
    >
      <div class="placeholder img">&nbsp;</div>
      <div class="placeholder title">&nbsp;</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "./loadingSkeleton.scss";
</style>
