var carData;
(function () {
    getCarInfo();
    $(".itemadd-itemtablemore").click(function(e){
        var resultitemlistTemp = _.template($('#itemadd-resultitemlistTemp').html());
        $('.itemadd-itemtabletitle').after(resultitemlistTemp({}));
    });

    $(".itemadd-itemdel").click(function(e){
        var list = $(".itemadd-itemtableline");
        var num = 0;
        for(var i = 0; i < list.length; i++){
            var check = $(list[i]).find(".itemadd-itemnumcheck")[0].checked;
            if(check){
                num++;
                $(list[i]).remove();
            }
        }
        if(num == 0){
            alert("请选择配件");
        }
    });
    $(".itemadd-itemadd").click(function(e){
        var list = $(".itemadd-itemtableline");
        var items = []
        for(var i = 0; i < list.length; i++){
            var itemDesc = $(list[i]).find(".itemadd-itemDesc").val();
            var spec = $(list[i]).find(".itemadd-spec").val();
            var prod = $(list[i]).find(".itemadd-prod").val();
            var amount = $(list[i]).find(".itemadd-itemnum").val()
            if(!(itemDesc && spec && prod)){
                alert("配件信息不完整！")
                return;
            }

            items.push({
                "amount":amount,
                "spec": spec,
                "isSelect":true,
                "itemDesc": itemDesc,
                "prod": prod
            });
        }
        if(items.length == 0){
            alert("请添加配件！")
            return;
        }
        addItem(items)
    });

    $(".itemadd-itembox").delegate(".itemadd-itemnummin", "click", function (e) {
        var input = $(e.currentTarget).parent().find(".itemadd-itemnum");
        if(input.val() > 1){
            input.val(parseInt(input.val()) - 1)
        }
    })
    $(".itemadd-itembox").delegate(".itemadd-itemnumadd", "click", function (e) {
        var input = $(e.currentTarget).parent().find(".itemadd-itemnum");
            input.val(parseInt(input.val()) + 1)
    })

    //全选
    $(".itemadd-itemnumcheckall").on("change", function(e){
        var check = e.currentTarget.checked;
        var list = $(".itemadd-itemtableline");
        for(var i = 0; i < list.length; i++){
            $(list[i]).find(".itemadd-itemnumcheck")[0].checked = check;
            if(check == true){
                $(list[i]).find(".itemadd-itemnumcheckicon").removeClass("common-uncheck").addClass("common-check");
            }else{
                $(list[i]).find(".itemadd-itemnumcheckicon").removeClass("common-check").addClass("common-uncheck");
            }
        }
    })
    $(".common-bodyer").delegate(".itemadd-itemnumcheckicon", "click", function (e) {
        var target = e.currentTarget;
        var check = $(target).parent().find(".itemadd-itemnumcheck");
        if($(target).hasClass("common-uncheck")){
            check[0].checked = true;
            $(target).removeClass("common-uncheck").addClass("common-check");
        }else{
            check[0].checked = false;
            $(target).removeClass("common-check").addClass("common-uncheck");
        }
    })

})()

//添加配件
function addItem(items){   
    $.ajax({
        url: Config().add,
        
        data: {
            searchId: window.localStorage.getItem("searchid"),
            isSupplier: "N",
            searchItemId: window.localStorage.getItem("searchitemid"),
            searchImtes: JSON.stringify({
                "imageUrls":"",
                "catId":"",
                "fdrId":"",
                "searchItemPos": items
            }),
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                alert("添加成功！")
                window.history.go(-1);
            }else{
                alert("添加失败！")
            }
        }
    });
}

//获取车型信息
function getCarInfo(){
    carData = loadObject("carInfo");
    var resultitemlistTemp = _.template($('#itemadd-itemcarTemp').html());
    $('.itemadd-itemcar').html(resultitemlistTemp({
        data: carData
    }));
}