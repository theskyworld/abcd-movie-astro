<script setup lang="ts">
import { ref, onBeforeMount, onUpdated } from "vue";
import Loading from "@components/Loading";
import { createSSRApp } from "vue";
import useStorage from "@hooks/useStorage";
import useAxios from "@hooks/useAxios";
import VideoShowCard from "@components/VideoShowCard";

const { setStorage, getStorage } = useStorage();
const { get } = useAxios();
const curPage = ref(1);

const videoShowCardElemsRef = ref();
const contentWrapperElemRef = ref();
const datas = ref<Data>({
  imgURLs: [],
  videoTitles: [],
  videoScores: [],
  videoEpisodes: [],
});
const isLoading = ref(true);

onBeforeMount(async () => {
  datas.value = await get("/netflix", { params: { page: curPage.value } });
  setStorage("netflixPageData", JSON.stringify(datas.value));
  isLoading.value = false;
});

interface Data {
  imgURLs: string[];
  videoTitles: string[];
  videoScores: string[];
  videoEpisodes: string[];
}

onUpdated(() => {
  // 最多获取30页的数据
  if (curPage.value < 30) {
    contentWrapperElemRef.value.onscroll = fn;
  }
  function fn() {
    const observer = new IntersectionObserver(async (entries, observer) => {
      if (entries[0].intersectionRatio > 0.8) {
        // 当前侦听的元素（当前所有渲染的卡片中的最后一个）
        const targetElem = entries[0].target;
        // 移除侦听（为了确保以下内容只执行一次）
        observer.unobserve(entries[0].target);
        // 为了确保以下内容只执行一次
        contentWrapperElemRef.value.onscroll = null;
        // 数据加载完成前，在当前所有渲染的卡片中的最后一个的下一个元素处渲染loading
        const containerElem = document.createElement("div");
        // 将Loading组件挂载到containerElem元素上
        const app = createSSRApp(Loading);
        app.mount(containerElem);
        // 将该元素添加到targetElem元素后面，作为其下一个兄弟元素
        targetElem.insertAdjacentElement("afterend", containerElem);
        // 获取下一页数据
        curPage.value++;
        // 将新的数据添加到旧的数据中，并更新datas，完成视图的更新，同时将合并后的数据存储到localstorage
        const oldDatas = JSON.parse(await getStorage("netflixPageData")!);

        if (oldDatas) {
          const newDatas: Data = await get("/netflix", {
            params: { page: curPage.value },
          });
          const curDatas: Data = {
            imgURLs: [""],
            videoTitles: [""],
            videoScores: [""],
            videoEpisodes: [""],
          };
          // 数据合并
          for (let key in oldDatas) {
            // @ts-ignore
            curDatas[key] = oldDatas[key].concat(newDatas[key]);
          }
          // 更新datas
          datas.value = curDatas;
          // 存储本地
          setStorage("netflixPageData", JSON.stringify(curDatas));
        }
        // 数据加载完成
        // 移除掉targetElem元素后面的loading元素
        targetElem.nextSibling!.remove();
        // 重新进行scroll事件的监听
        contentWrapperElemRef.value.onscroll = fn;
      }
    });
    observer.observe(
      videoShowCardElemsRef.value[videoShowCardElemsRef.value.length - 1],
    );
  }
});
</script>
<template>
  <Suspense>
    <div class="netflix-page-container">
      <div class="title-wrapper">
        <h2>Netflix美剧</h2>
        <div class="placeholder"></div>
      </div>
      <div class="content-wrapper" ref="contentWrapperElemRef">
        <div class="video-show-card-wrapper">
          <div
            class="video-show-card"
            ref="videoShowCardElemsRef"
            v-for="(i, index) in datas.videoTitles"
            :key="index"
            :id="index + ''"
          >
            <VideoShowCard
              :title="datas.videoTitles[index]"
              :imgURL="datas.imgURLs[index]"
              :episode="datas.videoEpisodes[index]"
              :score="datas.videoScores[index]"
              is-default
            />
          </div>
        </div>
      </div>
    </div>
  </Suspense>
</template>
<style scoped lang="scss">
@use "./netflixPage.scss";
</style>
