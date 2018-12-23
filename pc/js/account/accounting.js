(function () {
    statusQr("def");
    $("#statusQr").on("click", function () {
        statusQr();
    })

})()

function statusQr(isDef) {
    $.ajax({
        url: Config().siteOrders,
        
        data: {
            createTimeEnd: isDef ? "" : $(".account-startdate").val() + " 00:00",
            createTimeStart: isDef ? "" : $(".account-enddate").val() + " 00:00",
            itemDesc: isDef ? "" : $(".account-qrnameinput").val(),
            license: isDef ? "" : $(".account-qrcarinput").val(),
            page: 1,
            pageSize: 5000,
            storeName: isDef ? "" : $(".account-qrstoreinput").val(),
            noCookByUserId:window.sessionStorage.getItem("id"),
            type: 1,
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                var resultitemlistTemp = _.template($('#accounting-resultitemlistTemp').html());
                $('.accounting-box').html(resultitemlistTemp({
                    "data": data
                }));
                $(".accounting-box").removeClass("hidden");
            }
        }
    });
}