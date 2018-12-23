(function () {
    getDetail()
    $('.detail-box').delegate(".detail-pagesbar-bt", "click", function (e) {
        var target = e.currentTarget;
        saveObject("contentId", target.dataset.id);
        window.location.href = "../news/detail.html";
    })

})()

function getDetail(){
    var url = Config().recommendDetail.replace("{id}", loadObject("contentId"));
    $.ajax({
        url: url,
        data: {
            // noCookByUserId:window.sessionStorage.getItem("id")
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            console.log(data.recommendViewAfter);
            var detailTemp = _.template($('#detail-boxTemp').html());
            $('.detail-box').html(detailTemp({
                "data": {
                    data:data.recommendView,
                    up: data.recommendViewAfter,
                    next: data.recommendViewFront
                },
                
            }));
        }
    });
}