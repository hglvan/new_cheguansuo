(function () {
    statusQr("def");
    $("#statusQr").on("click", function () {
        statusQr();
    })

})()
var page = 1;
var copyData = {}
function statusQr(isDef) {
    $.ajax({
        url: Config().siteOrders,
        
        data: {
            createTimeStart:  $(".account-startdate").val() + " 00:00",
            createTimeEnd:  $(".account-enddate").val() + " 00:00",
            itemDesc:  $(".account-qrnameinput").val(),
            license:  $(".account-qrcarinput").val(),
            page: 1,
            pageSize: 5,
            storeName:  $(".account-qrstoreinput").val(),
            type: 3,
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                page = data.page
                copyData = data
                var resultitemlistTemp = _.template($('#status-resultitemlistTemp').html());
                $('.status-box').html(resultitemlistTemp({
                    "data": data
                }));
                $(".status-box").removeClass("hidden");
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
            type: 3,
            storeName:  $(".account-qrstoreinput").val(),
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                page = data.page
                console.log('长度',data.suplierInfoViews)
                if(data.suplierInfoViews.length == 0){
                   return                   
                }
                copyData.suplierInfoViews.push(...data.suplierInfoViews)
                var resultitemlistTemp = _.template($('#status-resultitemlistTemp').html());
                $('.status-box').html(resultitemlistTemp({
                    "data": copyData
                }));
                carData = data.suplierInfoViews;
                $(".status-box").removeClass("hidden");
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