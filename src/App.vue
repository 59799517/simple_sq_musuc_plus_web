<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Home from './components/Home.vue'

import { darkTheme,NMessageProvider  } from "naive-ui";
import { provide } from 'vue'
import MessageApi from "./components/message-api.vue";

let theme=darkTheme;
const changetheme = () => {
  theme.value = theme.value == null ? darkTheme : null;
  // themebtntit.value = themebtntit.value == "亮色主题" ? "暗色主题" : "亮色主题";
};
provide("changetheme",changetheme);
</script>

<template>
  <n-config-provider :theme="theme">
    <n-dialog-provider>
    <n-message-provider placement="bottom">
      <MessageApi />
    </n-message-provider>
    </n-dialog-provider>
    <n-global-style />
    <router-view></router-view>
  </n-config-provider>

</template>

<style scoped>

</style>
