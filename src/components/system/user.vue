<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="用户名" prefix-icon="el-icon-search" v-model="input1"/>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="手机号" prefix-icon="el-icon-search" v-model="input1"/>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="姓名" prefix-icon="el-icon-search" v-model="input1"/>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="身份证号" prefix-icon="el-icon-search" v-model="input1"/>
      </el-col>
    </el-row>
    <el-row style="text-align: left;margin-top: 10px;padding-bottom:10px;border-bottom: 1px solid #F2F6FC;">
      <el-button size="small" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh">重置</el-button>
      <el-button type="success" size="small" icon="el-icon-news">新增</el-button>
      <el-button type="info" size="small" icon="el-icon-download">模板</el-button>
      <el-button type="warning" size="small" icon="el-icon-upload2">上传</el-button>
      <el-button type="danger" size="small" icon="el-icon-document">导出</el-button>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%;margin-top: 10px;text-align: left;" height="calc(100vh - 380px)">
      <el-table-column prop="id" label="ID" width="100" fixed></el-table-column>
      <el-table-column prop="userName" label="用户名" width="150" fixed></el-table-column>
      <el-table-column prop="realName" label="姓名" width="150" fixed></el-table-column>
      <el-table-column prop="idNum" label="身份证号" width="200"></el-table-column>
      <el-table-column prop="phone" label="手机号"  width="200"></el-table-column>
      <el-table-column prop="wechat" label="微信号" width="200"></el-table-column>
      <el-table-column prop="qq" label="QQ号" width="200"></el-table-column>
      <el-table-column prop="weibo" label="微博号" width="200"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="address" label="地址" width="300"></el-table-column>
      <el-table-column prop="createTime" label="注册时间" width="200"></el-table-column>
    </el-table>
    <div class="block" style="margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 20, 50, 100,500]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      tableData: [{
        id: "1",
        userName: "tt521",
        realName: "唐嫣",
        idNum: "2305**********1113",
        phone: "13566666666",
        wechat: "13566666666",
        qq: "tangtang",
        weibo: "tangtang",
        email: "tangtang@qq.com",
        address: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-02 12:05:27',
      }, {
        id: "2",
        userName: "tt521",
        realName: "唐嫣",
        idNum: "2305**********1113",
        phone: "13566666666",
        wechat: "13566666666",
        qq: "tangtang",
        weibo: "tangtang",
        email: "tangtang@qq.com",
        address: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-02 12:05:27',
      }, {
        id: "3",
        userName: "tt521",
        realName: "唐嫣",
        idNum: "2305**********1113",
        phone: "13566666666",
        wechat: "13566666666",
        qq: "tangtang",
        weibo: "tangtang",
        email: "tangtang@qq.com",
        address: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-02 12:05:27',
      }, {
        id: "4",
        userName: "tt521",
        realName: "唐嫣",
        idNum: "2305**********1113",
        phone: "13566666666",
        wechat: "13566666666",
        qq: "tangtang",
        weibo: "tangtang",
        email: "tangtang@qq.com",
        address: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-02 12:05:27',
      }, {
        id: "5",
        userName: "tt521",
        realName: "唐嫣",
        idNum: "2305**********1113",
        phone: "13566666666",
        wechat: "13566666666",
        qq: "tangtang",
        weibo: "tangtang",
        email: "tangtang@qq.com",
        address: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-02 12:05:27',
      },{
        id: "1",
        userName: "tt521",
        realName: "唐嫣",
        idNum: "2305**********1113",
        phone: "13566666666",
        wechat: "13566666666",
        qq: "tangtang",
        weibo: "tangtang",
        email: "tangtang@qq.com",
        address: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-02 12:05:27',
      }, {
        id: "2",
        userName: "tt521",
        realName: "唐嫣",
        idNum: "2305**********1113",
        phone: "13566666666",
        wechat: "13566666666",
        qq: "tangtang",
        weibo: "tangtang",
        email: "tangtang@qq.com",
        address: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-02 12:05:27',
      }, {
        id: "3",
        userName: "tt521",
        realName: "唐嫣",
        idNum: "2305**********1113",
        phone: "13566666666",
        wechat: "13566666666",
        qq: "tangtang",
        weibo: "tangtang",
        email: "tangtang@qq.com",
        address: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-02 12:05:27',
      }, {
        id: "4",
        userName: "tt521",
        realName: "唐嫣",
        idNum: "2305**********1113",
        phone: "13566666666",
        wechat: "13566666666",
        qq: "tangtang",
        weibo: "tangtang",
        email: "tangtang@qq.com",
        address: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-02 12:05:27',
      }, {
        id: "5",
        userName: "tt521",
        realName: "唐嫣",
        idNum: "2305**********1113",
        phone: "13566666666",
        wechat: "13566666666",
        qq: "tangtang",
        weibo: "tangtang",
        email: "tangtang@qq.com",
        address: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-02 12:05:27',
      },{
        id: "1",
        userName: "tt521",
        realName: "唐嫣",
        idNum: "2305**********1113",
        phone: "13566666666",
        wechat: "13566666666",
        qq: "tangtang",
        weibo: "tangtang",
        email: "tangtang@qq.com",
        address: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-02 12:05:27',
      }, {
        id: "2",
        userName: "tt521",
        realName: "唐嫣",
        idNum: "2305**********1113",
        phone: "13566666666",
        wechat: "13566666666",
        qq: "tangtang",
        weibo: "tangtang",
        email: "tangtang@qq.com",
        address: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-02 12:05:27',
      }, {
        id: "3",
        userName: "tt521",
        realName: "唐嫣",
        idNum: "2305**********1113",
        phone: "13566666666",
        wechat: "13566666666",
        qq: "tangtang",
        weibo: "tangtang",
        email: "tangtang@qq.com",
        address: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-02 12:05:27',
      }, {
        id: "4",
        userName: "tt521",
        realName: "唐嫣",
        idNum: "2305**********1113",
        phone: "13566666666",
        wechat: "13566666666",
        qq: "tangtang",
        weibo: "tangtang",
        email: "tangtang@qq.com",
        address: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-02 12:05:27',
      }, {
        id: "5",
        userName: "tt521",
        realName: "唐嫣",
        idNum: "2305**********1113",
        phone: "13566666666",
        wechat: "13566666666",
        qq: "tangtang",
        weibo: "tangtang",
        email: "tangtang@qq.com",
        address: '上海市普陀区金沙江路 1518 弄',
        createTime: '2016-05-02 12:05:27',
      }],
      currentPage4: 1
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
