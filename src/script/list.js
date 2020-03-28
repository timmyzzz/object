!function($){
    const $list = $(".goods-list");
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
        $strhtml+="</div>";
        $list.html($strhtml);
    });
}(jQuery);