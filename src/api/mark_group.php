<?php
  $params = file_get_contents('php://input');
  $params = json_decode($params, TRUE);
  $path = './json/'.$params['code'].'.json';
	$data = json_decode(file_get_contents($path));

  $results = array();
  $results["data"] = $data;
  if ($results["data"]) { //获取类型群
    $results["meta"]["code"] = 100000;
    $results["meta"]["message"] = "操作成功";
  } else {
    $results["meta"]["code"] = 100030;
    $results["meta"]["message"] = "暂无数据";
  }

  // 将数组转成json格式
  echo json_encode($results);
?>
