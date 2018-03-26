<?php
	require 'config.php';

	$params = file_get_contents('php://input');
  $params = json_decode($params, TRUE);

  $_userID = time();
  $_userType = '10';
  $sql = mysql_query("SELECT user FROM lt_user WHERE user='{$params['user']}'") or die('SQL错误！');

  $results = array();
  if (mysql_num_rows($sql)) { //用户已存在
    $results["meta"]["code"] = 100090;
    $results["meta"]["message"] = "用户已存在";
  } else {
    $query = "INSERT INTO lt_user(date,user,phone,pass,userID,userType,email,note,isDelete)
                 VALUES (now(),'{$params['user']}','{$params['phone']}', sha1('{$params['password']}'), '{$_userID}', '{$_userType}', '{$params['email']}', '{$params['note']}', 1)";

    mysql_query($query) or die('新增失败！'.mysql_error());

    if (mysql_affected_rows()) { //注册成功
      $results["data"]["user"] = $params['user'];
      $results["data"]["userID"] = $_userID;
      $results["data"]["userType"] = $_userType;
      $results["data"]["email"] = $params['email'];
      $results["meta"]["code"] = 100000;
      $results["meta"]["message"] = "操作成功";
    } else {
      $results["meta"]["code"] = 100091;
      $results["meta"]["message"] = "注册失败";
    }
  }

  echo json_encode($results);
	mysql_close();

?>
