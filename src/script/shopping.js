!function($){
    function list(sid,num){
        $.ajax({
            url:"http://localhost/object/php/shoppinggetdata.php",
            dataType:"json"
        }).done(function(data){
            $.each(data,function(index,value){
                if(sid == value.sid){
                    let $clonebox = $(".item-box:hidden").clone(true,true);
                    $clonebox.find(".col-img img").attr("src",value.url);
                    $clonebox.find(".col-name").html(value.title);
                    $clonebox.find(".col-price").html(value.price);
                    $clonebox.find(".change-goods-num input").attr("value",num)
                    $clonebox.css('display', 'block');
                    $('.list-body').append($clonebox);
                    $clonebox.find(".col-total").html((value.price*num).toFixed(2))
                    sumprice()
                }
            })
        })
    }

    
    
    //通过cookie渲染购物车数据

    if(jscookie.get('cookiesid') && jscookie.get('cookienum')){
        let csid = jscookie.get("cookiesid").split(",");
        let cnum = jscookie.get("cookienum").split(",");
        $.each(csid,function(index,value){
            list(csid[index],cnum[index]);
        })
    }

    // 计算总价

    function sumprice(){
        let $sum = 0;//商品件数
        let $sumprice = 0;//商品的总价
        $(".item-box:visible").each(function(index,ele){
            if($(ele).find(".col-check input").prop("checked")){
                $sum += parseInt( $(ele).find(".change-goods-num input").val());
                $sumprice+=parseInt($(ele).find(".col-total").html())
            }
        });
        $(".cart-bar i").html($sum);
        $(".cart-price em").html($sumprice.toFixed(2));
    }

    //全选
    $(".allchoose").on("change",function(){
        $(".item-box:visible").find(":checkbox").prop("checked",$(this).prop("checked"));
        $(".allchoose").prop("checked",$(this).prop("checked"));
        sumprice();
    });
    let $inputs = $(".item-box:visible").find(":checkbox");
    $(".list-body").on("change",$inputs,function(){
        if($(".item-box:visible").find(":checkbox").length ===$(".item-box:visible").find("input:checked").size() ){
            $(".allchoose").prop("checked",true)
        }else{
            $(".allchoose").prop("checked",false)

        }
        sumprice();

    })


}(jQuery)