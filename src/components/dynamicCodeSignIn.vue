<template>
    <div class="demo-input-suffix" id="accountSignIn">
        <div style="padding-bottom: 30px">
            <el-input
                    v-model="telephoneNumber"
                    class="w-50 m-2"
                    placeholder="请输入手机号/学号"
                    size="large"
                    id="dynamicCodeInput"
                    ref="input"
            >
                <template #prefix>
                    <el-icon class="el-input__icon"><account-pic/></el-icon>
                </template>
            </el-input>
        </div>

        <div style="padding-bottom: 30px">
            <el-input v-model="inputVerificationCode"
                      class="w-50 m-2"
                      placeholder="请输入验证码"
                      size="large"
                      id="dynamicCodeInput"
                      ref="input"
            >
                <template #prefix>
                    <el-icon class="el-input__icon"><protection-pic /></el-icon>
                </template>
                <template #suffix>
                    <SIdentify @getSIdentify="getSIdentify"/>
                </template>
            </el-input>
        </div>

        <div style="padding-bottom: 30px">
            <el-input
                v-model="dynamicCode"
                class="w-50 m-2"
                placeholder="请输入短信动态码"
                size="large"
                id="dynamicCodeInput"
                ref="input"
            >
                <template #prefix>
                    <el-icon class="el-input__icon"><password-pic/></el-icon>
                </template>
                <template #suffix>
                    <div @click.stop="reGet" id="dynamicCodeMsg">
                        {{ dynamicCodeMsg }}
                    </div>
                </template>
            </el-input>
        </div>

        <div id="dynamicCodeWarning">{{warningMsg}}</div>

        <label id="dynamicCodeButton">
            <button class="dynamicCodeButton" @click.prevent="verify">登 录</button>
        </label>

    </div>

    <div class="dynamicCodeWrapper">
        <div class="box">
            <a href="/public/changePassword.html" style="text-decoration: none">
                <div class="item1">忘记密码</div>
            </a>
        </div>
        <div class="box">
            <a href="about:blank" style="text-decoration: none">
                <div class="item2">账号激活</div>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { ref,nextTick ,onMounted} from 'vue'
