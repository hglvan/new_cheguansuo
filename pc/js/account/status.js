(function () {
    statusQr("def");
    $("#statusQr").on("click", function () {
        statusQr();
    })

})()
var page = 1;
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
        url: Config().listSupplierNoBuy,
        data: {
            createTimeStart:  $(".account-startdate").val() + " 00:00",
            createTimeEnd:  $(".account-enddate").val() + " 00:00",
            itemDesc:  $(".account-qrnameinput").val(),
            license:  $(".account-qrcarinput").val(),
            page: page,
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
    if (Math.abs($(window).scrollTop() + $(window).height()+3-$(document).height()>2)) {
        // load data
        statusQrss()
    }
});