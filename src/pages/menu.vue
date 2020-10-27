<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }"> 首页 </el-breadcrumb-item>
      <el-breadcrumb-item> 菜单列表 </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 弹出对话框的开关 -->
    <el-button type="primary" @click="dialogvisible = true" size="small">添加</el-button>
    <!-- 页面表格组件---菜单列表 ---->
    <metable :menulist="menulist" @changMenu="changeFn" @edit="editFn"></metable>
    <!-- 添加弹出框 -->
    <el-dialog
      title="新增菜单"
      :visible.sync="dialogvisible"
      width="50%"
      @open="getTop"
      @close="reset"
    >
      <!-- 在弹出对话框中插入表单 -->
    <el-form label-width="100px" 
             :model="formdata" 
             :rules="rules" 
             ref="menuform">
        <!-- lebel:表单域文本 -->
        <el-form-item label="菜单名称">
          <!-- {{formdata.pid}} -->
          <el-select v-model="formdata.pid" placeholder="请选择" @change="changeMenu">
            <!-- key:标识
                label:选择项的文本
                value:当前项被选中的value (v-model绑定的值变成选中项的value)
            -->

            <el-option :key="0" label="顶级菜单" :value="0"></el-option>
            
            <el-option v-for="item in topmenu" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="formdata.title"></el-input>
        </el-form-item>
        <!-- 通过pid 的值来判断 显示的输入框 -->
        <el-form-item label="菜单图标" v-if="formdata.pid==0">
          <el-input v-model="formdata.icon"></el-input>
        </el-form-item>
        <el-form-item label="菜单地址" v-else>
          <el-input v-model="formdata.url"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio v-model="formdata.type" :disabled="formdata.type!==1" :label="1">目录</el-radio>
          <el-radio v-model="formdata.type" :disabled="formdata.type===1" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item label="状态">
          <!-- <p>{{formdata.status}}</p> -->
          <el-switch v-model="formdata.status"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogvisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import metable from "@/components/metable";
export default {
  components: {
    //引入的组件
    metable,
  },
  data() {
    return {
      menulist: [],
      formdata: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: true,
      },
      dialogvisible: false,
      topmenu: [],
      rules: {
        title: [
          {
            required: true,
            message: "填写菜单名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    //   子组件点击编辑按钮触发自定事件的事件处理函数
    editFn(row){
        this.dialogvisible = true;//弹框出现
        console.log(row);
        // 向formdata添加id属性
        this.formdata = {
            ...row
        }
        this.formdata.status = this.formdata.status==1?true:false;
    },
    reset(){
        this.formdata= {
            pid: 0,
            title: "",
            icon: "",
            type: 1,
            url: "",
            status: true
        }
    },
    //   提交事件
    submit() {
        //根据是否存在id来判断进行新增还是编辑操作
      let url = this.formdata.id?this.$api.MENUEDIT:this.$api.MENUADD;
      this.formdata.status = this.formdata.status ? 1 : 2;
      console.log(this.formdata)
      this.$refs.menuform.validate(value => {
        if (!value) {
          return false;
        }
        // console.log(this.formdata)
        this.$http.post(url, this.formdata).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.$message.success("操作成功");
            this.getList();//获取最新的列表数据
            this.dialogvisible = false;//关闭对话框
          }
        });
      });
    },

    // 切换菜单名称时触发
    changeMenu(pid) {
      //   console.log(pid)
      this.formdata.type = pid > 0 ? 2 : 1;
    },
    // 子组件触发的自定义事件
    changeFn(menulist) {
      this.menulist = menulist;
    },
    async getList() {
      let res = await this.$http.get(this.$api.MENULIST, { istree: true });
      if (res.code == 200) {
        this.menulist = res.list ? res.list : [];
      } else {
        this.$message.error(res.msg);
      }
    },
    async getTop(){
      let res = await this.$http.get(this.$api.MENULIST,{pid:0});
      if(res.code==200){
        this.topmenu= res.list?res.list:[];
      }else{
        this.$message.error(res.msg);
      }
    }
  },
};
</script>
<style scoped lang="stylus">
div {
  text-align: left;
  .el-button {
    font-size: 17px;
    margin: 7px 0px;
  }
}
</style>
