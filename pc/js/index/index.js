var carData;
(function () {
    
        // window.sessionStorage.setItem("id",'')
     function getName(){
        var name = window.sessionStorage.getItem("id");
        if (name == undefined||name == '') {
            return false;
        }else{
            return true;
        }

     }
    //  window.parent.getIndexList(window.sessionStorage.getItem("id"))
    getIndexList(window.sessionStorage.getItem("id"));
    clearCookie()
    //判断登录
    if(window.sessionStorage.getItem("isLogin") == 1){       
        
        $(".index-box").removeClass("hidden");
    }else{       
        $(".login-box").removeClass("hidden");
    }
    $(".login-button").on("click", function () {
        var acount = $("#login-account").val();
        var pwd = $("#login-pwd").val();
        chatLogin(acount, pwd);
    });

    $(".index-brandbtn").on("click", function () {
        if (getName()) {
            window.location.href = "../index/brandqr.html";
        }else{
            alert('请选择好友')
        }
        
    });
    $(".index-uploadbtn").on("click", function () {
        if (getName()) {
            window.location.href = "../index/carqr.html";
        }else{
            alert('请选择好友')
        }
        
    });

    // 配件查询
    $(".index-qrbtn").on("click", function () {
        if (getName()) {
            var inputs = $(".index-iteminput")
            if($(inputs).val() != ""){
                if($(inputs).val().split(" ").length != 2){
                    alert("车型名称与配件名称请用一个空格隔开！")
                }else{             
                    window.location.href = "../index/itemlist.html?catDes=" + encodeURI($(inputs).val().split(" ")[0]) + "&accessoryName=" + encodeURI($(inputs).val().split(" ")[1]);
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
                window.location.href = "../index/branddetail.html?carNo=" + encodeURI($(inputs).val().trim());
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
                window.location.href = "../index/branddetail.html?vin=" + encodeURI($(inputs).val().trim());
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
        location.href = "../index/itembuy.html"
    })
    $(".index-resultbox").delegate(".index-resulbtnadd", "click", function (e) {
        var target = e.currentTarget;
        var index = target.dataset.index;
        window.localStorage.setItem("searchid", target.dataset.searchid);
        window.localStorage.setItem("searchitemid", target.dataset.id);
        saveObject("carInfo", carData[index]);
        location.href = "../index/itemadd.html"
    })
    $(".index-resultbox").delegate(".index-resulbtnqr", "click", function (e) {
        var target = e.currentTarget;
        var index = target.dataset.index;
        window.localStorage.setItem("parentId", target.dataset.catid);
        window.localStorage.setItem("searchid", target.dataset.searchid);
        saveObject("carInfo", carData[index]);
        console.log(carData[index])
        location.href = "../index/itemqr.html?fdrid="+target.dataset.fdrid+'&searchid='+target.dataset.searchid
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
        console.log(ids)
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

//登录
function login(acount, passWord){
    document.getElementById('iframeName').contentWindow.location.reload(true)    
    $.ajax({
        url: Config().login,
        data:{
            acount: acount,
            passWord: passWord
        },
        type: "POST",
        dataType: "JSON",
        success: function(data){            
            if(data.statusCode == 200){
                console.log('data登录',data)
                saveObject("userInfo", data);
                window.sessionStorage.setItem("isLogin", 1);
                window.sessionStorage.setItem("sid", data.sid);
                window.sessionStorage.setItem("id", data.userView.id.trim());
                window.sessionStorage.setItem("acount", acount);
                getIndexList();
                $(".login-box").addClass("hidden");
                $(".index-box").removeClass("hidden");
                // $(".common-loginbtn").html("欢迎回来！" + loadObject("userInfo").userView.name);
                $(".common-loginbtn").html("欢迎你，" + loadObject("userInfo").userView.name + '&nbsp;&nbsp;&nbsp;&nbsp;<span class="common-loginout">退出</span>');
                if (data.userView&&data.userView.type == 3) {
                    window.location.href = '/nxchgb/pc/store/index.html'
                    window.sessionStorage.setItem("type_", 3);
                }else{
                    window.sessionStorage.setItem("type_", 1);
                    window.location.reload();
                }
            //     setTimeout(function(){
            //     document.getElementById('iframeName').contentWindow.location.reload(true)

            // },1000)

            }else if(data.statusCode == 1023){
                alert("登录失败！ 帐号或密码错误!");
            }else {
                alert("登录失败！服务器内部错误！");
            }
        }
    });
}
function chatLogin(acount, passWord){
 
    var conn = new WebIM.connection({
	    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
	    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
	    url: WebIM.config.xmppURL,
	    heartBeatWait: WebIM.config.heartBeatWait,
	    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
	    autoReconnectInterval: WebIM.config.autoReconnectInterval,
	    apiUrl: WebIM.config.apiURL,
	    isHttpDNS: WebIM.config.isHttpDNS,
	    isWindowSDK: WebIM.config.isWindowSDK,
	    isAutoLogin: true,
	    encrypt: WebIM.config.encrypt,
	    delivery: WebIM.config.delivery,
	    saveLocal: WebIM.config.saveLocal
    });
    var options = { 
        apiUrl: WebIM.config.apiURL,
        user: acount,
        pwd: passWord,
        appKey: WebIM.config.appkey,
        success: function success(token) {
            var encryptUsername = btoa(acount);
            encryptUsername = encryptUsername.replace(/=*$/g, "");
            var token = token.access_token;
            $('#cookieIframe').html('webim_' + encryptUsername+'='+token)
            window.sessionStorage.setItem('userName', encryptUsername);
            WebIM.utils.setCookie('webim_' + encryptUsername, token, 1);
            login(acount, passWord)
      },
      error: function error() {
          // window.history.pushState({}, 0, 'chat');
          alert('账号密码错误！')
      }
        
      };
      conn.open(options);
}

//获取首页资讯
function getIndexList(name){
    //document.cookie = "JSESSIONID=" + window.sessionStorage.getItem("sid");
    if(name)window.sessionStorage.setItem("id",name);

    $.ajax({
        url: Config().indexList,
        
        data:{
            noCookByUserId:window.sessionStorage.getItem("id"),
            page: 0,
            pageSize: 5000,
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
    console.log(target)
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

