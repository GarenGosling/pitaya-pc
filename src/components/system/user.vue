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
      <el-button type="primary" size="small" icon="el-icon-refresh" @click="resetSearch">重置</el-button>
      <el-button type="success" size="small" icon="el-icon-news">新增</el-button>
      <el-button type="info" size="small" icon="el-icon-download">模板</el-button>
      <el-button type="warning" size="small" icon="el-icon-upload2">上传</el-button>
      <el-button type="danger" size="small" icon="el-icon-document">导出</el-button>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%;margin-top: 10px;text-align: left;" height="calc(100vh - 380px)">
      <el-table-column prop="nickName" label="用户名" width="320" fixed></el-table-column>
      <el-table-column prop="realName" label="姓名" width="150" fixed></el-table-column>
      <el-table-column prop="phone" label="手机号"  width="200" fixed></el-table-column>
      <el-table-column prop="idNumber" label="身份证号"  width="200"></el-table-column>
      <el-table-column prop="province" label="省份"  width="200"></el-table-column>
      <el-table-column prop="city" label="城市"  width="200"></el-table-column>
      <el-table-column prop="wechat" label="微信号" width="200"></el-table-column>
      <el-table-column prop="qq" label="QQ号" width="200"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="createTime" label="注册时间" width="200"></el-table-column>
    </el-table>
    <div class="block" style="margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50, 100, 500]"
        :page-size="search.length"
        layout="total, sizes, prev, pager, next, jumper"
        :total="recordsTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      searchParam: {
        length: 10,
        code: '',
        nickName: '',
        realName: '',
        phone: ''
      },
      tableData: [],
      recordsTotal: 0,
      currentPage: 1
    }
  },
  computed: {
    start: function () {
      return (this.currentPage-1)*this.searchParam.length;
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    search(){
      var that = this;
      var url = basePath + 'sysUser/page?start='+that.start+'&length='+that.searchParam.length+'&code=' + that.searchParam.code + '&nickName=' + that.searchParam.nickName + '&realName=' + that.searchParam.realName + '&phone=' + that.searchParam.phone;
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
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row {
  }
  .el-col {
    border-radius: 4px;
  }
</style>
