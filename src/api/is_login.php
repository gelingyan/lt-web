<?php
	require 'config.php';
  $params = file_get_contents('php://input');
  $params = json_decode($params, TRUE);

	$_pass = sha1($params['password']);

	if ($params['userType'] === '01') {
	  $query = mysql_query("SELECT user,userID,userType,email FROM lt_user WHERE user='{$params['user']}'AND pass='{$_pass}'AND userType='01'") or die('SQL错误！');
	} else {
	  $query = mysql_query("SELECT user,userID,userType,email FROM lt_user WHERE user='{$params['user']}'AND pass='{$_pass}'") or die('SQL错误！');
	}

  $results = array();
  $row = mysql_fetch_assoc($query);

  if ($row) { //用户名和密码正确
    $results["data"] = $row;
    $results["meta"]["code"] = 100000;
    $results["meta"]["message"] = "操作成功";
  } else {
    $results["meta"]["code"] = 100050;
    $results["meta"]["message"] = "用户名或密码不正确";
  }

  // 将数组转成json格式
  echo json_encode($results);
	mysql_close();
?>
