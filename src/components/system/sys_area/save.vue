<template>
  <div class="btn-component-div">
    <el-tooltip class="item" effect="dark" content="打开弹窗，填写用户信息" placement="bottom">
      <el-button type="primary" size="small" icon="el-icon-news" @click="open" :loading="btnLoading">新增</el-button>
    </el-tooltip>
    <el-dialog title="新增" :visible.sync="visible" @close="close" width="20%">
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
    name: 'save',
    props: ['btnLoading', 'options', 'smdParam', 'smdParamExtend', 'fn'],
    data () {
      return {
        winBtnLoading: false,
        visible: false
      }
    },
    methods: {
      open(){
        this.visible = true
      },
      close(){
        this.$emit('cleanSmd');
        this.visible =false;
      },
      commit(){
        var that = this;
        if(that.smdParamExtend.roles){
          that.smdParam.roles = that.smdParamExtend.roles.join(',');
        }
        that.$AJAX.POST(that, that.smdParam, this.fn + '/save', true, function(response){
          that.close();
          that.$emit('search');
        });
      },
    }
  }
</script>
