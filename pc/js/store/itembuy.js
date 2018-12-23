(function(){
    $(".itembuy-qrbtn").click(function(){
        $(".itembuy-item").removeClass("hidden");
    });
    $(".itembuy-item").delegate(".itembuy-itemboxaddbtn", "click", function (e) {
        location.href = "../store/itemadd.html?cid=1"
    })
})()