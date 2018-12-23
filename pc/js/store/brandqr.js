(function () {
    getList();
    $(".brandqr-list").delegate(".brandqr-listitem", "click", function (e) {
        location.href = "../store/brandcar.html?cid=" + e.currentTarget.dataset.id;
    })
})()


//获取分类列表
function getList(){
    $.ajax({
        url: Config().listDept,
        
        data:{
            parentId: "",
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "GET",
        dataType: "JSON",
        success: function(data){            
            console.log(data);
            if (data.statusCode == 200) {
                var resultitemlistTemp = _.template($('#brandqr-resultitemlistTemp').html());
                $('.brandqr-list').html(resultitemlistTemp({
                    "data": data
                }));
                $(".brandqr-list").removeClass("hidden");
            }
        }
    });
}