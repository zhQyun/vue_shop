<template>
  <div class="login-view platform">
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <div class="title">
          校园安全综合管理系统
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="24" >
        <div>
          <div class="login-form">
            <div class="login-title">登录 / login</div>
            <div class="login-box"><img src="../assets/img/loginIcon.png"></div>

              <el-divider></el-divider>
              <el-form  :label-position="labelPosition" label-width="75px" :model="formLabelAlign" :rules="rules" ref="ruleForm" :disabled="logging">
                <el-form-item label="账  号"  prop="loginName">
                  <el-input v-model.trim="formLabelAlign.loginName" placeholder="请输入账号" :style="{width:'260px'}"></el-input>

                </el-form-item>
                <el-form-item label="密  码"  prop="password" >

                  <el-input type="password" v-model.trim="formLabelAlign.password" placeholder="请输入密码" :style="{width:'260px'}"></el-input>

                </el-form-item>
                <el-form-item label="验证码"  prop="code">

                  <div class="from-validateCode">
                    <el-input v-model.trim="formLabelAlign.code" placeholder="请输入验证码" :style="{width:'140px'}" ></el-input>
                    <img :src='imgUrl+srcImg1' class="validateCode hover" @click="getVcode">
                  </div>
                </el-form-item>
              </el-form>
              <el-divider></el-divider>
              <!-- <el-row type="flex" justify="space-between" class="m-other">
              <el-col :span="10">
              <div>
              <el-checkbox v-model="admin">记住账户7897897898</el-checkbox>
              </div>
              </el-col>
              <el-col :span="10">
              <div class="forget-pas hover">忘记密码？</div></el-col>
              </el-row> -->
              <el-button type="primary" class="button-bg" @click="login" v-loading="logging"
                         element-loading-background="rgba(0, 0, 0, 0.5)"
              >登录</el-button>
          </div>
        </div>
        <div class="foot-title" >© 厦门熙重电子科技有限公司</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import api from '../api/webpackAPI'
  import TYPE from '../store/storeType'
  export default {
    name: 'login',
    data() {
      let loginname = (rule, value, callback) => {
        if (value=='') {
          return  callback(new Error('请输入账号!'));
        }
        callback();
      };
      let password = (rule, value, callback) => {
        if (value=='') {
          return  callback(new Error('请输入密码!'));
        }
        callback();
      };
      let vcode = (rule, value, callback) => {
        if (value=='') {
          return  callback(new Error('请输入验证码!'));
        }
        callback();
      };
      return {
        imgUrl:api.ROOT,
        admin:false,
        logging:false,
        labelPosition: 'right',
        srcImg1:'',
        formLabelAlign: {
          loginName: '',
          password:'',
          code:''
        },
        rules:{
          loginName: [
            { validator: loginname, trigger: 'blur' }
          ],
          password: [
            { validator: password, trigger: 'blur' }
          ],
          code: [
            { validator: vcode, trigger: 'blur' }
          ],
        }
      };
    },
    methods:{
      login(){
        if(this.formLabelAlign.loginName==''){
          this.$message({
            type: 'error',
            message: '账号不得为空'
          });
          return
        }else if(this.formLabelAlign.password==''){
          this.$message({
            type: 'error',
            message: '密码不得为空'
          });
          return
        }else if(this.formLabelAlign.code==''){
          this.$message({
            type: 'error',
            message: '验证码不得为空'
          });
          return
        }
        this.$axios.post('login',this.formLabelAlign).then((res) => {
          if(res.data.code==200){
            this.logging=false
            let result = res.data.data;
            // let localStorage = window.localStorage;
            // localStorage.setItem('id', result.id);
            // localStorage.setItem('user_name', result.name);
            sessionStorage.setItem('user_name', result.loginName)
            sessionStorage.setItem('userId',result.id)
            // this.$store.commit(TYPE.login,res.data.data)
            this.$router.push({path:'/'})
            // 在请求成功后把document.onkeydown置为undefined
            document.onkeydown = undefined;
              this.$message({
                message: '登录成功!',
                type: 'success',
                duration: 1500,
                customClass: 'xz-alert-common'
              })
          }
        })
        // this.$refs['ruleForm'].validate((valid) => {
        //   if (valid) {
        //     this.logging=true
        //
        //   }
        // });
      },
      getVcode(){
        this.srcImg1="getCode"
      }
    },
    created() {
        this.$axios.get('getCode').then((res) => {

        })
      //enter登录事件
      document.onkeydown = (e) => {
        let key = window.event.keyCode;
        if (key == 13) {
          this.login();
        }
      }
      this.getVcode()
    },
    watch:{

    },
    computed:{
    }
  }
