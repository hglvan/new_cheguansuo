(function () {
    getList();
    $(".brandcar-list").delegate(".brandcar-listitem", "click", function (e) {
        location.href = "../index/brandyear.html?cid=" + e.currentTarget.dataset.id;
    })
})()


//获取分类列表
function getList(){
    $.ajax({
        url: Config().listDept,
        
        data:{
            parentId: getParameter("cid"),
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "GET",
        dataType: "JSON",
        success: function(data){
            if (data.statusCode == 200) {
                var resultitemlistTemp = _.template($('#brandcar-resultitemlistTemp').html());
                $('.brandcar-list').html(resultitemlistTemp({
                    "data": data
                }));
                $(".brandcar-list").removeClass("hidden");
            }
        }
    });
}