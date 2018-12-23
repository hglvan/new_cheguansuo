var carData;
var itemData;
(function () {
    getList();
    carData = loadObject("carInfo")
    console.log(carData)
    $(".itemdetail-box").delegate(".itemdetail-orderbtn", "click", function (e) {
        var taget = e.currentTarget;
        location.href = "../store/itemorder.html?cid="+taget.dataset.cid;
    })
    $(".itemdetail-box").delegate(".itemdetail-addbtn", "click", function (e) {
        var taget = e.currentTarget;
        console.log(1);
        addItem();
    })
    
})()


//获取分类列表
function getList(){
    // var url = Config().itemDetail.replace("{itemCode}", getParameter("cid"));
    var url = Config().itemDetail.replace("{itemCode}", getParameter("itemCode"));
    $.ajax({
        url: url,
        
        data:{
            whLoc: getParameter("whLoc"),
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "GET",
        dataType: "JSON",
        success: function(data){            
            console.log(data);
            if (data.statusCode == 200) {
                var resultitemlistTemp = _.template($('#itemdetail-resultitemlistTemp').html());
                $('.itemdetail-box').html(resultitemlistTemp({
                    "data": data.stockView
                }));
                itemData = data.stockView;
                var mySwiper = new Swiper ('.swiper-container', {
                    direction: 'horizontal',
                    loop: true,
                    speed: 3000,
                    pagination: '.swiper-pagination',
                    autoplay: 3000,
                }) 
            }else{
                console.log(data.msg);
            }
        }
    });
}

//添加配件
function addItem(){
    $.ajax({
        url: Config().addCar,
        
        data: {
            stores: "",
            spec: itemData.spec,
            searchItemId: carData.id,
            searchId: carData.searchId,
            retPrice: itemData.retPrice,
            prod: itemData.prod,
            price: itemData.price,
            modelYearId: "",
            itemDesc: itemData.itemDesc,
            itemCode: itemData.itemCode,
            isSupplier: "Y",
            imageUrl: itemData.imgpath,
            fdrId: "",
            brandId: "",
            store: window.sessionStorage.getItem("storeId"),
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                alert("添加成功！")
                window.location.href = "../store/index.html"
            }else{
                alert("添加失败！")
            }
        }
    });
}