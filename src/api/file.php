<?php
	require 'config.php';

	$params = file_get_contents('php://input');
  $params = json_decode($params, TRUE);

  $results = array();

	$query = "INSERT INTO file(name,data,type,size) VALUES ('{$params['name']}', '{$params['data']}', '{$params['type']}', '{$params['size']}')";

	mysql_query($query) or die('新增失败！'.mysql_error());

	echo mysql_affected_rows();

	mysql_close();

?>
