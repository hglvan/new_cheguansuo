(function(){
    $(".itembuy-qrbtn").click(function(){
        $(".itembuy-item").removeClass("hidden");
    });
    $(".itembuy-item").delegate(".itembuy-itemboxaddbtn", "click", function (e) {
        location.href = "../index/itemadd.html?cid=1"
    })
})()