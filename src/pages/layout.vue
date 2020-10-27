<template>
  <div class="big">
    <el-container class="bigtwo">
      <el-aside width="200px">
        <asidetext></asidetext>
      </el-aside>
      <el-container>
        <el-header>
            <admintext :username=username></admintext>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import admintext from "@/components/admintext";
import asidetext from "@/components/asidetext";
export default {
    components:{//引入的组件
        admintext,
        asidetext
    },
    computed: {
      username(){
        return this.$store.state.info.username;
      }      
    },
}
</script>
<style scoped lang="stylus">
.big {
  height: 100%;

  .bigtwo {
    height: 100%;

    .el-aside {
      height: 100%;
    }

    .el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
      text-align: right;
    }

    .el-aside {
      background-color "#545c64"
      color: #333;
      text-align: center;
    }

    .el-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
    }
  }
}
</style>