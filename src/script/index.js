!function($){
    //图片轮播
    let $pics = $(".banner-ppt ul img");
    let $btns = $(".banner-ppt ol li");
    let $left = $(".pptleft");
    let $right = $(".pptright");

    let num = 0;
    $btns.on("click",function(){
        tabs($(this).index());
    });

    $left.on("click",function(){
        num--;
        if(num<0){
            num = $pics.length-1;
        }
        tabs(num);
    });
    $right.on("click",function(){
        num++;
        if(num>=$pics.length){
            num = 0;
        }
        tabs(num);
    });
    function tabs(index){
        for(let i = 0;i<$btns.length;i++){
            $btns.eq(i).css("background-color","");
            $pics.eq(i).removeClass("op")
        }
        $btns.eq(index).css("background-color","#fff");
        $pics.eq(index).addClass("op")
    }

    let $phonelist = $(".phone-list");
    $.ajax({
        url:"http://localhost/object/php/index.php",
        dataType:"json"
    }).done(function(data){
        let $strhtml = "";
        $.each(data.shuju1,function(index,value){
            $strhtml+=`
            <li class="brick-item">
                <a href="" class="back">
                    <div class="figure">
                        <img class="lazy" data-original="${value.url}" alt="">
                    </div>
                    <h3 class="content-title">${value.title}</h3>
                    <p class="content-desc"></p>
                <p class="price">
                    <span>${value.price}</span>元
                    <span>起</span>
                </p>
                </a>
            </li>
            `;
        });
        $phonelist.html($strhtml);
        $(function () {
            $(".lazy").lazyload({ effect: "fadeIn" });
        });
    })

    let $jiadianlist = $(".jiadian");
    $.ajax({
        url:"http://localhost/object/php/index.php",
        dataType:"json"
    }).done(function(data){
        let $strhtml = "";
        $.each(data.shuju2,function(index,value){
            $strhtml+=`
            <li class="brick-item">
                <a href="" class="back">
                    <div class="figure">
                        <img class="lazy" data-original="${value.url}" alt="">
                    </div>
                    <h3 class="content-title">${value.title}</h3>
                    <p class="content-desc"></p>
                <p class="price">
                    <span>${value.price}</span>元
                    <span>起</span>
                </p>
                </a>
            </li>
            `;
        });
        $jiadianlist.html($strhtml);
        $(function () {
            $(".lazy").lazyload({ effect: "fadeIn" });
        });
    })
//本地存储显示用户信息
    if(localStorage.getItem("username")){
        $('.user').html(localStorage.getItem('username'));
    }

    //回到顶部效果
    let $backtop = $(".item-backtop");
    $(window).on("scroll",function(){
        let $st =$(window).scrollTop();
        console.log($st);
        if($st>600){
            $backtop.show();
        }else{
            $backtop.hide();
        }
        $backtop.on("click",function(){
            $("html,body").animate({
                scrollTop:0
            })
        })
    });
    
}(jQuery)