!function($){
    let $user = $(".username");
    let $flag1 = true;
    let flag2 = true;
    let flag3 = true;
    $user.on("blur",function(){
        $.ajax({
            type: 'post',
            url: 'http://localhost/object/php/registry.php',
            data: {
                username: $user.val()
            }
        }) .done(function(result){
            if (!result) {
                $('.user').html('√').css('color', 'green');
                $flag1 = true;
            } else {
                $('.user').html('该用户名已经存在').css('color', 'red');
                $flag1 = false;
            }
        })
    });
    let $pass = $(".password");
    $pass.on("blur",function(){
        if($(this).val()!==""){
            let regnum = /[0-9]+/g;  //数字
            let reguppercase = /[A-Z]+/g;//大写
            let reglowercase = /[a-z]+/g;//小写
            let other = /[\W_]+/g;//特殊字符  //\W:非数字字母下划线
            let count = 0;
            if(regnum.test($(this).val())){
                count++;
            }
            if(reguppercase.test($(this).val())){
                count++;
            }
            if(reglowercase.test($(this).val())){
                count++;
            }
            if(other.test($(this).val())){
                count++;
            }
            switch(count){
                case 1:
                    $(".pass").html("安全性低").css("color","red");
                    flag2 = false;
                    break;
                case 2:
                case 3:
                    $(".pass").html("安全性中等").css("color","orange");
                    flag2 = true;
                    break;
                case 4:
                    $(".pass").html("安全性高").css("color","green");
                    flag2 = true;
                    break;   
                }
        }else{
            $(".pass").html("密码不能为空").css("color","red")
        }
    })
}(jQuery)