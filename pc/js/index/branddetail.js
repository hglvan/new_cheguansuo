var carData;
(function () {
    if(getParameter("vin")){
        getVin();
    }else if(getParameter("carNo")){
        getCar();
    }else{
        getList();
    }
    $(".branddetail-box").delegate(".branddetail-btn", "click", function (e) {
        addCar();       
    })
})()

//获取车型详情
function getList(){
    var url = Config().carDetail.replace("{catId}", getParameter("cid"));
    $.ajax({
        url: url,
        
        data:{
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "GET",
        dataType: "JSON",
        success: function(data){            
            console.log(data);
            if (data.statusCode == 200) {
                carData = data.typeCatView;
                var resultitemlistTemp = _.template($('#branddetail-resultitemlistTemp').html());
                $('.branddetail-box').html(resultitemlistTemp({
                    "data": data
                }));
                var mySwiper = new Swiper ('.swiper-container', {
                    direction: 'horizontal',
                    loop: true,
                    speed: 3000,
                    pagination: '.swiper-pagination',
                    autoplay: 3000,
                }) 
                $(".branddetail-box").removeClass("hidden");
            }
        }
    });
}
//通过vin获取车型详情
function getVin(){
    var url = Config().getVin.replace("{vin}", getParameter("vin"));
    $.ajax({
        url: url,
        
        type: "GET",
        dataType: "JSON",
        data:{
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        success: function(data){            
            console.log(data);
            if (data.statusCode == 200) {
                data.typeCatView = {
                    stores: "",
                    spec: data.siteVinPo.csxs,
                    searchItemId: "",
                    searchId: "",
                    prod: data.siteVinPo.gb,
                    price: "",
                    modelYearId: data.siteVinPo.modelYearId,
                    itemDesc: data.siteVinPo.cj,
                    itemCode: data.siteVinPo.id,
                    isSupplier: "N",
                    imageUrl: data.siteVinPo.imageUrl,
                    fdrId: data.siteVinPo.fdrId,
                    brandId: data.siteVinPo.brandId,
                    brand: data.siteVinPo.pp,
                    dispment: data.siteVinPo.pfbz,
                    engineNo: data.siteVinPo.fdjxh,
                    remark1: "",
                    catId: data.siteVinPo.id
                };
                carData = data.typeCatView;
                var resultitemlistTemp = _.template($('#branddetail-resultitemlistTemp').html());
                $('.branddetail-box').html(resultitemlistTemp({
                    "data": data
                }));
                var mySwiper = new Swiper ('.swiper-container', {
                    direction: 'horizontal',
                    loop: true,
                    speed: 3000,
                    pagination: '.swiper-pagination',
                    autoplay: 3000,
                }) 
                $(".branddetail-box").removeClass("hidden");
            }else{
                alert("没有相关结果！");
                window.location.href = "../index/index.html"
            }
        }
    });
}

//通过车型号获取车型详情
function getCar(){
    $.ajax({
        url: Config().catTypeNo,
        
        data: {
            catTypeNo: getParameter("carNo"),
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "GET",
        dataType: "JSON",
        success: function(data){            
            console.log(data);
            if (data.statusCode == 200) {
                carData = data.typeCatView;
                var resultitemlistTemp = _.template($('#branddetail-resultitemlistTemp').html());
                $('.branddetail-box').html(resultitemlistTemp({
                    "data": data
                }));
                var mySwiper = new Swiper ('.swiper-container', {
                    direction: 'horizontal',
                    loop: true,
                    speed: 3000,
                    pagination: '.swiper-pagination',
                    autoplay: 3000,
                }) 
                $(".branddetail-box").removeClass("hidden");
            }else{
                alert("没有相关结果！");
                window.location.href = "../index/index.html"
            }
        }
    });
}

//添加车型
function addCar(){
    $.ajax({
        url: Config().addCar,
        
        data: {
            stores: "",
            spec: carData.spec,
            searchItemId: "",
            searchId: "",
            prod: carData.prod,
            price: "",
            modelYearId: carData.modelYearId,
            itemDesc: "",
            itemCode: "",
            isSupplier: "N",
            imageUrl: carData.imageUrl,
            fdrId: carData.fdrId,
            brandId: carData.brandId,
            noCookByUserId:window.sessionStorage.getItem("id")
            
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                alert("添加成功！")
                window.location.href = "../index/index.html"
            }else{
                alert("添加失败！")
            }
        }
    });
}