<template>
      <div id="inform">
          <el-tabs
                  v-model="activeName"
                  class="demo-tabs"
                  :stretch="true"
                  ref="tabs"
                  @tab-change="change"
          >
              <el-tab-pane label="账号登陆" name="first"></el-tab-pane>
              <el-tab-pane label="动态码登录" name="second"></el-tab-pane>
          </el-tabs>
          <div v-if="whichWay===true">
              <keep-alive>
                  <account-sign-in/>
              </keep-alive>

          </div>
          <div v-if="whichWay===false">
              <keep-alive>
                  <dynamic-code-sign-in/>
              </keep-alive>

          </div>

      </div>
      <div id="otherSignIn">
         <span id="otherSignInText">{{otherSignIn}}</span>
            <a href="about:blank">
               <img src="/otherSignIn/qq.png" id="qq" alt="qqSignIn">
            </a>
            <a href="about:blank">
                <img src="/otherSignIn/wechat.png" id="wechat" alt="wechatSignIn">
            </a>
      </div>
</template>

<script>
import accountSignIn from "./accountSignIn.vue";
import { ref } from 'vue'
import dynamicCodeSignIn from "./dynamicCodeSignIn.vue";
export default {
    name:'signIn',
    components:{accountSignIn,dynamicCodeSignIn},
    setup(){
        let otherSignIn='其他登录方式'
        let activeName = ref('first')
        let whichWay=ref(true)

        function change(){
            if(activeName.value==="first")
            {
                whichWay.value=true;

            }
            else if(activeName.value==="second")
            {
                whichWay.value=false;

            }
        }

        return{otherSignIn,activeName,whichWay,change}
    }
}
</script>

<style>
.demo-tabs{
    position: absolute;
    top: 6%;
    right: 15%;
    left:8%;
    width: 425px;
}

.demo-tabs .el-tabs__item{
    font-size: 23px;
    font-family: sans-serif;
    display:inline-block;
    padding: 0;
}


#inform{
    border-top-left-radius: 7.5px;
    border-top-right-radius: 7.5px;
    height: 500px;
    width: 520px;
    background-color: white;
}
#otherSignIn{
    border-bottom-left-radius:7.5px ;
    border-bottom-right-radius:7.5px ;
    height: 75px;
    width: 520px;
    background-color: aliceblue;
    display: flex;
    align-items: center;
    position: relative;
}
#otherSignInText{
    color: #0c4af9;
    font-size: 20px;
    font-family: sans-serif;
    position: absolute;
    left:8%;
}

#qq{
    position: absolute;
    left:35%;
    top:20%;
    height: 45px;
    width: 45px;
}

#wechat{
    position: absolute;
    left:50%;
    top:20%;
    height: 45px;
    width: 45px;
}
</style>

