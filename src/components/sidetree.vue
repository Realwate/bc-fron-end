<template>



</template>

<script>
  import treeNode from "./treenode"
  import Msg from "./msg"
  import api from "@/api"
  import {mapState} from "vuex"
  let id = 1000;

  export default {
    data() {
      return {
        treeData2: [{
            id: 0,
          label:"全部",
            children: [
              {
                id: 1,
                label: '组织管理',
                children: [{
                  id: 11,
                  label: '集团'
                }, {
                  id: 12,
                  label: '业务单元'
                }]
              }, {
                id: 3,
                label: '一级 3',
                children: [{
                  id: 7,
                  label: '二级 3-1'
                }, {
                  id: 8,
                  label: '二级 3-2'
                }]
              }]
          }],
      }
    },
    methods: {

      addHandle(store, data) {//data父节点数据
         console.log(store,data);
        store.append({ id: id++,isNew:true, label: '编辑结点', children: [] }, data);
      },

      remove(store, data) {
        store.remove(data);
      },

      //data为node的数据
      renderContent(h, { node, data, store }) {
        var props = {
          label:node.label
        }
          if(node.level===1){
              node.expanded = true;
              props.hideEditButton = true;
          }
          if(node.level == 4){
              props.hideAddButton = true;
          }

          return h(treeNode,
            {
                props:props,
              on:{
                    "add":()=>{
                      this.addHandle(store,data)
                      node.expanded = true;
                    },//添加结点
                    "submit":(value)=>{//更新结点或添加
                      Msg.confirm("确认更新吗?").then(()=>{

                          if(data.isNew){ //添加
                            api.addNode(node)
                              .then(({data:msg}) => {
                                if(!msg.error) {
                                  data.label = msg.data.label;
                                  data.isNew = false;
                                  Msg.alertSuccess("更新成功")
                                }
                                else{
                                  Msg.alertError(msg.error.msg);
                                }

                              });
                          }
                          else{
                            api.updateNode(node)
                              .then(({data:msg}) => {
                                if(!msg.error) {
                                  data.label = msg.data.label;
                                  Msg.alertSuccess("更新成功")
                                }
                                else{
                                  Msg.alertError(msg.error.msg);
                                }

                              });
                          }


                      })
                    },
              }
            }
          )
      },
      components:{
        treeNode
      }
    }
  };
</script>

<style scoped>
  @import "../sass/common.scss";
  .tree{
    height: 100%;
    max-width: 260px;
    box-sizing: border-box;
  }
</style>
