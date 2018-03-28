<?php
	require 'config.php';
  $params = file_get_contents('php://input');
  $params = json_decode($params, TRUE);

  foreach($params as $ids){
    $_id = (int)$ids['id'];
    // 查到当前数据的mark_id，在关联表先物理删除图片
    $query = mysql_query("SELECT * FROM lt_mark WHERE id=$_id AND isDelete=1") or die('SQL错误！');
    $row = mysql_fetch_assoc($query);
    $markID = $row['mark_id'];
    mysql_query("UPDATE lt_file SET isDelete=0 WHERE mark_id = $markID AND isDelete=1");

    // 商标物理删除
    mysql_query("UPDATE lt_mark SET isDelete=0 WHERE id = $_id AND isDelete=1");

    $results = array();
    if((mysql_affected_rows()==0) or (mysql_affected_rows==-1)){
      $results["meta"]["code"] = 100023;
      $results["meta"]["message"] = "删除失败";
      exit;
    }else{
      $results["meta"]["code"] = 100000;
      $results["meta"]["message"] = "操作成功";
    }
   }

  // 将数组转成json格式
  echo json_encode($results);
	mysql_close();
?>
