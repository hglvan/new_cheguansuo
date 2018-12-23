window.Config = function () {
    var root = "http://120.25.104.131:3481/nxchgb";
    return {
        //获取图片地址
        getImgUrl: root + "/upload/media/",
        getImgUrl2: "http://59.33.84.235:8888",
        itemQrList1:root + "/api/ec/site/v1/stocks/list.htm",
        //登录
        login: root + "/api/biz/ou/v1/users/login.htm",
        //资讯列表
        recommends: root + "/api/ec/site/v1/recommends.htm",
        //资讯详情
        recommendDetail: root + "/api/ec/site/v1//recommends/{id}.htm",
        //获取帐务处理、退货处理、退货状态
        siteOrders: root + '/api/ec/site/v1/siteOrders/list.htm',
        //确认退货
        returnOrders: root + '/api/ec/site/v1/siteOrders/update/all.htm',
        //确认订单
        listSupplierNoBuy: root + '/api/ec/site/v1/searchItems/listSupplierNoBuy.htm',
        //清除配件
        deleteItem: root + "/api/ec/site/v1/searchItems/delete.htm",
        //确认配件
        addItem: root + "/api/ec/site/v1/siteOrders/add.htm",
        //主页信息
        indexList: root + "/api/ec/site/v1/searchItems/list.htm",
        //品牌、车型、年款查询、配件分类查询
        listDept: root + "/api/ec/site/v1/typeCats/listDept.htm",
        //配件分类项
        listGroup: root + "/api/ec/site/v1/stocks/listGroup.htm",
        //年款详情
        carDetail: root + "/api/ec/site/v1/typeCats/get/{catId}.htm",
        //添加配件或车型（上传照片、添加配件）
        add: root + "/api/ec/site/v1/searchItems/addPicture/add.htm",
        //添加车型
        addCar: root + "/api/ec/site/v1/searchItems/add.htm",
        //根据配件分类查询配件
        itemList: root + "/api/ec/site/v1/stocks/list.htm",
        //获取配件详情
        itemDetail: root + "/api/ec/site/v1/stocks/get/{itemCode}.htm",
        //保存车牌
        saveNum: root + "/api/ec/site/v1/searchItems/update/{catId}.htm",
        //删除车型
        delCar: root + "/api/ec/site//v1/siteSearchs/deleteAll.htm",
        //删除车型
        updateAmount: root + "/api/ec/site/v1/searchItems/update/updateAmount.htm",
        //上传图片
        upLoadImages: root + "/api/biz/gl/upload/upLoadImages.htm",
        //通过vin获取车型详情
        getVin: root + "/api/ec/site/v1/siteVins/get/{vin}.htm",
        //通过车型号获取车型详情
        catTypeNo: root + "/api/ec/site/v1/typeCats/get/catTypeNo.htm",
        //获取配件查询列表
        itemQrList: root + "/api/ec/site/v1/typeCats/list.htm",
        //获取配件查询列表
        itemQrList: root + "/api/ec/site/v1/typeCats/list.htm",
        //获取配件商列表
        listSupplier: root + "/api/ec/site/v1/searchItems/listSupplier.htm",
        //获取配件商列表
        supplier: root + "/api/ec/site/v1/suppliers/list.htm",
        //获取配件供应商商列表
        stores: root + "/api/biz/ou/v1/stores.htm"
    }
}

//本地数据保存
window.saveObject = function (key, value) {
    var val;
    if (typeof value === "object") {
        val = JSON.stringify(value);
    } else {
        val = value;
    }
    window.localStorage.setItem(key, val);
};

//本地数据读取
window.loadObject = function (key) {
    var ret = window.localStorage.getItem(key);

    var result;
    if (ret == null || ret == "null" || ret == "") {
        result = null;
    } else {
        try {
            result = JSON.parse(ret);
        } catch (e) {
            //无法转为对象
            result = ret;
        }
    }

    return result;
};

//清除本地数据
window.clearObject = function () {
    window.localStorage.clear();
};

//清除本地数据
window.removeObject = function (key) {
    window.localStorage.removeItem(key);
};

//日期格式转换
window.formatDate = function (time, flag) {
    var newdate = new Date(time);
    var year = newdate.getYear() + 1900;
    var month = newdate.getMonth() + 1;
    var date = newdate.getDate();
    var hour = newdate.getHours();
    var minute = newdate.getMinutes();
    var second = newdate.getSeconds();
    if (flag == 0) {
        return year + "-" + month + "-" + date + "   " + hour + ":" + minute;
    } else if (flag == 1) {
        return year + "-" + month + "-" + date;
    } else {
        return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
    }
};

