<template>
  <van-row>
    <van-col span="2"></van-col>
    <van-col span="20" class="font">
      <h1 align="center">LZ Club</h1>
      <van-grid :column-num="2">
        <van-grid-item v-for="(value,index) in types" :key="index" :text="value.text">
          <van-image :src="value.img" @click="onActive(value.text)" />
          <p class="van-grid-item__text">{{value.text}}</p>
        </van-grid-item>
      </van-grid>
      <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        @cancel="onCancel"
        @select="onSelect"
      />
    </van-col>
    <van-col span="2"></van-col>
  </van-row>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
export default {
  name: "Header",
  data() {
    return {
      albumList: [],
      liveAlbumList: [],
      show: false,
      actions: [{ name: "选项" }, { name: "选项" }, { name: "选项" }],
      types: [
        {
          text: "Audio-lab",
          img: "http://127.0.0.1/njlizhi/music/F/cover.jpg"
        },
        {
          text: "live",
          img: "http://127.0.0.1/njlizhi/music/%E5%8C%97%E4%BA%AC%E4%B8%8D%E6%8F%92%E7%94%B5%E7%8E%B0%E5%9C%BA/cover.jpg"
        }
      ]
    };
  },
  methods: {
    handleClickAbout() {
      this.$emit("clickAbout");
    },
    handleClickAlbum(albumName) {
      let data = {
        albumName: albumName
      };
      this.$emit("clickAlbum", data);
    },
    getAlbum() {
      axios
        .get("http://127.0.0.1/njlizhi/playlist" + ".json")
        .then(this.getAlbumSuc);
    },
    getLiveAlbum() {
      axios
        .get("http://127.0.0.1/njlizhi/liveplaylist" + ".json")
        .then(this.getLiveAlbumSuc);
    },
    getAlbumSuc(res) {
      if (res && res.status === 200) {
        let data = res.data;
        let albumList = [];
        for (let i = 0; i < data.length; i++) {
          albumList.push({ name: data[i].name });
        }
        this.$emit("firstAlbum", albumList[0]);
        this.albumList = albumList;
      }
    },
    getLiveAlbumSuc(res) {
      if (res && res.status === 200) {
        let data = res.data;
        let liveAlbumList = [];
        for (let i = 0; i < data.length; i++) {
          liveAlbumList.push({ name: data[i].name });
        }
        this.$emit("firstAlbum", liveAlbumList[0]);
        this.liveAlbumList = liveAlbumList;
      }
    },
    onCancel() {
      this.show = false;
    },
    onActive(type) {
      if (type === "Audio-lab") {
        this.actions = this.albumList;
      }
      if (type === "live") {
        this.actions = this.liveAlbumList;
      }
      this.show = true;
    },
    onSelect(item) {
      this.show = false;
      Toast(item.name + "已加入播放列表");
      this.handleClickAlbum(item.name);
    }
  },
  mounted() {
    this.getAlbum();
    this.getLiveAlbum();
  }
};
</script>


<style>
.font {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>