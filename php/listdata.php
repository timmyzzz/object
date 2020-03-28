<?php
include "conn.php";

$sql = "select * from xmgoods";

$result = $conn->query($sql); //获取数据的结果集(记录集)

//通过二维数组输出
// $result->num_rows; //记录集的条数
// $result->fetch_assoc(); //逐条获取记录集的值，结果是数组。
$arr = array();
for ($i = 0; $i < $result->num_rows; $i++) {
    $arr[$i] = $result->fetch_assoc();
}

echo json_encode($arr);//输出接口