<template>
<el-container >
    <el-header>
      <el-row>
        <el-col :span="24">
          <div>
            <el-menu class="el-menu-demo" mode="horizontal" >
              <el-menu-item index="20">njlizhi</el-menu-item>
              <el-submenu index="2-1">
                <template slot="title">Audio-Lab</template>
                <el-menu-item index="4-1"
                  v-for="(item, index) in albumList"
                  :key="index"
                  @click="handleClickAlbum(item)"
                >{{item}}</el-menu-item>
              </el-submenu>

              <el-submenu index="3-1">
                <template slot="title">Live</template>
                <el-menu-item index="4-2" v-for="(item2, index) in liveAlbumList "
                  :key="index"
                  @click="handleClickAlbum(item2)"
                >{{item2}}</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-col>
      </el-row>
    </el-header>
</el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Header",
  data() {
    return {
      albumList: [],
      liveAlbumList: []
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
        .get("http://47.100.177.143:8181/njlizhi/playlist" + ".json")
        .then(this.getAlbumSuc);
      // axios.get('https://sunly.in/music/njlizhi/studio_album.json').then(this.getAlbumSuc)
    },
    getLiveAlbum() {
      axios
        .get("http://47.100.177.143:8181/njlizhi/liveplaylist" + ".json")
        .then(this.getLiveAlbumSuc);
    },
    getAlbumSuc(res) {
      if (res && res.status === 200) {
        let data = res.data;
        let albumList = [];
        for (let i = 0; i < data.length; i++) {
          albumList.push(data[i].name);
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
          liveAlbumList.push(data[i].name);
        }
        this.$emit("firstAlbum", liveAlbumList[0]);
        this.liveAlbumList = liveAlbumList;
      }
    }
  },
  mounted() {
    this.getAlbum();
    this.getLiveAlbum();
  }
};
</script>


<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-header {
    padding: 0 20px;
}
.container {
    width: 1140px;
    padding: 0;
    margin: 0 auto;
}
.el-menu-demo{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

</style>