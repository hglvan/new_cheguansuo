var carData;
var imgs = [];
(function () {
    var oFReader = new FileReader();
    var uploadInput = document.getElementById("carupload-uploadbtninput");
    uploadInput.onchange = function(){
        var leng = $('.addImg').length
        if (leng <3) {
            oFReader.readAsDataURL(uploadInput.files[0])
        }
    }
    oFReader.onload = function (oFREvent) {
        var imgbase = oFREvent.target.result;
        var type = imgbase.split(",")[0];
            type = type.split("/")[1];
            type = type.split(";")[0];
        var imgbaseStr = imgbase.split(",")[1];
        console.log(type);
        $.ajax({
            url: Config().upLoadImages,
            
            data: {
                suffix: type,
                image: imgbaseStr,
                noCookByUserId:window.sessionStorage.getItem("id")
            },
            type: "POST",
            dataType: "JSON",
            success: function (data) {
                console.log(data);
                if (data.statusCode == 200) {
                    alert("添加图片成功！")
                    imgs.push(data.imageUrl);
                    imgtest = '<img class="addImg" src="' + imgbase + '">';
                    $(".carupload-uploadimgs").prepend(imgtest);
                    console.log(imgs.length);
                    if(imgs.length == 3){
                        $(".carupload-uploadimgs>div").css("display", "none");
                    }
                    $(".carupload-uploadimgs>div span").html(3 - imgs.length);
                }else{
                    alert("添加失败！")
                }
            }
        });      

    };
    $(".carupload-uploadbtnadd").click(function(e){
        console.log(imgs.length);
        if(imgs.length < 6){
            uploadInput.click()
        }
        
    })

    $(".carupload-itemtablemore").click(function(e){
        var resultitemlistTemp = _.template($('#carupload-resultitemlistTemp').html());
        $('.carupload-itemtabletitle').after(resultitemlistTemp({}));
    });

    $(".carupload-itemdel").click(function(e){
        var list = $(".carupload-itemtableline");
        var num = 0;
        for(var i = 0; i < list.length; i++){
            var check = $(list[i]).find(".carupload-itemnumcheck")[0].checked;
            if(check){
                num++;
                $(list[i]).remove();
            }
        }
        if(num == 0){
            alert("请选择配件");
        }
    });
    $(".carupload-itemadd").click(function(e){
        var list = $(".carupload-itemtableline");
        var items = []
        for(var i = 0; i < list.length; i++){
            var itemDesc = $(list[i]).find(".carupload-itemDesc").val();
            var spec = $(list[i]).find(".carupload-spec").val();
            var prod = $(list[i]).find(".carupload-prod").val();
            var amount = $(list[i]).find(".carupload-itemnum").val()
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

    $(".carupload-itembox").delegate(".carupload-itemnummin", "click", function (e) {
        var input = $(e.currentTarget).parent().find(".carupload-itemnum");
        if(input.val() > 1){
            input.val(parseInt(input.val()) - 1)
        }
    })
    $(".carupload-itembox").delegate(".carupload-itemnumadd", "click", function (e) {
        var input = $(e.currentTarget).parent().find(".carupload-itemnum");
            input.val(parseInt(input.val()) + 1)
    })

    //全选
    $(".carupload-itemnumcheckall").on("change", function(e){
        var check = e.currentTarget.checked;
        var list = $(".carupload-itemtableline");
        console.log(list)
        for(var i = 0; i < list.length; i++){
            $(list[i]).find(".carupload-itemnumcheck")[0].checked = check;
            if(check == true){
                $(list[i]).find(".carupload-itemnumcheckicon").removeClass("common-uncheck").addClass("common-check");
            }else{
                $(list[i]).find(".carupload-itemnumcheckicon").removeClass("common-check").addClass("common-uncheck");
            }
        }
    })
    $(".common-bodyer").delegate(".carupload-itemnumcheckicon", "click", function (e) {
        var target = e.currentTarget;
        var check = $(target).parent().find(".carupload-itemnumcheck");
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
            isSupplier: "N",
            searchImtes: JSON.stringify({
                "brandId": getParameter("cid"),
                "imageUrls":imgs.join(","),
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