<?php
include "conn.php";
$sql1 = "select * from phonegoods"; //获取所有的数据
$sql2 = "select * from jiadian";
$result1 = $conn->query($sql1);
$result2 = $conn->query($sql2);
$arr1 = array();
$arr2 = array();
for ($i = 0; $i < $result1->num_rows; $i++) {
    $arr1[$i] = $result1->fetch_assoc();
}
for ($i = 0; $i < $result2->num_rows; $i++) {
    $arr2[$i] = $result2->fetch_assoc();
}

class data{

}
$d1 = new data();
$d1->shuju1 = $arr1;
$d1->shuju2 = $arr2;

echo json_encode($d1);//输出接口