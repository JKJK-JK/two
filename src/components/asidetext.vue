<template>
  <div class="asidebox">
    <el-menu text-color="#fff" background-color="#545c64" unique-opened
     active-text-color="#ffd04b"
     >
      <h2>后台管理系统</h2>

      <el-menu-item index="/index">
        <i class="el-icon-s-home"></i>
        <router-link to="/index">首页</router-link>
      </el-menu-item>

      <el-submenu
        v-for="(menu, index) in menu"
        :key="index"
        :index="(index + 1).toString()"
      >
      
        <template slot="title">
          <i class="menu.icon"></i>
          <span>{{ menu.title }}</span>
        </template>
  <!-- 子菜单 -->
        <el-menu-item-group> 
          <el-menu-item
            v-for="(submenu, index) in menu.children"
            :key="index"
            :index="submenu.url"
          >
            <router-link :to="submenu.url" >
              {{ submenu.title }}
            </router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  computed: {
    menu() {
      return this.$store.state.info.menus;
    },
  },
};
</script>
<style scoped lang="stylus">
.asidebox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #fff;

  .el-menu {
    width: 100%;
    height: 100%;
    h2 {
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 20px;
    }

    a{
      color: #fff;
      text-decoration: none;
    }
  }
}

.el-menu-item.is-active {
  color: rgb(255, 208, 75);
}

.is-active {
  .router-link-exact-active {
    color: rgb(255, 208, 75);
  }
}
</style>