!function($){
    let $sid = location.search.substring(1).split("=")[1];
   
    const $spicbox = $('#spicbox');//小图盒子
    const $spic = $('#spic');//小图
    const $sf = $('#sf');//小放大镜
    const $bf = $('#bf');//大放大镜
    const $bpic = $('#bpic');//大图
    const $left = $('#left');//左边的按钮
    const $right = $('#right');//右边的按钮
    const $list = $('#list');//下面图片的列表
    const $title = $('.goods-title');//商品名
    const $price = $('.price');//价格
    const $contitle = $(".con-title");//大商品名

    if(!$sid){
        $sid = 0;
    }
//数据给后端
    $.ajax({
        url:'http://localhost/object/php/getsid.php',
        data:{
            sid:$sid
        },
        dataType:"json"
    }).done(function(g){
        $spic.attr("src",g.url);
        $spic.attr("sid",g.sid);
        $bpic.attr("src",g.url);
        $title.html(g.title);
        $contitle.html(g.title);
        $price.html(g.price);
        //下面的小图的列表
        let  piclist = g.picurl.split(",");
        // console.log(g.picurl.split(","))

        let $piclisthtml = "";
        $.each(piclist,function(index,value){
            $piclisthtml+=`
            <li>
                <img src = ${value}>
            </li>
            `;
        });
        $("#list ul").html($piclisthtml);
    });
    //点击小图列表，更改小图
    $("#list ul").on("click","li",function(){
        let $spicurl = $(this).find("img").attr("src");
        $spic.attr("src",$spicurl);
        $bpic.attr("src",$spicurl);
    });

    //左右箭头滑动图片列表

    let $num = 6;
    $right.on("click",function(){
        let $listli = $("#list ul li");
        if($listli.size() > $num){
            $num++;
            $left.css("color","#333");
            if($listli.size() == $num){
                $right.css("color","#fff"); 
            }
            $("#list ul").animate({
                left:-($num-6)*$listli.eq(0).outerWidth(true)
            });
        }
    });
    $left.on("click",function(){
        let $listli = $("#list ul li");
        if($num > 6){
            $num--;
            $right.css("color","#333");
            if($num <=6){
                $left.css("color","#fff"); 
            }
            $("#list ul").animate({
                left:-($num-6)*$listli.eq(0).outerWidth(true)
            });
        }
    });

    let sidarr = [];
    let numarr = [];
    
    //数据利用cookie存储
    function tocookie(){
        if(jscookie.get('cookiesid') && jscookie.get('cookienum')){
            sidarr = jscookie.get('cookiesid').split(',');
            numarr = jscookie.get('cookienum').split(',');
        }else{
             sidarr = [];
             numarr = [];  
        }
    }
    $(".buybtn li a").on("click",function(){
        let $sid = $(this).parents(".buybox-main").find("#spic").attr("sid")
        //判断是不是第一次
        tocookie();
        if($.inArray($sid,sidarr) !=-1){
             let $num = parseInt(numarr[$.inArray($sid,sidarr)])+parseInt($(".number").val());
             numarr[$.inArray($sid,sidarr)] = $num;
             jscookie.add("cookienum",numarr,10);
        }else{
            sidarr.push($sid);
            jscookie.add('cookiesid', sidarr, 10);
            numarr.push($(".number").val());
            jscookie.add('cookienum', numarr, 10);

        }
    })


    //放大镜效果
    // const $spicbox = $('#spicbox');//小图盒子
    // const $spic = $('#spic');//小图
    // const $sf = $('#sf');//小放大镜
    // const $bf = $('#bf');//大放大镜
    // const $bpic = $('#bpic');//大图
    // const $left = $('#left');//左边的按钮
    // const $right = $('#right');//右边的按钮
    // const $list = $('#list');//下面图片的列表
    // const $title = $('.goods-title');//商品名
    // const $price = $('.price');//价格
    // const $contitle = $(".con-title");//大商品名

    $sf.width($spic.width() * $bf.width() / $bpic.width());
    $sf.height($spic.height() * $bf.height() / $bpic.height());
    let $bili = $bpic.width() / $bf.width();
    $spicbox.hover(function(){
        $sf.css('visibility', 'visible');
        $bf.css('visibility', 'visible');

        $sf.on("mousemove",function(ev){
            let $leftvalue = ev.pageX - $spicbox.offset().left-$sf.width()/2;
            let $topvalue = ev.pageY - $spicbox.offset().top-$sf.height()/2;
            if($leftvalue<0){
                $leftvalue = 0;
            }else if($leftvalue>=$spic.width()-$sf.width()){
                $leftvalue=$spic.width()-$sf.width()
            }
            if($topvalue<0){
                $topvalue = 0;
            }else if($topvalue>=$spic.height()-$sf.height()){
                $topvalue=$spic.height()-$sf.height()
            }
            $sf.css({
                left:$leftvalue,
                top:$topvalue
            });
            $bpic.css({
                left:-$leftvalue*$bili,
                top:-$topvalue*$bili
            });
        })
    },function(){
        $sf.css('visibility', 'hidden');
        $bf.css('visibility', 'hidden');
    });


    //顶部悬浮
    let $titlebox = $(".title-box-wrap");
    $(window).on("scroll",function(){
        if($(window).scrollTop()>=200){
            $titlebox.css("position","fixed").css("top","0");
        }else{
            $titlebox.css("position","static")
        }
    })
}(jQuery);