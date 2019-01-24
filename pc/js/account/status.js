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
            createTimeStart:  $(".account-startdate").val() + " 00:00",
            createTimeEnd:  $(".account-enddate").val() + " 00:00",
            itemDesc:  $(".account-qrnameinput").val(),
            license:  $(".account-qrcarinput").val(),
            page: 1,
            pageSize: 5000,
            storeName:  $(".account-qrstoreinput").val(),
            type: 3,
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                var resultitemlistTemp = _.template($('#status-resultitemlistTemp').html());
                $('.status-box').html(resultitemlistTemp({
                    "data": data
                }));
                $(".status-box").removeClass("hidden");
            }
        }
    });
}