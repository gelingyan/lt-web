<?php
	require 'config.php';
  $params = file_get_contents('php://input');
  $params = json_decode($params, TRUE);

  $query = mysql_query("SELECT * FROM lt_mark WHERE id='{$params['id']}' AND isDelete=1") or die('SQL错误！');

  $row = mysql_fetch_assoc($query);
  $markID = $row['mark_id'];
  $sql = mysql_query("SELECT * FROM lt_file WHERE mark_id='{$markID}' AND isDelete=1") or die('SQL错误！');
  while($files = mysql_fetch_assoc($sql)){
    $row['files'][] = $files;
  }
  if (!$row['files']) {
      $row['files'] =  array();
  }
  
  $results = array();
  if ($row) { //检索到文章
    $results["data"] = $row;
    $results["meta"]["code"] = 100000;
    $results["meta"]["message"] = "操作成功";
  } else {
    $results["meta"]["code"] = 100040;
    $results["meta"]["message"] = "详情获取失败";
  }

  // 将数组转成json格式
  echo json_encode($results);
	mysql_close();
?>
