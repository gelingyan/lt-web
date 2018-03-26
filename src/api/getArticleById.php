<?php
	require 'config.php';
  $params = file_get_contents('php://input');
  $params = json_decode($params, TRUE);

	$query = mysql_query("SELECT * FROM lt_article WHERE keyword='{$params['keyword']}'") or die('SQL错误！');

  $results = array();
  $row = mysql_fetch_assoc($query);

  if ($row) { //检索到文章
    $results["data"] = $row;
    $results["meta"]["code"] = 100000;
    $results["meta"]["message"] = "操作成功";
  } else {
    $results["meta"]["code"] = 100040;
    $results["meta"]["message"] = "文档信息获取失败";
  }

  // 将数组转成json格式
  echo json_encode($results);
	mysql_close();
?>
