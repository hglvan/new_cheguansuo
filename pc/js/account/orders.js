var carData;
(function () {
    statusQr("def");
    $("#statusQr").on("click", function () {
        statusQr('check');
        console.log("statusQr")
    })

    
    $(".common-bodyer").delegate(".orders-delItem", "click", function (e) {
        var target = e.currentTarget;
        var list = $(target).parents().eq(1).find("li");
        var ids = [];
        var items = [];
        for(var i = 0; i < list.length; i++){
            var check = $(list[i]).find(".orders-itemnumcheck")[0].checked;
            var id = $(list[i]).find(".orders-itemnumcheck")[0].dataset.itemid;
            if(check){
                ids.push(id)
                items.push(list[i]);
            }
        }
        if(items.length == 0){
            alert("请选择配件");
            return;
        }
        console.log(ids)
        if(confirm("确定删除所选配件？")){
            delItem(ids, items);
        }
    })
    $(".common-bodyer").delegate(".orders-addItem", "click", function (e) {
        var target = e.currentTarget;
        var list = $(target).parents().eq(1).find("li");
        var ids = [];
        var items = [];
        for(var i = 0; i < list.length; i++){
            var check = $(list[i]).find(".orders-itemnumcheck")[0].checked;
            var id = $(list[i]).find(".orders-itemnumcheck")[0].dataset.itemid;
            var outid = $(list[i]).find(".orders-itemnumcheck")[0].dataset.outid;
            var amount = $($(list[i]).find(".orders-resultnuminput")[0]).val();
            if(check){
                ids.push({
                    "searchItemId": id,
                    "amount": amount
                })
                items.push(list[i]);
            }
        }
        if(items.length == 0){
            alert("请选择配件");
            return;
        }
        console.log(ids)
        addItem(ids, items,outid);
    });

    $(".common-bodyer").delegate(".orders-resultnummin", "click", function (e) {
        var input = $(e.currentTarget).parent().find(".orders-resultnuminput");
        if(input.val() > 1){
            updateAmount(input[0].dataset.itemid, parseInt(input.val()) - 1);
            input.val(parseInt(input.val()) - 1)
        }
    })
    $(".common-bodyer").delegate(".orders-resultnumadd", "click", function (e) {
        var input = $(e.currentTarget).parent().find(".orders-resultnuminput");
            updateAmount(input[0].dataset.itemid, parseInt(input.val()) + 1);
            input.val(parseInt(input.val()) + 1)
    })

    $(".common-bodyer").delegate(".orders-resulbtnsave", "click", function (e) {
        var target = e.currentTarget;
        var id = target.dataset.id;
        var carNum = $(target).siblings().eq(0).children().eq(0).val();
        saveNum(id, carNum);
    })
    $(".common-bodyer").delegate(".orders-resulbtndel", "click", function (e) {
        var target = e.currentTarget;
        var cid = target.dataset.id;
        if(confirm("确定删除车型和配件？")){
            delCar(cid, target);
        }
        
    })
    $(".common-bodyer").delegate(".orders-resulbtnqr", "click", function (e) {
        var target = e.currentTarget;
        var index = target.dataset.index;
        window.localStorage.setItem("parentId", target.dataset.catid);
        saveObject("carInfo", carData[index]);
        console.log(carData[index])
        location.href = "../index/itemqr.html"
    })
    $(".common-bodyer").delegate(".orders-resulbtnadd", "click", function (e) {
        var target = e.currentTarget;
        var index = target.dataset.index;
        window.localStorage.setItem("searchid", target.dataset.searchid);
        window.localStorage.setItem("searchitemid", target.dataset.id);
        saveObject("carInfo", carData[index]);
        location.href = "../index/itemadd.html"
    })
    $(".common-bodyer").delegate(".orders-itemnumcheckicon", "click", function (e) {
        var target = e.currentTarget;
        var check = $(target).parent().find(".orders-itemnumcheck");
        if($(target).hasClass("common-uncheck")){
            check[0].checked = true;
            $(target).removeClass("common-uncheck").addClass("common-check");
        }else{
            check[0].checked = false;
            $(target).removeClass("common-check").addClass("common-uncheck");
        }
    })

})()
var page = 1;
var copyData= {}
function statusQr(isDef) {
    console.log('查询',isDef)
    $.ajax({
        url: Config().listSupplierNoBuy,
        
        data: {
            createTimeStart:  $(".account-startdate").val() + " 00:00",
            createTimeEnd:  $(".account-enddate").val() + " 00:00",
            itemDesc:  $(".account-qrnameinput").val(),
            license:  $(".account-qrcarinput").val(),
            page: 1,
            pageSize: 20,
            storeName:  $(".account-qrstoreinput").val(),
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                page = data.page
                if(data.searchItemViews.length == 0){
                    alert("查询结果为空！");                   
                }
                copyData = data
                var resultitemlistTemp = _.template($('#orders-resultitemlistTemp').html());
                $('.orders-box').html(resultitemlistTemp({
                    "data": data
                }));
                carData = data.searchItemViews;
                $(".orders-box").removeClass("hidden");
            }else{
                alert("查询失败！");
            }
        }
    });
}
function statusQrss(isDef) {
    $.ajax({
        url: Config().listSupplierNoBuy,
        data: {
            createTimeStart:  $(".account-startdate").val() + " 00:00",
            createTimeEnd:  $(".account-enddate").val() + " 00:00",
            itemDesc:  $(".account-qrnameinput").val(),
            license:  $(".account-qrcarinput").val(),
            page: page,
            pageSize: 20,
            storeName:  $(".account-qrstoreinput").val(),
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                page = data.page
                if(data.searchItemViews.length == 0){
                   return                   
                }
                copyData.searchItemViews.push(...data.searchItemViews)
                var resultitemlistTemp = _.template($('#orders-resultitemlistTemp').html());
                $('.orders-box').html(resultitemlistTemp({
                    "data": copyData
                }));
                carData = data.searchItemViews;
                $(".orders-box").removeClass("hidden");
            }else{
                alert("查询失败！");
            }
        }
    });
}
$(window).scroll(function(){
    // scroll at bottom
    console.log('aaa',$(window).scrollTop() + $(window).height() , $(document).height())
    if (Math.abs($(window).scrollTop() + $(window).height()+3-$(document).height()>2)) {
        console.log('对你好')
        // load data
        statusQrss(1)
    }
});
//清除配件
function delItem(ids, items){
    $.ajax({
        url: Config().deleteItem,
        
        data: {
            searchItemId: ids.join(","),
            noCookByUserId:window.sessionStorage.getItem("id"),

        },
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                for(var i = 0; i < items.length; i++){
                    $(items[i]).remove();
                }
                alert("删除成功！")

            }
        }
    });
}
//确认配件
function addItem(ids, items,outid){
    var orderParams = {
                "orderParams":[{
                    "id": outid,
                    "orderItemParams": ids
                }]
            };
    $.ajax({
        url: Config().addItem,
        
        data: {
            "orderParams": JSON.stringify(orderParams),
            noCookByUserId:window.sessionStorage.getItem("id"),
            requestType:1
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                for(var i = 0; i < items.length; i++){
                    $(items[i]).remove();
                }
                alert("添加成功！")
            }
        }
    });
}
//保存车牌
function saveNum(cid, carNum){
    var url = Config().saveNum.replace("{catId}", cid);
    $.ajax({
        url: url,
        
        data: {
            license: carNum,
            noCookByUserId:window.sessionStorage.getItem("id")

        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                alert("保存成功！")
            }else{
                alert("保存失败！")
            }
        }
    });
}
//删除车型
function delCar(cid, target){
    $.ajax({
        url: Config().delCar,
        
        data: {
            searchId: cid,
            noCookByUserId:window.sessionStorage.getItem("id")
            
        },
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                $(target).parents().eq(1).remove();
                alert("删除成功！")
            }else{
                alert("删除失败！")
            }
        }
    });
}