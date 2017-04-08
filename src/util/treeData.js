/**
 * Created by Administrator on 2017/4/7.
 */

//根据Id更新一个已存在的结点的状态
//可用HashMap展开 根据Id快速定位
function updateOneNode(treeData,newNode){
  treeData.some((item)=>{
    if(item.id == newNode.id){
      updateNodeContent(item,newNode)
      return true;
    }
    if(updateNodeById(item.children,newNode)){
      return true;
    }
  })
}
function updateNodeContent(oldNode,newNode){
  oldNode.label = newNode.label;
}

//插入一个新的结点
//找到父节点并赋值
function insertOneNode(treeData,newNode){
  treeData.some((item)=>{
    if(item.id == newNode.parentid){

      if(!item.children){
        item.children = [];
      }
      item.children.push(newNode);

      return true;
    }
    if(insertOneNode(item,newNode.parentId)){
      return true;
    }
  })
}

export default {
  updateOneNode
}
