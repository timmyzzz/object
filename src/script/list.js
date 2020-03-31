!function($){
    const $list = $(".goods-list");
    let array_default = [];//排序前的li数组
    let array = [];//排序中的数组
    let prev = null;
    let next = null;
    $.ajax({
        url: 'http://localhost/object/php/listdata.php',
        dataType: 'json'
    }).done(function(data){
        let $strhtml = "";
        $.each(data,function(index, value){
            $strhtml+=`
            <div class='good-item'>
                <div class="good-img">
                    <a href="detail.html?sid=${value.sid}">
                        <img class="lazy" data-original="${value.url}" alt="">
                    </a>
                </div>
                        <h2>
                            <a href='#'>${value.title}</a>
                        </h2>
                        <p class='price'>${value.price}</p>
            </div>
            `;
        });
        $list.html($strhtml);
        $(function () {
            $(".lazy").lazyload({ effect: "fadeIn" });
        });

        array_default = [];
        array = [];
        prev = null;
        next = null;
        $('.good-item').each(function (index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    });

    $(".page").pagination({
        pageCount: 3,//总页数
        jump: true,//是否开启跳转到指定的页数，布尔值。
        coping: true,//是否开启首页和尾页，布尔值。
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback:function(d){
           $.ajax({
               url:"http://localhost/object/php/listdata.php",
               data:{
                   page: d.getCurrent()
               },
               dataType:"json"
           }).done(function(data){
            let $strhtml = "";
            $.each(data,function(index, value){
                $strhtml+=`
                <div class='good-item'>
                    <div class="good-img">
                        <a href="detail.html?sid=${value.sid}">
                            <img src="${value.url}" alt="">
                        </a>
                    </div>
                            <h2>
                                <a href='#'>${value.title}</a>
                            </h2>
                            <p class='price'>${value.price}</p>
                </div>
                `;
            });
            $list.html($strhtml);
            array_default = [];
            array = [];
            prev = null;
            next = null;
            $('.good-item').each(function (index, element) {
                array[index] = $(this);
                array_default[index] = $(this);
            });  
           }) 
        }
    });

    $(".faultbtn").on("click",function(){
        $.each(array_default,function(index,value){
            $(".goods-list").append(value);
        })
        return;
    });
    $(".pricebtn").on("click",function(){
        for(let i = 0;i < array.length-1;i++){
            for(let j=0;j<array.length-1-i;j++){
                prev = parseFloat(array[j].find(".price").html())
                next = parseFloat(array[j+1].find(".price").html())
                if(prev>next){
                    let middle = array[j];
                     array[j] = array[j+1];
                     array[j+1] = middle
                }
            }
        }
        $('.goods-list').empty();//清空原来的列表
        $.each(array, function (index, value) {
            $('.goods-list').append(value);
        });
        $(function () {
            $(".lazy").lazyload({ effect: "fadeIn" });
        });
    })


}(jQuery);