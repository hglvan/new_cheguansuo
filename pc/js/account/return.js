var returnDate;

(function () {
    statusQr("def");
    $("#statusQr").on("click", function () {
        statusQr();
    })

    $(".common-bodyer").delegate(".return-resultnummin", "click", function (e) {
        var input = $(e.currentTarget).parent().find(".return-resultnuminput");
        if(input.val() > 1){
            updateAmount(input[0].dataset.itemid, parseInt(input.val()) - 1);
            input.val(parseInt(input.val()) - 1)
        }
    })
    $(".common-bodyer").delegate(".return-resultnumadd", "click", function (e) {
        var input = $(e.currentTarget).parent().find(".return-resultnuminput");
            updateAmount(input[0].dataset.itemid, parseInt(input.val()) + 1);
            input.val(parseInt(input.val()) + 1)
    })

    $(".return-box").delegate(".return-resultitembtn>div", "click", function (e) {
        var target = e.currentTarget;
        var list = $(target).parents().eq(1).find("li");
        var ids = [];
        var items = [];
        for(var i = 0; i < list.length; i++){
            var check = $(list[i]).find(".return-itemnumcheck")[0].checked;
            var id = $(list[i]).find(".return-itemnumcheck")[0].dataset.itemid;
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
        if(confirm("确定退货？")){
            doReturn(ids);
        }
    });

})()
var page = 1;
var copyData = {}
 
//获取退货列表
function statusQr(isDef) {
    $.ajax({
        url: Config().siteOrders,
        
        data: {
            createTimeStart: $(".account-startdate").val() + " 00:00",
            createTimeEnd: $(".account-enddate").val() + " 00:00",
            itemDesc: $(".account-qrnameinput").val(),
            license: $(".account-qrcarinput").val(),
            page: 1,
            pageSize: 5,
            storeName: $(".account-qrstoreinput").val(),
            type: 2,
            noCookByUserId:window.sessionStorage.getItem("id"),
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            returnDate = data;
            if (data.statusCode == 200) {
                page = data.page
                copyData = data
                var resultitemlistTemp = _.template($('#return-resultitemlistTemp').html());
                $('.return-box').html(resultitemlistTemp({
                    "data": data
                }));
                $(".return-box").removeClass("hidden");
            }
        }
    });
}
function statusQrss() {
    $.ajax({
        url: Config().siteOrders,
        data: {
            createTimeStart:  $(".account-startdate").val() + " 00:00",
            createTimeEnd:  $(".account-enddate").val() + " 00:00",
            itemDesc:  $(".account-qrnameinput").val(),
            license:  $(".account-qrcarinput").val(),
            page: page,
            pageSize: 5,
            type: 2,
            storeName:  $(".account-qrstoreinput").val(),
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                page = data.page
                if(data.suplierInfoViews.length == 0){
                   return                   
                }
                copyData.suplierInfoViews.push(...data.suplierInfoViews)
                var resultitemlistTemp = _.template($('#return-resultitemlistTemp').html());
                $('.return-box').html(resultitemlistTemp({
                    "data": copyData
                }));
                carData = data.suplierInfoViews;
                $(".return-box").removeClass("hidden");
            }else{
                alert("查询失败！");
            }
        }
    });
}
$(window).scroll(function(){
    // scroll at bottom
    if (Math.abs($(window).scrollTop() + $(window).height()+3-$(document).height()>2)) {
        // load data
        if(copyData.suplierInfoViews.length != 0)statusQrss()
    }
});
//退货
function doReturn(ids) {
    $.ajax({
        url: Config().returnOrders,
        
        data: {
            ids: ids.join(","),
            status: "handleIng",
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                alert("退货成功！")
                 window.location.reload()
            }else{
                alert("退货失败！")
            }
        }
    });
}