</script>

<style lang="less" scoped>
  .platform {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background: url(../assets/img/login.png) no-repeat left top;
  background-size: cover;
  }
  .login-view{
    .title {
      font-size: 36px;
      height: 35px;
      line-height: 35px;
      font-weight: bold;
      text-shadow: 0 0 5px rgba(0, 0, 0, .3);
      // padding-top: 160px;
      color: rgba(255,255,255,1);
      margin: 50px 0 0 56px;
      text-align: left;
      letter-spacing: 8px;
    }
    .login-form {
      width: 425px;
      height: 524px;
      background: #313d84;
      color: #fff;
      padding: 30px 41px 76px 39px;
      margin: 193px 308px 0 1187px;
      box-sizing: border-box;
      background:rgba(255,255,255,1);;
      border:1px solid rgba(0,185,255,1);
      box-shadow:0px 15px 27px 0px rgba(79,78,78,0.52);
      border-radius:10px;
    }
    .login-title{
      font-size: 16px;
      // letter-spacing: 10px;
      text-align: left;
      color:rgba(255,255,255,.99);
      // margin-top: 10px;
      background:linear-gradient(0deg,rgba(20,81,255,1) 0.78125%, rgba(87,221,255,1) 60.888671875%, rgba(20,81,255,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;

    }
    .from-validateCode {
      display: flex;
      justify-content: end;
      align-items: center;
    }
    .validateCode{
      width: 108px;
      height: 32px;
      margin-left: 10px;
      background: #f1f1f1
    }
    .button-bg{
      background: #0c6ded;
      border: none;
      display: block;
      color: #fff;
      text-align: center;
      font-size: 20px;
      letter-spacing: 15px;
      cursor: pointer;
      outline: none;
      width: 100%;
      margin-bottom: 35px;
      background:linear-gradient(-90deg,rgba(0,114,255,1),rgba(0,198,255,1));
      box-shadow:0px 6px 4px 0px rgba(38,32,108,0.13);
      border-radius:19px;
    }
    .el-form-item {
      margin-bottom: 50px;
    }
    .el-input{
      display: block;
      border-bottom:1px solid rgba(170,170,170,1);
    }
    .el-divider--horizontal{
      background:linear-gradient(90deg,rgba(20,81,255,1),rgba(87,221,255,1),rgba(20,81,255,1));
    }

    .foot-title{
      position: relative;
      bottom: -42px;
      color: #ccc;
      font-size: 1.25rem;
      letter-spacing: 5px;
      text-align: center;
    }
    .text-f .el-form-item__label{
      letter-spacing: 12px;
    }
    .forget-pas{
      font-size:12px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
      text-align: right;
      background:linear-gradient(0deg,rgba(20,81,255,1) 0.78125%, rgba(87,221,255,1) 60.888671875%, rgba(20,81,255,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
    }
    .el-checkbox__label{
      font-size:12px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
      background:linear-gradient(0deg,rgba(20,81,255,1) 0.78125%, rgba(87,221,255,1) 60.888671875%, rgba(20,81,255,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
    }
    .m-other{
      margin-bottom: 55px;
    }
  }

</style>

<style>
  .login-form .el-input__inner{
    border: none;
    font-size: 16px;
  }
  .login-form .el-form-item__label{
    font-size: 16px;
  }
  .login-box{
     width: 68px;
     height: 68px;
     margin: 0 auto;
  }
</style>
