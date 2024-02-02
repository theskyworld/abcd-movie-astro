<script setup lang="ts">
import type { ProfileProps } from "./types";
const { imgURL } = defineProps<ProfileProps>();
</script>
<template>
  <div class="profile-container">
    <div class="img-wrapper">
      <img :src="imgURL" alt="profile" />
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "./profile.scss";
</style>
