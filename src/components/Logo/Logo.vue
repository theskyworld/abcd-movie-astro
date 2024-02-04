<script setup lang="ts">
import logo from "@assets/imgs/logo.svg";
</script>
<template>
  <div class="logo-container">
    <h1>
      <a href="/">
        <p style="opacity: 0; position: absolute">ABCD影视</p>
        <img :src="logo.src" alt="Logo" />
      </a>
    </h1>
  </div>
</template>
<style scoped lang="scss">
@use "./logo.scss";
</style>
