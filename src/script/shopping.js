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
                    $clonebox.find(".col-img img").attr("sid",value.sid);
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
//点击加号和减号改变数量
$(".numadd").on("click",function(){
    let $num  = $(this).parents(".item-box").find(".number").val();
    $num++;
    $(this).parents('.item-box').find('.number').val($num);
    $(this).parents('.item-box').find('.col-total').html(singleprice($(this)));
    sumprice();
    setcookie($(this))
});
$(".numdown").on("click",function(){
    let $num  = $(this).parents(".item-box").find(".number").val();
    $num--;
    if ($num < 1) {
        $num = 1;
    }
    $(this).parents('.item-box').find('.number').val($num);
    $(this).parents('.item-box').find('.col-total').html(singleprice($(this)));
    sumprice();
    setcookie($(this));
});


//改变文本框
$('.item-box .number').on('change', function () {
    let $reg = /^\d+$/g;
    let $value = $(this).val();
    if (!$reg.test($value)) {
        $(this).val(1);
        alert("只能是数字")
    }
    $(this).parents('.item-box').find('.col-total').html(singleprice($(this)));
    sumprice();
    setcookie($(this));
});

//计算单价
function singleprice (obj){
    let $single = parseFloat(obj.parents(".item-box").find(".col-price").html());
    let $num = parseInt(obj.parents(".item-box").find(".number").val());
    return ($single * $num).toFixed(2)
}

//将改变后的数量存放到cookie中
let sidarr = [];
let numarr = [];
function cookietoarray() {
    if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {
        sidarr = jscookie.get('cookiesid').split(',');
        numarr = jscookie.get('cookienum').split(',');
    } else {
        sidarr = [];
        numarr = [];
    }
}

function setcookie(obj) {
    cookietoarray();
    let $sid = obj.parents('.item-box').find('img').attr('sid');
    numarr[$.inArray($sid, sidarr)] = obj.parents('.item-box').find('.number').val();
    jscookie.add('cookienum', numarr, 10);
}


//删除的时候要从cookie中删除数据
function delcookie(sid,sidarr){
    let $index = -1;
    $.each(sidarr,function(index,value){
        if(sid === value){
            $index = index; 
        }
    });
    sidarr.splice($index,1);
    numarr.splice($index,1);
    jscookie.add("cookiesid",sidarr,10)
    jscookie.add("cookienum",numarr,10)
}
// 删除
$(".col-action").on("click",function(){
    cookietoarray();
    if(window.confirm("确定要删除吗")){
        $(this).parents(".item-box").remove();
        delcookie($(this).parents('.item-box').find('img').attr('sid'),sidarr);
        sumprice();
    }
});


}(jQuery)