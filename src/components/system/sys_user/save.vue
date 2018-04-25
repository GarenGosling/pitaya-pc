<template>
  <div class="btn-component-div">
    <el-tooltip class="item" effect="dark" content="打开弹窗，填写用户信息" placement="bottom">
      <el-button type="primary" size="small" icon="el-icon-news" @click="openSaveDialog" :loading="btnLoading">新增</el-button>
    </el-tooltip>

    <!-- 【新增】对话框 开始-->
    <el-dialog title="新增" :visible.sync="dialog.saveDialogVisible" @close="closeSaveDialog">
      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-input placeholder="用户名" v-model="smdParam.nickName">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="姓名（必填）" v-model="smdParam.realName">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-input placeholder="手机号（必填）" v-model="smdParam.phone">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="身份证号" v-model="smdParam.idNumber">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-select v-model="smdParam.province" filterable placeholder="省份" style="width: 100%;">
            <el-option
              v-for="item in options.province"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="smdParam.city" filterable placeholder="城市" style="width: 100%;">
            <el-option
              v-for="item in options.city"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-input placeholder="微信号" v-model="smdParam.wechat">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="QQ号" v-model="smdParam.qq">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="12">
          <el-input placeholder="邮箱" v-model="smdParam.email">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-select v-model="smdExtendParam.roles" filterable multiple placeholder="角色" style="width: 100%;">
            <el-option
              v-for="item in options.roles"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.saveDialogVisible = false" :loading="winBtnLoading">取 消</el-button>
        <el-button type="primary" @click="saveDialogCommit" :loading="winBtnLoading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 【新增】对话框 结束-->
  </div>
</template>

<script>

  export default {
    name: 'my-save',
    props: ['btnLoading', 'options'],
    data () {
      return {
        winBtnLoading: false,
        dialog: {
          saveDialogVisible: false
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
          province: [
            {value: '01',label: '北京'},
            {value: '02',label: '上海'},
            {value: '03',label: '河北'},
            {value: '04',label: '黑龙江'},
          ],
          city: [
            {value: '01',label: '通州'},
            {value: '02',label: '朝阳'},
            {value: '03',label: '丰台'},
            {value: '04',label: '海淀'},
          ],
          roles: [
            {value: 'AAA',label: '超级管理员'},
            {value: 'BBB',label: '公司管理员'},
            {value: 'CCC',label: '业务管理员'},
            {value: 'DDD',label: '系统管理员'},
            {value: 'EEE',label: '报表管理员'},
          ]
        },
        smdExtendParam: {
          roles: [],
        }
      }
    },
    methods: {
      openSaveDialog(){
        this.dialog.saveDialogVisible = true
      },
      closeSaveDialog(){
        this.cleanSmdDialog();
        this.dialog.saveDialogVisible =false;
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
        this.smdExtendParam.roles = [];
        this.smdParam.createTime = '';
      },
      saveDialogCommit(){
        var that = this;
        if(that.smdExtendParam.roles){
          that.smdParam.roles = that.smdExtendParam.roles.join(',');
        }
        that.$AJAX.POST(that, that.smdParam, 'sysUser/save', true, function(response){
          that.closeSaveDialog();
          that.$emit('search');
        });
      },
    }
  }
</script>
