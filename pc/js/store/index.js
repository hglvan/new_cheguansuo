var carData;
(function () {
     
     // getIndexList();、
     window.sessionStorage.setItem("id",'')
     function getName(){
        var name = window.sessionStorage.getItem("id");
        if (name == undefined||name == '') {
            return false;
        }else{
            return true;
        }

     }
    $(".index-brandbtn").on("click", function () {
        if (getName()) {
            window.location.href = "../store/brandqr.html";
        }else{
            alert('请选择好友')
        }
        
    });
    $(".index-uploadbtn").on("click", function () {
        if (getName()) {
            window.location.href = "../store/carqr.html";
        }else{
            alert('请选择好友')
        }
        
    });
    // $(".index-qrbtn").on("click", function () {
    //     var inputs = $(".index-qrbox input")
    //     if($(inputs[0]).val() != ""){
    //         if($(inputs[0]).val().split(" ").length != 2){
    //             alert("车型名称与配件名称请用一个空格隔开！")
    //         }else{             
    //             window.location.href = "../store/itemlist.html?catDes=" + $(inputs[0]).val().split(" ")[0] + "&accessoryName=" + $(inputs[0]).val().split(" ")[1];
    //         }
    //     } else if ($(inputs[1]).val() != "") {
    //         window.location.href = "../store/branddetail.html?carNo=" + $(inputs[1]).val().trim();
    //     } else if ($(inputs[2]).val() != ""){
    //         if($(inputs[2]).val().trim().length != 17){
    //             alert("请输入17位vin码！");
    //             return;
    //         }   
    //         window.location.href = "../store/branddetail.html?vin=" + $(inputs[2]).val().trim();
    //     }
    // });

        // 配件查询
    $(".index-qrbtn").on("click", function () {
        if (getName()) {
            var inputs = $(".index-iteminput")
            if($(inputs).val() != ""){
                if($(inputs).val().split(" ").length != 2){
                    alert("车型名称与配件名称请用一个空格隔开！")
                }else{             
                    window.location.href = "../store/itemlist.html?catDes=" + encodeURI($(inputs).val().split(" ")[0]) + "&accessoryName=" + encodeURI($(inputs).val().split(" ")[1]);
                }
            }else{
                alert("请输入车型名称与配件名称！")
            }
        }else{
            alert('请选择好友')
        }
        
    });
    $(".index-qrbtn2").on("click", function () {
        if (getName()) {
            var inputs = $(".index-brandinput")
            if ($(inputs).val() != "") {
                window.location.href = "../store/branddetail.html?carNo=" + encodeURI($(inputs).val().trim());
            } else{
                 alert("请输入车型型号！")
            }
        }else{
            alert('请选择好友')
        }
        
    });
     $(".index-qrbtn3").on("click", function () {
        if (getName()) {
            var inputs = $(".index-vininput")
            if ($(inputs).val() != ""){
                if($(inputs).val().trim().length != 17){
                    alert("请输入17位vin码！");
                    return;
                }   
                window.location.href = "../store/branddetail.html?vin=" + encodeURI($(inputs).val().trim());
            }else{
                alert("请输入17位vin码！");
            }
        }else{
            alert('请选择好友')
        }
        
    });

    $(".index-resultbox").delegate(".index-resulbtnsave", "click", function (e) {
        var target = e.currentTarget;
        var id = target.dataset.id;
        var carNum = $(target).siblings().eq(0).children().eq(0).val();
        saveNum(id, carNum);
    })
    $(".index-resultbox").delegate(".index-resulbtndel", "click", function (e) {
        var target = e.currentTarget;
        var cid = target.dataset.id;
        if(confirm("确定删除车型和配件？")){
            delCar(cid, target);
        }
    })

    $(".index-resultbox").delegate(".index-resulbtnbuy", "click", function (e) {
        location.href = "../store/itembuy.html"
    })
    $(".index-resultbox").delegate(".index-resulbtnadd", "click", function (e) {
        var target = e.currentTarget;
        var index = target.dataset.index;
        window.localStorage.setItem("searchid", target.dataset.searchid);
        window.localStorage.setItem("searchitemid", target.dataset.id);
        saveObject("carInfo", carData[index]);
        location.href = "../store/itemadd.html"
    })
    $(".index-resultbox").delegate(".index-resulbtnqr", "click", function (e) {
        var target = e.currentTarget;
        var index = target.dataset.index;
        window.localStorage.setItem("parentId", target.dataset.catid);
        saveObject("carInfo", carData[index]);
        console.log(carData[index])
        location.href = "../store/itemqr.html"
    })

    $(".index-resultbox").delegate(".index-delItem", "click", function (e) {
        var target = e.currentTarget;
        var list = $(target).parents().eq(1).find("li");
        var ids = [];
        var items = [];
        for(var i = 0; i < list.length; i++){
            var check = $(list[i]).find(".index-check")[0].checked;
            var id = $(list[i]).find(".index-check")[0].dataset.itemid;
            if(check){
                ids.push(id)
                items.push(list[i]);
            }
        }
        if(items.length == 0){
            alert("请选择配件");
            return;
        }
        if(confirm("确定删除所选配件？")){
            delItem(ids, items);
        }
    })
    $(".index-resultbox").delegate(".index-addItem", "click", function (e) {
        var target = e.currentTarget;
        var list = $(target).parents().eq(1).find("li");
        var ids = [];
        var items = [];
        for(var i = 0; i < list.length; i++){
            var check = $(list[i]).find(".index-check")[0].checked;
            var id = $(list[i]).find(".index-check")[0].dataset.itemid;
            var amount = $($(list[i]).find(".index-resultnuminput")[0]).val();
            if(check){
                ids.push({
                    "searchItemId": id,
                    "amount": amount
                })
                items.push(list[i]);
            }
        }
        if(items.length == 0){
            alert("请选择配件");
            return;
        }
        console.log(ids)
        addItem(ids, items);
    });

    $(".common-bodyer").delegate(".index-resultnummin", "click", function (e) {
        var input = $(e.currentTarget).parent().find(".index-resultnuminput");
        if(input.val() > 1){
            updateAmount(input[0].dataset.itemid, parseInt(input.val()) - 1);
            input.val(parseInt(input.val()) - 1)
        }
    })
    $(".common-bodyer").delegate(".index-resultnumadd", "click", function (e) {
        var input = $(e.currentTarget).parent().find(".index-resultnuminput");
        updateAmount(input[0].dataset.itemid, parseInt(input.val()) + 1);
            input.val(parseInt(input.val()) + 1)
    })

    $(".common-bodyer").delegate(".index-itemnumcheckicon", "click", function (e) {
        var target = e.currentTarget;
        var check = $(target).parent().find(".index-check");
        if($(target).hasClass("common-uncheck")){
            check[0].checked = true;
            $(target).removeClass("common-uncheck").addClass("common-check");
        }else{
            check[0].checked = false;
            $(target).removeClass("common-check").addClass("common-uncheck");
        }
    })
})()



