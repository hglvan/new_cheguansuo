(function () {
    getList(1);
    $(".list-box").delegate("li", "click", function (e) {
        var taget = e.currentTarget;
        saveObject("contentId", taget.dataset.id);
        window.location.href = "../news/detail.html";
    });
    $(".list-pagesbar").delegate("span", "click", function (e) {
        var taget = e.currentTarget;
        getList(taget.dataset.page);
    })


})()

//获取资讯列表
function getList(page) {
    $.ajax({
        url: Config().recommends,
        data: {
            // noCookByUserId:window.sessionStorage.getItem("id")
            page: page,
            pageSize: 10,
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            var listTemp = _.template($('#list-boxTemp').html());
            $('.list-box').html(listTemp({
                "data": data.recommendViews
            }));
            var pagesbarTemp = _.template($('#list-pagesbarTemp').html());
            $('.list-pagesbar').html(pagesbarTemp({
                "page": data.page,
                "total": data.totalPage
            }));
        }
    });
}
