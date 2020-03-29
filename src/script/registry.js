!function($){
    let $user = $(".username");
    let $flag1 = true;
    let $flag2 = true;
    let $flag3 = true;
    $user.on("blur",function(){
        $.ajax({
            type: 'post',
            url: 'http://localhost/object/php/registry.php',
            data: {
                username:$user.val()
            }
        }).done(function(result){
            if (!result) {
                if($user.val()!=""){
                $('.user').html('√').css('color', 'green');
                }else{
                $('.user').html('用户名不能为空').css('color', 'red');
                }
            } else {
                $('.user').html('该用户名已经存在').css('color', 'red');
                $flag1 = false;
            }
        })
    });
    let $pass = $(".password");
    $pass.on("blur",function(){
        $.ajax({
            type: 'post',
            url: 'http://localhost/object/php/registry.php',
            data: {
                password:$pass.val()
            }
        }).done(function(){
            if($pass.val()!==""){
                let regnum = /[0-9]+/g;  //数字
                let reguppercase = /[A-Z]+/g;//大写
                let reglowercase = /[a-z]+/g;//小写
                let other = /[\W_]+/g;//特殊字符  //\W:非数字字母下划线
                let count = 0;
                if(regnum.test($pass.val())){
                    count++;
                }
                if(reguppercase.test($pass.val())){
                    count++;
                }
                if(reglowercase.test($pass.val())){
                    count++;
                }
                if(other.test($pass.val())){
                    count++;
                }
                switch(count){
                    case 1:
                        $(".pass").html("安全性低").css("color","red");
                        $flag2 = false;
                        break;
                    case 2:
                    case 3:
                        $(".pass").html("安全性中等").css("color","orange");
                        $flag2 = true;
                        break;
                    case 4:
                        $(".pass").html("安全性高").css("color","green");
                        $flag2 = true;
                        break;   
                    }
            }else{
                $(".pass").html("密码不能为空").css("color","red")
            }
        })
        
    });

    let $email = $(".email")
    $email.on("blur",function(){
            $.ajax({
                type: 'post',
                url: 'http://localhost/object/php/registry.php',
                data: {
                    email: $email.val()
                }
            }).done(function(){
                if($email.val() !=""){
                    let reg = /^[a-z0-9A-Z]+[a-z0-9A-Z._]+@[a-z0-9A-Z./]+[a-z]{2}$/;
                    if(reg.test($email.val())){
                    $(".mail").html("√").css("color","green");
                    $flag3=true;
                    }else{
                    $(".mail").html("邮箱格式有误").css("color","red");
                    $flag3=false;
                    }
                   }else{
                    $(".mail").html("邮箱不能为空").css("color","red")
                    $flag3 = false;
                   }
            })  
    });

    $('form').on('submit', function () {
        if ($user.val() == '') {
            $('span').html('用户名不能为空').css('color', 'red');
            $flag1 = false;
        }
        if ($pass.val() == '') {
            $('span').html('密码不能为空').css('color', 'red');
            $flag2 = false;
        }
        if ($email.val() == '') {
            $('span').html('邮箱不能为空').css('color', 'red');
            $flag3 = false;
        }
        if (!$flag1 || !$flag2 || !$flag3) {
            return false;//阻止跳转
        }
    });
}(jQuery);