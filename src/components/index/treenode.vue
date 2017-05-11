<template>

  <div class="tree-node" @click="nodeClick">
    <div class="node-label">
        <span>
            {{label}}
        </span>
      <input type="text" @keypress.enter="submit" ref="content" :value="label" :class="[isEditing?'visible':'hidden']">
    </div>
    <span class="node-ops" v-show="nodeOpsShow">
        <template v-if="isEditing" >
          <el-button size="mini"  @click.stop="submit">确认</el-button>
          <el-button size="mini" @click.stop="cancel">取消</el-button>
        </template>
       <template v-else >
                <el-button v-if="!hideAddButton" size="mini" @click.stop="add">添加</el-button>
                <el-button size="mini" v-if="!hideEditButton" @click.stop="edit" >编辑</el-button>
<el-button size="mini" v-if="!hideDeleteButton" @click.stop="deleteMethod">删除</el-button>
        </template>
      </span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isEditing:false,
        nodeOpsShow:false
    }
    },
    props:["label","hideEditButton","hideAddButton","hideDeleteButton"],
    methods: {
        nodeClick(){
          this.nodeOpsShow = !this.nodeOpsShow;
          this.$emit("click");
        },
        cancel(){
          this.isEditing = false;
        },
        submit(){
            this.isEditing = false;
            let content = this.$refs.content.value;
            this.$emit("submit",content);
        },
      add(){
          this.$emit("add");
      },
      deleteMethod(){
        this.$emit("deleteEvent");
      },
      edit(){
          this.isEditing = true;
          /*自动选中*/
          this.$nextTick(()=>{
            var input = this.$refs.content;
            input.focus();
            input.setSelectionRange(0,input.value.length);
          })

      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../sass/common.scss";

  .tree-node{
    display: inline-block;
    position: relative;
  }
  .node-ops{
    display: inline-block;
    position: absolute;
    right: -105px;
  }
  .node-label{
    display: inline-block;
    width: 120px;
    position: relative;
    input[type="text"]{
      position: absolute;
      top: 0;
      left:0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      outline: none;
    }
  }


  .visible{
    display: block;
  }
  .hidden{
    display: none;
  }
</style>
