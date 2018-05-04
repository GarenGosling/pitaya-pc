<template>
  <el-row>
    <el-col :span="6">
      <div style="width:90%;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>行政区域</span>
          </div>
          <div class="grid-content bg-purple" style="height: calc(100vh - 340px);overflow:auto;">
            <el-tree :data="treeData" lazy :load="loadChildren" accordion @node-click="handleNodeClick"></el-tree>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6">
      <div style="width:90%;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>当前节点信息</span>
          </div>
          <div class="grid-content bg-purple-light" style="height: calc(100vh - 350px);font-size:14px;">
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">ID：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.id" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">编码：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.code" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">名称：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.name"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">上级编码：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.parentCode" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">上级名称：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.parentName" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">全名称：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.fullName" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">全路径：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="currentNodeData.fullPath" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">类型：</el-col>
              <el-col :span="16">
                <el-select v-model="currentNodeData.type" filterable placeholder="类型" style="width: 100%;" disabled>
                  <el-option
                    v-for="item in options.types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">&nbsp;</el-col>
              <el-col :span="16" style="text-align:left;">
                <el-button type="primary" size="small" plain>修改</el-button>
                <el-button type="danger" size="small" plain>删除</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6">
      <div style="width:90%;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>添加同级节点</span>
          </div>
          <div class="grid-content bg-purple-light" style="height: calc(100vh - 350px);font-size:14px;">
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">ID：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="brotherNodeData.id" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">编码：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="brotherNodeData.code" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">名称：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="brotherNodeData.name"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">上级编码：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="brotherNodeData.parentCode" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">上级名称：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="brotherNodeData.parentName" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">全名称：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="brotherNodeData.fullName" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">全路径：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="brotherNodeData.fullPath" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">类型：</el-col>
              <el-col :span="16">
                <el-select v-model="brotherNodeData.type" filterable placeholder="类型" style="width: 100%;" disabled>
                  <el-option
                    v-for="item in options.types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">&nbsp;</el-col>
              <el-col :span="16" style="text-align:left;">
                <el-button type="primary" size="small" plain>提交</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6">
      <div style="width:90%;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>添加子节点</span>
          </div>
          <div class="grid-content bg-purple-light" style="height: calc(100vh - 350px);font-size:14px;">
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">ID：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.id" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">编码：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.code" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">名称：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.name"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">上级编码：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.parentCode" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">上级名称：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.parentName" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">全名称：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.fullName" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">全路径：</el-col>
              <el-col :span="16">
                <el-input suffix-icon="el-icon-edit-outline" clearable v-model="childNodeData.fullPath" disabled></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">类型：</el-col>
              <el-col :span="16">
                <el-select v-model="childNodeData.type" filterable placeholder="类型" style="width: 100%;" disabled>
                  <el-option
                    v-for="item in options.types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="my-row">
              <el-col :span="8" class="col-left">&nbsp;</el-col>
              <el-col :span="16" style="text-align:left;">
                <el-button type="primary" size="small" plain>提交</el-button>
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
    data() {
      return {
        fn: 'sysArea',
        treeData: [],
        props1: {
          label: 'name',
          isLeaf: 'leaf'
        },
        options: {
          types: [
            {value: '1',label: '省份'},
            {value: '2',label: '城市'},
            {value: '3',label: '区县'}
          ]
        },
        currentNodeData: {
          id: '',
          code: '',
          name: '',
          parentCode: '',
          parentName: '',
          fullName: '',
          fullPath: '',
          type: ''
        },
        brotherNodeData: {
          id: '',
          code: '',
          name: '',
          parentCode: '',
          parentName: '',
          fullName: '',
          fullPath: '',
          type: ''
        },
        childNodeData: {
          id: '',
          code: '',
          name: '',
          parentCode: '',
          parentName: '',
          fullName: '',
          fullPath: '',
          type: ''
        },
      };
    },
    methods: {
      searchByParentCode(parentCode){
        var that = this;
        this.$AJAX.GET(this, this.fn + '/getByParentCode?parentCode='+parentCode, {}, function(response){
          var datas = response.body.data;
          for(var i=0;i<datas.length;i++){
            var data1 = {};
            var data = datas[i];
            data1.id = data.code;
            data1.label = data.name;
            data1.children = [];
            that.treeData.push(data1);
          }
        });
      },
      loadChildren(node, resolve){
        var parentCode = node.data.id;
        if(parentCode){
          var that = this;
          this.$AJAX.GET(this, this.fn + '/getByParentCode?parentCode='+parentCode, {}, function(response){
            var childrenData = [];
            var datas = response.body.data;
            for(var i=0;i<datas.length;i++){
              var data1 = {};
              var data = datas[i];
              data1.id = data.code;
              data1.label = data.name;
              childrenData.push(data1);
            }
            resolve(childrenData);
          });
        }
      },
      handleNodeClick(data){
        debugger
        var that = this;
        that.$AJAX.GET(that, that.fn + '/getByCode?code='+data.id, {}, function(response){
          that.currentNodeData = response.body.data;
          that.setBrotherNodeData();
          that.setChildNodeData();
        });
      },
      setBrotherNodeData(){
        debugger
        var that = this;
        var name = "";
        if(that.currentNodeData.type == 1){
          name = "province";
        }
        if(that.currentNodeData.type == 2){
          name = "city";
        }
        if(that.currentNodeData.type == 3){
          name = "county";
        }
        that.$AJAX.GET(that, '/sysIncrement/get?name='+name, {}, function(response){
          var code = response.body.data.code;
          // 同级节点赋值
          that.brotherNodeData.id = '';
          that.brotherNodeData.code = code;
          that.brotherNodeData.name = '';
          that.brotherNodeData.parentCode = that.currentNodeData.parentCode;
          that.brotherNodeData.parentName = that.currentNodeData.parentName;
          that.brotherNodeData.fullName = '';
          that.brotherNodeData.type = that.currentNodeData.type;
          // fullPath
          var tmpFullPath = that.currentNodeData.fullPath;
          var arr = tmpFullPath.split("/");
          arr[arr.length - 1] = that.brotherNodeData.code;
          var newFullPath = '';
          for(var i=0;i<arr.length;i++){
            if(arr[i]){
              newFullPath += "/";
              newFullPath += arr[i];
            }
          }
          that.brotherNodeData.fullPath = newFullPath;
        });
      },
      setChildNodeData(){
        var that = this;
        that.childNodeData.type = (parseInt(that.currentNodeData.type) + 1) + "";
        var name = "";
        if(that.childNodeData.type == 1){
          name = "province";
        }
        if(that.childNodeData.type == 2){
          name = "city";
        }
        if(that.childNodeData.type == 3){
          name = "county";
        }
        that.$AJAX.GET(that, '/sysIncrement/get?name='+name, {}, function(response){
          var code = response.body.data.code;
          // 子节点赋值
          that.childNodeData.id = '';
          that.childNodeData.code = code;
          that.childNodeData.name = '';
          that.childNodeData.parentCode = that.currentNodeData.code;
          that.childNodeData.parentName = that.currentNodeData.name;
          that.childNodeData.fullName = '';
          // fullPath
          that.childNodeData.fullPath = that.currentNodeData.fullPath + "/" + that.childNodeData.code;
        });
      }
    },
    watch: {
      'brotherNodeData.name' (val) {
        var tmpFullName = this.currentNodeData.fullName;
        var arr = tmpFullName.split("/");
        arr[arr.length - 1] = this.brotherNodeData.name;
        var newFullName = '';
        for(var i=0;i<arr.length;i++){
          if(arr[i]){
            newFullName += "/";
            newFullName += arr[i];
          }
        }
        this.brotherNodeData.fullName = newFullName;
      },
      'childNodeData.name' (val) {
        this.childNodeData.fullName = this.currentNodeData.fullName + "/" + this.childNodeData.name;
      }
    },
    mounted: function () {
      this.searchByParentCode("/");
    }
  };
</script>
