var carData;
var itemData;
(function () {
    getList();
    carData = loadObject("carInfo")
    console.log('carData',carData)
    $(".itemdetail-box").delegate(".itemdetail-orderbtn", "click", function (e) {
        var taget = e.currentTarget;
        location.href = "../index/itemorder.html?cid="+taget.dataset.cid;
    })
    $(".itemdetail-box").delegate(".itemdetail-addbtn", "click", function (e) {
        var taget = e.currentTarget;
        console.log(1);
        addItem();
    })
})()

//返回上一页
$('.icon-fanhui').click(function(){
    window.history.go(-1);
})
//获取分类列表
function getList(){
    // var url = Config().itemDetail.replace("{itemCode}", getParameter("cid"));
    var url = Config().itemDetail.replace("{itemCode}", getParameter("itemCode"));
    console.log('看下吧')
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
                var mySwiper = new Swiper ('.swiper-container', {
                    direction: 'horizontal',
                    loop: true,
                    speed: 3000,
                    pagination: '.swiper-pagination',
                    autoplay: 3000,
                }) 
                itemData = data.stockView;
            }else{
                console.log(data.msg);
            }
        }
    });
}

//添加配件
function addItem(){
   
    // window.localStorage.getItem("typeCatView2",JSON.stringify(data.typeCatView2))
    let typeCatView2 = JSON.parse(window.localStorage.getItem("typeCatView2"))
     console.log('里面carData',typeCatView2)
    $.ajax({
        url: Config().addCar,
        data: {
            stores: "",
            spec: itemData.spec,
            searchItemId: typeCatView2.searchItemId,
            // searchId: carData.searchId,
            retPrice: itemData.retPrice,
            prod: itemData.prod,
            price: itemData.price,
            modelYearId:typeCatView2.modelYearId,
            itemDesc: itemData.itemDesc,
            itemCode: itemData.itemCode,
            isSupplier: "N",
            imageUrl: itemData.imgpath,
            fdrId: typeCatView2.fdrId,
            brandId: typeCatView2.brandId,
            addFromeIndex:1,
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            if (data.statusCode == 200) {
                alert("添加成功！")
                // window.location.href = "../index/index.html"
            }else{
                alert("添加失败！")
            }
        }
    });
}