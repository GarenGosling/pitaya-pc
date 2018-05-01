<template>
  <el-row>
    <el-col :span="12">
      <div class="grid-content bg-purple" style="height: calc(100vh - 200px)">
        <el-tree
          :props="props1"
          :load="loadNode1"
          lazy
          @node-click="handleNodeClick"
          show-checkbox>
        </el-tree>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple-light">
        <el-row :gutter="20" class="my-row">
          <el-col :span="6" class="col-left">英文名称：</el-col>
          <el-col :span="17">
            <el-input placeholder="必填" suffix-icon="el-icon-edit-outline" clearable></el-input>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        fn: 'sysArea',
        searchParams: {
          'parentCode': '/'
        },
        props1: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        }
      };
    },
    methods: {
      search1(){
        var that = this;
        this.$AJAX.GET(this, this.fn + '/getByParentCode', this.searchParams, function(response){
          debugger
          var datas = response.body.data;
          for(var i=0;i<datas.length;i++){
            var data1 = {};
            var data = datas[i];
            data1.id = data.code;
            data1.label = data.name;
            data1.children = [];
            that.treeDatas.push(data1);
          }
        });
      },
      handleNodeClick(data){
        debugger
        console.log(data)
      },
      loadNode1(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: 'region' }]);
        }
        if (node.level > 1) return resolve([]);

        setTimeout(() => {
          const data = [{
            name: 'leaf',
            leaf: true
          }, {
            name: 'zone'
          }];

          resolve(data);
        }, 500);
      }
    },
    mounted: function () {
//      this.search1();
    }
  };
</script>
