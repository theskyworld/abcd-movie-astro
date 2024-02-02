<script setup lang="ts">
import { ref, onMounted } from "vue";
import useMainStore from "@store";
import SearchAdvise from "@components/SearchAdvise";
const isInputElemFocus = ref(false);
const inputElemRef = ref();

const mainStore = useMainStore();

onMounted(() => {
  inputElemRef.value.onfocus = () => {
    isInputElemFocus.value = true;
  };
  inputElemRef.value.onblur = () => {
    isInputElemFocus.value = false;
  };
});

const kw = ref("");

async function toSearchResPage() {
  // 更新keyword
  mainStore.setKeyword(kw.value);
  // 页面跳转
  location.assign("/search-result/" + kw.value);
  // 请求数据
  await mainStore.getSearchResData(false);
  kw.value = "";
}
</script>
<template>
  <Suspense>
    <div class="search-container">
      <input
        ref="inputElemRef"
        type="text"
        placeholder="搜索电影、电视剧、综艺、动漫"
        v-model.lazy="kw"
        @keyup.enter="toSearchResPage"
      />
      <i class="iconfont icon-search" @click="toSearchResPage"></i>
      <SearchAdvise v-if="isInputElemFocus" />
    </div>
  </Suspense>
</template>
<style scoped lang="scss">
@use "./search.scss";
</style>
