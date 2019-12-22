<template>
  <el-row>
    <br>
    <br>
    <el-col :xs="24" :sm="24" :md="8" :lg="24" :xl="1" ><dir><br></dir></el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="6" :offset="3">
      <div class="grid-content">
        <img
          :src="coverUrl"
          class="rounded mx-auto d-block"
          height="300"
          width="300"
          alt="album cover"
        />
      </div>
      <br>
    </el-col>
    
    <el-col :xs="20" :sm="20" :md="12" :lg="6" :xl="6" :offset="2">
      <div class="grid-content">
       <aplayer
          autoplay
          shuffle
          repeat="list"
          :music="{
                title: '你离开了南京，从此没有人和我说话',
                artist: '李志',
                src: 'http://47.100.177.143:8181/njlizhi/music/%E6%A2%B5%E9%AB%98%E5%85%88%E7%94%9F/%E6%9D%8E%E5%BF%97%20-%20%E4%BD%A0%E7%A6%BB%E5%BC%80%E4%BA%86%E5%8D%97%E4%BA%AC%EF%BC%8C%E4%BB%8E%E6%AD%A4%E6%B2%A1%E6%9C%89%E4%BA%BA%E5%92%8C%E6%88%91%E8%AF%B4%E8%AF%9D.mp3',
                pic: 'http://47.100.177.143:8181/njlizhi/music/%E6%A2%B5%E9%AB%98%E5%85%88%E7%94%9F/cover.jpg'
        }"
          :list="songsArr"
        />
      </div>
    </el-col>
  </el-row>
  
</template>


<script>
import axios from "axios";
import Aplayer from "vue-aplayer";
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
      muted: false,
      alubArr: []
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
        "http://47.100.177.143:8181/njlizhi/music/" + this.albumName + "/cover.jpg";
      this.getSongs();
    }
  },
  
  methods: {
    getSongs() {
      if (this.albumName) {
        axios
          .get(
            "http://47.100.177.143:8181/njlizhi/studio_album/" +
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
            "http://47.100.177.143:8181/njlizhi/music/" +
            this.albumName +
            "/" +
            data[i].src;
          songDetail.pic =
            "http://47.100.177.143:8181/njlizhi/music/" +
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

</style>