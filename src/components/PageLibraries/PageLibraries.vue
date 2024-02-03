<script setup lang="ts">
import { ref } from "vue";
import type { PageLibrariesProps } from "./types";
import useAxios from "@hooks/useAxios";
import VideoSelectors from "@components/VideoSelectors";
import VideoShowCard from "@components/VideoShowCard";

const { videoSelectorsData = [], url, tv } = defineProps<PageLibrariesProps>();

const { get } = useAxios();

const page = ref(1);
const kws = ref<string[]>([
  "undefined",
  "undefined",
  "undefined",
  "undefined",
  "undefined",
]);
const datas = ref<unknown>([]);

function changeKws(newKws: Array<string>) {
  kws.value = newKws;
}

// 获取总的数据
datas.value = await get(`${url}?page=${page.value}&kws=${kws.value}`);
</script>
<template>
  <Suspense>
    <div class="page-libraries-container">
      <div class="video-selectors-wrapper">
        <div v-if="tv">hello</div>
        <VideoSelectors
          v-else
          @doChangeKws="changeKws"
          :videoSelectors="videoSelectorsData"
        />
      </div>
      <div class="video-show-card-wrapper">
        <VideoShowCard
          v-for="(i, index) in datas[0].length"
          :key="index"
          :title="datas[0][index]"
          :imgURL="datas[1][index]"
          :score="datas[2][index]"
          :episode="datas[3][index]"
          is-default
        />
      </div>
    </div>
  </Suspense>
</template>
<style scoped lang="scss">
@use "./pageLibraries.scss";
</style>
