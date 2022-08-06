<template>
    <div>
        <van-config-provider theme="dark"></van-config-provider>
        <van-tabs v-model:active="active">
            <van-tab title="搜索">
                <van-row justify="center" align="center">

                    <van-dropdown-menu active-color="#ee0a24">
                        <van-dropdown-item v-model="searchType" :options="searchOption" />
                    </van-dropdown-menu>
                    <!-- <div style="width: 2em;"></div> -->
                    <van-cell-group inset>
                        <van-field v-model="searchValue" placeholder="请输入" />
                    </van-cell-group>
                    <!-- <van-search  v-model="musicvalue" placeholder="请输入搜索关键词" /> -->
                    <div style="width: 2em;"></div>
                    <van-button @click="querymusic" type="primary" plain size="small">搜索</van-button>

                </van-row>



                <van-cell-group>

                    <van-list v-model:loading="loading" :finished="finished" finished-text="" @load="onLoad">
                        <van-cell size="large" clickable=true v-for="item in searchList" :key="item" :title="item.name"
                            :value="item.svalue" :searchid="item.id" :searchType="item.searchType">
                            <template #right-icon>
                                <van-icon name="add-o" style="margin-left:2rem" size="2rem" class="search-icon"
                                    @click="onDownliad" :searchid="item.id" :searchType="item.searchType" />
                            </template>
                        </van-cell>
                    </van-list>
                </van-cell-group>




            </van-tab>
            <van-tab title="下载管理">
                <van-row justify="center" gutter="20">
                    <van-col>
                        <van-button type="primary" @click="gettask" plain size="small">（先点击才会出现任务）加载任务。</van-button>
                    </van-col>
                    <van-col>
                        <van-button type="primary" @click="refreshTask" plain size="small">（一般不用）刷新正在下载任务</van-button>
                    </van-col>
                    <van-col>
                        <van-button type="primary" @click="delErrorTask" plain size="small">删除失败任务</van-button>
                    </van-col>

                    <van-col>
                        <van-button type="primary" @click="delAllTask" plain size="small">删除全部任务</van-button>
                    </van-col>
                    <van-col>
                        <van-button type="primary" @click="againTask" plain size="small">重新下载失败任务</van-button>
                    </van-col>
                    <!--         
         <van-button type="primary" plain size="small">删除失败任务</van-button>
         <van-button type="primary" plain size="small">清空全部任务</van-button> -->
                </van-row>
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="准备下载" name="4" :value="taskreadyvalue">
                        <van-cell size="large" v-for="item in taskready" :key="item" :title="item.name"
                            :value="item.svalue">
                        </van-cell>
                    </van-collapse-item>
                    <van-collapse-item title="正在进行" name="1" :value="taskrunvalue">

                        <van-cell size="large" v-for="item in taskrun" :key="item" :title="item.name"
                            :value="item.svalue">
                        </van-cell>

                    </van-collapse-item>
                    <van-collapse-item title="下载完成" name="2" :value="tasksuccessvalue">
                        <van-cell size="large" v-for="item in tasksuccess" :key="item" :title="item.name"
                            :value="item.svalue">
                        </van-cell>
                    </van-collapse-item>
                    <van-collapse-item title="下载失败" name="3" :value="taskerrorvalue">
                        <van-cell size="large" v-for="item in taskerror" :key="item" :title="item.name"
                            :value="item.svalue">
                        </van-cell>
                    </van-collapse-item>
                </van-collapse>


            </van-tab>
            <van-tab title="系统设置">


                <h1>
                    懒得开发。。稍后再说。。
                </h1>


            </van-tab>
        </van-tabs>







    </div>
</template>
<script>
import { ref } from 'vue'

import axios from 'axios'
import { showToast, showConfirmDialog } from 'vant';


