<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="ID" prefix-icon="el-icon-search" v-model="searchParam.code"/>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="用户名" prefix-icon="el-icon-search" v-model="searchParam.nickName"/>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="姓名" prefix-icon="el-icon-search" v-model="searchParam.realName"/>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="手机号" prefix-icon="el-icon-search" v-model="searchParam.phone"/>
      </el-col>
    </el-row>
    <el-row style="text-align: left;margin-top: 10px;padding-bottom:10px;border-bottom: 1px solid #F2F6FC;">
      <el-button size="small" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button size="small" icon="el-icon-refresh" @click="resetSearch">重置</el-button>
      <el-button type="primary" size="small" icon="el-icon-news" @click="openSaveDialog">新增</el-button>
      <el-button type="success" size="small" icon="el-icon-download">模板</el-button>
      <el-button type="info" size="small" icon="el-icon-upload2">上传</el-button>
      <el-button type="warning" size="small" icon="el-icon-document">导出</el-button>
      <el-button type="danger" size="small" icon="el-icon-document">删除</el-button>
    </el-row>
    <el-table
      :data="page.tableData"
      stripe
      style="width: 100%;margin-top: 10px;text-align: left;" height="calc(100vh - 380px)">
      <el-table-column type="selection" width="55" fixed></el-table-column>
      <el-table-column type="index" width="50" fixed></el-table-column>
      <el-table-column fixed="left" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="openDetailDialog(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="openModifyDialog(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="openDeleteDialog(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="用户名" width="150" fixed></el-table-column>
      <el-table-column prop="realName" label="姓名" width="100" fixed></el-table-column>
      <el-table-column prop="phone" label="手机号"  width="110"></el-table-column>
      <el-table-column prop="idNumber" label="身份证号"  width="180"></el-table-column>
      <el-table-column prop="province" label="省份"  width="120"></el-table-column>
      <el-table-column prop="city" label="城市"  width="120"></el-table-column>
      <el-table-column prop="wechat" label="微信号" width="120"></el-table-column>
      <el-table-column prop="qq" label="QQ号" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="150"></el-table-column>
    </el-table>
    <div class="block" style="margin-top: 10px;">
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageNoChange"
        :current-page="page.currentPage"
        :page-sizes="[1, 5, 10, 20, 50, 100, 500]"
        :page-size="searchParam.length"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.recordsTotal">
      </el-pagination>
    </div>

    <!-- 【新增】对话框 开始-->
    <el-dialog title="新增" :visible.sync="dialog.saveDialogVisible" @close="closeSaveDialog">
      <el-row :gutter="20" class="detail-row">
        <el-col :span="12">
          <el-input placeholder="用户名" v-model="smdParam.nickName"/>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="姓名" v-model="smdParam.realName"/>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="12">
          <el-input placeholder="手机号" v-model="smdParam.phone"/>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="身份证号" v-model="smdParam.idNumber"/>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
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
      <el-row :gutter="20" class="detail-row">
        <el-col :span="12">
          <el-input placeholder="微信号" v-model="smdParam.wechat"/>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="QQ号" v-model="smdParam.qq"/>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="12">
          <el-input placeholder="邮箱" v-model="smdParam.email"/>
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
        <el-button @click="dialog.saveDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDialogCommit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 【新增】对话框 结束-->

    <!-- 【查看】对话框 开始-->
    <el-dialog title="查看" :visible.sync="dialog.detailDialogVisible" width="60%" @close="closeDetailDialog">
      <el-row :gutter="20" class="detail-row">
        <el-col :span="3" class="detail-head">ID：</el-col>
        <el-col :span="9" class="detail-content">{{smdParam.code || '-'}}</el-col>
        <el-col :span="3" class="detail-head">用户名：</el-col>
        <el-col :span="9" class="detail-content">{{smdParam.nickName || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="3" class="detail-head">姓名：</el-col>
        <el-col :span="9" class="detail-content">{{smdParam.realName || '-'}}</el-col>
        <el-col :span="3" class="detail-head">密码：</el-col>
        <el-col :span="9" class="detail-content">{{smdParam.password || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="3" class="detail-head">手机号：</el-col>
        <el-col :span="9" class="detail-content">{{smdParam.phone || '-'}}</el-col>
        <el-col :span="3" class="detail-head">身份证号：</el-col>
        <el-col :span="9" class="detail-content">{{smdParam.idNumber || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="3" class="detail-head">省份：</el-col>
        <el-col :span="9" class="detail-content">{{smdParam.province || '-'}}</el-col>
        <el-col :span="3" class="detail-head">城市：</el-col>
        <el-col :span="9" class="detail-content">{{smdParam.city || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="3" class="detail-head">微信：</el-col>
        <el-col :span="9" class="detail-content">{{smdParam.wechat || '-'}}</el-col>
        <el-col :span="3" class="detail-head">QQ：</el-col>
        <el-col :span="9" class="detail-content">{{smdParam.qq || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="3" class="detail-head">Email：</el-col>
        <el-col :span="9" class="detail-content">{{smdParam.email || '-'}}</el-col>
        <el-col :span="3" class="detail-head">角色：</el-col>
        <el-col :span="9" class="detail-content">{{rolesUtil(smdParam.roles) || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="3" class="detail-head">创建时间：</el-col>
        <el-col :span="9" class="detail-content">{{smdParam.createTime || '-'}}</el-col>
        <el-col :span="3" class="detail-head"></el-col>
        <el-col :span="9" class="detail-content"></el-col>
      </el-row>
    </el-dialog>
    <!-- 【查看】对话框 结束-->

    <!-- 【编辑】对话框 开始-->
    <el-dialog title="编辑" :visible.sync="dialog.modifyDialogVisible" @close="closeModifyDialog">
      <el-row :gutter="20" class="detail-row">
        <el-col :span="12" class="modify-head">ID：{{smdParam.code || '-'}}</el-col>
        <el-col :span="12" class="modify-head">创建时间：{{smdParam.createTime || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="12">
          <el-input placeholder="用户名" v-model="smdParam.nickName"/>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="姓名" v-model="smdParam.realName"/>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="12">
          <el-input placeholder="手机号" v-model="smdParam.phone"/>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="身份证号" v-model="smdParam.idNumber"/>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
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
      <el-row :gutter="20" class="detail-row">
        <el-col :span="12">
          <el-input placeholder="微信号" v-model="smdParam.wechat"/>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="QQ号" v-model="smdParam.qq"/>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 10px;">
        <el-col :span="12">
          <el-input placeholder="邮箱" v-model="smdParam.email"/>
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
        <el-button @click="dialog.modifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyDialogCommit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 【编辑】对话框 结束-->

    <!-- 【删除】对话框 开始-->
    <el-dialog title="提示" :visible.sync="dialog.deleteDialogVisible" @close="closeDeleteDialog" width="30%">
      <span>确定删除该用户为「{{deleteParam.nickName}}」的用户？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialogCommit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 【删除】对话框 开始-->
  </div>
</template>

<script>
import ElRow from "element-ui/packages/row/src/row";
import ElCol from "element-ui/packages/col/src/col";

export default {
  components: {
    ElCol,
    ElRow},
  name: 'Index',
  data () {
    return {
      searchParam: {
        start: 0,
        length: 10,
        code: '',
        nickName: '',
        realName: '',
        phone: ''
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
      smdExtendParam: {
        roles: []
      },
      deleteParam: {
        id: '',
        code: '',
        nickName: ''
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
      page: {
        tableData: [],
        recordsTotal: 0,
        currentPage: 0,
      },
      dialog: {
        saveDialogVisible: false,
        modifyDialogVisible: false,
        detailDialogVisible: false,
        deleteDialogVisible: false,
      }
    }
  },
  methods: {
    search(){
      var that = this;
      var url = basePath + 'sysUser/page';
      this.$http.post(url, that.searchParam).then((response) => {
        that.page.tableData = response.body.data.data;
        for(var i=0;i<that.page.tableData.length;i++){
          that.page.tableData[i].province = that.optionUtil(that.page.tableData[i].province, that.options.province);
          that.page.tableData[i].city = that.optionUtil(that.page.tableData[i].city, that.options.city);
          that.page.tableData[i].createTime = that.dateTimeUtil(that.page.tableData[i].createTime);
        }
        that.page.recordsTotal = response.body.data.recordsTotal;
      }, (response) => {
        console.log("err"+response);
      });
    },
    resetSearch(){
      this.searchParam.code = '';
      this.searchParam.nickName = '';
      this.searchParam.realName = '';
      this.searchParam.phone = '';
      this.search();
    },
    saveDialogCommit(){
      var that = this;
      if(that.smdExtendParam.roles){
        that.smdParam.roles = that.smdExtendParam.roles.join(',');
      }
      var url = basePath + 'sysUser/save';
      that.$http.post(url, that.smdParam).then((response) => {
        that.closeSaveDialog();
        that.search();
      }, (response) => {
        alert("fail");
      });
    },
    modifyDialogCommit(){
      var that = this;
      if(that.smdExtendParam.roles){
        that.smdParam.roles = that.smdExtendParam.roles.join(',');
      }
      var nickName = that.smdParam.nickName;
      var url = basePath + 'sysUser/modify';
      that.$http.put(url, that.smdParam).then((response) => {
        that.closeModifyDialog();
        that.searchParam.nickName = nickName;
        that.search();
      }, (response) => {
        alert("fail");
      });
    },
    deleteDialogCommit(){
      var that = this;
      var nickName = that.deleteParam.nickName;
      var url = basePath + 'sysUser/delete?id=' + this.deleteParam.id;
      that.$http.delete(url, []).then((response) => {
        that.closeDeleteDialog();
        that.searchParam.nickName = nickName;
        that.search();
      }, (response) => {
        alert("fail");
      });
    },
    openSaveDialog(){
      this.dialog.saveDialogVisible = true
    },
    closeSaveDialog(){
      this.cleanSmdDialog();
      this.dialog.saveDialogVisible =false;
    },
    openModifyDialog(row){
      this.setSmdDialog(row);
      if(row.roles){
        this.smdExtendParam.roles = row.roles.split(',');
      }
      this.dialog.modifyDialogVisible = true
    },
    closeModifyDialog(){
      this.cleanSmdDialog();
      this.dialog.modifyDialogVisible =false;
    },
    openDetailDialog(row) {
      this.setSmdDialog(row);
      this.dialog.detailDialogVisible = true;
    },
    closeDetailDialog(){
      this.cleanSmdDialog();
      this.dialog.detailDialogVisible = false;
    },
    openDeleteDialog(row){
      this.deleteParam.id = row.id;
      this.deleteParam.code = row.code;
      this.deleteParam.nickName = row.nickName;
      this.dialog.deleteDialogVisible = true;
    },
    closeDeleteDialog(){
      this.deleteParam.id = '';
      this.deleteParam.code = '';
      this.deleteParam.nickName = '';
      this.dialog.deleteDialogVisible = false;
    },
    pageSizeChange(val) {
      this.searchParam.start = 0;
      this.searchParam.length = val;
      this.search();
    },
    pageNoChange(val) {
      this.searchParam.start = (val-1)*this.searchParam.length;
      this.search();
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
      this.smdExtendParam.roles = [];
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
    optionUtil(value, options){
      if(options){
        for(var i=0;i<options.length;i++){
          var option = options[i];
          if(option.value == value){
            var label = option.label;
            return label;
          }
        }
      }
    },
    dateTimeUtil(value){
      return new Date(value).format("yyyy-MM-dd hh:mm:ss");
    }
  },
  mounted: function () {
    this.search();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .detail-row {
    margin-top: 10px;
  }
  .detail-head {
    text-align: right;font-weight: bolder;
  }
  .detail-content{
    text-align: left;
  }
  .modify-head{
    text-align: left;font-weight: bolder;
  }
</style>
