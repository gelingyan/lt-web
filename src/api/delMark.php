<?php
	require 'config.php';
  $params = file_get_contents('php://input');
  $params = json_decode($params, TRUE);

  foreach($params as $ids){
    $_id = (int)$ids['id'];
    $exec="UPDATE lt_mark SET isDelete=0 WHERE id = $_id AND isDelete=1";
    $result=mysql_query($exec);
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
