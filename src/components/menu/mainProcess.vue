<template>
  <div class="businessProcess">
    <el-table
      :data="businessData"
      border
      stripe>
      <el-table-column
        prop="id"
        align="center"
        label="#"
      width="130">
      </el-table-column>
      <el-table-column
        prop="processName"
        label="应用流程">
        <template scope="scope">
          <router-link :to="`${config.rootPath}/index/businessDetail/${scope.row.id}?navTitle=${scope.row.processName}`">
            {{scope.row.processName}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="roles"
        label="角色">
        <template scope="scope">
          <template v-for="role in scope.row.roles">
            <span v-html="flag2Role(role)"></span>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        prop="achivePercent"
        label="完成率">
      </el-table-column>
    </el-table>
    <icon-desc :settings="iconSettings"></icon-desc>
  </div>
</template>

<script>
  import {businessOverviewData} from "./mainBusinessData"
  import iconDesc from "@/components/icondesc"
  import format from "@/util/format"
  import config from "@/config"

  export default {
    data(){
      return {
          config:config,
          businessData:businessOverviewData,
        iconSettings:[
            {classNames:["bg-grey"],label:"所有角色"},
            {classNames:["bg-orange"],label:"管理员"},
            {classNames:["bg-green"],label:"合并会计"},
            {classNames:["bg-red"],label:"成员单位报表会计"},
        ]
      }
    },
    methods:{
      flag2Role:format.flag2Role
    },
    components:{
        iconDesc
    }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/common.scss";
  .businessProcess{
    flex: 1;
    overflow: hidden;
  }
  a{
    @extend %common-a;
  }
</style>
