var houseOwner = {
  showHouseInfo: function () {
    var price = 10000
    return price
  },
  showOwnerInfo: function () {
    console.log(`我的电话是137*******`)
  }
}
var intermediary = {
  showHouseInfo: function (houseOwner) {
    var price = houseOwner.showHouseInfo() * 1.2
    console.log(`这个房子每平${price}元`)
  }
}
intermediary.showHouseInfo(houseOwner)
