<script setup lang="ts">
import type { PageHomeProps, Data } from "./types";
import { computed, ref } from "vue";
import VideoShowCard from "@components/VideoShowCard";
import useAxios from "@hooks/useAxios";

const { get } = useAxios();
const { url, episode, tag } = defineProps<PageHomeProps>();

const homeDatas = ref<Data>();
const newDatas = ref<Data>();
const rankDatas = ref<Data>();
const updateDatas = ref<Data>();
const dayRankDatas = ref<Data>();
const weekRankDatas = ref<Data>();
const monthRankDatas = ref<Data>();

const curRank = ref("日榜");
// 返回当前为日榜/周榜或月榜的数据
const curRankDatas = computed(() => {
  switch (curRank.value) {
    case "日榜":
      return dayRankDatas.value;
    case "周榜":
      return weekRankDatas.value;
    case "月榜":
      return monthRankDatas.value;
    default:
      return dayRankDatas.value;
  }
});

// 获取总的数据
const datas = await get(url);

// 划分分类数据
homeDatas.value = datas[0];
newDatas.value = datas[1];
rankDatas.value = datas[2];
updateDatas.value = datas[3];

dayRankDatas.value = {
  videoTitles: rankDatas.value!.videoTitles.slice(0, 12),
  imgURLs: rankDatas.value!.imgURLs.slice(0, 12),
};
// 根据父组件传入的episode或者tag值的真假来确定使用videoEpisodes还是videoTags
if (episode) {
  dayRankDatas.value.videoEpisodes = rankDatas.value?.videoEpisodes!.slice(
    0,
    12,
  );
} else if (tag) {
  dayRankDatas.value.videoTags = rankDatas.value?.videoTags!.slice(0, 12);
}

weekRankDatas.value = {
  videoTitles: rankDatas.value!.videoTitles.slice(12, 24),
  imgURLs: rankDatas.value!.imgURLs.slice(12, 24),
};
// 根据父组件传入的episode或者tag值的真假来确定使用videoEpisodes还是videoTags
if (episode) {
  weekRankDatas.value.videoEpisodes = rankDatas.value?.videoEpisodes!.slice(
    12,
    24,
  );
} else if (tag) {
  weekRankDatas.value.videoTags = rankDatas.value?.videoTags!.slice(12, 24);
}

monthRankDatas.value = {
  videoTitles: rankDatas.value!.videoTitles.slice(24, 36),
  imgURLs: rankDatas.value!.imgURLs.slice(24, 36),
};
// 根据父组件传入的episode或者tag值的真假来确定使用videoEpisodes还是videoTags
if (episode) {
  monthRankDatas.value.videoEpisodes = rankDatas.value?.videoEpisodes!.slice(
    24,
    36,
  );
} else if (tag) {
  monthRankDatas.value.videoTags = rankDatas.value?.videoTags!.slice(24, 36);
}
</script>
<template>
  <!-- TODO为什么无法像客户端渲染一样在数据获取之前进行LoadingSkeleton的正常渲染 -->
  <Suspense>
    <div class="page-home-container">
      <div class="home-wrapper">
        <VideoShowCard
          v-for="(i, index) in homeDatas?.videoTitles.length"
          :key="index"
          :title="homeDatas!.videoTitles[index]"
          :imgURL="homeDatas!.imgURLs[index]"
          :episode="
            homeDatas!.videoEpisodes
              ? homeDatas!.videoEpisodes![index]
              : undefined
          "
          :tag="homeDatas!.videoTags ? homeDatas!.videoTags![index] : undefined"
          :score="homeDatas!.videoScores![index]"
          is-default
        />
      </div>
      <div class="new-wrapper">
        <h3>新片上线</h3>
        <div class="video-show-card-wrapper">
          <VideoShowCard
            v-for="(i, index) in newDatas?.videoTitles.length"
            :key="index"
            :title="newDatas!.videoTitles[index]"
            :imgURL="newDatas!.imgURLs[index]"
            :episode="
              newDatas!.videoEpisodes
                ? newDatas!.videoEpisodes![index]
                : undefined
            "
            :tag="newDatas!.videoTags ? newDatas!.videoTags![index] : undefined"
            :score="newDatas!.videoScores![index]"
            is-default
          />
        </div>
      </div>
      <div class="rank-wrapper">
        <div class="title-wrapper">
          <h3>排行榜</h3>
          <div class="ranks-select-wrapper">
            <span
              :class="{ curRank: curRank === '日榜' }"
              @click="curRank = '日榜'"
              >日榜</span
            >
            <span
              :class="{ curRank: curRank === '周榜' }"
              @click="curRank = '周榜'"
              >周榜</span
            >
            <span
              :class="{ curRank: curRank === '月榜' }"
              @click="curRank = '月榜'"
              >月榜</span
            >
          </div>
        </div>
        <div class="video-show-card-wrapper">
          <VideoShowCard
            v-for="(i, index) in curRankDatas?.videoTitles.length"
            :key="index"
            :title="curRankDatas!.videoTitles[index]"
            :imgURL="curRankDatas!.imgURLs[index]"
            :episode="
              curRankDatas!.videoEpisodes
                ? curRankDatas!.videoEpisodes![index]
                : undefined
            "
            :tag="
              curRankDatas!.videoTags
                ? curRankDatas!.videoTags![index]
                : undefined
            "
            :rank="index + 1"
            is-default
          />
        </div>
      </div>
      <div class="update-wrapper">
        <h3>最近更新</h3>
        <div class="video-show-card-wrapper">
          <VideoShowCard
            v-for="(i, index) in updateDatas?.videoTitles.length"
            :key="index"
            :title="updateDatas!.videoTitles[index]"
            :imgURL="updateDatas!.imgURLs[index]"
            :episode="
              updateDatas!.videoEpisodes
                ? updateDatas!.videoEpisodes![index]
                : undefined
            "
            :tag="
              updateDatas!.videoTags
                ? updateDatas!.videoTags![index]
                : undefined
            "
            is-default
          />
        </div>
      </div>
    </div>
  </Suspense>
</template>
<style scoped lang="scss">
@use "./pageHome.scss";
</style>
