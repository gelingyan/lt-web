<?php
	require 'config.php';
  $params = file_get_contents('php://input');
  $params = json_decode($params, TRUE);

	$query = mysql_query("UPDATE lt_article SET title='{$params['title']}',content='{$params['content']}',ps='{$params['ps']}' WHERE id = '{$params['id']}'") or die('SQL错误！');

  if ($query) {
    $results["meta"]["code"] = 100000;
    $results["meta"]["message"] = "操作成功";
  } else {
    $results["meta"]["code"] = 100031;
    $results["meta"]["message"] = "修改失败";
  }

  // 将数组转成json格式
  echo json_encode($results);
	mysql_close();
?>
