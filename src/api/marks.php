<?php
	require 'config.php';
  $params = file_get_contents('php://input');
  $params = json_decode($params, TRUE);
  $currentPage = $params['currentPage'];
  $pageSize = $params['pageSize'];
  $start = ($currentPage - 1)*$pageSize;

  $sql=mysql_query("select count(*) from lt_mark");
  $total = mysql_fetch_row($sql);

	$query = mysql_query("SELECT * FROM lt_mark order by date DESC limit $start, $pageSize") or die('SQL错误！');

  $results = array();
  while($row = mysql_fetch_assoc($query)){
    $markID = $row['files'];
    $sql = mysql_query("SELECT * FROM lt_file WHERE mark_id='{$markID}'") or die('SQL错误！');
    while($files = mysql_fetch_assoc($sql)){
       $row['imgs'][] = $files;
    }
    $results["data"]["list"][] = $row;
  }
  if ($results["data"]) { //商标列表
    $results["data"]["currentPage"] = $currentPage;
    $results["data"]["pageSize"] = $pageSize;
    $results["data"]["total"] = (int)$total[0];
    $results["meta"]["code"] = 100000;
    $results["meta"]["message"] = "操作成功";
  } else {
    $results["meta"]["code"] = 100030;
    $results["meta"]["message"] = "暂无数据";
  }

  // 将数组转成json格式
  echo json_encode($results);
	mysql_close();
?>