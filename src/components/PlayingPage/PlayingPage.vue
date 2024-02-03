<script setup lang="ts">
import VideoShowCard from "@components/VideoShowCard";
import { playM3u8 } from "@assets/ts/m3u8Parser";
import { ref, watchEffect, watch } from "vue";
import VideoLoadingAnimation from "@components/VideoLoadingAnimation";
import PlayingAnimation from "@components/PlayingAnimation";
import type { VideoURL, PlayingPageProps } from "./types";
import useAxios from "@hooks/useAxios";

const { get } = useAxios();
const { playingKeyword } = defineProps<PlayingPageProps>();

async function getPlayingSearchResData(
  isByClick: boolean = true,
  routeIndex?: number,
  episodeIndex?: number,
) {
  const { videoURL, routes } = await get(
    `/search?keyword=${playingKeyword}&isByClick=${isByClick}&routeIndex=${routeIndex}&perPageNum=undefined&page=undefined&episodeIndex=${episodeIndex}`,
  );
  return { videoURL, routes };
}

const videoElem = ref();
// 当前线路
const curURLIndex = ref(1);
// 当前集数
const curEpisodeIndex = ref(1);

function setCurEpisodeIndex(index: number) {
  curEpisodeIndex.value = index;
}

// 避免多次迅速点击线路请求
const canClick = ref(true);

const videoURL = ref<VideoURL>();
const routes = ref(0);

getPlayingSearchResData(true, 0, 0).then((res) => {
  videoURL.value = res.videoURL;
  routes.value = res.routes;
});

// 当前视频总的集数，如果为1，则表示为电影或短视频等
const episodesAmount = ref(0);
// 当前视频的播放url
const episodeURL = ref("");
// 当前视频的所有集数的标题，例如正片，第一集，花絮等
const episodeNames = ref<string[]>([]);

// 决定加载视频url之前加载动画的是否展示
const isLoadingURL = ref(true);

watch([videoURL], () => {
  if (videoURL.value) {
    episodesAmount.value = videoURL.value?.episodesAmount || 0;
    episodeNames.value = videoURL.value?.episodeNames || [];
    episodeURL.value = videoURL.value?.episodeURL || "";
  }
});

watch([curURLIndex, curEpisodeIndex], async () => {
  canClick.value = false;
  // 当前集数不变，获取新的线路播放url
  videoURL.value = (
    await getPlayingSearchResData(
      true,
      curURLIndex.value - 1,
      curEpisodeIndex.value - 1,
    )
  ).videoURL;
  episodeURL.value = (videoURL.value as VideoURL)?.episodeURL;
  canClick.value = true;
});

watchEffect(async () => {
  if (!episodeURL.value) {
    isLoadingURL.value = true;
  } else {
    isLoadingURL.value = false;
  }
  if (episodeURL.value) {
    playM3u8(episodeURL.value, videoElem.value);
  }
});

const recommendDatas = await get("/playing/recommend");
</script>
<template>
  <Suspense>
    <div class="playing-page-container">
      <div class="top-content-wrapper">
        <div class="video-wrapper">
          <video ref="videoElem" class="videoElem" controls></video>
          <!-- TODO1.增加暂无片源时的处理逻辑以及对应的提示 -->
          <!-- TODO2.需要解决相同名称但是不同类型的视频（例如播放夜幕降临的电视剧，但是由于存在相同名称的电影而纳入电视剧的线路中），导致在切换线路时可能切换到电影进行播放的情况 -->
          <div class="video-loading-animation-wrapper" v-if="isLoadingURL">
            <VideoLoadingAnimation />
          </div>
        </div>
        <div class="video-infos-wrapper">
          <div class="video-title-wrapper">
            <h3>{{ playingKeyword }}</h3>
          </div>
          <!-- <div class="video-labels-wrapper">
          <span>2023</span>
          <span>欧美</span>
          <span>剧情/动作</span>
        </div> -->
          <div class="video-url-routes-wrapper">
            <h4 class="title">选集播放</h4>
            <div class="routes">
              <select
                v-show="canClick"
                v-model="curURLIndex"
                name="urlRoutes"
                id="pet-select"
              >
                <option
                  :disabled="!canClick"
                  v-for="(i, index) in routes"
                  :key="index"
                  :value="i"
                >
                  <p>线路{{ i }}</p>
                </option>
              </select>
              <i v-show="!canClick">
                <img src="../../assets/imgs/loading.gif" alt="" />
              </i>
            </div>
          </div>
          <div class="video-episodes-wrapper">
            <!-- 只存在一集 -->
            <span v-if="episodesAmount === 1"
              >{{ episodeNames && episodeNames[0] }}
              <PlayingAnimation class="playing-animation" />
            </span>
            <!-- 存在多集数 -->
            <span
              @click="setCurEpisodeIndex(index + 1)"
              :class="{ playing: curEpisodeIndex === index + 1 }"
              v-else
              v-for="(i, index) in episodesAmount"
              :key="index"
              >{{ episodeNames && episodeNames[index] }}
              <!-- 当前集数正在播放的动画 -->
              <PlayingAnimation
                class="playing-animation"
                v-if="curEpisodeIndex === index + 1"
              />
            </span>
          </div>
        </div>
      </div>
      <div class="bottom-content-wrapper">
        <div class="title-wrapper">
          <h4>相关推荐</h4>
        </div>
        <div class="video-show-card-wrapper">
          <VideoShowCard
            v-for="(i, index) in recommendDatas[0].length"
            :key="index"
            :title="recommendDatas[0][index]"
            :imgURL="recommendDatas[1][index]"
            :tag="recommendDatas[2][index]"
            is-column
          />
        </div>
      </div>
    </div>
  </Suspense>
</template>

<style scoped lang="scss">
@use "./playingPage.scss";
</style>
