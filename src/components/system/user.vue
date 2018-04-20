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
      :data="tableData"
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
      <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
    </el-table>
    <div class="block" style="margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[1, 5, 10, 20, 50, 100, 500]"
        :page-size="searchParam.length"
        layout="total, sizes, prev, pager, next, jumper"
        :total="recordsTotal">
      </el-pagination>
    </div>

    <!-- 【新增】对话框 开始-->
    <el-dialog title="新增" :visible.sync="saveDialogVisible" @close="closeSaveDialog">
      <el-row :gutter="20" class="detail-row">
        <el-col :span="12">
          <el-input placeholder="用户名" v-model="saveParam.nickName"/>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="姓名" v-model="saveParam.realName"/>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="12">
          <el-input placeholder="手机号" v-model="saveParam.phone"/>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="身份证号" v-model="saveParam.idNumber"/>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="12">
          <el-select v-model="saveParam.province" filterable placeholder="省份" style="width: 100%;">
            <el-option
              v-for="item in options.province"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="saveParam.city" filterable placeholder="城市" style="width: 100%;">
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
          <el-input placeholder="微信号" v-model="saveParam.wechat"/>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="QQ号" v-model="saveParam.qq"/>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="12">
          <el-input placeholder="邮箱" v-model="saveParam.email"/>
        </el-col>
        <el-col :span="12">
          <el-select v-model="roles" filterable multiple placeholder="角色" style="width: 100%;">
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
        <el-button @click="saveDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDialogCommit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 【新增】对话框 结束-->

    <!-- 【查看】对话框 开始-->
    <el-dialog title="查看" :visible.sync="detailDialogVisible" width="60%" @close="closeDetailDialog">
      <el-row :gutter="20" class="detail-row">
        <el-col :span="3" class="detail-head">ID：</el-col>
        <el-col :span="9" class="detail-content">{{detailParam.code || '-'}}</el-col>
        <el-col :span="3" class="detail-head">用户名：</el-col>
        <el-col :span="9" class="detail-content">{{detailParam.nickName || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="3" class="detail-head">姓名：</el-col>
        <el-col :span="9" class="detail-content">{{detailParam.realName || '-'}}</el-col>
        <el-col :span="3" class="detail-head">密码：</el-col>
        <el-col :span="9" class="detail-content">{{detailParam.password || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="3" class="detail-head">手机号：</el-col>
        <el-col :span="9" class="detail-content">{{detailParam.phone || '-'}}</el-col>
        <el-col :span="3" class="detail-head">身份证号：</el-col>
        <el-col :span="9" class="detail-content">{{detailParam.idNumber || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="3" class="detail-head">省份：</el-col>
        <el-col :span="9" class="detail-content">{{detailParam.province || '-'}}</el-col>
        <el-col :span="3" class="detail-head">城市：</el-col>
        <el-col :span="9" class="detail-content">{{detailParam.city || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="3" class="detail-head">微信：</el-col>
        <el-col :span="9" class="detail-content">{{detailParam.wechat || '-'}}</el-col>
        <el-col :span="3" class="detail-head">QQ：</el-col>
        <el-col :span="9" class="detail-content">{{detailParam.qq || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="3" class="detail-head">Email：</el-col>
        <el-col :span="9" class="detail-content">{{detailParam.email || '-'}}</el-col>
        <el-col :span="3" class="detail-head">角色：</el-col>
        <el-col :span="9" class="detail-content">{{detailParam.roles || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="3" class="detail-head">创建时间：</el-col>
        <el-col :span="9" class="detail-content">{{detailParam.createTime || '-'}}</el-col>
        <el-col :span="3" class="detail-head"></el-col>
        <el-col :span="9" class="detail-content"></el-col>
      </el-row>
    </el-dialog>
    <!-- 【查看】对话框 结束-->

    <!-- 【编辑】对话框 开始-->
    <el-dialog title="编辑" :visible.sync="modifyDialogVisible" @close="closeModifyDialog">
      <el-row :gutter="20" class="detail-row">
        <el-col :span="12" class="modify-head">ID：{{modifyParam.code || '-'}}</el-col>
        <el-col :span="12" class="modify-head">创建时间：{{modifyParam.createTime || '-'}}</el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="12">
          <el-input placeholder="用户名" v-model="modifyParam.nickName"/>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="姓名" v-model="modifyParam.realName"/>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="12">
          <el-input placeholder="手机号" v-model="modifyParam.phone"/>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="身份证号" v-model="modifyParam.idNumber"/>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="12">
          <el-select v-model="modifyParam.province" filterable placeholder="省份" style="width: 100%;">
            <el-option
              v-for="item in options.province"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="modifyParam.city" filterable placeholder="城市" style="width: 100%;">
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
          <el-input placeholder="微信号" v-model="modifyParam.wechat"/>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="QQ号" v-model="modifyParam.qq"/>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 10px;">
        <el-col :span="12">
          <el-input placeholder="邮箱" v-model="modifyParam.email"/>
        </el-col>
        <el-col :span="12">
          <el-select v-model="roles" filterable multiple placeholder="角色" style="width: 100%;">
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
        <el-button @click="modifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyDialogCommit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 【编辑】对话框 结束-->

    <!-- 【删除】对话框 开始-->
    <el-dialog title="提示" :visible.sync="deleteDialogVisible" @close="closeDeleteDialog" width="30%">
      <span>确定删除该用户为「{{deleteParam.nickName}}」的用户？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
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
      roles: [],
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
      searchParam: {
        start: 0,
        length: 10,
        code: '',
        nickName: '',
        realName: '',
        phone: ''
      },
      saveParam: {
        nickName: '',
        realName: '',
        phone: '',
        idNumber: '',
        province: '',
        city: '',
        wechat: '',
        qq: '',
        email: '',
        roles:''
      },
      detailParam: {
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
      modifyParam: {
        nickName: '',
        realName: '',
        phone: '',
        idNumber: '',
        province: '',
        city: '',
        wechat: '',
        qq: '',
        email: '',
        roles:''
      },
      deleteParam: {
        nickName: ''
      },
      tableData: [],
      recordsTotal: 0,
      currentPage4: 4,
      saveDialogVisible: false,
      modifyDialogVisible: false,
      detailDialogVisible: false,
      deleteDialogVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.searchParam.length = val;
      this.search();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.searchParam.start = (val-1)*this.searchParam.length;
      this.search();
    },
    search(){
      var that = this;
      var url = basePath + 'sysUser/page?start='+that.searchParam.start+'&length='+that.searchParam.length+'&code=' + that.searchParam.code + '&nickName=' + that.searchParam.nickName + '&realName=' + that.searchParam.realName + '&phone=' + that.searchParam.phone;
      this.$http.get(url, []).then((response) => {
        that.tableData = response.body.data.data;
        that.recordsTotal = response.body.data.recordsTotal;
      }, (response) => {
        console.log("err"+response);
      });
    },
    resetSearch(){
      this.searchParam.code = '';
      this.searchParam.nickName = '';
      this.searchParam.realName = '';
      this.searchParam.phone = '';
    },
    openSaveDialog(){
      this.saveDialogVisible = true
    },
    openDetailDialog(row) {
      console.log("row:"+row);
      this.detailParam.id = row.id;
      this.detailParam.code = row.code;
      this.detailParam.nickName = row.nickName;
      this.detailParam.realName = row.realName;
      this.detailParam.password = row.password;
      this.detailParam.phone = row.phone;
      this.detailParam.idNumber = row.idNumber;
      this.detailParam.province = row.province;
      this.detailParam.city = row.city;
      this.detailParam.wechat = row.wechat;
      this.detailParam.qq = row.qq;
      this.detailParam.email = row.email;
      this.detailParam.roles = this.rolesUtil(row.roles);
      this.detailParam.createTime = row.createTime;
      this.detailDialogVisible = true;
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
    openModifyDialog(row){
      this.modifyParam.id = row.id;
      this.modifyParam.code = row.code;
      this.modifyParam.nickName = row.nickName;
      this.modifyParam.realName = row.realName;
      this.modifyParam.password = row.password;
      this.modifyParam.phone = row.phone;
      this.modifyParam.idNumber = row.idNumber;
      this.modifyParam.province = row.province;
      this.modifyParam.city = row.city;
      this.modifyParam.wechat = row.wechat;
      this.modifyParam.qq = row.qq;
      this.modifyParam.email = row.email;
      this.modifyParam.roles = row.roles;
      if(row.roles){
        this.roles = row.roles.split(',');
      }
      this.modifyParam.createTime = row.createTime;
      this.modifyDialogVisible = true
    },
    openDeleteDialog(row){
      this.deleteParam.code = row.code;
      this.deleteParam.nickName = row.nickName;
      this.deleteDialogVisible = true;
    },
    saveDialogCommit(){
      var that = this;
      if(that.roles){
        that.saveParam.roles = that.roles.join(',');
      }
      var url = basePath + 'sysUser/save';
      this.$http.post(url, that.saveParam).then((response) => {
        console.log(response);
        this.closeSaveDialog();
        this.search();
      }, (response) => {
        if(that.saveParam.roles){
          that.saveParam.roles = that.saveParam.roles.split(',');
        }
        console.log("err"+response);
      });
    },
    modifyDialogCommit(){
      alert("modifyDialogCommit");
    },
    deleteDialogCommit(){
      alert("deleteDialogCommit");
    },
    closeSaveDialog(){
      this.saveParam.nickName = '';
      this.saveParam.realName = '';
      this.saveParam.phone = '';
      this.saveParam.idNumber = '';
      this.saveParam.province = '';
      this.saveParam.city = '';
      this.saveParam.wechat = '';
      this.saveParam.qq = '';
      this.saveParam.email = '';
      this.roles = [];
      this.saveDialogVisible =false;
    },
    closeDetailDialog(){
      this.detailParam.id = '';
      this.detailParam.code = '';
      this.detailParam.nickName = '';
      this.detailParam.realName = '';
      this.detailParam.password = '';
      this.detailParam.phone = '';
      this.detailParam.idNumber = '';
      this.detailParam.province = '';
      this.detailParam.city = '';
      this.detailParam.wechat = '';
      this.detailParam.qq = '';
      this.detailParam.email = '';
      this.detailParam.roles = '';
      this.roles = '';
      this.detailParam.createTime = '';
      this.detailDialogVisible = false;
    },
    closeModifyDialog(){
      this.modifyParam.id = '';
      this.modifyParam.code = '';
      this.modifyParam.nickName = '';
      this.modifyParam.realName = '';
      this.modifyParam.password = '';
      this.modifyParam.phone = '';
      this.modifyParam.idNumber = '';
      this.modifyParam.province = '';
      this.modifyParam.city = '';
      this.modifyParam.wechat = '';
      this.modifyParam.qq = '';
      this.modifyParam.email = '';
      this.modifyParam.roles = '';
      this.roles = '';
      this.modifyParam.createTime = '';
      this.modifyDialogVisible =false;
    },
    closeDeleteDialog(){
      this.deleteParam.code = '';
      this.deleteParam.nickName = '';
    }
  },
  mounted: function () {
    this.search();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row {
  }
  .el-col {
    border-radius: 4px;
  }
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
