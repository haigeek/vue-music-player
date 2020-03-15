<template>
  <van-row>
    <van-col span="2"></van-col>
    <van-col span="20" class="font">
      <h2 align="center">LZ Music Club</h2>
      <van-cell title="你好，朋友" icon="envelop-o" />
      <van-cell value="时间的车轮总是推着我们往前走，但是我们总得留下点什么吧"></van-cell>

      <van-cell title="如何使用" icon="question-o" />
      <van-cell
        value="点击封面选择录音室/现场专辑，专辑会加入播放列表。也可以添加全部专辑到列表，
       页面底部有开关可以设置。列表是可以展开的，OK Just Enjoy it 希望能给你带来快乐"
        label
      ></van-cell>
      <van-grid :column-num="2">
        <van-grid-item v-for="(value,index) in types" :key="index" :text="value.text">
          <van-image :src="value.img"  fit="fill" @click="onActive(value.text)" />
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
          img: "http://test.haigeek.xyz/njlizhi/music/%E5%9C%A8%E6%AF%8F%E4%B8%80%E6%9D%A1%E4%BC%A4%E5%BF%83%E7%9A%84%E5%BA%94%E5%A4%A9%E5%A4%A7%E8%A1%97%E4%B8%8A/cover.jpg"
        },
        {
          text: "live",
          img:
            "http://test.haigeek.xyz/njlizhi/music/%E5%8C%97%E4%BA%AC%E4%B8%8D%E6%8F%92%E7%94%B5%E7%8E%B0%E5%9C%BA/cover.jpg"
        }
      ]
    };
  },
  methods: {
    handleClickAbout() {
      this.$emit("clickAbout");
    },
    handleClickAlbum(albumName) {
      // let data = {
      //   albumName: albumName
      // };
      this.$emit("clickAlbum", albumName);
    },
    getAlbum() {
      axios
        .get("http://test.haigeek.xyz/njlizhi/playlist" + ".json")
        .then(this.getAlbumSuc);
    },
    getLiveAlbum() {
      axios
        .get("http://test.haigeek.xyz/njlizhi/liveplaylist" + ".json")
        .then(this.getLiveAlbumSuc);
    },
    getAlbumSuc(res) {
      if (res && res.status === 200) {
        let data = res.data;
        let albumList = [];
        for (let i = 0; i < data.length; i++) {
          albumList.push({ name: data[i].name });
        }
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
  line-height: 35px;
}
</style>