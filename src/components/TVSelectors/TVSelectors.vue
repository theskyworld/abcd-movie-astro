<script setup lang="ts">
import { ref } from "vue";
import type { SelectedItem, TVSelectorData } from "./types";

const thisYear = new Date().getFullYear();
const kws = ref<Array<string | number>>([
  "undefined",
  "undefined",
  "undefined",
  "undefined",
  "undefined",
]);
const selectedItems = ref<SelectedItem[]>([]);
const emit = defineEmits(["doChangeKws"]);

// 存储每次点击选择器按钮之后的值，避免丢失之前的已点击值
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

function correctIndex(index: number) {
  switch (index) {
    case 0:
      return 0;
    case 1:
      return 3;
    case 2:
      return 1;
    case 3:
      return 4;
    case 4:
      return 2;
    default:
      return index;
  }
}

// 点击选择器按钮后对kws进行更新，确保更新之后之前选择的内容依旧存在
function addNewItemToKws() {
  selectedItems.value.forEach((elem: SelectedItem) => {
    let index = elem.index;
    index = correctIndex(index);
    let newItem = elem.newItem;
    newItem = correctNewItem(newItem);
    kws.value[index] = newItem;
  });
}

const tvSelectors = ref<Array<TVSelectorData>>([
  {
    title: "类型",
    content: [
      {
        key: "1",
        name: "全部",
      },
      {
        key: "2",
        name: "热门连续剧",
      },
      {
        key: "3",
        name: "港台剧",
      },
      {
        key: "4",
        name: "欧美剧",
      },
      {
        key: "5",
        name: "日韩剧",
      },
    ],
  },
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

const activeItems = ref(["全部", "全部", "全部", "全部", "时间排序"]);

function changeActiveItems(newItem: string, deleteIndex: number) {
  // 删除deleteIndex位置处的元素，并替换为新的元素
  activeItems.value.splice(deleteIndex, 1, newItem);
}
</script>
<template>
  <Suspense>
    <div class="tv-selectors-container">
      <div
        class="selector-wrapper"
        v-for="selector in tvSelectors"
        :key="selector.title"
      >
        <span class="title">{{ selector.title }}</span>
        <ul>
          <li class="items" v-for="item in selector.content" :key="item.key">
            <span
              @click="
                changeActiveItems(item.name, tvSelectors.indexOf(selector));
                addNewItems(tvSelectors.indexOf(selector), item.name);
                addNewItemToKws();
                emit('doChangeKws', kws);
              "
              :class="{
                active:
                  activeItems[tvSelectors.indexOf(selector)] === item.name,
              }"
              >{{ item.name }}</span
            >
          </li>
        </ul>
      </div>
    </div>
  </Suspense>
</template>
<style scoped lang="scss">
@use "./tvSelectors.scss";
</style>
