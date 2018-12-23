(function () {
    getList();
    $(".brandyear-list").delegate(".brandyear-btn", "click", function (e) {
        location.href = "../store/branddetail.html?cid=" + e.currentTarget.dataset.id;
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
            console.log(data);
            if (data.statusCode == 200) {
                var resultitemlistTemp = _.template($('#brandyear-resultitemlistTemp').html());
                $('.brandyear-list').html(resultitemlistTemp({
                    "data": data
                }));
                $(".brandyear-list").removeClass("hidden");
            }
        }
    });
}