export default {
    components: {

    },
    props: {

    },
    setup(props, context) {
        const searchValue = ref('');
        const searchType = ref(0);
        const searchOption = [
            { text: 'Music', value: 0 },
            { text: 'Artists', value: 1 },
            { text: 'Album', value: 2 },
        ];
        const searchList = ref([]);
        const tasksuccessvalue = ref('');
        const taskreadyvalue = ref('');
        const taskerrorvalue = ref('');
        const taskrunvalue = ref('');
        const tasksuccess = ref([]);
        const taskready = ref([]);
        const taskerror = ref([]);
        const taskrun = ref([]);
        const loading = ref(false);
        const refreshing = ref(false);
        const finished = ref(true);
        const activeNames = ref(['1']);
        const gettask = () => {
            console.log("获取下载任务");
            axios.get("/getTask").then(res => {
                //加载歌曲
                if (res.data.code == 200) {
                    tasksuccessvalue.value = res.data.data.success.length + "个"
                    taskreadyvalue.value = res.data.data.ready.length + "个"
                    taskerrorvalue.value = res.data.data.error.length + "个"
                    taskrunvalue.value = res.data.data.run.length + "个"
                    taskready.value = []
                    tasksuccess.value = []
                    taskrun.value = []
                    taskerror.value = []
                    for (var abs in res.data.data.ready) {
                        taskready.value.push({ "name": res.data.data.ready[abs].music.musicName, "svalue": res.data.data.ready[abs].music.musicArtists });
                    }
                    for (var abs in res.data.data.success) {
                        tasksuccess.value.push({ "name": res.data.data.success[abs].music.musicName, "svalue": res.data.data.success[abs].music.musicArtists });
                    }
                    for (var abs in res.data.data.run) {
                        taskrun.value.push({ "name": res.data.data.run[abs].music.musicName, "svalue": res.data.data.run[abs].music.musicArtists });
                    }
                    for (var abs in res.data.data.error) {
                        taskerror.value.push({ "name": res.data.data.error[abs].music.musicName, "svalue": res.data.data.error[abs].music.musicArtists });
                    }
                }

            })

        };
        const againTask = () => {
            axios.get("/againTask").then(res => {
                if (res.data.code == 200) {
                    showToast('成功');
                }
            })

        };
        const refreshTask = () => {
            axios.get("/refreshTask").then(res => {
                if (res.data.code == 200) {
                    showToast('成功');
                }
            })

        };
        const delAllTask = () => {
            axios.get("/delAllTask").then(res => {
                if (res.data.code == 200) {
                    showToast('成功');
                }
            })

        };
        const delErrorTask = () => {
            axios.get("/delErrorTask").then(res => {
                if (res.data.code == 200) {
                    showToast('成功');
                }
            })
        };
        const onLoad = () => {

        };

        const onRefresh = () => {
            // 清空列表数据
            finished.value = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            loading.value = true;
            onLoad();
        };
        const querymusic = () => {
            console.log(searchType.value);
            console.log(searchValue.value);
            if (searchType.value == 0) {
                searchList.value = []
                axios.get("/searchMusic/" + searchValue.value + "/50/1").then(res => {
                    console.log(res.data);
                    //加载歌曲
                    if (res.data.code == 200) {

                        console.log(res.data.data.abslist);
                        for (var abs in res.data.data.abslist) {
                            searchList.value.push({ "searchType": searchType.value, "name": res.data.data.abslist[abs].SONGNAME, "svalue": res.data.data.abslist[abs].ARTIST, "id": res.data.data.abslist[abs].DC_TARGETID });
                        }
                        // console.log(searchList.value);
                    }

                })

            } else if (searchType.value == 1) {
                searchList.value = []
                axios.get("/searchArtist/" + searchValue.value + "/50/1").then(res => {
                    console.log(res.data);
                    //加载歌曲
                    if (res.data.code == 200) {
                        console.log(res.data.data.abslist);
                        for (var abs in res.data.data.abslist) {
                            searchList.value.push({ "searchType": searchType.value, "name": res.data.data.abslist[abs].ARTIST, "svalue": "共：" + res.data.data.abslist[abs].SONGNUM + "首歌", "id": res.data.data.abslist[abs].ARTISTID });
                        }
                        // console.log(searchList.value);
                    }

                })
            } else if (searchType.value == 2) {
                searchList.value = []
                axios.get("/searchAlbum/" + searchValue.value + "/50/1").then(res => {
                    console.log(res.data);
                    //加载歌曲
                    if (res.data.code == 200) {
                        console.log(res.data.data.albumlist);
                        for (var abs in res.data.data.albumlist) {
                            searchList.value.push({ "searchType": searchType.value, "name": res.data.data.albumlist[abs].name, "svalue": res.data.data.albumlist[abs].artist, "id": res.data.data.albumlist[abs].albumid });
                        }
                        // console.log(searchList.value);
                    }

                })
            } else {
                searchList.value = []
                searchType.value = 0
            }

        };
        const onDownliad = (e) => {
            console.log(e.currentTarget);
            //   console.log(e.currentTarget.getAttribute("searchid"));
            if (e.currentTarget.getAttribute("searchType") == 0) {
                axios.post("/musicDownload/" + e.currentTarget.getAttribute("searchid") + "/2000").then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        showToast('提交成功，正在下载。');
                    } else {
                        showToast('下载失败');
                    }
                })

            }
            else if (e.currentTarget.getAttribute("searchType") == 1) {

                axios.post("/ArtistDownload/" + e.currentTarget.getAttribute("searchid") + "/2000").then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        showToast('提交成功，正在下载。');
                    } else {
                        showToast('下载失败');
                    }
                })
            } else if (e.currentTarget.getAttribute("searchType") == 2) {
                axios.post("/AlbumDownload/" + e.currentTarget.getAttribute("searchid") + "/2000").then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        showToast('提交成功，正在下载。');
                    } else {
                        showToast('下载失败');
                    }
                })
            }
        }

        return {
            searchValue,
            searchType,
            searchOption,
            searchList,
            loading,
            refreshing,
            finished,
            activeNames,
            tasksuccessvalue,
            taskreadyvalue,
            taskerrorvalue,
            taskrunvalue,
            tasksuccess,
            taskready,
            taskerror,
            taskrun,
            onLoad,
            onRefresh,
            querymusic,
            onDownliad,
            gettask,
            againTask,
            refreshTask,
            delAllTask,
            delErrorTask

        };
    }
}
</script>
<style scoped>
</style>