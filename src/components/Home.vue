<template>
    <div>
        <van-config-provider theme="dark"></van-config-provider>
        <van-row justify="center" align="center">
            <van-dropdown-menu active-color="#ee0a24">
                <van-dropdown-item v-model="value1" :options="option1" />
            </van-dropdown-menu>
            <div style="width: 2em;"></div>
            <van-cell-group inset>
  <van-field v-model="musicvalue" placeholder="请输入用户名" />
</van-cell-group>
            <!-- <van-search  v-model="musicvalue" placeholder="请输入搜索关键词" /> -->
            <div style="width: 2em;"></div>
            <van-button @click="querymusic" type="primary" plain size="small">单色按钮</van-button>
        </van-row>
        <van-cell-group>
            <van-row justify="center">
                <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> 
                    <van-cell click="" size="large" clickable=true style="width: 50em;" v-for="item in list" :key="item"
                        :title="item" value="item" />
                </van-list>
            </van-row>
        </van-cell-group>


    </div>
</template>
<script>
import { ref } from 'vue'

import axios from 'axios'

export default {
    components: {

    },
    props: {

    },
    setup(props, context) {
        const querymusic =()=>{
                    console.log(musicvalue.value);

            // axios.get("http://127.0.0.1:8083/searchMusic/%E6%98%9F%E6%99%B4/50/1").then(res=>{
            //     console.log(res);
            // })
        };
        const musicvalue = ref('');
        const value1 = ref(0);
        const list = ref([]);
        const loading = ref(false);
        const finished = ref(false);
        const refreshing = ref(false);
        const onLoad = () => {
            setTimeout(() => {
                if (refreshing.value) {
                    list.value = [];
                    refreshing.value = false;
                }

                for (let i = 0; i < 10; i++) {
                    list.value.push(list.value.length + 1);
                }
                loading.value = false;

                if (list.value.length >= 40) {
                    finished.value = true;
                }
            }, 1000);
        };

        const onRefresh = () => {
            // 清空列表数据
            finished.value = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            loading.value = true;
            onLoad();
        };


        const value2 = ref('a');
        const option1 = [
            { text: 'Music', value: 0 },
            { text: 'Artists', value: 1 },
            { text: 'Album', value: 2 },
        ];

        return {
            value1,
            option1,
            list,
            onLoad,
            loading,
            finished,
            onRefresh,
            refreshing,
            querymusic,
            musicvalue,
        };
    }
}
</script>
<style scoped>
</style>