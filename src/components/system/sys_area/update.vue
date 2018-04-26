<template>
  <div class="text-component-div">
    <el-button @click="open()" type="text" size="small">编辑</el-button>
    <el-dialog title="编辑" :visible.sync="visible" @close="close" append-to-body>
      <el-row :gutter="20" class="my-row">
        <el-col :span="24">
          <el-col :span="12" class="my-head-right">ID：{{smdParam.id || '-'}}</el-col>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="24">
          <el-input placeholder="上级ID" v-model="smdParam.parentId">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="24">
          <el-input placeholder="名称" v-model="smdParam.name">
            <i slot="suffix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="my-row">
        <el-col :span="24">
          <el-select v-model="smdParam.type" filterable placeholder="类型" style="width: 100%;">
            <el-option
              v-for="item in options.type"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close" :loading="winBtnLoading">取 消</el-button>
        <el-button type="primary" @click="commit" :loading="winBtnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'update',
    props: ['rowData', 'options', 'smdParam', 'fn'],
    data () {
      return {
        winBtnLoading: false,
        visible: false,
      }
    },
    methods: {
      open(){
        this.setSmd(this.rowData);
        if(this.rowData.roles){
          this.smdParamExtend.roles = this.rowData.roles.split(',');
        }
        this.visible = true
      },
      close(){
        this.$emit('cleanSmd');
        this.visible =false;
      },
      setSmd(row){
        this.smdParam.id = row.id;
        this.smdParam.parentId = row.parentId;
        this.smdParam.name = row.name;
        this.smdParam.type = row.type;
      },
      commit(){
        var that = this;
        that.$AJAX.PUT(this, that.smdParam, this.fn + '/update', function(response){
          that.close();
          that.$emit('search');
        });
      }
    }
  }
</script>
