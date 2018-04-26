<template>
  <div>
    <!-- 搜索条件 开始 -->
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
    <!-- 搜索条件 结束 -->

    <!-- 按钮 开始-->
    <el-row style="text-align: left;margin-top: 10px;padding-bottom:10px;border-bottom: 1px solid #F2F6FC;">
      <my-search :btnLoading="btnLoading" @search="search"></my-search>
      <my-reset :btnLoading="btnLoading" @reset="reset"></my-reset>
      <save :btnLoading="btnLoading" :options="options" :smdParam="smdParam" :smdParamExtend="smdParamExtend" @search="search" @cleanSmd="cleanSmd" :fn="fn"></save>
      <my-model :btnLoading="btnLoading" name="批量导入用户信息模板"></my-model>
      <my-import :btnLoading="btnLoading" :fn="fn" @search="search"></my-import>
      <my-export :btnLoading="btnLoading" :exportParam="searchParam" :fn="fn"></my-export>
      <my-remove :btnLoading="btnLoading" :vm="this" lab1="昵称" lab2="姓名" :fn="fn" @search="search"></my-remove>
    </el-row>
    <!-- 按钮 结束-->

    <!-- 表格 开始 -->
    <el-table
      ref="multipleTable"
      :data="page.data"
      stripe
      v-loading="tabLoading"
      style="width: 100%;margin-top: 10px;text-align: left;" height="calc(100vh - 380px)"
      @selection-change="pageSelectionChange">
      <el-table-column type="selection" width="55" fixed></el-table-column>
      <el-table-column type="index" width="50" fixed></el-table-column>
      <el-table-column fixed="left" label="操作" width="150">
        <template slot-scope="scope">
          <detail :rowData="scope.row" :smdParam="smdParam" @cleanSmd="cleanSmd"></detail>
          <update :rowData="scope.row" :smdParam="smdParam" @search="search" @cleanSmd="cleanSmd" :fn="fn"></update>
          <my-delete text="用户名" :value="scope.row.nickName" :id="scope.row.id" :fn="fn" @search="search"></my-delete>
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="用户名" width="150" fixed></el-table-column>
      <el-table-column prop="realName" label="姓名" width="100" fixed></el-table-column>
      <el-table-column prop="phone" label="手机号"  width="110"></el-table-column>
      <el-table-column prop="idNumber" label="身份证号"  width="180"></el-table-column>
      <el-table-column prop="province" label="省份" :formatter="provinceFmt" width="120"></el-table-column>
      <el-table-column prop="city" label="城市" :formatter="cityFmt" width="120"></el-table-column>
      <el-table-column prop="wechat" label="微信号" width="120"></el-table-column>
      <el-table-column prop="qq" label="QQ号" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180" :formatter="createTimeFmt"></el-table-column>
    </el-table>
    <!-- 表格 结束-->

    <!-- 分页 开始 -->
    <div class="block" style="margin-top: 10px;">
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageNoChange"
        :current-page.sync="page.currentPage"
        :page-sizes="[5, 6, 7, 8, 9, 10, 15, 20, 50, 100, 500, 1000]"
        :page-size="searchParam.length"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
    <!-- 分页 结束 -->
  </div>
</template>

<script>
import MySearch from '@/components/common/my-search'
import MyReset from '@/components/common/my-reset'
import MyDelete from '@/components/common/my-delete'
import MyExport from '@/components/common/my-export'
import MyModel from '@/components/common/my-model'
import MyImport from '@/components/common/my-import'
import MyRemove from '@/components/common/my-remove'
import Save from '@/components/system/sys_user/save'
import Update from '@/components/system/sys_user/update'
import Detail from '@/components/system/sys_user/detail'

export default {
  name: 'Index',
  components: {
    MySearch,MyReset,MyModel,MyImport,MyExport,MyDelete,MyRemove,
    Save,Update,Detail
  },
  data () {
    return {
      fn: 'sysUser',
      searchParam: {
        start: 0,
        length: 5,
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
      smdParamExtend: {
        roles: [],
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
        data: [],
        total: 0,
        currentPage: 1,
        selection: []
      },
      tabLoading: true,
      btnLoading: false
    }
  },
  methods: {
    search(){
      var that = this;
      this.$AJAX.GET(this, this.fn + '/page', that.searchParam, function(response){
        that.page.data = response.body.data.data;
        that.page.total = response.body.data.recordsTotal;
      });
    },
    reset(){
      this.searchParam.code = '';
      this.searchParam.nickName = '';
      this.searchParam.realName = '';
      this.searchParam.phone = '';
      this.search();
    },
    pageSizeChange(val) {
      this.searchParam.length = val;
      this.pageNoChange(this.page.currentPage);
    },
    pageNoChange(val) {
      this.searchParam.start = (val-1)*this.searchParam.length;
      this.search();
    },
    pageSelectionChange(val) {
      this.page.selection = [];
      if(val && val.length > 0){
        for(var i=0;i<val.length;i++){
          var obj = val[i];
          var dist = {};
          dist.id = obj.id;
          dist.arg1 = obj.nickName;
          dist.arg2 = obj.realName
          this.page.selection.push(dist);
        }
      }
    },
    provinceFmt(row, column){
      return this.$OPTIONS(row.province, this.options.province);
    },
    cityFmt(row, column){
      return this.$OPTIONS(row.city, this.options.city);
    },
    createTimeFmt(row, column){
      return new Date(row.createTime).format("yyyy-MM-dd hh:mm:ss");
    },
    cleanSmd(){
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
      this.smdParamExtend.roles = [];
    }
  },
  mounted: function () {
    this.search();
  }
}
</script>
