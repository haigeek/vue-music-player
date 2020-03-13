<template>
  <van-row>
    <van-col span="2"></van-col>
    <van-col span="20">
      <van-divider class="font">the album of {{this.albumName}} </van-divider>
      <aplayer
        class="van-tabbar--fixed"
        autoplay
        shuffle
        repeat="list"
        listFolded
        :music="{
      title: songsArr[0].title,
      artist: songsArr[0].artist,
      src: songsArr[0].src,
      pic: coverUrl
      }"
        :list="songsArr"
      />
    </van-col>

    <van-col span="2"></van-col>
  </van-row>
</template>


<script>
import axios from "axios";
// import Aplayer from "vue-aplayer";
const Aplayer = ()=>import('vue-aplayer')
export default {
  name: "Player",
  components: {
    Aplayer
  },
  data() {
    return {
      songsArr: [],
      coverUrl: "",
      srcName: "",
      volume: 1,
      autoplay: true,
      muted: false,
      listFolded: true,
      mini: false,
      alubArr: [],
      title: null,
      artist: "无艺术家",
      src: "" ,
      pic: "",
      albumName: "我爱南京"

    };
  },
  props: {
    albumName: String
  },
  mounted() {
    this.getSongs();
  },
  watch: {
    albumName() {
      this.coverUrl =
        "http://127.0.0.1/njlizhi/music/" + this.albumName + "/cover.jpg";
      this.getSongs();
    }
  },

  methods: {
    getSongs() {
      var arr = Object.keys(this.albumName);
      if (this.albumName) {
        axios
          .get(
            "http://127.0.0.1/njlizhi/studio_album/" +
              this.albumName +
              ".json"
          )
          .then(this.getSongsSuc);
      }
    },
    getSongsSuc(res) {
      let songsArr = [];
      if (res && res.status === 200) {
        let data = res.data;
        for (let i = 0; i < data.length; i++) {
          let songDetail = {};
          songDetail.title = data[i].title;
          songDetail.artist = data[i].artist;
          songDetail.src =
            "http://127.0.0.1/njlizhi/music/" +
            this.albumName +
            "/" +
            data[i].src;
          songDetail.pic =
            "http://127.0.0.1/njlizhi/music/" +
            this.albumName +
            "/" +
            data[i].pic;
          songDetail.lrc = data[i].lrc;
          songsArr.push(songDetail);
        }
      }
      this.songsArr = songsArr;
    },
    handleClickSongsName(item) {
      this.srcName = item.name;
    }
  }
};
</script>
<style>
.font {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>