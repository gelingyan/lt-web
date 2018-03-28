<?php
	require 'config.php';
  $params = file_get_contents('php://input');
  $params = json_decode($params, TRUE);

  // 关联表的图片物理删除
  $markID = $params['mark_id'];
  $exec="UPDATE lt_file SET isDelete=0 WHERE mark_id = $markID AND isDelete=1";
  $result=mysql_query($exec);
  // 重新新增关联图片
  for ($x=0; $x<sizeof($params['files']); $x++) {
    $file = "INSERT INTO lt_file(data,size,name,type,mark_id,isDelete)
            VALUES ('{$params['files'][$x]['data']}','{$params['files'][$x]['size']}','{$params['files'][$x]['name']}','{$params['files'][$x]['type']}','{$markID}',1)";
    mysql_query($file) or die('新增失败！'.mysql_error());
  }

  $query = mysql_query("UPDATE lt_mark SET date=now(),title='{$params['title']}',apply='{$params['apply']}',classify='{$params['classify']}',price='{$params['price']}',similarGroup='{$params['similarGroup']}',explicate='{$params['explicate']}',timeLimit='{$params['timeLimit']}',hot='{$params['hot']}' WHERE id = '{$params['id']}' AND mark_id='{$markID}'") or die('SQL错误！');
  
  $results = array();
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
