<template>
  <van-row>
    <van-col span="2"></van-col>

    <van-col span="20">
      <van-divider class="font">the album of {{this.albumName}}</van-divider>

      <aplayer
        :audio="songList"
        :autoplay="autoplay"
        :lrcType="3"
        :loop.sync="loop"
        :order.sync="order"
        :volume.sync="volume"
        :listFolded.sync="listFolded"
        :Preload="Preload"
      />

      <van-divider class="font">播放设置</van-divider>
      <van-cell center title="使用选择的专辑作为播放列表">
        <van-switch v-model="checked" slot="right-icon" size="24" />
      </van-cell>
    </van-col>

    <van-col span="2"></van-col>
  </van-row>
</template>


<script>
import axios from "axios";
export default {
  name: "Player",
  // components: {
  //   Aplayer
  // },
  data() {
    return {
      audio: {
        name: "东西（Cover：林俊呈）",
        artist: "纳豆",
        url: "https://cdn.moefe.org/music/mp3/thing.mp3",
        cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
        lrc: "https://cdn.moefe.org/music/lrc/thing.lrc"
      },
      loop: "all",
      order: "list",
      volume: 0.7,
      listFolded: false,
      autoplay: true,
      muted: false,
      checked: true,
      songList: [],
      coverUrl: "",
      srcName: "",
      Preload: "none"
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
        "http://test.haigeek.xyz/njlizhi/music/" + this.albumName + "/cover.jpg";
      this.getSongs();
    }
  },

  methods: {
    getSongs() {
      if (this.albumName) {
        axios
          .get(
            "http://test.haigeek.xyz/njlizhi/studio_album/" +
              this.albumName +
              ".json"
          )
          .then(this.getSongsSuc);
      }
    },
    getSongsSuc(res) {
      if (res && res.status === 200) {
        let data = res.data;
        if (this.checked == true) {
          this.songList = [];
        }

        for (let i = 0; i < data.length; i++) {
          let songDetail = {};
          // songDetail.title = data[i].title;
          songDetail.name = data[i].title;
          songDetail.artist = data[i].artist;
          songDetail.url =
            "http://test.haigeek.xyz/njlizhi/music/" +
            this.albumName +
            "/" +
            data[i].src;
          songDetail.cover =
            "http://test.haigeek.xyz/njlizhi/music/" +
            this.albumName +
            "/" +
            data[i].pic;
          songDetail.lrc = data[i].lrc;
          this.songList.push(songDetail);
        }
      }
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