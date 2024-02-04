<script setup lang="ts">
import VideoShowCard from "@components/VideoShowCard";
import useAxios from "@hooks/useAxios";
import loadingGif from "@assets/imgs/loading.gif";
import { ref } from "vue";
import type { SearchResPageProps, Data } from ".";
/*********************************导包分界线***************************************/
/* types */

/* macros */
/* props */
const { kw } = defineProps<SearchResPageProps>();
/* emits */
/* datas */

/* datas */
const { get } = useAxios();
let curPage = 0;
let hasMoreRef = ref(false);
const datas = ref<Data[]>([]);
let isLoading = ref(false);

async function getData() {
  isLoading.value = true;
  curPage++;
  const { hasMore, curPageData } = await get(
    `/search?keyword=${kw}&isByClick=false&routeIndex=undefined&perPageNum=undefined&page=${curPage}&episodeIndex=undefined`,
  );
  hasMoreRef.value = hasMore;
  datas.value.push(...curPageData);
  isLoading.value = false;
}

await getData();
/* computed */
/* methods */
</script>
<template>
  <Suspense>
    <div class="search-res-page-container">
      <div class="header-wrapper">
        <p>搜索</p>
        <p class="keyword">"{{ kw }}"</p>
        <p>,为你找到以下结果:</p>
      </div>
      <div class="seperate-line"></div>
      <div class="main-content-wrapper">
        <div class="video-show-card-wrapper">
          <VideoShowCard
            v-for="(data, index) in datas"
            :title="data.title"
            :imgURL="data.videoURL.pic"
            :type="data.type"
            :key="index"
            is-default
            client:visible
          />
        </div>
        <div class="more-button-wrapper" v-if="hasMoreRef">
          <button @click="getData()" :disabled="isLoading">
            <span v-if="!isLoading"> 更多 </span>
            <img v-else :src="loadingGif.src" />
          </button>
        </div>
      </div>
    </div>
  </Suspense>
</template>
<style scoped lang="scss">
@use "./searchResPage.scss";
</style>
