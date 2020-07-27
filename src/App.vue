<template>
  <div id="app" class="platform">
    <div>
      <router-view></router-view>
      <router-view name="login"></router-view>
    </div>
  </div>
</template>
<script>
  import TYPE from './store/storeType';
  import api from './api/webpackAPI'
  export default {
    data(){
      return{
        serverUser: "xzadmin",
        serverPasswd: "Xzsafe110",
        // videoUrl:api.videoUrl
      }
    },
    methods:{
      getVideoUrl(){
        let param = {
          "user": this.serverUser,
          "password": this.serverPasswd,
          "force": 0,
          "login_mode": 0
        };
        this.$axios.post(this.videoUrl+'/login', param,'NowithCredentials').then((res) => {
          if (res.data.ret == 0) {
            //获取的token，并作为申请预览时的url附带参数
            // this.$store.dispatch(TYPE.videoToken, res.data.tk);
            this.$store.commit(TYPE.getToken,res.data.tk);
          } else{
            alert(res.data.msg)
          }
        });

      },
    },
    created(){
      // this.getVideoUrl()
    },
  }
</script>
<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  /*.platform {*/
    /*width: 100%;*/
    /*height: auto;*/
    /*min-height: 100vh;*/
    /*background: url(./assets/login_Bj.png) no-repeat left top;*/
    /*background-size: cover;*/
  /*}*/


</style>
