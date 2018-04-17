<template>
  <div class="signin">
    <div class="contain">
      <div class="left">
        <h1>[ H+ ]</h1>
          <span>欢迎使用 <strong>H+ 后台主题UI框架</strong></span>
          <ul>
            <li><i></i> 优势一</li>
            <li><i></i> 优势二</li>
            <li><i></i> 优势三</li>
            <li><i></i> 优势四</li>
            <li><i></i> 优势五</li>
          </ul>
          <strong>还没有账号？ <a href="#">立即注册&raquo;</a></strong>
      </div>
      <div class="right">
        <form method="post" action="index.html">
          <h4>登录：</h4>
          <p>登录到H+后台主题UI框架</p>
          <el-input
            placeholder="用户名"
            suffix-icon="el-icon-mobile-phone"
            v-model="input2">
          </el-input>
          <el-input
            placeholder="密码"
            suffix-icon="el-icon-view"
            v-model="input2">
          </el-input>
          <a href="">忘记密码了？</a><br>
          <el-button type="primary">登录</el-button>
        </form>
      </div>
    </div>
    <div class="footer">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .signin{position:fixed;left:0;top:0;width:100%;height:calc(100vh);background:url(../../static/image/login-background.jpg) no-repeat center fixed;-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;background-size:cover;color:rgba(255,255,255,.95)}

  .left {
    width:50%;
    /*background-color: red;*/
    float:left;
    text-align:left;
    font-size: 14px;
  }

  .right {
    width:30%;
    background: rgba(255,255,255,.2);
    float:left;
    text-align:left;
    padding-top:15px;
    padding-bottom:15px;
    padding-left:20px;
    padding-right:20px;
    font-size: 14px;
    *border:1px solid #E9EEF3;
  }
  .contain {
    width:50%;
    margin-top:10%;
    margin-left:30%;
    background-color:#ccffdd;
  }
  .el-input{
    margin-top:5px;
    margin-bottom:10px;
  }
  .el-button{
    width:100%;
    margin-top:10px;
  }

</style>
