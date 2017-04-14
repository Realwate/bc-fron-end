<template>
<div class="w"  v-loading="isLoading"
     element-loading-text="拼命加载中">


  <transition name="slide"
              leave-active-class="animated bounceOutLeft">
  <aside class="main-aside" v-if="treeVisible">  <!--  main-侧边栏  -->
    <div><i class="el-icon-d-arrow-left hide-tree"
            @click="treeVisible = !treeVisible;" ></i></div>
      <el-tree
        class="tree"
        :data="treeData"
        :props="{children: 'children',label: 'label'}"
        node-key="localId"
        highlight-current
        :indent="8"
        :expand-on-click-node="false"
        :render-content="renderContent"
      >
      </el-tree>

  </aside>
  </transition>
  <div class="main-content">
    <el-table
      :data="tableData"
      border
      :default-sort = "{prop: 'module.label', order: 'ascending'}"
      stripe>
      <el-table-column
        label="模块"
        prop="module.label"
        sortable
      >
      </el-table-column>
      <el-table-column
        label="一级节点"
        sortable
        prop="firstLevelNode.label">
      </el-table-column>
      <el-table-column
        label="二级节点"
        width="150px"
        prop="secondLevelNode.label">
        <template scope="scope">
          <router-link :to= "config.rootPath+'/document/'+scope.row.nodeinfo.documentid">
            {{scope.row.secondLevelNode.label}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="需求完成"
        sortable
        prop="nodeinfo.requirementflag">
        <template scope="scope">
          <span :class="flag2Class(scope.row.nodeinfo.requirementflag)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="开发完成"
        sortable
        prop="nodeinfo.developflag">
        <template scope="scope">
          <span :class="flag2Class(scope.row.nodeinfo.developflag)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="测试"
        sortable
        prop="nodeinfo.testflag">
        <template scope="scope">
          <span :class="flag2Class(scope.row.nodeinfo.testflag)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="负责人"
        sortable
        prop="nodeinfo.boss">
      </el-table-column>
      <el-table-column label="操作"
       align="center">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

        </template>
      </el-table-column>
    </el-table>
    <icon-desc :settings="iconSettings"></icon-desc>
  </div>
  <!-- 模态框 -->
  <el-dialog :close-on-press-escape="false" :close-on-click-modal="false"
    title="编辑" v-model="dialogVisible" size="small">
    <el-form ref="form" :model="toUpdateRow" label-width="80px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="模块">
            <el-input v-model="toUpdateRow.module" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="需求完成">
            <el-select v-model="toUpdateRow.requirementflag" placeholder="请选择">
              <el-option label="未开始" value="0"></el-option>
              <el-option label="进行中" value="1"></el-option>
              <el-option label="完成" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="一级结点">
            <el-input v-model="toUpdateRow.firstLevelNode" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="开发完成">
            <el-select v-model="toUpdateRow.developflag" placeholder="请选择">
              <el-option label="未开始" value="0"></el-option>
              <el-option label="进行中" value="1"></el-option>
              <el-option label="完成" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="二级结点">
            <el-input v-model="toUpdateRow.secondLevelNode" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="测试完成">
            <el-select v-model="toUpdateRow.testflag" placeholder="请选择">
              <el-option label="未开始" value="0"></el-option>
              <el-option label="进行中" value="1"></el-option>
              <el-option label="完成" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22">
          <el-form-item label="负责人">
            <el-input v-model="toUpdateRow.boss"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px;">
        <el-col :offset="6" :span="19">
          <el-form-item>
            <el-button :loading="submitLoading" type="primary" @click="updateNodeInfo">提交</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

  </el-dialog>
</div>
</template>

<script>
  import treeNode from "./treenode"
  import iconDesc from "@/components/icondesc"
  import Msg from "@/components/msg"
  import api from "@/api"
  import {mapState} from "vuex"
import config from '@/config'

  import formatUtil from "@/util/format"

  var id = 1000;
  export default {
    data(){
      return {
        treeVisible:true,
        submitLoading:false,
        isLoading:true,
        config,
        iconSettings:[
          {classNames:["bg-grey"],label:"未开始"},
          {classNames:["bg-blue"],label:"进行中"},
          {classNames:["bg-green"],label:"完成"},
        ],
        tableData:  [],
        nodeInfo:[],
        realTreeDataRef:new Map(),
        dialogVisible:false,
        currentRow:{},
        toUpdateRow:{},
        treeData:[],
      }
    },
    mounted(){
        if(this.currentProductId) {

            //获取node信息 nodeinfo
          api.getNodeByProductId(this.currentProductId)
            .then(({data:msg}) => {
              let nodeData = msg.data.node;
              let nodeInfoData = msg.data.nodeInfo;

              //更新 treedata 不会立刻渲染界面 所以map不变化
              this.updateTreeData(nodeData);
              //nodeinfo 变化 更新tableData 会调用map
              this.nodeInfo = nodeInfoData;
              this.isLoading = false;
              console.log("NODE初始化完成")

              //初始获取node ->改变Tree内部数据
              // 渲染Tree -> 此时才修改this.realTreeDataRef
              //发送addNode请求 -> 返回更新node ->
//              this.$nextTick(()=>{
//                this.nodeInfo.push({});
//              });
              //添加node返回 更新本地数据， 触发watcher
              //watcher试图根据realTreeDataRef更新tableData
              //但是此时realTreeDataRef还未变化
            });

        }
    },
    computed:{
      currentProductId(){
          return this.$store.state.currentProductId;
      }
    },
    created(){
        let productId = this.$route.params.id;
      this.$store.dispatch("changeProductId",productId);
    },
    watch: { //productId发生变化则 更新node
      currentProductId(newId){
         api.getNodeByProductId(newId)
          .then(({data:msg}) => {
              let nodeData = msg.data.node;
              let nodeInfoData = msg.data.nodeInfo;
            this.updateTreeData(nodeData);
            this.nodeInfo = nodeInfoData;
          })
      },
      nodeInfo(newInfo){
          console.log("watch nodeInfo变化",newInfo)
        this.updateTableData(newInfo);
      }
    },
    methods: {
        //更新本地nodeInfo数据
        updateLocalNodeInfo(){
          api.getNodeInfoByProductId(this.currentProductId)
            .then(({data})=>{
              this.submitLoading = false;
              this.dialogVisible=false;

              this.nodeInfo = data.data;
              Msg.alertSuccess("更新成功")
            });
        },
     //当数据 nodeinfo变化时 更新tableData
      updateTableData(newInfo){
            this.$nextTick(()=>{
//            setTimeout(()=>{
            newInfo = newInfo || this.nodeInfo;
          if (!newInfo|| newInfo.length == 0 || this.realTreeDataRef.size <=1) {
              this.tableData = [];
            return;
          }
          console.log("更新tableData 此时map ",this.realTreeDataRef);
          let data = [];
          for (let info of newInfo) {
            //获取结点信息
            if (!info.nodeid) {
              continue;
            }

            let secondLevel = this.realTreeDataRef.get(info.nodeid);
            console.log("secondLevel",secondLevel,"nodeinfo",info)
            let obj = {
              nodeinfo: info,
              secondLevelNode: secondLevel.data,
              firstLevelNode: secondLevel.parent.data,
              module: secondLevel.parent.parent.data
            }
            data.push(obj);
          }
          console.log("tableData更新", data)
          this.tableData = data;
        });
      },
      flag2label:formatUtil.flag2label,
      changeUpdateRow(newRow){//点击编辑更新toUpdateRow
        this.toUpdateRow = {
            id:newRow.nodeinfo.id,
          module:newRow.module.label,
          firstLevelNode:newRow.firstLevelNode.label,
          secondLevelNode:newRow.secondLevelNode.label,

          requirementflag:newRow.nodeinfo.requirementflag + "",
          developflag:newRow.nodeinfo.developflag + "",
          testflag:newRow.nodeinfo.testflag + "",
          boss:newRow.nodeinfo.boss
        }
      },
        updateTreeData(remoteTreeData){
          this.treeData = [{
            localId:99999,
            label:"全部",
            children:remoteTreeData
          }];

        },
      addHandle(store, data) {//data父节点数据
        store.append({
            localId: id++,
          parentId:data.id,
          isNew:true,
          label: '编辑结点',
          children: [] ,
          productid:this.currentProductId
        }, data);
      },
      remove(store, data) {
        store.remove(data);
        this.realTreeDataRef.delete(data.id);
      },

      //data为node的数据
      renderContent(h, { node, data, store }) {
        this.realTreeDataRef.set(data.id,node);
        var props = {
          label:node.label
        }
        if(node.level===1){
          node.expanded = true;
          props.hideEditButton = true;
          props.hideDeleteButton = true;
        }
        if(node.level == 4){
          props.hideAddButton = true;
        }

        return h(treeNode,
          {
            props:props,
            on:{
                "deleteEvent":()=>{
                    //本地结点，直接删除
                    if(data.isNew){
                      this.remove(store,data)
                    }
                    else {//发送请求
                      Msg.confirm("确认删除吗?").then(() => {
                        api.deleteNode(data.id)
                          .then(({data:msg}) => {
                            if (!msg.error) {
                              this.remove(store, data);

                              //删除一个结点重新获取数据
                              this.updateLocalNodeInfo();
                            }
                          });
                      });
                    }

                },
              "add":()=>{
                this.addHandle(store,data)
                node.expanded = true;
              },//添加结点
              "submit":(newLabel)=>{//更新结点或添加
                Msg.confirm("确认更新吗?").then(()=>{

                  if(data.isNew){ //添加
                    let nodeData = {
                        label:newLabel,
                        parentid:node.parent.data.id,
                      productid:data.productid
                    }

                    api.addNode(nodeData)
                      .then(({data:msg}) => {
                        if(!msg.error) {
                            //添加成功 同步子组件内部数据
                          //包括label id
                          data.label = msg.data.label;
                          data.id = msg.data.id;
                          data.isNew = false;

                          //再次获取全部节点
                          this.updateLocalNodeInfo();

                        }
                        else{
                          Msg.alertError(msg.error.msg);
                        }

                      }).catch((e)=>
                      console.error(e.message)
                    );
                  }
                  else{
                    let nodeData = {
                      label:newLabel,
                      id:data.id,
                      productid:data.productid
                    }
                    api.updateNode(nodeData)
                      .then(({data:msg}) => {
                        if(!msg.error) {
                          data.label = msg.data.label;
                          this.updateTableData();
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
          })
      },

        /* --------表格method------- */
      updateNodeInfo(){//更新nodeInfo
        var nodeInfo = {
            id:this.toUpdateRow.id,
            boss:this.toUpdateRow.boss,
          requirementflag:this.toUpdateRow.requirementflag,
          developflag:this.toUpdateRow.developflag,
          testflag:this.toUpdateRow.testflag,
        }
        this.submitLoading = true;
        api.updateNodeInfo(nodeInfo)
          .then(({data})=>{
            if(!data.error){

              //更新后如何增量同步？
              this.updateLocalNodeInfo();

            }
          })
      },
      handleEdit(index, row) {
         this.currentRow = row;
        this.changeUpdateRow(row);
        this.dialogVisible = true;
      },
      flag2Class:formatUtil.flag2Class
    },

      components:{
        treeNode,
        iconDesc
      }
  }
</script>

<style scoped lang="scss">
  @import "../../sass/common.scss";
  .w{
    display: flex;
    background-color: #fff;
    flex-wrap: wrap;
    min-height: 400px;
  }
  .hide-tree{
    cursor: pointer;
  }
  .tree{
    min-height: 100%;
    max-width: 280px;
    box-sizing: border-box;
  }

  .main-aside{
    flex:0 0 280px;
    position: relative;
    /*transition:all .8s cubic-bezier(.71,-0.42,.1,1.19) ;*/
  }
  .main-content{
    overflow: hidden;
    flex: 1;
    margin-left:15px;
    transition:all .8s cubic-bezier(.71,-0.42,.1,1.19) ;
  }
  a{
  @extend %common-a;
  }
</style>
