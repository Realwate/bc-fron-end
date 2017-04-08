/**
 * Created by Administrator on 2017/4/8.
 */

function flag2label(flag){
  switch(flag){
    case 0:return "未开始";
    case 1:return "进行中";
    case 2:return "完成";
  }
}

function  flag2Class(flag){
  if(flag == 1)
      return "icon-ing";
  if(flag == 2)
      return "icon-finished";

  return "icon-unfinished";

}
export default {
  flag2label,flag2Class
}
