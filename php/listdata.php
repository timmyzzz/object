<?php
include "conn.php";

$pagesize = 12;//一页展示的数量

$sql = "select * from xmgoods";
$result = $conn->query($sql); //获取数据的结果集(记录集)
$num = $result->num_rows; //记录集的总条数  28
// 获取页数

$pagenum = ceil($num / $pagesize); //获取页数  3
if (isset($_GET['page'])) {
    $pagevalue = $_GET['page'];
} else {
    $pagevalue = 1;
}
$page = ($pagevalue - 1) * $pagesize;


$sql1 = "select * from xmgoods limit $page,$pagesize";
$res = $conn->query($sql1);
//通过二维数组输出
// $result->num_rows; //记录集的条数
// $result->fetch_assoc(); //逐条获取记录集的值，结果是数组。
$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}

echo json_encode($arr);//输出接口