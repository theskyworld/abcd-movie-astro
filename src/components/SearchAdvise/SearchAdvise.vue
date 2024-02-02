<script setup lang="ts">
import { computed } from "vue";
import useAxios from "../../hooks/useAxios";
import type { SearchHotData } from "./types";
const { get } = useAxios();
const searchHotData: SearchHotData = await get("search/hot");

const searchAdvisers = computed(() => {
  if (searchHotData) {
    return searchHotData.map((data: string, index: number) => {
      return {
        id: index + 1 + "",
        content: data,
        isHot: index < 4,
      };
    });
  } else {
    return [];
  }
});
</script>
<template>
  <div class="search-advise-container">
    <h5>大家都在搜</h5>
    <!-- TODO增加请求数据完成前的loading展示逻辑 -->
    <div class="content-wrapper">
      <ul v-if="searchAdvisers.length > 0">
        <li
          v-for="{ id, content, isHot } in searchAdvisers"
          :key="id"
          :class="{ hot: isHot }"
        >
          <i class="iconfont icon-hot"></i>
          <span>{{ content }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "./searchAdvise.scss";
</style>
