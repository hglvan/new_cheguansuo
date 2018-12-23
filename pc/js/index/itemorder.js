var carData;
(function () {
    getCarInfo();
    $(".itemorder-itemtablemore").click(function(e){
        var resultitemlistTemp = _.template($('#itemorder-resultitemlistTemp').html());
        $('.itemorder-itemtabletitle').after(resultitemlistTemp({}));
    });

    $(".itemorder-itemdel").click(function(e){
        var list = $(".itemorder-itemtableline");
        var num = 0;
        for(var i = 0; i < list.length; i++){
            var check = $(list[i]).find(".itemorder-itemnumcheck")[0].checked;
            if(check){
                num++;
                $(list[i]).remove();
            }
        }
        if(num == 0){
            alert("请选择配件");
        }
    });
    $(".itemorder-itemorder").click(function(e){
        var list = $(".itemorder-itemtableline");
        var items = []
        for(var i = 0; i < list.length; i++){
            var itemDesc = $(list[i]).find(".itemorder-itemDesc").val();
            var spec = $(list[i]).find(".itemorder-spec").val();
            var prod = $(list[i]).find(".itemorder-prod").val();
            var amount = $(list[i]).find(".itemorder-itemnum").val()
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

    $(".itemorder-itembox").delegate(".itemorder-itemnummin", "click", function (e) {
        var input = $(e.currentTarget).parent().find(".itemorder-itemnum");
        if(input.val() > 1){
            input.val(parseInt(input.val()) - 1)
        }
    })
    $(".itemorder-itembox").delegate(".itemorder-itemnumadd", "click", function (e) {
        var input = $(e.currentTarget).parent().find(".itemorder-itemnum");
            input.val(parseInt(input.val()) + 1)
    })

    //全选
    $(".itemorder-itemnumcheckall").on("change", function(e){
        var check = e.currentTarget.checked;
        var list = $(".itemorder-itemtableline");
        for(var i = 0; i < list.length; i++){
            $(list[i]).find(".itemorder-itemnumcheck")[0].checked = check;
            if(check == true){
                $(list[i]).find(".itemorder-itemnumcheckicon").removeClass("common-uncheck").addClass("common-check");
            }else{
                $(list[i]).find(".itemorder-itemnumcheckicon").removeClass("common-check").addClass("common-uncheck");
            }
        }
    })
    $(".common-bodyer").delegate(".itemorder-itemnumcheckicon", "click", function (e) {
        var target = e.currentTarget;
        var check = $(target).parent().find(".itemorder-itemnumcheck");
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
            searchId: "",
            isSupplier: "N",
            searchItemId: "",
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
                window.location.href = "../index/index.html";
            }else{
                alert("添加失败！")
            }
        }
    });
}

//获取车型信息
function getCarInfo(){
    carData = loadObject("carInfo");
    var resultitemlistTemp = _.template($('#itemorder-itemcarTemp').html());
    $('.itemorder-itemcar').html(resultitemlistTemp({
        data: carData
    }));
}