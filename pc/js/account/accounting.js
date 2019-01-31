(function () {
    statusQr("def");
    $("#statusQr").on("click", function () {
        statusQr();
    })

})()
var page =1;
var copyData= {}

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
            noCookByUserId:window.sessionStorage.getItem("id"),
            type: 1,
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log('data看下',data);
            if (data.statusCode == 200) {
                page = data.page
                copyData = data
                var resultitemlistTemp = _.template($('#accounting-resultitemlistTemp').html());
                $('.accounting-box').html(resultitemlistTemp({
                    "data": data
                }));
                $(".accounting-box").removeClass("hidden");
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
            type: 1,
            pageSize: 5,
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
                var resultitemlistTemp = _.template($('#orders-resultitemlistTemp').html());
                $('.orders-box').html(resultitemlistTemp({
                    "data": copyData
                }));
                carData = data.suplierInfoViews;
                $(".orders-box").removeClass("hidden");
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
        statusQrss()
    }
});