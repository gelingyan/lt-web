<?php
	require 'config.php';

	$params = file_get_contents('php://input');
  $params = json_decode($params, TRUE);

  $sql = mysql_query("SELECT apply FROM lt_mark WHERE apply='{$params['apply']}' AND name='{$params['name']}'") or die('SQL错误！');

  $results = array();
  if (mysql_num_rows($sql)) { //商标已存在
    $results["meta"]["code"] = 100020;
    $results["meta"]["message"] = "申请/注册号已存在";
  } else {
    $query = "INSERT INTO lt_mark(date,files,title,apply,class,price)
                 VALUES (now(),'{$params['files']}','{$params['title']}','{$params['apply']}', '{$params['class']}', '{$params['price']}')";

    mysql_query($query) or die('新增失败！'.mysql_error());

    if (mysql_affected_rows()) { //上传成功
      $results["meta"]["code"] = 100000;
      $results["meta"]["message"] = "操作成功";
    } else {
      $results["meta"]["code"] = 100021;
      $results["meta"]["message"] = "商标上传失败";
    }
  }

  echo json_encode($results);
	mysql_close();

?>