//获取首页资讯
function getIndexList(name){
    window.sessionStorage.setItem("id",name)
    
    $.ajax({
        url: Config().listSupplier,
        data:{
            page: 0,
            pageSize: 5000,
            noCookByUserId:window.sessionStorage.getItem("id"),
            chatAccount:name
        },
        type: "GET",
        dataType: "JSON",
        success: function(data){            
            console.log(data);
            if (data.statusCode == 200) {
                var resultitemlistTemp = _.template($('#index-resultitemlistTemp').html());
                $('.index-resultbox').html(resultitemlistTemp({
                    "data": data
                }));
                carData = data.searchItemViews;
                $(".index-resultbox").removeClass("hidden");
            }
        }
    });
}
//获取配件商资料
function getStore(){
    $.ajax({
        url: Config().listSupplier,
        
        data:{
            page: 0,
            pageSize: 5000,
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "GET",
        dataType: "JSON",
        success: function(data){            
            console.log(data);
            if (data.statusCode == 200) {
                var resultitemlistTemp = _.template($('#index-resultitemlistTemp').html());
                $('.index-resultbox').html(resultitemlistTemp({
                    "data": data
                }));
                carData = data.searchItemViews;
                $(".index-resultbox").removeClass("hidden");
            }
        }
    });
}

//清除配件
function delItem(ids, items){
    $.ajax({
        url: Config().deleteItem,
        
        data: {
            searchItemId: ids.join(","),
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                for(var i = 0; i < items.length; i++){
                    $(items[i]).remove();
                }
                alert("删除成功！")

            }
        }
    });
}
//确认配件
function addItem(ids, items){
    var orderParams = {
                "orderParams":[{
                    "id": ids[0].searchItemId,
                    "orderItemParams": ids
                }]
            };
    $.ajax({
        url: Config().addItem,
        
        data: {
            "orderParams": JSON.stringify(orderParams),
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                for(var i = 0; i < items.length; i++){
                    $(items[i]).remove();
                }
                alert("添加成功！")
            }
        }
    });
}
//保存车牌
function saveNum(cid, carNum){
    var url = Config().saveNum.replace("{catId}", cid);
    $.ajax({
        url: url,
        
        data: {
            license: carNum,
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                alert("保存成功！")
            }else{
                alert("保存失败！")
            }
        }
    });
}
//删除车型
function delCar(cid, target){
    $.ajax({
        url: Config().delCar,
        
        data: {
            searchId: cid,
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                $(target).parents().eq(1).remove();
                alert("删除成功！")
            }else{
                alert("删除失败！")
            }
        }
    });
}