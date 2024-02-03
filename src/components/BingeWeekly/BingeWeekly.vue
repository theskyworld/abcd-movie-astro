<script setup lang="ts">
import { ref, computed } from "vue";
import type { BingeWeeklyProps } from "./types";
import VideoShowCard from "@components/VideoShowCard";
const { videoTitles, imgURLs, videoTags, videoEpisodes, videoScores } =
  defineProps<BingeWeeklyProps>();

const weeks = [
  { date: "周一" },
  { date: "周二" },
  { date: "周三" },
  { date: "周四" },
  { date: "周五" },
  { date: "周六" },
  { date: "周日" },
];

// 因为星期天，其获取的getDay()值为0,但后续的处理逻辑中需要7
const curDay = ref(new Date().getDay() === 0 ? 7 : new Date().getDay());

// 根据接收到的所有的titles等以及curDay,计算出当前的titles
// 更改curDay可以动态切换当前展示的为哪天的数据
const curVideoTitles = computed(() =>
  videoTitles.slice((curDay.value - 1) * 8, curDay.value * 8),
);

const curImgURLs = computed(() =>
  imgURLs.slice((curDay.value - 1) * 8, curDay.value * 8),
);

const curVideoTags = computed(() =>
  videoTags.slice((curDay.value - 1) * 8, curDay.value * 8),
);

const curVideoEpisodes = computed(() =>
  videoEpisodes.slice((curDay.value - 1) * 8, curDay.value * 8),
);

const curVideoScores = computed(() =>
  videoScores.slice((curDay.value - 1) * 8, curDay.value * 8),
);

// 计算当前的8张卡片中每张卡片中的数据,并用于传递给VideoShowCard
function generateCurVideoShowCardProps(index: number) {
  return {
    title: curVideoTitles.value[index],
    imgURL: curImgURLs.value[index],
    tag: curVideoTags.value[index],
    episode: curVideoEpisodes.value[index],
    score: curVideoScores.value[index],
  };
}

const videoShowCardWrapperElemRef = ref();
const curCardsIndex = ref(1);
const allCardsIndex = ref(Math.ceil(curVideoTitles.value.length / 5));

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
  <div class="binge-weekly-container">
    <div class="header-wrapper">
      <div class="title-wrapper">
        <h3 class="title">追剧周表</h3>
        <span class="show-hidden-cards">
          <!-- 添加向左的图标 -->
          <i @click="hideHiddenCards" class="iconfont icon-left"></i>
          {{ curCardsIndex }} / {{ allCardsIndex }}
          <i @click="showHiddenCards" class="iconfont icon-Right"></i>
        </span>
      </div>
      <div class="weeks-wrapper">
        <ul>
          <li
            :class="{ curDay: index + 1 === curDay }"
            v-for="(week, index) in weeks"
            @click="
              () => {
                curDay = index + 1;
                hideHiddenCards();
              }
            "
            :key="index"
          >
            <span>{{ week.date }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="video-show-card-wrapper" ref="videoShowCardWrapperElemRef">
      <VideoShowCard
        v-for="(i, index) in curVideoTitles.length"
        :key="index"
        :title="generateCurVideoShowCardProps(index).title"
        :imgURL="generateCurVideoShowCardProps(index).imgURL"
        :tag="generateCurVideoShowCardProps(index).tag"
        :episode="generateCurVideoShowCardProps(index).episode"
        :score="generateCurVideoShowCardProps(index).score"
        is-column
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "./bingeWeekly.scss";
</style>
./types
