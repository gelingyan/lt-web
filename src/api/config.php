<?php
	header('Content-Type:application/json; charset=UTF-8');

	define('DB_HOST','rm-bp1976e938fq4ae2pjo.mysql.rds.aliyuncs.com');
	define('DB_USER','root');
	define('DB_PWD','Luxiao987');
	define('DB_NAME','lt');


	$conn = @mysql_connect(DB_HOST, DB_USER, DB_PWD) or die('数据库连接失败：'.mysql_error());

	@mysql_select_db(DB_NAME) or die('数据库错误：'.mysql_error());

	@mysql_query('SET NAMES UTF8') or die('字符集错误：'.mysql_error());

?>
