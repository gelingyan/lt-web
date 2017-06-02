<?php
	header('Content-Type:application/json; charset=UTF-8');

	define('DB_HOST','bdm253137229.my3w.com');
	define('DB_USER','bdm253137229');
	define('DB_PWD','gly123456');
	define('DB_NAME','bdm253137229_db');


	$conn = @mysql_connect(DB_HOST, DB_USER, DB_PWD) or die('数据库连接失败：'.mysql_error());

	@mysql_select_db(DB_NAME) or die('数据库错误：'.mysql_error());

	@mysql_query('SET NAMES UTF8') or die('字符集错误：'.mysql_error());

?>
