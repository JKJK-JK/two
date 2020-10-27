<<template>
    <div class="bigBg">
        <div class="elDiv">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <h2>管理系统登录</h2>
                <el-form-item prop="username" lable>
                    <el-input type="text" v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form>
                    <el-button type="primary" @click="submit('ruleForm')">登录系统</el-button>
                    <!-- ruleForm是将用户输入内容作为函数参数 -->
                </el-form>
            </el-form>
        </div>
    </div>
</template>>
<script>
import {mapMutations,mapActions} from "vuex";
export default {
    methods:{
      ...mapMutations(["setInfo"]),
      ...mapActions(["userLogin"]),
        submit(ruleFormdata){
          console.log(this.$store);
            this.$refs[ruleFormdata].validate(value=>{
                if(!value){
                    return false;
                }
                let str = this.$qs.stringify(this.ruleForm)
                this.$http.post(this.$api.USERLOGIN,this.ruleForm).then(res=>{
                  console.log(res);
                    if(res.code == 200){
                        this.setInfo({token:res.list.token,info:res.list});//登录时拿到token和用户登录信息
                        this.$router.replace("/index");
                    }else{
                        this.$message.error(res.msg);
                    }
                });
            });
        }
    },
    data(){
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          //对用户名的验证
          {
            required: true,
            message: "请输入管理员名称",
            trigger: "blur",
          },
          {
            pattern: /^\S{4,8}$/g,
            message: "请输入4-8位非空字符",
            trigger: "blur",
          },
        ],
        password: [
          //对用户密码的验证
          {
            required: true, //required表示必填项
            message: "请输入管理员密码",
            trigger: "blur",
          },
          {
            max: 8,
            min: 5,
            message: "请输入5-8位正确密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
};
</script>
<style scoped lang="stylus">
.bigBg {
  height: 100%;
  background: -webkit-linear-gradient(left, #563443, #413a53, #2f3d60);

  .elDiv {
    width: 300px;
    height: 250px;
    text-align: center;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;

    h2 {
      color: #fff;
      margin-bottom: 20px;
    }

    .el-button {
      width: 100%;
    }
  }
}
</style>