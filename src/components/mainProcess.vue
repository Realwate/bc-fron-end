<template>
  <div class="businessProcess">
    <el-table
      :data="businessData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="#">
      </el-table-column>
      <el-table-column
        prop="process"
        label="应用流程"
        width="180">
      </el-table-column>
      <el-table-column
        prop="role"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="achivePercent"
        label="完成率">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  export default {
    data(){
      return {
          businessData:[
              {
              id:"1",
              process:"登录主界面",
              role:"角色",
              achivePercent:"80%",
          }
          ]
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../sass/common.scss";
  .businessProcess{
    flex: 1;
  }
</style>
