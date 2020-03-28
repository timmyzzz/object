<?php
include "conn.php";
//检测用户名是否重名
if (isset($_POST['username'])) {
    $user = $_POST['username'];
    $result = $conn->query("select * from user where username='$user'");
    if ($result->fetch_assoc()) {
        echo true; 
    } else {
        echo false;
    }
}

//接收前端表单提交的数据
if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = sha1($_POST['password']);
    $email = $_POST['email'];
    $conn->query("insert user values(null,'$username','$password','$email')");
    header('location:http://localhost/object/src/html/login.html');
}