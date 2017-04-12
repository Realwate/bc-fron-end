<template>
  <div>
    detail
  </div>
</template>

<script>
  export default {
    data() {
      return {
        businessId:null
    }
    },
    created(){
        this.businessId = this.$route.params.businessId;
    }
  };
</script>

<style scoped lang="scss">
  @import "../../sass/common.scss";

</style>
