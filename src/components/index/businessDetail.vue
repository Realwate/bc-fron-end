<template>
  <div>
    <el-table
      :data="businessDetailData"
      border
      style="width: 100%">
      <el-table-column
        label="步骤"
      width="250">
        <template scope="scope">
          <span>{{ scope.row.processName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="role"
        label="角色"
        width="200">
        <template scope="scope">
            <span v-html="flag2Role(scope.row.role)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作节点">
        <template scope="scope">
          <span>{{ scope.row.nodeName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="业务">
        <template scope="scope">
          <span>{{ scope.row.businessName}}</span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  import {businessDetailData} from "@/components/menu/mainBusinessData"
  import {treeData2Array} from "@/util/format"
  import format from "@/util/format"
  export default {
    data() {
      return {
        businessId:null,
        businessDetailData:[{}],
    }
    },
    methods:{
      flag2Role:format.flag2Role
    },
    created(){
        this.businessId = this.$route.params.businessId;

        if(businessDetailData[this.businessId-1]){
          this.businessDetailData = treeData2Array(businessDetailData[this.businessId-1]);
        }

    }
  };
</script>

<style scoped lang="scss">
  @import "../../sass/common.scss";

</style>
