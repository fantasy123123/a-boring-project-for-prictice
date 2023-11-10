<template>
    <div class="demo-input-suffix" id="accountSignIn">
            <div style="padding-bottom: 30px">
                <el-input
                    v-model="account"
                    class="w-50 m-2"
                    placeholder="请输入学号/工号"
                    size="large"
                    id="accountInput"
                >
                    <template #prefix>
                        <el-icon class="el-input__icon"><account-pic/></el-icon>
                    </template>
                </el-input>
            </div>

            <div style="padding-bottom: 30px">
                <el-input
                    v-model="password"
                    class="w-50 m-2"
                    placeholder="请输入密码"
                    size="large"
                    id="accountInput"
                >
                    <template #prefix>
                        <el-icon class="el-input__icon"><password-pic /></el-icon>
                    </template>
                </el-input>
            </div>

        <div id="checkBoxDiv">
            <input type="checkbox" checked id="checkbox">
            <label for="checkbox">7天免登录</label>
        </div>

        <div id="accountWarning">
            {{msg}}
        </div>

        <label id="accountButton">
            <button class="accountButton" @click.prevent="verify">登 录</button>
        </label>
    </div>

    <div class="accountWrapper">
        <div class="box">
            <a href="/public/changePassword.html" style="text-decoration: none">
                <div class="item1">
                    忘记密码
                </div>
            </a>
            <a href="about:blank" style="text-decoration: none">
                <div class="item1">
                    账号申诉
                </div>
            </a>
        </div>
        <div class="box">
            <a href="about:blank" style="text-decoration: none">
                <div class="item2">账号激活
                </div>
            </a>
            <a href="/public/addUser.html" style="text-decoration: none">
                <div class="item2">账号申请
                </div>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import accountPic from "./accountPic.vue";
import passwordPic from "./passwordPic.vue";
import axios from "axios";
export default {
    name:'accountSignIn',
    components:{accountPic,passwordPic},
    setup(){
        let account = ref('')
        let password = ref('')
        let msg=ref('')

        function verify(){
            //去除前后空格
            account.value=account.value.replace(/(^\s*)|(\s*$)/g, "");
            password.value=password.value.replace(/(^\s*)|(\s*$)/g, "");

            if(account.value==='')
            {
                msg.value='请输入学号/工号！'
            }
            else if(account.value!==''&&password.value==='')
            {
                msg.value='请输入密码！'
            }
            else if(account.value!==''&&password.value!=='')
            {
                msg.value=''
                axios.get('http://127.0.0.1:3000/users').then(
                    response=>{
                        let ifExist=ref(false);
                        let userList=response.data;
                        //判断是否存在用户
                        for(let i=0;i<userList.length;i++){
                            if((parseInt(account.value)===userList[i].studentNumber)){
                                ifExist.value=true;
                                let ver=ref(true)

                                //判断密码
                                if(password.value!==userList[i].pwd){
                                    msg.value='密码错误！'
                                    ver.value=false
                                }

                                if(ver.value===true)
                                {
                                    msg.value=''
                                    location.assign('about:blank')
                                    alert("登录成功")
                                    break;
                                }
                            }
                        }
                        if(ifExist.value===false)
                        {
                            msg.value='用户不存在！'
                        }
                    },
                    error=>{
                        msg.value='获取后台数据失败';
                        console.log(error.message)
                    })
            }
        }

        return{account,password,msg,verify}
    },
}
</script>

<style>
#accountSignIn{
    position: absolute;
    top:18%;
    left:8%;
}

#accountInput{
    width: 355px;
    height: 60px;
    font-size: large;
}

.el-input--large .el-input__inner{
    margin-left: 15px;
}

 #checkBoxDiv{
     position: absolute;
     top:88%;
     font-size: 22px;
 }

 #accountButton{
     position: absolute;
     top:125%;
 }

 .accountButton{
     width: 421px;
     height: 65px;
     background-color: #0083ff;
     border: none ;
     color: white;
     font-size: 25px;
     border-radius: 7px;
 }

 .accountButton:hover{
     background-color: #0011e5;
 }

 .accountButton:active{
     color: grey;
 }

 #checkbox{
     height: 18px;
     width: 18px;
     color: aqua;
 }

 #accountWarning{
     position: absolute;
     top:110%;
     left: 2%;
     font-size: 18px;
     color: red;
 }

.accountWrapper{
     position: absolute;
     top:72.5%;
     left: 9%;
     height: 60px;
     width: 410px;
     display: flex;
     justify-content: space-between;
     font-size: 18px;
    font-family: sans-serif ;
 }

 .accountWrapper .box{
     display: flex;
     flex-direction: column;
     justify-content: space-between;
 }

 .item1{
     color: #73757E;
 }

 .item2{
     color: #0c4af9;
 }
</style>


