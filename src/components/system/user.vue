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
      <el-button size="small" icon="el-icon-search" @click="search" :loading="searchExtendParam.loading">搜索</el-button>
      <el-button size="small" icon="el-icon-refresh" @click="resetSearch" :loading="searchExtendParam.loading">重置</el-button>
      <el-button type="primary" size="small" icon="el-icon-news" @click="openSaveDialog">新增</el-button>
      <el-button type="success" size="small" icon="el-icon-download" @click="downloadExcelModel">模板</el-button>
      <el-button type="info" size="small" icon="el-icon-upload2" @click="openImportDialog">导入</el-button>
      <el-button type="warning" size="small" icon="el-icon-document" @click="exportExcel" :loading="exportExcelLoading">导出</el-button>
      <el-button type="danger" size="small" icon="el-icon-document" @click="openRemoveDialog">删除</el-button>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="page.tableData"
      stripe
      v-loading="searchExtendParam.loading"
      style="width: 100%;margin-top: 10px;text-align: left;" height="calc(100vh - 380px)"
      @selection-change="handleSelectionChange">
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
      <el-row :gutter="20" class="detail-row">
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
      <el-row :gutter="20" class="detail-row">
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
        <el-button @click="dialog.saveDialogVisible = false" :loading="smdExtendParam.saveLoading">取 消</el-button>
        <el-button type="primary" @click="saveDialogCommit" :loading="smdExtendParam.saveLoading">确 定</el-button>
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
          <el-input placeholder="用户名" v-model="smdParam.nickName">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="姓名" v-model="smdParam.realName">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="detail-row">
        <el-col :span="12">
          <el-input placeholder="手机号" v-model="smdParam.phone">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="身份证号" v-model="smdParam.idNumber">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
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
      <el-row :gutter="20" style="margin-top: 10px;">
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
        <el-button @click="dialog.modifyDialogVisible = false" :loading="smdExtendParam.modifyLoading">取 消</el-button>
        <el-button type="primary" @click="modifyDialogCommit" :loading="smdExtendParam.modifyLoading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 【编辑】对话框 结束-->

    <!-- 【删除】对话框 开始-->
    <el-dialog title="提示" :visible.sync="dialog.deleteDialogVisible" @close="closeDeleteDialog" width="30%">
      <span>确定删除该用户为「{{deleteParam.nickName}}」的用户？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.deleteDialogVisible = false" :loading="deleteExtendParam.deleteLoading">取 消</el-button>
        <el-button type="primary" @click="deleteDialogCommit" :loading="deleteExtendParam.deleteLoading">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 【删除】对话框 开始-->

    <!-- 【批量删除】对话框 开始-->
    <el-dialog title="确定删除？" :visible.sync="dialog.removeDialogVisible" @close="closeRemoveDialog" width="40%">
      <el-table :data="removeParams" style="width: 100%;text-align: left;">
        <el-table-column prop="nickName" label="昵称"></el-table-column>
        <el-table-column prop="realName" label="姓名"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="channelRemove(scope.row)">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.removeDialogVisible = false" :loading="deleteExtendParam.removeLoading">取 消</el-button>
        <el-button type="primary" @click="removeDialogCommit" :loading="deleteExtendParam.removeLoading">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 【批量删除】对话框 开始-->

    <!-- 【Excel导入用户信息】对话框 开始-->
    <el-dialog title="导入Excel格式的用户数据" :visible.sync="dialog.importDialogVisible" @close="closeImportDialog" width="40%">
      <el-upload
        class="upload-demo"
        ref="importExcel"
        drag
        :action="importExcel.action"
        :before-upload="beforeAvatarUpload"
        :auto-upload="false" :limit="1"
        @close="closeImportDialog"
        :on-success="importExcelSuccess"
        :on-error="importExcelFail">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传一个.xlsx格式的Excel文件，且不超过2M</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeImportDialog" :loading="importExtendParam.importLoading">取 消</el-button>
        <el-button type="primary" @click="importDialogCommit" :loading="importExtendParam.importLoading">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 【Excel导入用户信息】对话框 结束-->

    <!-- 【Excel导入用户信息，失败列表】对话框 开始-->
    <el-dialog title="导入失败列表" :visible.sync="dialog.importFailDialogVisible" @close="closeImportFailDialog" width="50%">
      <el-table :data="importExcel.failList" style="width: 100%;text-align: left;">
        <el-table-column prop="rowNo" label="Excel行号" width="100"></el-table-column>
        <el-table-column prop="res" label="执行结果" width="100"></el-table-column>
        <el-table-column prop="message" label="失败原因"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeImportFailDialog">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 【Excel导入用户信息，失败列表】对话框 结束-->
  </div>
</template>

<script>

