<template>
  <el-row>
    <el-col :span="12">
      <div style="width:98%;margin-left:1%;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;"><i class="el-icon-picture-outline"></i>&nbsp;行政区域</span>
          </div>
          <div class="grid-content bg-purple" style="height: calc(100vh - 300px);overflow:auto;">
            <el-tree ref="tree" :data="treeData" show-checkbox node-key="id" lazy highlight-current :load="loadChildren" accordion @node-click="handleNodeClick"></el-tree>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="12">
      <div style="width:98%;margin-left:1%;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;"><i class="el-icon-location-outline"></i>&nbsp;当前节点信息</span>
          </div>
          <div class="grid-content bg-purple-light" :style="currentDivStyle">
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">ID：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.id" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">名称：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.label"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">父ID：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.parentId" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">&nbsp;</el-col>
              <el-col :span="20" style="text-align:left;">
                <el-button size="small" plain icon="el-icon-arrow-down" v-if="!showChildRow" @click="showChildRowClick">新增子节点</el-button>
                <el-button type="success" size="small" icon="el-icon-arrow-up" v-if="showChildRow"  @click="showChildRowClick">新增子节点</el-button>
                <el-button size="small" plain icon="el-icon-arrow-down" v-if="!showBotherRow" @click="showBotherRowClick">新增兄弟节点</el-button>
                <el-button type="success" size="small" icon="el-icon-arrow-up" v-if="showBotherRow"  @click="showBotherRowClick">新增兄弟节点</el-button>
                <el-button type="primary" size="small">修改</el-button>
                <el-button type="danger" size="small">删除</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top: 10px;" v-show="showChildRow">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;"><i class="el-icon-edit"></i>&nbsp;新增子节点</span>
          </div>
          <div class="grid-content bg-purple-light" style="height: calc(50vh - 240px);font-size:14px;">
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">名称：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.label"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">父ID：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.parentId" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">&nbsp;</el-col>
              <el-col :span="20" style="text-align:left;">
                <el-button type="primary" size="small" plain @click="saveChildNodeData">提交</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top: 10px;" v-show="showBotherRow">
          <div slot="header" class="clearfix">
            <span style="font-size: 16px;"><i class="el-icon-edit"></i>&nbsp;新增兄弟节点</span>
          </div>
          <div class="grid-content bg-purple-light" style="height: calc(50vh - 240px);font-size:14px;">
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">名称：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="botherNodeData.label"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">父ID：</el-col>
              <el-col :span="20">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="botherNodeData.parentId" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="4" class="col-left">&nbsp;</el-col>
              <el-col :span="20" style="text-align:left;">
                <el-button type="primary" size="small" plain @click="saveBotherNodeData">提交</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: 'sysArea',
  data () {
    return {
      fn: 'sysArea',
      treeData: [],
      currentNodeData: {
        id: '',
        label: '',
        parentId: ''
      },
      childNodeData: {
        id: '',
        label: '',
        parentId: ''
      },
      botherNodeData: {
        id: '',
        label: '',
        parentId: ''
      },
      showChildRow: false,
      showBotherRow: false,

    }
  },
  computed: {
    currentDivStyle: function () {
      if(this.showChildRow == false && this.showBotherRow == false){
        return 'height: calc(100vh - 310px);font-size:14px;';
      }else{
        return 'height: calc(50vh - 190px);font-size:14px;';
      }
    }
  },
  methods: {
    initTree(){
      var that = this;
      that.treeData = [];
      that.resetCurrentNodeData();
      that.resetChildNodeData();
      that.resetBotherNodeData();
      that.showChildRow = false;
      that.showBotherRow = false;
      var parentId = -1;
      this.$AJAX.GET(this, this.fn + '/getByParentId?parentId='+parentId, null, function(response){
        var children = response.body.data;
        if(children){
          for(var i=0;i<children.length;i++){
            that.treeData.push(children[i]);
          }
        }else{
          that.currentNodeData.id = -1;
          that.currentNodeData.label = '中国';
          that.currentNodeData.parentId = '-';
        }
      });
    },
    loadChildren(node, resolve){
      var that = this;
      that.resolve = resolve;
      var parentId = node.data.id;
      if(parentId){
        that.$AJAX.GET(that, that.fn + '/getByParentId?parentId='+parentId, null, function(response){
          var childrenData = [];
          var data = response.body.data;
          if(data){
            for(var i=0;i<data.length;i++){
              childrenData.push(data[i]);
            }
          }
          resolve(childrenData);
        });
      }
    },
    handleNodeClick(data){
      this.currentNodeData = data;
      this.childNodeData.parentId = this.currentNodeData.id;
      this.botherNodeData.parentId = this.currentNodeData.parentId;
    },
    showChildRowClick(){
      this.resetChildNodeData();
      this.childNodeData.parentId = this.currentNodeData.id;
      this.showChildRow = !this.showChildRow;
      this.showBotherRow = false;
    },
    resetCurrentNodeData(){
      this.currentNodeData.id = '';
      this.currentNodeData.label = '';
      this.currentNodeData.parentId = '';
    },
    resetChildNodeData(){
      this.childNodeData.id = '';
      this.childNodeData.label = '';
      this.childNodeData.parentId = '';
    },
    showBotherRowClick(){
      this.resetBotherNodeData();
      this.botherNodeData.parentId = this.currentNodeData.parentId;
      this.showBotherRow = !this.showBotherRow;
      this.showChildRow = false;
    },
    resetBotherNodeData(){
      this.botherNodeData.id = '';
      this.botherNodeData.label = '';
      this.botherNodeData.parentId = '';
    },
    saveChildNodeData(){
      var that = this;
      that.$AJAX.POST(that, that.childNodeData, that.fn + '/save', true, function(response){
        var parentId = that.childNodeData.parentId;
        if(parentId) {
          var childrenData = [];
          that.$AJAX.GET(that, that.fn + '/getByParentId?parentId=' + parentId, null, function (response) {
            var children = response.body.data;
            if (children) {
              var currentData = that.$refs.tree.getNode(that.currentNodeData.id).data;
              currentData.children = [];
              for (var i = 0; i < children.length; i++) {
                currentData.children.push(children[i]);
              }
              that.resetChildNodeData();
              that.childNodeData.parentId = that.currentNodeData.id;
            }
          });
        }
      })
    },
    saveBotherNodeData(){
      var that = this;
      that.$AJAX.POST(that, that.botherNodeData, that.fn + '/save', true, function(response){
        var parentId = that.botherNodeData.parentId;
        if(parentId == -1){
          that.initTree();
        }else{
          that.$AJAX.GET(that, that.fn + '/getByParentId?parentId=' + parentId, null, function (response) {
            debugger
            var children = response.body.data;
            if (children) {
              var parentData = that.$refs.tree.getNode(parentId).data;
              parentData.children = [];
              for (var i = 0; i < children.length; i++) {
                var child = children[i];
                parentData.children.push(children[i]);
              }
              that.resetBotherNodeData();
              that.botherNodeData.parentId = that.currentNodeData.parentId;
            }
          });
        }
      });
    }
  },
  mounted: function () {
    this.initTree();
  }
}
</script>
