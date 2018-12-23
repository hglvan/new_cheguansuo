var catid ='';

(function () {
    getList();
    catid = $('.itemqr-listbox').eq(0).find('div').eq(1).attr('data-catid');
    $(".itemqr-list").delegate(".itemqr-listitems>span", "click", function (e) {
        var target = e.currentTarget;
        window.localStorage.setItem("itemDesc", target.dataset.desc)
        window.localStorage.setItem("catId", target.dataset.catid)
        location.href = "../index/itemlist.html"
    })
    $(".itemqr-searchbtn").on("click", function(){
        var input = $(".itemqr-searchinput").val();
        let fdrId =location.search.includes('fdrid') ? location.search.split('=')[1] : '';
        window.location.href = "../index/itemlist.html?accessoryName=" + input+'&fdrId='+fdrId;
    })
})()


//获取分类列表
function getList(){
    $.ajax({
        url: Config().listDept,
        
        data:{
            parentId: window.localStorage.getItem("parentId"),
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "GET",
        dataType: "JSON",
        success: function(data){            
            console.log(data);
            if (data.statusCode == 200) {
                var items = data.typeCatViews;
                var resultitemlistTemp = _.template($('#itemqr-resultitemlistTemp').html());
                $('.itemqr-list').html(resultitemlistTemp({
                    "data": items
                }));
                for(var i = 0; i < items.length; i++){
                    if (i==0) {
                        catid = items[i].catId
                    }
                    getListItem(items[i].catId);
                }
                $(".itemqr-list").removeClass("hidden");
            }
        }
    });
}

//获取分类列表项
function getListItem(catid){
    $.ajax({
        url: Config().listGroup,
        
        data:{
            catId:catid,
            page: 1,
            itemDesc: "",
            pageSize: 100,
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "POST",
        dataType: "JSON",
        success: function(data){            
            console.log(data);
            if (data.statusCode == 200) {
                var item = data.stockViews;
                var itemText = "";
                for(var i = 0; i < item.length; i++){
                    itemText += "<span data-desc='" + item[i].itemDesc + "' data-catid='" + catid + "'>" + item[i].itemDesc + "</span> "
                }
                $('div[data-catid="' + catid + '"]').html(itemText);
            }
        }
    });
}