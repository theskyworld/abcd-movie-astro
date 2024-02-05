<script setup lang="ts">
import { ref } from "vue";
import type { SideMenusProps } from "./types";

const sideMenus = ref<Array<SideMenusProps>>([
  {
    key: "001",
    name: "首页",
    icon: "icon-shouye",
    targetUrl: "/",
  },
  {
    key: "002",
    name: "NetFlix",
    icon: "icon-netflix-line",
    targetUrl: "/netflix",
  },
  {
    key: "003",
    name: "电影",
    icon: "icon-movie",
    targetUrl: "/movie",
  },
  {
    key: "004",
    name: "电视剧",
    icon: "icon-dianshiju",
    targetUrl: "/tv",
  },
  {
    key: "005",
    name: "动漫",
    icon: "icon-dongman",
    targetUrl: "/anime",
  },
  {
    key: "006",
    name: "综艺记录",
    icon: "icon-zongyi",
    targetUrl: "/variety",
  },
  {
    key: "007",
    name: "追剧周表",
    icon: "icon-zhuizhuiju",
    targetUrl: "/",
  },
  {
    key: "008",
    name: "今日更新",
    icon: "icon-gengxin",
    targetUrl: "/",
  },
  {
    key: "009",
    name: "专题列表",
    icon: "icon-zhuanti",
    targetUrl: "/",
  },
  {
    key: "010",
    name: "排行榜",
    icon: "icon-paixing",
    targetUrl: "/",
  },
  {
    key: "011",
    name: "留言求片",
    icon: "icon-liuyan",
    targetUrl: "/",
  },
  {
    key: "012",
    name: "APP",
    icon: "icon-APP",
    targetUrl: "/",
  },
]);
</script>
<template>
  <div class="side-menus-container">
    <div class="content-wrapper">
      <ul>
        <li v-for="menu in sideMenus" :key="menu.key">
          <a :href="menu.targetUrl" data-astro-prefetch>
            <i class="iconfont" :class="menu.icon"></i>
            <span>{{ menu.name }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "./sideMenus.scss";
</style>
