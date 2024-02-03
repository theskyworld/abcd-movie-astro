<script setup lang="ts">
import { ref } from "vue";
import type { VideoSelectorProps, SelectedItem } from "./types";

const emit = defineEmits(["doChangeKws"]);
const { videoSelectors } = defineProps<VideoSelectorProps>();

const kws = ref<Array<string | number>>([
  "undefined",
  "undefined",
  "undefined",
  "undefined",
  "undefined",
]);

// 存储每次点击选择器按钮之后的值，避免丢失之前的已点击值
const selectedItems = ref<unknown>([]);
function addNewItems(index: number, newItem: string | number) {
  selectedItems.value.push({ index, newItem });
}

// 纠正newItem和index，用于拼接合法的请求url
function correctNewItem(newItem: string | number) {
  switch (newItem) {
    case "时间排序":
      return "time";
    case "人气排序":
      return "hits";
    case "评分排序":
      return "score";
    default:
      return newItem;
  }
}
function correctIndex(index: number): number {
  switch (index) {
    case 0:
      return 2;
    case 1:
      return 0;
    case 2:
      return 3;
    case 3:
      return 4;
    case 4:
      return 1;
    default:
      return index;
  }
}

// 点击选择器按钮后对kws进行更新，确保更新之后之前选择的内容依旧存在
function addNewItemToKws() {
  selectedItems.value.forEach((elem: SelectedItem) => {
    // 添加前对新的index和item进行处理
    let index = elem.index;
    index = correctIndex(index);
    let newItem = elem.newItem;
    newItem = correctNewItem(newItem);

    // 添加
    kws.value[index] = newItem;
  });
}

// 当前已被选中的元素
const activeItems = ref(["全部", "全部", "全部", "全部", "时间排序"]);

function changeActiveItems(newItem: string, deleteIndex: number) {
  // 删除deleteIndex位置处的元素，并替换为新的元素
  activeItems.value.splice(deleteIndex, 1, newItem);
}
</script>
<template>
  <Suspense>
    <div class="video-selectors-container">
      <div
        v-for="selector in videoSelectors"
        :key="selector.title"
        class="selector-wrapper"
      >
        <span class="title">{{ selector.title }}</span>
        <ul>
          <li v-for="item in selector.content" :key="item.key" class="items">
            <span
              :class="{
                active:
                  activeItems[videoSelectors.indexOf(selector)] === item.name,
              }"
              @click="
                changeActiveItems(item.name, videoSelectors.indexOf(selector));
                addNewItems(videoSelectors.indexOf(selector), item.name);
                addNewItemToKws();
                emit('doChangeKws', kws);
              "
            >
              {{ item.name }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </Suspense>
</template>
<style scoped lang="scss">
@use "./videoSelectors.scss";
</style>
