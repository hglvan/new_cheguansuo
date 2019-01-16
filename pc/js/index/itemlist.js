(function() {
  if (getParameter("catDes")) {
    if (getParameter("catId")) {
      getQr1(1);
    } else {
      getQr(1);
    }
  } else {
    getList(1);
  }

  $(".itemlist-box").delegate(".itemlist-resultitembtn", "click", function(e) {
    var taget = e.currentTarget;
    JSON.parse(window.localStorage.getItem("addList")).forEach(element => {
      console.log('sddsd',element.itemCode)
    });
    var addList = JSON.parse(window.localStorage.getItem("addList")).find(item=>item.itemCode == taget.dataset.itemcode)
    console.log('获取',taget.dataset.itemcode,addList)
    $.ajax({
      url: Config().addCar,
      data: {
          spec: addList.spec,  //1
          searchItemId: addList.searchItemId || window.localStorage.getItem("searchid"), //1
          searchId: window.localStorage.getItem("searchid"),
          price: addList.imtPrice+'', //1
          retPrice: addList.retPrice+'', //1
          pro:addList.prod,
          // modelYearId: carData.modelYearId,
          itemDesc: addList.itemDesc, //1
          itemCode: addList.itemCode, //1
          isSupplier: "N", //1
          imageUrl: addList.imgpath, //1
          addFromeIndex:1,
          noCookByUserId:window.sessionStorage.getItem("id")
          // fdrId: carData.fdrId,
          // brandId: carData.brandId,
          // noCookByUserId:window.sessionStorage.getItem("id")
          
      },
      type: "post",
      dataType: "JSON",
      success: function (data) {
          if (data.statusCode == 200) {
              alert("添加成功！")
              // window.location.href = "../index/index.html"
          }else{
              alert("添加失败！")
          }
      }
  });
    // location.href =
    //   "../index/itemdetail.html?cid=" +
    //   taget.dataset.cid +
    //   "&whLoc=" +
    //   taget.dataset.wh;
  });
  $(".itemlist-box").delegate(".itemlist-resultitemorder", "click", function(
    e
  ) {
    var taget = e.currentTarget;
    location.href = "../index/itemorder.html";
  });
  $(".itemlist-box").delegate(".itemlist-pagesbar span", "click", function(e) {
    var taget = e.currentTarget;
    if (getParameter("catDes")) {
      getQr(taget.dataset.page);
    } else {
      getList(taget.dataset.page);
    }
  });
})();
//返回上一页
$('.icon-fanhui').click(function(){
    window.history.go(-1);
})
  $(function(){
    $("body").on("click",".itemlistImageUrl",function(event){
      var target = event.currentTarget;
        console.log(target.dataset)
      location.href = '../index/itemdetail.html?itemCode='+target.dataset.itemcode
    })
})


//获取分类列表
function getList(page) {
  $.ajax({
    url: Config().itemList,
    data: {
      catId: getParameter("fdrId") ? undefined : window.localStorage.getItem("catId"),
      fdrId: getParameter("fdrId") || undefined,
        itemDesc: getParameter("accessoryName") ? getParameter("accessoryName") : window.localStorage.getItem("itemDesc"),
      page: page,
      pageSize: 10,
      noCookByUserId: window.sessionStorage.getItem("id")
    },
    type: "POST",
    dataType: "JSON",
    success: function(data) {
      console.log('data',data);
      if (data.statusCode == 200) {
        window.localStorage.setItem("addList",JSON.stringify(data.stockViews))
        if (data.stockViews == null || data.stockViews == 0) {
          alert("没有相关结果！");
          // window.history.back();
        }
        var resultitemlistTemp = _.template(
          $("#itemlist-resultitemlistTemp").html()
        );
        $(".itemlist-box").html(
          resultitemlistTemp({
            data: data,
            catName: window.localStorage.getItem("itemDesc")
          })
        );
        var pagesbarTemp = _.template($("#itemlist-pagesbarTemp").html());
        $(".itemlist-pagesbar").html(
          pagesbarTemp({
            page: data.page,
            total: data.totalPage
          })
        );
      }
    }
  });
}

//获取配件查询列表
function getQr(page) {
  $.ajax({
    url: Config().itemQrList,
    data: {
      catId: getParameter("catId"),
      catDes: getParameter("catDes"),
      accessoryName: getParameter("accessoryName"),
      page: page,
      pageSize: 10,
      noCookByUserId: window.sessionStorage.getItem("id"),
      isSupplier: "N"
    },
    type: "POST",
    dataType: "JSON",
    success: function(data) {
      console.log(data);
      if (data.statusCode == 200) {
        data.stockViews = data.typeCatViews || [];
        window.localStorage.setItem("addList",JSON.stringify(data.stockViews))
        window.localStorage.setItem("typeCatView2",JSON.stringify(data.typeCatView2))
        if (data.stockViews == 0) {
          alert("没有相关结果！！");
          // window.history.back();
        }
        var resultitemlistTemp = _.template(
          $("#itemlist-resultitemlistTemp").html()
        );
        $(".itemlist-box").html(
          resultitemlistTemp({
            data: data,
            // "catName": window.localStorage.getItem("itemDesc")
            catName:
              getParameter("catDes") + " " + getParameter("accessoryName")
          })
        );
        var pagesbarTemp = _.template($("#itemlist-pagesbarTemp").html());
        $(".itemlist-pagesbar").html(
          pagesbarTemp({
            page: data.page,
            total: data.totalPage
          })
        );
      }
    }
  });
}

// 查找配件搜素
function getQr1(page) {
  $.ajax({
    url: Config().itemQrList1,
    data: {
      catId: getParameter("catId"),
      itemDesc: getParameter("accessoryName"),
      page: page,
      pageSize: 10,
      noCookByUserId: window.sessionStorage.getItem("id")
    },
    type: "POST",
    dataType: "JSON",
    success: function(data) {
      console.log(data);
      if (data.statusCode == 200) {
        data.stockViews = data.stockViews || [];
        window.localStorage.setItem("addList",JSON.stringify(data.stockViews))
        if (data.stockViews == 0) {
          alert("没有相关结果！！");
          // window.history.back();
        }
        var resultitemlistTemp = _.template(
          $("#itemlist-resultitemlistTemp").html()
        );
        $(".itemlist-box").html(
          resultitemlistTemp({
            data: data,
            // "catName": window.localStorage.getItem("itemDesc")
            catName:
              getParameter("catDes") + " " + getParameter("accessoryName")
          })
        );
        var pagesbarTemp = _.template($("#itemlist-pagesbarTemp").html());
        $(".itemlist-pagesbar").html(
          pagesbarTemp({
            page: data.page,
            total: data.totalPage
          })
        );
      }
    }
  });
}
