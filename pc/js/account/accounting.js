(function () {
    statusQr("def");
    $("#statusQr").on("click", function () {
        statusQr();
    })

})()
var page =1;
function statusQr(isDef) {
    $.ajax({
        url: Config().siteOrders,
        
        data: {
            createTimeStart: $(".account-startdate").val() + " 00:00",
            createTimeEnd: $(".account-enddate").val() + " 00:00",
            itemDesc: $(".account-qrnameinput").val(),
            license: $(".account-qrcarinput").val(),
            page: page,
            pageSize: 20,
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
                var resultitemlistTemp = _.template($('#accounting-resultitemlistTemp').html());
                $('.accounting-box').html(resultitemlistTemp({
                    "data": data
                }));
                $(".accounting-box").removeClass("hidden");
            }
        }
    });
}