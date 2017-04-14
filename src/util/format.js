/**
 * Created by Administrator on 2017/4/8.
 */

/* 一些flag转换 */
function flag2label(flag){
  switch(flag){
    case 0:return "未开始";
    case 1:return "进行中";
    case 2:return "完成";
  }
}

function  flag2Class(flag){
  if(flag == 1)
      return "icon bg-blue";
  if(flag == 2)
      return "icon bg-green";

  return "icon bg-grey";

}


/*
 0:所有角色 1管理员
 2合并会计  3成员单位报表会计
 */
function  flag2Role(flag){
  if(flag == 0) //all
    return " <span class='cl-grey'>所有角色</span> ";
  if(flag == 1)//管理员
    return " <span class='cl-orange'>管理员</span> ";
  if(flag == 2)//
    return " <span class='cl-green'>合并会计</span> ";
  if(flag == 3)//
    return " <span class='cl-red'>成员单位报表会计</span> ";

}

/* 其他的格式转换  */

//树结构对象的配置信息 用于标准化成tree
let defaultConfig = {
  keys:["businessId","processName"], //第一层次对象的键名
  childKey:"steps",
  child:{
    keys:["role"],
    childKey:"nodeOperations",
    child:{
      keys:["nodeName"],
      childKey:"business",
      child:{
        keys:["businessName"],
        childKey:null
      }
    }
  }
}

function treeData2Array(treeData,config){
  //构造标准树 拥有parent + children + id
  let treeNode = generateStandardTree(treeData,config);

  //
  return tree2Table(treeNode);
}


function tree2Table(rootNode){
  let nodePaths = [];
  //nodePaths 二维。记录每次遍历访问的结点 结点绝不会重复出现。
  DFSTraverse(nodePaths,rootNode,null);

  //结点转为trs
  let trs = [];
  for(let path of nodePaths){
    trs.push(Object.assign({},...path));
  }
  return trs;
}

function DFSTraverse(nodePaths,node,currentPath) {
  if(!currentPath){ //当前没有记录访问的对象 以当前node为root
    currentPath = [];
  }
  currentPath.push(node);//记录当前访问的结点

  //如果有孩子继续遍历 直到最深处自动停止
  if(node.children && node.children.length > 0){
    for(let i = 0; i < node.children.length; i++){
      if(i != 0){ //非第一个节点 不能记录之前的结点
        currentPath = null;
      }
      let child = node.children[i];
      DFSTraverse(nodePaths,child,currentPath);
    }
  }
  else{//最深处的结点，currentRow记录经历的所有结点
    nodePaths.push(currentPath);
  }
}

/**
 * 将数据标准化为一颗树
 * @param treeData 树的数据
 * @param config 对象字段配置信息
 * @returns {*} 树的根结点
 */
function generateStandardTree(treeData,config){
   config = config || defaultConfig;
   let trFactory = makeTr();

   let rootNode = trFactory();
    config.keys.forEach((key,index)=>{
      rootNode[key] = treeData[key];
    });

    if(treeData[config.childKey]){
      recur(treeData[config.childKey],config.child,rootNode,trFactory);
    }

   return rootNode;
}

/**
 *
 * @param treeData 要构建节点以下 tree的数据
 * @param config tree的键值信息
 * @param parent 该层次结点的父节点
 * @param nodeFactory 创建结点的工厂函数
 */
function recur(treeData,config,parent,nodeFactory){
  //对于子节点而言 treeData是个数组类型
    for(let data of treeData){
      let node = nodeFactory();
      config.keys.forEach((key,index)=>{
        node[key] = data[key]; /* data[key] */
      });
      parent.children.push(node);

      //如果该子节点还有子节点 递归
      if(config.childKey){
        /* data[key] */
        recur(data[config.childKey],config.child,node,nodeFactory);
      }

    }
 }

function makeTr(){
  let id = 1000;
  return function(){
    return {
      id:id++,
      children:[]
  }
  }
}
export default {
  flag2label,flag2Class,flag2Role
}
export {
  businessTree2Array,
  generateStandardTree,
  tree2Table,
  treeData2Array
}
