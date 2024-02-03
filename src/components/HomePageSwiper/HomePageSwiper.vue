<script setup lang="ts">
// @ts-nocheck // 因为找不到swiper的类型
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import type { HomePageSwiperProps } from "./index";
import useMainStore from "@store";

const mainStore = useMainStore();

// 使用Navigation, Pagination, Autoplay模块
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
// 卡片切换的特效
import "swiper/css/effect-fade";
// 使用对应的默认样式
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const modules = ref([EffectFade, Autoplay, Navigation, Pagination]);
// swiper配置选项
const swiperOptions = ref({
  // 每页展示的滑片数量
  slidesPerView: 1,
  // 每片滑片之间的间距
  spaceBetween: 30,
  // 有多片滑片在一页中进行展示时，是否需要居中放置
  centeredSlides: true,
  // 自动播放
  autoplay: {
    delay: 6_000,
    disableOnInteraction: false,
  },
  // 循环滑动
  loop: true,
  // 使用分页按钮
  // pagination: {
  //   clickable: true,
  // },
  // 使用导航按钮
  // navigation: true,
  modules: modules.value,
  // 卡片切换特效
  effect: "fade",
});

const { imgList, videoTitles } = defineProps<HomePageSwiperProps>();
const bigImgURLs = ref<string[]>([]);
const smallImgURLs = ref<string[]>([]);

if (imgList) {
  bigImgURLs.value = imgList[0];
  smallImgURLs.value = imgList[1];
}

// 获取swiper实例
let swiperInstance: unknown;
const onSwiper = (swiper: unknown) => {
  swiperInstance = swiper;
};

// 因为遍历时的index从0-1-2-3-...-8，而swiper的index从1-2-3...-0，所以需要对index进行额外处理，得到正确的i在swiper中使用
function formatIndex(index: number) {
  if (index === 0) {
    return 1;
  } else if (index === smallImgURLs.value.length - 1) {
    return 0;
  } else {
    return index + 1;
  }
}

// 每次卡片进行切换时，将当前卡片的真实index(swiper.realIndex，0-1-2-3...-8)赋值给curSlideindex
const curSlideindex = ref(0);

// 跳转到播放页面进行播放
async function toPlayingPage(title: string) {
  location.assign("/playing");
  mainStore.setPlayingKeyword(title);
  await mainStore.getPlayingSearchResData();
}
</script>
<template>
  <div class="home-page-swiper-container">
    <div class="swiper-wrapper">
      <Swiper
        v-bind="swiperOptions"
        class="mySwiper"
        @swiper="onSwiper"
        @slide-change="(swiper) => (curSlideindex = swiper.realIndex)"
      >
        <swiper-slide
          v-for="(img, index) in bigImgURLs"
          :key="index"
          @click="toPlayingPage(videoTitles[index])"
        >
          <!-- 当前滑块中视频的标题 -->
          <h2 class="video-title">
            {{ videoTitles[index] }}
          </h2>
          <img
            style="width: 1392px; height: 447px"
            :src="img"
            :alt="videoTitles[index]"
          />
        </swiper-slide>
      </Swiper>
    </div>
    <div
      v-for="(img, index) in smallImgURLs"
      :key="index"
      class="swiper-small-wrapper"
      @mouseenter="
        () => {
          const i = formatIndex(index);
          swiperInstance.slideTo(i);
        }
      "
    >
      <div class="img-wrapper" :class="{ active: index === curSlideindex }">
        <img :src="img" :alt="videoTitles[index]" />
      </div>
      <div class="video-info-wrapper">
        <div class="title">
          <span>{{ videoTitles[index] }} </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "./homePageSwiper.scss";
</style>
