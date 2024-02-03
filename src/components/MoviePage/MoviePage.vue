<script setup lang="ts">
import { computed, ref } from "vue";
import PageHome from "@components/PageHome";
import type { VideoSelectorData } from "@components/VideoSelectors";
import PageLibraries from "@components/PageLibraries";

const activedTitle = ref("电影首页");

const thisYear = new Date().getFullYear();
const movieSelectors = ref<Array<VideoSelectorData>>([
  {
    title: "剧情",
    content: [
      {
        key: "1",
        name: "全部",
      },
      {
        key: "2",
        name: "Netflix",
      },
      {
        key: "3",
        name: "仙侠",
      },
      {
        key: "4",
        name: "剧情",
      },
      {
        key: "5",
        name: "科幻",
      },
      {
        key: "6",
        name: "动作",
      },
      {
        key: "7",
        name: "喜剧",
      },
      {
        key: "8",
        name: "爱情",
      },
      {
        key: "9",
        name: "冒险",
      },
      {
        key: "10",
        name: "儿童",
      },
      {
        key: "11",
        name: "歌舞",
      },
      {
        key: "12",
        name: "音乐",
      },
      {
        key: "13",
        name: "奇幻",
      },
      {
        key: "14",
        name: "动画",
      },
      {
        key: "15",
        name: "恐怖",
      },
      {
        key: "16",
        name: "惊悚",
      },
      {
        key: "17",
        name: "丧尸",
      },
      {
        key: "18",
        name: "战争",
      },
      {
        key: "19",
        name: "传记",
      },
      {
        key: "20",
        name: "犯罪",
      },
    ],
  },
  {
    title: "地区",
    content: [
      {
        key: "1",
        name: "全部",
      },
      {
        key: "2",
        name: "大陆",
      },
      {
        key: "3",
        name: "香港",
      },
      {
        key: "4",
        name: "台湾",
      },
      {
        key: "5",
        name: "美国",
      },
      {
        key: "6",
        name: "日本",
      },
      {
        key: "7",
        name: "韩国",
      },
      {
        key: "8",
        name: "英国",
      },
      {
        key: "9",
        name: "法国",
      },
      {
        key: "10",
        name: "德国",
      },
      {
        key: "11",
        name: "印度",
      },
      {
        key: "12",
        name: "泰国",
      },
      {
        key: "13",
        name: "丹麦",
      },
      {
        key: "14",
        name: "瑞典",
      },
      {
        key: "15",
        name: "巴西",
      },
    ],
  },
  {
    title: "语言",
    content: [
      {
        key: "1",
        name: "全部",
      },
      {
        key: "2",
        name: "英语",
      },
      {
        key: "3",
        name: "法语",
      },
      {
        key: "4",
        name: "国语",
      },
      {
        key: "5",
        name: "粤语",
      },
      {
        key: "6",
        name: "日语",
      },
      {
        key: "7",
        name: "韩语",
      },
      {
        key: "8",
        name: "泰语",
      },
      {
        key: "9",
        name: "德语",
      },
      {
        key: "10",
        name: "俄语",
      },
      {
        key: "11",
        name: "闽南语",
      },
      {
        key: "12",
        name: "丹麦语",
      },
      {
        key: "13",
        name: "波兰语",
      },
      {
        key: "14",
        name: "瑞典语",
      },
    ],
  },
  {
    title: "年份",
    content: [
      {
        key: "1",
        name: "全部",
      },
      {
        key: "2",
        name: `${thisYear}`,
      },
      {
        key: "3",
        name: `${thisYear - 1}`,
      },
      {
        key: "4",
        name: `${thisYear - 2}`,
      },
      {
        key: "5",
        name: `${thisYear - 3}`,
      },
      {
        key: "6",
        name: `${thisYear - 4}`,
      },
      {
        key: "7",
        name: `${thisYear - 5}`,
      },
      {
        key: "8",
        name: `${thisYear - 6}`,
      },
      {
        key: "9",
        name: `${thisYear - 7}`,
      },
      {
        key: "10",
        name: `${thisYear - 8}`,
      },
      {
        key: "11",
        name: `${thisYear - 9}`,
      },
      {
        key: "12",
        name: `${thisYear - 10}`,
      },
      {
        key: "13",
        name: `${thisYear - 11}`,
      },
      {
        key: "14",
        name: `${thisYear - 12}`,
      },
      {
        key: "15",
        name: `${thisYear - 13}`,
      },
      {
        key: "16",
        name: `${thisYear - 14}`,
      },
      {
        key: "17",
        name: `${thisYear - 15}`,
      },
    ],
  },
  {
    title: "排序",
    content: [
      {
        key: "1",
        name: "时间排序",
      },
      {
        key: "2",
        name: "人气排序",
      },
      {
        key: "3",
        name: "评分排序",
      },
    ],
  },
]);

const showHome = computed(() => {
  return activedTitle.value === "电影首页";
});

function changeActivedTitle(title: string) {
  activedTitle.value = title;
}
</script>
<template>
  <Suspense>
    <div class="movie-page-container">
      <div class="title-wrapper">
        <h2
          :class="{ active: activedTitle === '电影首页' }"
          @click="changeActivedTitle('电影首页')"
        >
          电影首页
        </h2>
        <!-- 分割线 -->
        <div class="separator"></div>
        <h2
          :class="{ active: activedTitle === '电影库' }"
          @click="changeActivedTitle('电影库')"
        >
          电影库
        </h2>
      </div>
      <div class="content-wrapper">
        <div v-if="showHome">
          <PageHome url="/movie/movie-home" :tag="true" />
        </div>
        <div v-else>
          <PageLibraries
            url="/movie/movie-libraries"
            :videoSelectorsData="movieSelectors"
          />
        </div>
      </div>
    </div>
  </Suspense>
</template>
<style scoped lang="scss">
@use "./moviePage.scss";
</style>