/*
 *获取路径传的参数值
 *参数：paras(key值)
 */
window.getParameter = function (paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");

    var returnValue;
    for (var i = 0; i < paraString.length; i++) {
        var tempParas = paraString[i].split('=')[0];
        var parasValue = paraString[i].split('=')[1];

        if (tempParas === paras)
            returnValue = parasValue;
    }
    if (typeof (returnValue) === "undefined") {
        return "";
    } else {
        return decodeURI(returnValue);
    }

};

window.updateAmount = function(id, amount){
    $.ajax({
        url: Config().updateAmount,
        
        data: {
            searchItemId: id,
            amount: amount,
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "POST",
        dataType: "JSON",
        success: function (data) {
        }
    });
}

window.statusText = {
    create: "创建",
    handleIng: "处理中",
    returned: "已退货",
    returnNo: "不能退货",
    returnCash: "已退现金"
};



(function () {

    if (window.sessionStorage.getItem("type_")==3) {
        console.log('sdddd')
        $('.common-navitem-index').hide()
    }else if(window.sessionStorage.getItem("type_")==1){
        $('.common-navitem-pj').hide()
    }

    $("input").focus(function(){
      $(this).siblings('.delete').show();

    });
    $("input").blur(function(){
      $(this).siblings('.delete').hide();
    });
    $('.delete').on('click',function(){
        $(this).siblings('input').val('');
    })
    $('body img').each(function () {
        this.onerror = function () {
            this.src = "../images/common/logo-top.png";
            this.style.height = "100%";
            this.style.width = "100%";
        }
    });
    //判断登录
    if (window.sessionStorage.getItem("isLogin") != 1) {
        if (location.href.indexOf("index/index") == -1) {
            window.location.href = "../index/index.html";
        }
    } else {
        $(".common-loginbtn").html("欢迎你，" + loadObject("userInfo").userView.name + '&nbsp;&nbsp;&nbsp;&nbsp;<span class="common-loginout">退出</span>');
    }

    //登出
    $(document).on("click",'.common-loginout', function(){
        loginout();
    })

    //公用跳转
    $(".common-navitem").eq(0).on("click", function () {
        window.location.href = "../index/index.html";
    });
    $(".common-navitem").eq(1).on("click", function () {
        window.location.href = "../news/list.html";
    });
    $(".common-navitem").eq(2).on("click", function () {
        window.location.href = "../store/index.html";
    });
    $(".common-navitem").eq(3).on("click", function () {
        window.location.href = "../account/orders.html";
    });
    //个人中心公共模块
    $(".account-tabbar li").eq(0).on("click", function () {
        window.location.href = "../account/orders.html";
    });
    $(".account-tabbar li").eq(1).on("click", function () {
        window.location.href = "../account/accounting.html";
    });
    $(".account-tabbar li").eq(2).on("click", function () {
        window.location.href = "../account/return.html";
    });
    $(".account-tabbar li").eq(3).on("click", function () {
        window.location.href = "../account/status.html";
    });

    //时间选择器
    if (typeof $(".account-startdate, .account-enddate").jcDate == "function") {
        $(".account-startdate, .account-enddate").jcDate({
            Class: "", //为input注入自定义的class类（默认为空）
            Default: "today", //设置默认日期（默认为当天）
            Event: "click", //设置触发控件的事件，默认为click
            Speed: 100, //设置控件弹窗的速度，默认100（单位ms）
            Left: 0, //设置控件left，默认0
            Top: 22, //设置控件top，默认22
            Format: "-", //设置控件日期样式,默认"-",效果例如：XXXX-XX-XX
            DoubleNum: true, //设置控件日期月日格式，默认true,例如：true：2015-05-01 false：2015-5-1
            Timeout: 100, //设置鼠标离开日期弹窗，消失时间，默认100（单位ms）
            OnChange: function () { //设置input中日期改变，触发事件，默认为function(){}
                console.log('num change');
            }
        });
    }

})()

function clearCookie(){ 
var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
if (keys) { 
    for (var i = keys.length; i--;) 
    document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString() 
    } 
} 
function loginout(){
    clearCookie()
    window.sessionStorage.setItem("isLogin", 0);
    window.location.href = "../index/index.html";
    
    var conn = new WebIM.connection({
        isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
        https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
        url: WebIM.config.xmppURL,
        heartBeatWait: WebIM.config.heartBeatWait,
        autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
        autoReconnectInterval: WebIM.config.autoReconnectInterval,
        apiUrl: WebIM.config.apiURL,
        isAutoLogin: true
    });
    conn.close()
    console.log(conn)
    // var pattern = /([^\?|&])\w+=([^&]+)/g;
    // var cookie =document.cookie.split(';')
    // var args = window.location.search.match(pattern);
    //     if (!args) {
    //     cookie.forEach(function(obj,index){
    //         var objc = obj.split('=')
    //         if (objc[0].indexOf('webim_')>-1) {
    //             // var username= objc[0].substring(7)
    //             // console.log(window.location.href+'?username='+username)
    //             // window.location.href=window.location.href+'?username='+username
    //             // return false
    //             $.cookie(objc[0], null)
    //         }
    //     })
    // }

}

//选择配件商列表
window.getSuppliersList = function(itemCode, callback,searchItemId){
    $.ajax({
        url: Config().supplier,
        
        data:{
            "itemCode": itemCode,
            "searchItemId": searchItemId,
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "GET",
        dataType: "JSON",
        success: function(data){            
            console.log(data);
            if (data.statusCode == 200) {
                var listText = "";
                listText = "<div id='store-list' class=''><div class='common-bg-white'><div class='common-orange'><span>选择配件商</span><span class='store-list-close common-orange'>×</span></div><ul class=''>";
                for(i = 0; i < 3; i++){
                    listText += "<li class='store-list-item' data-id='00001'>配件商</li>"
                }
                listText += "</ul></div></div>"

                $("body").append(listText);

                $(".store-list-close").on("click", function(){
                    $("#store-list").remove();
                });
                $(".store-list-item").on("click", function(e){
                    window.sessionStorage.setItem("storeId", e.currentTarget.dataset.id);
                    if(typeof callback == "function"){
                        callback();
                    }
                });
            }
        }
    });
}
 /**
         * 添加cookie
         *
         * @instance
         * @param name  { String } cookie键
         * @param value { String } cookie值
         * @param hours { Nunber } cookie有效期，单位小时
         * @param domain { String } cookie的domain
         * @param path { String } cookie的path，默认为'/'
         */
        window.cookieSet = function(name, value, hours, domain, path) {
            var date = new Date();
            date.setTime(date.getTime() + (hours || 24) * 3600 * 1000);
            var cookieStr = name + '=' + escape(value) + ';expires=' + date.toGMTString() + ';path=' + (path || '/');
            if (domain) {
                cookieStr += ';domain=' + domain;
            }
            document.cookie = cookieStr;
            return this;
        },
        /**
         * 获取cookie
         *
         * @instance
         * @param name  { String } cookie键
         */
        window.cookieGet = function(name) {
            var c = document.cookie,
                hasName = c.match(new RegExp('^\\s*' + name + '(?==)|;\\s*' + name + '(?==)')),
                value = hasName && new RegExp(name + '=([^;]*)(?:(?=;)|$)').exec(c);

            return hasName ? value[1] || value[2] : null;

        },
        /**
         * 删除cookie
         *
         * @instance
         * @param name  { String } cookie键
         * @param domain { String } cookie的domain
         * @param path { String } cookie的path，默认为'/'
         */
         window.cookierRemove = function(name, domain, path) {
            this.set(name, '', -1, domain, path);
            return this;
        }
//选择配件供应商列表
window.getStoreList = function(callback){
    $.ajax({
        url: Config().stores,
        
        data:{
            noCookByUserId:window.sessionStorage.getItem("id")
        },
        type: "GET",
        dataType: "JSON",
        success: function(data){            
            console.log(data);
            if (data.statusCode == 200) {
                var stores = data.storeViews;
                var listText = "";
                listText = "<div id='store-list' class=''><div class='common-bg-white'><div class='common-orange'><span>选择配件商</span><span class='store-list-close common-orange'>×</span></div><ul class=''>";
                for(i = 0; i < stores.length; i++){
                    listText += "<li class='store-list-item' data-id='"+ stores[i].id + "'>"+ stores[i].storeName + "</li>"
                }
                listText += "</ul></div></div>"

                $("body").append(listText);

                $(".store-list-close").on("click", function(){
                    $("#store-list").remove();
                });
                $(".store-list-item").on("click", function(e){
                    window.sessionStorage.setItem("storeId", e.currentTarget.dataset.id);
                    if(typeof callback == "function"){
                        callback();
                    }
                });
            }
        }
    });
}