import accountPic from "./accountPic.vue";
import passwordPic from "./passwordPic.vue";
import protectionPic from "./protectionPic.vue";
import SIdentify from "./SIdentify.vue";
import axios from "axios";
export default {
    name:'dynamicCodeSignIn',
    components:{accountPic,passwordPic,protectionPic,SIdentify},
    setup(){
        let telephoneNumber = ref('')
        let inputVerificationCode = ref('')
        let dynamicCode = ref('')
        let warningMsg=ref('')
        let verificationCode= ref('')
        let dynamicCodeMsg=ref('获取动态码')
        let dynamicCodeDiv
        let randomDynamicCode=ref('')

        onMounted(()=>{
            dynamicCodeDiv=document.getElementById('dynamicCodeMsg')
        })

        function getSIdentify(value){
            verificationCode.value=value
        }

        async function reGet(){
            if(dynamicCodeMsg.value==='获取动态码')
            {
                await nextTick()

                //随机生成短信动态码
                setTimeout(()=>{
                    const arr = ['0','1','2','3','4','5','6','7','8','9']
                    randomDynamicCode.value= arr[(parseInt(String(Math.random() * arr.length)))]
                        + arr[(parseInt(String(Math.random() * arr.length)))]
                        + arr[(parseInt(String(Math.random() * arr.length)))]
                        + arr[(parseInt(String(Math.random() * arr.length)))]
                        + arr[(parseInt(String(Math.random() * arr.length)))]
                        + arr[(parseInt(String(Math.random() * arr.length)))]
                    dynamicCode.value=randomDynamicCode.value;
                },3000)

                dynamicCodeDiv.style.color='grey';
                let i=60;
                let countDown=function (){
                    dynamicCodeMsg.value=`${i}秒后重新获取`
                }
                countDown();
                let timer=setInterval(()=>{
                    i--;
                    dynamicCodeMsg.value=`${i}秒后重新获取`
                    if(i===0)
                    {
                        clearInterval(timer)
                        dynamicCodeMsg.value='获取动态码'
                        dynamicCodeDiv.style.color='#0083ff';
                    }
                },1000)
            }
        }

        function verify(){
            //验证码模块
            telephoneNumber.value=telephoneNumber.value.replace(/(^\s*)|(\s*$)/g, "");
            inputVerificationCode.value=inputVerificationCode.value.replace(/(^\s*)|(\s*$)/g, "");
            dynamicCode.value=dynamicCode.value.replace(/(^\s*)|(\s*$)/g, "");

            if(telephoneNumber.value==='')
            {
                warningMsg.value='请输入手机号/学号！'
            }
            else if(telephoneNumber.value!==''&&inputVerificationCode.value==='')
            {
                warningMsg.value='请输入验证码！'
            }
            else if(telephoneNumber.value!==''&&inputVerificationCode.value!==''&&dynamicCode.value==='')
            {
                warningMsg.value='请输入短信动态码！'
            }
            else if(telephoneNumber.value!==''&&inputVerificationCode.value!==''&&dynamicCode.value!=='')
            {
                warningMsg.value=''
                axios.get('http://127.0.0.1:3000/users').then(
                    response=>{
                        let ifExist=ref(false);
                        let userList=response.data;
                        //判断是否存在用户
                        for(let i=0;i<userList.length;i++){
                            if((parseInt(telephoneNumber.value)===userList[i].phone)||(parseInt(telephoneNumber.value)===userList[i].studentNumber)){
                                ifExist.value=true;
                                let ver=ref(true)

                                //判断验证码与短信动态码
                                if(randomDynamicCode.value!==dynamicCode.value){
                                    warningMsg.value='短信动态码错误！'
                                    ver.value=false
                                }
                                if(verificationCode.value!==inputVerificationCode.value){
                                    warningMsg.value='验证码错误！'
                                    ver.value=false
                                }

                                if(ver.value===true)
                                {
                                    warningMsg.value=''
                                    location.assign('about:blank')
                                    alert("登录成功")
                                    break;
                                }
                            }
                        }
                        if(ifExist.value===false)
                        {
                            warningMsg.value='用户不存在！'
                        }
                    },
                    error=>{
                        warningMsg.value='获取后台数据失败';
                        console.log(error.message)
                    }
                )
            }
        }

        return{telephoneNumber,inputVerificationCode,dynamicCode,warningMsg,dynamicCodeMsg,verify,getSIdentify,reGet}
    },
}
</script>

<style>
#dynamicCodeMsg{
    position: absolute;
    top:18%;
    right:2.5%;
}

#accountSignIn{
    position: absolute;
    top:18%;
    left:8%;
}

#dynamicCodeInput{
    width: 355px;
    height: 60px;
    font-size: large;
}

.el-input--large .el-input__inner{
    margin-left: 15px;
}


#dynamicCodeButton{
    position: absolute;
    top:101%;
}

.dynamicCodeButton{
    width: 421px;
    height: 65px;
    background-color: #0083ff;
    border: none ;
    color: white;
    font-size: 25px;
    border-radius: 7px;
}

.dynamicCodeButton:hover{
    background-color: #0011e5;
}

.dynamicCodeButton:active{
    color: grey;
}

#dynamicCodeWarning{
    position: absolute;
    top:91.5%;
    left: 2%;
    font-size: 18px;
    color: red;
}

.dynamicCodeWrapper{
    position: absolute;
    top:80.5%;
    left: 9%;
    height: 60px;
    width: 410px;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-family: sans-serif ;
}

.dynamicCodeWrapper .box{
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

.el-input__suffix-inner:hover{
    font-size: 22px;
    color: #0011e5;
}

.el-input__suffix-inner{
    font-size: 22px;
    color: #0083ff;
}
</style>

