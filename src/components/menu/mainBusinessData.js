
/*
  0:all 1管理员
  2合并会计  3成员单位报表会计
  */
var businessOverviewData = [
  {
    id:1,
    processName:"登录主界面",
    roles:[0],
    achivePercent:"80%",
  },
  {
    id:2,
    processName:"	建立合并组织体系",
    roles:[1],
    achivePercent:"80%",
  },
  {
    id:12,
    processName:"内部交易对账",
    roles:[2,3],
    achivePercent:"80%",
  }
]


var businessDetailData = [
  {
    id:1,
    step:"",
    nodeOperations:[{
      name:"从ERP系统自动采集单体数据",
      buseness:[

      ]
    }]
  }
]
export default {
  businessOverviewData,
  businessDetailData
}
