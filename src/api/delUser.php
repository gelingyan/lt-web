<?php
	require 'config.php';
  $params = file_get_contents('php://input');
  $params = json_decode($params, TRUE);

  foreach($params as $ids){
    $_id = (int)$ids['id'];
    $exec="delete from lt_user where id=$_id";
    $result=mysql_query($exec);
    if((mysql_affected_rows()==0) or (mysql_affected_rows==-1)){
      $results["meta"]["code"] = 100032;
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
