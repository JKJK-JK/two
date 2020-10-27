<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }"> 首页 </el-breadcrumb-item>
      <el-breadcrumb-item> 角色列表 </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 弹出对话框的开关 -->
    <el-button type="primary" @click="addlist" size="small"
      >添加</el-button
    >

    <el-table
      :data="menulist"
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        label="名称"
        width="180"
        prop="rolename"
      ></el-table-column>

      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-tag effect="dark" type="success" v-if="scope.row.status == 1"
            >启用</el-tag
          >
          <el-tag effect="dark" type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editFn(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="新增菜单"
      :visible.sync="dialogvisible"
      width="50%"
      @close="reset"
    >
      <!-- 在弹出对话框中插入表单 -->
      <el-form
        label-width="100px"
        :model="formdata"
        :rules="rules"
        ref="menuform"
      >
        <!-- lebel:表单域文本 -->
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="formdata.rolename"></el-input>
        </el-form-item>
        <!-- 通过pid 的值来判断 显示的输入框 -->
        <el-form-item prop="menus" label="角色权限">
          <el-tree
            check-strictly
            ref="tree"
            :data="lists"
            show-checkbox
            :default-checked-keys="checkedKeys"
            node-key="id"
            :props="{
              children: 'children',
              label: 'title',
            }"
          ></el-tree>
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
export default {
  data() {
    return {
      menulist: [], //role页列表
      lists: [], //添加页获取的menulist
      formdata: {
        //添加页信息
        rolename: "",
        menus: [],
        status: true,
      },
      checkedKeys: [],
      dialogvisible: false, //弹出窗口状态
      rules: {
        //自定义规则
        rolename: [
          {
            required: true,
            message: "填写角色名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getList();
    this.getMenus();
  },
  methods: {
    //   子组件点击编辑按钮触发自定事件的事件处理函数
    addlist(){
        this.dialogvisible = true
    },
    async editFn(row) {
    console.log(row);
      this.dialogvisible = true; //弹框出现
      let res = await this.$http.get(this.$api.ROLEINFO,{id:row.id})
        console.log(res);
      if(res.code==200){
          this.formdata.status = res.list.status == 1 ? true : false;
          this.formdata.menus = res.list?res.list.menus.split(","):[];
          this.checkedKeys = res.list?res.list.menus.split(","):[];
          this.formdata.rolename = res.list.rolename;
          this.formdata.id =row.id
      }else{
          this.$message.error(res.msg)
      }
      console.log(this.formdata.menus);
      
      
    },
    reset() {
      //重置弹出窗口表单数据
      this.formdata = {
        rolename: "",
        menus: [],
        status: true,
      };
    },
    //   提交事件
    async submit() {
      //根据是否存在id来判断进行新增还是编辑操作
      let url = this.formdata.id ? this.$api.ROLEEDIT : this.$api.ROLEADD;
      this.formdata.status = this.formdata.status ? 1 : 2;

      this.formdata.menus = this.$refs.tree.getCheckedKeys().join(",");
      console.log(this.$refs.tree.getCheckedKeys());

      let str = this.$qs.stringify(this.formdata);
      let res = await this.$http.post(url, str);
      //   console.log(this.formdata)
      if (res.code == 200) {
        this.$message.success("操作成功");
      } else {
        this.$message.error(res.msg);
      }
      this.dialogvisible = false;
      this.getList();
    },

    async getList() {
      //获取role页面数据
      let res = await this.$http.get(this.$api.ROLELIST);
      if (res.code == 200) {
        this.menulist = res.list ? res.list : [];
        console.log(this.menulist);
      } else {
        this.$message.error(res.msg);
      }
    },
    async getMenus() {
      //获取弹出框表单menulist数据
      let res = await this.$http.get(this.$api.MENULIST, { istree: true });
      if (res.code == 200) {
        this.lists = res.list ? res.list : [];
      } else {
        this.$message.error(res.msg);
      }
    },
    async deletedata(id){
        let res=await this.$http.post(this.$api.ROLEDELETE,this.$qs.stringify({id}));
        if(res.code==200){
            this.$message.success("删除成功");
            this.getList()
        }else{
            this.$message.error(res.msg)
        }
    },
    handleDelete(id) {
      console.log(id);
      this.$confirm("此操作将永久删除，是否继续？","",{
          $confirmButtonText:"确定",
          $cancelButtonText:"取消",
          type:"warning"
      }).then(()=>{
          this.deletedata(id);//确认删除，调用删除函数
      }).catch(()=>{});
    },
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