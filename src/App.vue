<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import Home from './components/Home.vue'



// export  default APP({
//   setup() {
//     const value1 = ref(0);
//     const value2 = ref('a');
//     const option1 = [
//       { text: '全部商品', value: 0 },
//       { text: '新款商品', value: 1 },
//       { text: '活动商品', value: 2 },
//     ];
//     const option2 = [
//       { text: '默认排序', value: 'a' },
//       { text: '好评排序', value: 'b' },
//       { text: '销量排序', value: 'c' },
//     ];

//     return {
//       value1,
//       value2,
//       option1,
//       option2,
//     };
//   },
// }
// )

</script>

<template>
  <Home></Home>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
