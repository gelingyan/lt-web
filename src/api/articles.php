<?php
  require 'config.php';

  $query = mysql_query("SELECT id,title,keyword FROM lt_article") or die('SQL错误！');
  $results = array();
  while($row = mysql_fetch_assoc($query)){
    $results["data"]["list"][] = $row;
  }
  if ($results["data"]) { //检索到文章
    $results["meta"]["code"] = 100000;
    $results["meta"]["message"] = "操作成功";
  } else {
    $results["meta"]["code"] = 100030;
    $results["meta"]["message"] = "暂无数据";
    $results["data"]["list"] = array();
  }

  // 将数组转成json格式
  echo json_encode($results);
	mysql_close();
?>
