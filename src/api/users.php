<?php
	require 'config.php';
  $params = file_get_contents('php://input');
  $params = json_decode($params, TRUE);
  $currentPage = $params['currentPage'];
  $pageSize = $params['pageSize'];
  $start = ($currentPage - 1)*$pageSize;

  $sql=mysql_query("select count(*) from lt_user WHERE isDelete=1");
  $total = mysql_fetch_row($sql);

	$query = mysql_query("SELECT id,date,user,phone,email,note,isDelete FROM lt_user WHERE isDelete=1 order by date DESC limit $start, $pageSize") or die('SQL错误！');

  $results = array();
  while($row = mysql_fetch_assoc($query)){
    $results["data"]["list"][] = $row;
  }
  if ($results["data"]) { //用户列表
    $results["data"]["currentPage"] = $currentPage;
    $results["data"]["pageSize"] = $pageSize;
    $results["data"]["total"] = (int)$total[0];
    $results["meta"]["code"] = 100000;
    $results["meta"]["message"] = "操作成功";
  } else {
    $results["meta"]["code"] = 100030;
    $results["meta"]["message"] = "暂无数据";
    $results["data"]["list"] = array();
    $results["data"]["currentPage"] = 1;
    $results["data"]["pageSize"] = 0;
    $results["data"]["total"] = 0;
  }

  // 将数组转成json格式
  echo json_encode($results);
	mysql_close();
?>