export default {
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
      searchExtendParam: {
        loading: true
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
        roles: [],
        saveLoading: false,
        modifyLoading: false
      },
      deleteParam: {
        id: '',
        code: '',
        nickName: ''
      },
      deleteExtendParam: {
        deleteLoading: false,
        removeLoading: false
      },
      importParam: {

      },
      importExtendParam: {
        importLoading: false,
      },
      removeParams:[],
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
        multipleSelection: []
      },
      dialog: {
        saveDialogVisible: false,
        modifyDialogVisible: false,
        detailDialogVisible: false,
        deleteDialogVisible: false,
        removeDialogVisible: false,
        importDialogVisible: false,
        importFailDialogVisible: false
      },
      importExcel: {
        action: basePath + 'sysUser/importExcel',
        failList: []
      },
      exportExcelLoading: false
    }
  },
  methods: {
    search(){
      var that = this;
      this.$AJAX.POST(this, that.searchParam, 'sysUser/page', false,function () {
        that.searchExtendParam.loading = true;
      },function(){
        that.searchExtendParam.loading = false;
      },function(response){
        that.page.tableData = response.body.data.data;
        for(var i=0;i<that.page.tableData.length;i++){
          that.page.tableData[i].province = that.optionUtil(that.page.tableData[i].province, that.options.province);
          that.page.tableData[i].city = that.optionUtil(that.page.tableData[i].city, that.options.city);
          that.page.tableData[i].createTime = that.dateTimeUtil(that.page.tableData[i].createTime);
        }
        that.page.recordsTotal = response.body.data.recordsTotal;
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
      that.$AJAX.POST(that, that.smdParam, 'sysUser/save', true, function () {
        that.smdExtendParam.saveLoading = true;
      },function(){
        that.smdExtendParam.saveLoading = false;
      },function(response){
        that.closeSaveDialog();
        that.search();
      });
    },
    modifyDialogCommit(){
      var that = this;
      if(that.smdExtendParam.roles){
        that.smdParam.roles = that.smdExtendParam.roles.join(',');
      }
      that.$AJAX.PUT(this, that.smdParam, 'sysUser/modify', function () {
        that.smdExtendParam.modifyLoading = true;
      },function(){
        that.smdExtendParam.modifyLoading = false;
      },function(response){
        that.closeModifyDialog();
        that.search();
      });
    },
    deleteDialogCommit(){
      var that = this;
      var uri = 'sysUser/delete?id=' + this.deleteParam.id;
      that.$AJAX.DELETE(this, uri, function(){
        that.deleteExtendParam.deleteLoading = true;
      },function(){
        that.deleteExtendParam.deleteLoading = false;
      },function(response){
        that.closeDeleteDialog();
        that.search();
      });
    },
    removeDialogCommit(){
      var that = this;
      var ids = "";
      for(var i=0;i<that.removeParams.length;i++){
        ids += that.removeParams[i].id;
        if(i<that.removeParams.length-1){
          ids += ",";
        }
      }
      var uri = 'sysUser/remove?ids=' + ids;
      this.$AJAX.DELETE(this, uri, function(){
        that.deleteExtendParam.removeLoading = true;
      },function(){
        that.deleteExtendParam.removeLoading = false;
      },function(response){
        that.closeRemoveDialog();
        that.search();
      });
    },
    importDialogCommit(){
      this.$refs.importExcel.submit();
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
    openRemoveDialog(){
      var that = this;
      if(this.page.multipleSelection && this.page.multipleSelection.length > 0){
        for(var i=0;i<this.page.multipleSelection.length;i++){
          var removeParam = {};
          removeParam.id = this.page.multipleSelection[i].id;
          removeParam.nickName = this.page.multipleSelection[i].nickName;
          removeParam.realName = this.page.multipleSelection[i].realName;
          that.removeParams.push(removeParam);
        }
        that.dialog.removeDialogVisible = true;
      }else{
        that.$message({message: '请勾选要删除的数据',type: 'warning'});
      }
    },
    closeRemoveDialog(){
      this.removeParams = [];
      this.page.multipleSelection = [];
      this.$refs.multipleTable.clearSelection();
      this.dialog.removeDialogVisible = false;
    },
    openImportDialog(){
      this.dialog.importDialogVisible = true;
    },
    closeImportDialog(){
      this.dialog.importDialogVisible = false;
      this.$refs.importExcel.clearFiles();
    },
    openImportFailDialog(){
      this.dialog.importFailDialogVisible = true;
    },
    closeImportFailDialog(){
      this.importExcel.failList = [];
      this.dialog.importFailDialogVisible = false;
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
    },
    handleSelectionChange(val) {
      this.page.multipleSelection = val;
    },
    channelRemove(row){
      var that = this;
      for(var i=0;i<that.page.multipleSelection.length;i++){
        if(that.page.multipleSelection[i].nickName == row.nickName){
          that.page.multipleSelection.splice(i,1);
        }
      }
      for(var i=0;i<that.removeParams.length;i++){
        if(that.removeParams[i].nickName == row.nickName){
          that.removeParams.splice(i,1);
        }
      }
      if(that.removeParams.length == 0){
        that.closeRemoveDialog();
      }
    },
    downloadExcelModel(){
      window.location.href = "../../static/excel/批量导入用户信息模板.xlsx";
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('导入文件大小不能超过 2MB!');
      }
      return isLt2M;
    },
    importExcelSuccess(response, file, fileList){
      console.log(response.data.failList);
      this.importExcel.failList = response.data.failList;
      this.closeImportDialog();
      this.openImportFailDialog();
    },
    importExcelFail(err, file, fileList){
      this.$message.error(err.message);
    },
    exportExcel(){
      var that = this;
      var url = basePath + "sysUser/exportExcel" +
        "?code=" + this.searchParam.code +
        "&nickName=" + this.searchParam.nickName +
        "&realName=" + this.searchParam.realName +
        "&phone=" + this.searchParam.phone;
      window.location.href = url;
    }
  },
  mounted: function () {
    this.search();
  },
  created: function () {
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
  .star{
    text-align: right;
    margin-top: 8px;
  }
</style>
