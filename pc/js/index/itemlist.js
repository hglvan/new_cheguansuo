(function () {
    if(getParameter("catDes")){
        if(getParameter("catId")){
            getQr1(1);
        }else{
            getQr(1);  
        }
    }else{
        getList(1);  
    }

    $(".itemlist-box").delegate(".itemlist-resultitembtn", "click", function (e) {
        var taget = e.currentTarget;
        location.href = "../index/itemdetail.html?cid="+taget.dataset.cid+"&whLoc="+taget.dataset.wh+"&itemCode="+taget.dataset.itemcode;
    })
    $(".itemlist-box").delegate(".itemlist-resultitemorder", "click", function (e) {
        var taget = e.currentTarget;
        location.href = "../index/itemorder.html";
    })
    $(".itemlist-box").delegate(".itemlist-pagesbar span", "click", function (e) {
        var taget = e.currentTarget;
        if(getParameter("catDes")){
            getQr(taget.dataset.page);
        }else{
            getList(taget.dataset.page);  
    }
    });
})()

//返回上一页
$('.icon-fanhui').click(function(){
    window.history.go(-1);
})

//获取分类列表
function getList(page){
    $.ajax({
        url: Config().itemList,
        data:{
            catId: window.localStorage.getItem("catId"),
            itemDesc: window.localStorage.getItem("itemDesc"),
            page: page,
            pageSize: 10,
            noCookByUserId:window.sessionStorage.getItem("id")

        },
        type: "POST",
        dataType: "JSON",
        success: function(data){            
            console.log(data);
            if (data.statusCode == 200) {
                if(data.stockViews == null || data.stockViews == 0){
                    alert("没有相关结果！");
                    // window.history.back();
                }
                var resultitemlistTemp = _.template($('#itemlist-resultitemlistTemp').html());
                $('.itemlist-box').html(resultitemlistTemp({
                    "data": data,
                    "catName": window.localStorage.getItem("itemDesc")
                }));
                var pagesbarTemp = _.template($('#itemlist-pagesbarTemp').html());
                $('.itemlist-pagesbar').html(pagesbarTemp({
                    "page": data.page,
                    "total": data.totalPage
                }));
            }
        }
    });
}

//获取配件查询列表
function getQr(page){

    $.ajax({
        url: Config().itemQrList,
        data:{
            catId:getParameter("catId") || undefined,
            fdrId:getParameter("fdrId") || undefined,
            catDes: getParameter("catDes"),
            accessoryName: getParameter("accessoryName"),
            page: page,
            pageSize: 10,
            noCookByUserId:window.sessionStorage.getItem("id"),
            isSupplier:'N'
        },
        type: "POST",
        dataType: "JSON",
        success: function(data){            
            console.log(data);
            if (data.statusCode == 200) {
                data.stockViews = data.typeCatViews || [];
                if(data.stockViews == 0){
                    alert("没有相关结果！！");
                    // window.history.back();
                }
                var resultitemlistTemp = _.template($('#itemlist-resultitemlistTemp').html());
                $('.itemlist-box').html(resultitemlistTemp({
                    "data": data,
                    // "catName": window.localStorage.getItem("itemDesc")
                    "catName": getParameter("catDes")+' '+getParameter("accessoryName")

                }));
                var pagesbarTemp = _.template($('#itemlist-pagesbarTemp').html());
                $('.itemlist-pagesbar').html(pagesbarTemp({
                    "page": data.page,
                    "total": data.totalPage
                }));
            }
        }
    });
}

// 查找配件搜素
function getQr1(page){

    $.ajax({
        url: Config().itemQrList1,
        data:{
            catId:getParameter("catId"),
            itemDesc: getParameter("accessoryName"),
            page: page,
            pageSize: 10,
            noCookByUserId:window.sessionStorage.getItem("id"),
        },
        type: "POST",
        dataType: "JSON",
        success: function(data){            
            console.log(data);
            if (data.statusCode == 200) {
                data.stockViews = data.stockViews || [];
                if(data.stockViews == 0){
                    alert("没有相关结果！！");
                    // window.history.back();
                }
                var resultitemlistTemp = _.template($('#itemlist-resultitemlistTemp').html());
                $('.itemlist-box').html(resultitemlistTemp({
                    "data": data,
                    // "catName": window.localStorage.getItem("itemDesc")
                    "catName": getParameter("catDes")+' '+getParameter("accessoryName")

                }));
                var pagesbarTemp = _.template($('#itemlist-pagesbarTemp').html());
                $('.itemlist-pagesbar').html(pagesbarTemp({
                    "page": data.page,
                    "total": data.totalPage
                }));
            }
        }
    });
}