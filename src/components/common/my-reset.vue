<template>
  <div class="btn-component-div">
    <el-tooltip class="item" effect="dark" content="清空所有搜索条件，并刷新查询结果" placement="bottom">
      <el-button size="small" icon="el-icon-refresh" @click="reset" :loading="btnLoading">重置</el-button>
    </el-tooltip>
  </div>
</template>

<script>
  export default {
    name: 'my-export',
    props: ['btnLoading'],
    methods: {
      reset(){
        this.$emit('reset');
      }
    }
  }
</script>
