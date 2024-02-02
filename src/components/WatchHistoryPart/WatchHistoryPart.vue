<script setup lang="ts">
import { ref } from "vue";
import WatchHistoryPartCard from "@components/WatchHistoryPartCard";
const watchedVideos = ref([
  {
    id: "1",
    imgURL: "https://m.ykimg.com/0541010160F63EBA04CD829CF4BB9E9C",
    title: "神话12",
    watchTime: new Date(),
    watchPercent: 12,
  },
  {
    id: "2",
    imgURL: "https://m.ykimg.com/0541010160F63EBA04CD829CF4BB9E9C",
    title: "神话12",
    watchTime: new Date(),
    watchPercent: 12,
  },
  {
    id: "3",
    imgURL: "https://m.ykimg.com/0541010160F63EBA04CD829CF4BB9E9C",
    title: "神话12",
    watchTime: new Date(),
    watchPercent: 12,
  },
  {
    id: "4",
    imgURL: "https://m.ykimg.com/0541010160F63EBA04CD829CF4BB9E9C",
    title: "神话12",
    watchTime: new Date(),
    watchPercent: 12,
  },
  {
    id: "5",
    imgURL: "https://m.ykimg.com/0541010160F63EBA04CD829CF4BB9E9C",
    title: "神话12",
    watchTime: new Date(),
    watchPercent: 12,
  },
]);
</script>
<template>
  <div class="watch-history-container">
    <div class="left-line"></div>
    <div class="right-content-wrapper">
      <div class="title-wrapper">
        <i class="iconfont icon-history"></i>
        <h5>观看历史</h5>
      </div>
      <div class="main-content-wrapper">
        <ul v-if="watchedVideos.length">
          <li
            v-for="{
              id,
              imgURL,
              title,
              watchTime,
              watchPercent,
            } in watchedVideos"
            :key="id"
          >
            <WatchHistoryPartCard
              :id="id"
              :imgURL="imgURL"
              :title="title"
              :watchTime="watchTime"
              :watchPercent="watchPercent"
            />
          </li>
        </ul>
        <div class="no-video" v-else>暂无记录</div>
      </div>
    </div>
    <div class="bottom-btn-wrapper">
      <button v-if="watchedVideos.length">查看更多</button>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "./watchHistoryPart.scss";
</style>
