<template>
  <div class="businessProcess">
    <el-table
      :data="businessData"
      border>
      <el-table-column
        prop="id"
        label="#">
      </el-table-column>
      <el-table-column
        prop="processName"
        label="应用流程"
        width="180">
        <template scope="scope">
          <router-link :to="`/BC-backend/index/businessDetail/${scope.row.id}?navTitle=${scope.row.processName}`">
            {{scope.row.processName}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="roles"
        label="角色">
        <template scope="scope">
          <span v-for="role in scope.row.roles">{{role}} </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="achivePercent"
        label="完成率">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import businessData from "./mainBusinessData"
  export default {
    data(){
      return {
          businessData:businessData.businessOverviewData
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../sass/common.scss";
  .businessProcess{
    flex: 1;
  }
  a{
    @extend %common-a;
  }
</style>
