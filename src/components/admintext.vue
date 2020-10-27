<template>
  <div>
    <el-dropdown @command="loselogin">
      <span>{{username}}</span>
      <i class="el-icon-setting"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  props:{
    username:{
      required:true,
      type:String
    }
  },
  methods: {
    loselogin(){
      this.$store.commit("clearInfo");
      this.$router.replace("/login")
    }
  },
}
</script>