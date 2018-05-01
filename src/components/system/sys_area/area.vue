<template>
  <div>
    <!-- 搜索条件 开始 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="ID" prefix-icon="el-icon-search" v-model="searchParam.id"/>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="上级ID" prefix-icon="el-icon-search" v-model="searchParam.parentId"/>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="名称" prefix-icon="el-icon-search" v-model="searchParam.name"/>
      </el-col>
      <el-col :span="6">
        <el-select v-model="searchParam.type" filterable placeholder="类型" style="width: 100%;">
          <el-option
            v-for="item in options.type"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <!-- 搜索条件 结束 -->

    <!-- 按钮 开始-->
    <el-row style="text-align: left;margin-top: 10px;padding-bottom:10px;border-bottom: 1px solid #F2F6FC;">
      <my-search :vm="this"></my-search>
      <my-reset :vm="this"></my-reset>
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
      class="my-table"
      height="calc(100vh - 340px)"
      @selection-change="pageSelectionChange">
      <el-table-column type="selection" width="55" fixed></el-table-column>
      <el-table-column type="index" width="50" fixed></el-table-column>
      <el-table-column fixed="left" label="操作" width="150">
        <template slot-scope="scope">
          <update :rowData="scope.row" :options="options" :smdParam="smdParam" @search="search" @cleanSmd="cleanSmd" :fn="fn"></update>
          <my-delete text="名称" :value="scope.row.name" :id="scope.row.id" :fn="fn" @search="search"></my-delete>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="100" fixed></el-table-column>
      <el-table-column prop="parentId" label="上级ID" width="100" fixed></el-table-column>
      <el-table-column prop="name" label="名称"  width="100"></el-table-column>
      <el-table-column prop="type" label="类型" width="100"></el-table-column>
      <el-table-column prop="fullname" label="全名称"  width="350"></el-table-column>
      <el-table-column prop="fullpath" label="全路径" width="350"></el-table-column>
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
import Save from '@/components/system/sys_area/save'
import Update from '@/components/system/sys_area/update'

export default {
  name: 'Index',
  components: {
    MySearch,MyReset,MyModel,MyImport,MyExport,MyDelete,MyRemove,
    Save,Update
  },
  data () {
    return {
      fn: 'sysArea',
      searchParam: {
        start: 0,
        length: 5,
        id: '',
        parentId: '',
        name: '',
        type: ''
      },
      smdParam: {
        id: '',
        parentId: '',
        name: '',
        fullname: '',
        fullpath: '',
        type: ''
      },
      smdParamExtend: {
      },
      options: {
        type: [
          {value: '省份', label: '省份'},
          {value: '城市', label: '城市'},
          {value: '区县', label: '区县'}
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
      this.searchParam.parentId = '';
      this.searchParam.name = '';
      this.searchParam.type = '';
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
          dist.arg1 = obj.fullname;
          dist.arg2 = obj.type
          this.page.selection.push(dist);
        }
      }
    },
    cleanSmd(){
      this.smdParam.id = '';
      this.smdParam.parentId = '';
      this.smdParam.name = '';
      this.smdParam.fullname = '';
      this.smdParam.fullpath = '';
      this.smdParam.type = '';
    }
  },
  mounted: function () {
    this.search();
  }
}
</script>
