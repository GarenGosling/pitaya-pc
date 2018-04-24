<template>
  <div class="text-component-div">
    <el-button @click="openDetailDialog()" type="text" size="small">查看</el-button>

    <!-- 【查看】对话框 开始-->
    <el-dialog title="查看" :visible.sync="dialog.detailDialogVisible" width="60%" @close="closeDetailDialog" append-to-body>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">ID：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.code || '-'}}</el-col>
        <el-col :span="3" class="my-head">用户名：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.nickName || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">姓名：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.realName || '-'}}</el-col>
        <el-col :span="3" class="my-head">密码：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.password || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">手机号：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.phone || '-'}}</el-col>
        <el-col :span="3" class="my-head">身份证号：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.idNumber || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">省份：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.province || '-'}}</el-col>
        <el-col :span="3" class="my-head">城市：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.city || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">微信：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.wechat || '-'}}</el-col>
        <el-col :span="3" class="my-head">QQ：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.qq || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">Email：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.email || '-'}}</el-col>
        <el-col :span="3" class="my-head">角色：</el-col>
        <el-col :span="9" class="my-content">{{rolesUtil(smdParam.roles) || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="3" class="my-head">创建时间：</el-col>
        <el-col :span="9" class="my-content">{{smdParam.createTime || '-'}}</el-col>
        <el-col :span="3" class="my-head"></el-col>
        <el-col :span="9" class="my-content"></el-col>
      </el-row>
    </el-dialog>
    <!-- 【查看】对话框 结束-->
  </div>
</template>

<script>

  export default {
    name: 'my-model',
    props: ['rowData'],
    data () {
      return {
        dialog: {
          detailDialogVisible: false
        },
        smdParam: {
          id: '',
          code: '',
          nickName: '',
          realName: '',
          password: '',
          phone: '',
          idNumber: '',
          province: '',
          city: '',
          wechat: '',
          qq: '',
          email: '',
          roles: '',
          createTime: ''
        },
        options: {
          roles: [
            {value: 'AAA',label: '超级管理员'},
            {value: 'BBB',label: '公司管理员'},
            {value: 'CCC',label: '业务管理员'},
            {value: 'DDD',label: '系统管理员'},
            {value: 'EEE',label: '报表管理员'},
          ]
        },
      }
    },
    methods: {
      openDetailDialog() {
        this.setSmdDialog(this.rowData);
        this.dialog.detailDialogVisible = true;
      },
      closeDetailDialog(){
        this.cleanSmdDialog();
        this.dialog.detailDialogVisible = false;
      },
      setSmdDialog(row){
        this.smdParam.id = row.id;
        this.smdParam.code = row.code;
        this.smdParam.nickName = row.nickName;
        this.smdParam.realName = row.realName;
        this.smdParam.password = row.password;
        this.smdParam.phone = row.phone;
        this.smdParam.idNumber = row.idNumber;
        this.smdParam.province = row.province;
        this.smdParam.city = row.city;
        this.smdParam.wechat = row.wechat;
        this.smdParam.qq = row.qq;
        this.smdParam.email = row.email;
        this.smdParam.roles = row.roles;
        this.smdParam.createTime = row.createTime;
      },
      cleanSmdDialog(){
        this.smdParam.id = '';
        this.smdParam.code = '';
        this.smdParam.nickName = '';
        this.smdParam.realName = '';
        this.smdParam.password = '';
        this.smdParam.phone = '';
        this.smdParam.idNumber = '';
        this.smdParam.province = '';
        this.smdParam.city = '';
        this.smdParam.wechat = '';
        this.smdParam.qq = '';
        this.smdParam.email = '';
        this.smdParam.roles = '';
        this.smdParam.createTime = '';
      },
      rolesUtil(values){
        var that = this;
        if(!values){
          return null;
        }
        var roleArr = values.split(',');
        var texts = "";
        for(var i=0;i<roleArr.length;i++){
          var key = roleArr[i];
          if(that.options.roles){
            for(var j=0;j<that.options.roles.length;j++){
              var roleObj = that.options.roles[j];
              if(roleObj.value == key){
                var text = roleObj.label;
                texts += text;
                if(i<roleArr.length-1){
                  texts += ",";
                }
              }
            }
          }
        }
        return texts;
      },
    }
  }
</script>
