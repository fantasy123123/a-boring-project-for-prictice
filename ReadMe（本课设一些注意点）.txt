一、关于后端：
1.后端的本地服务器用node.js搭建的。代码在server.cjs中。终端运行node server.cjs即可启动本地服务器。

2.后端服务器中的测试数据中有两个学生信息：[{"studentNumber":1,"pwd":"123","phone":123},{"studentNumber":2,"pwd":"123123","phone":123123}];

3.后端服务器端口：3000。

二、关于前端
1.暂未实现功能：切换语言，发短信验证码与扫二维码登录。

2.扫二维码登录处我放的是别的照片与文字，须修改。

3.账号申诉、QQ登录等需要跳转页面的地方点击后都会跳转至空白页。（除了忘记密码和申请账号）

4.登陆成功后，会先弹窗提示登陆成功，后跳转至空白页。

5.代码稳定性较差，放大或缩小界面会造成文字被遮挡等问题，以及不知道屏幕大小等等会不会对界面造成影响。

6.点击获取短信动态码三秒后输入框自动出现六位数字。
个人暂未有能力实现发送验证码至手机的功能。

7.修改密码功能和申请账号功能界面比较简陋，并且用的纯HTML+CSS+JS写的，没有用vue。
并且修改密码和申请账号暂时无法做到永久修改，重启后端服务器后修改的密码又会变为初始的密码，申请的账号也会没有。