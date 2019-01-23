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
            createTimeEnd: $(".account-startdate").val() + " 00:00",
            createTimeStart: $(".account-enddate").val() + " 00:00",
            itemDesc: $(".account-qrnameinput").val(),
            license: $(".account-qrcarinput").val(),
            page: 1,
            pageSize: 5000,
            storeName: $(".account-qrstoreinput").val(),
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