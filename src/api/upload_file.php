<?php
	require 'config.php';

	$params = file_get_contents('php://input');
  $params = json_decode($params, TRUE);
  $results = array();

  $file = $params['file'];//得到传输的数据
  $name = $file['name'];
  $type = strtolower(substr($name,strrpos($name,'.')+1));
  $allow_type = array('jpg','jpeg','gif','png'); //定义允许上传的类型
  if(!in_array($type, $allow_type)){
    $results["meta"]["code"] = 100024;
    $results["meta"]["message"] = "文件类型不符合";
  } else {
    if($file["size"] > 50000){
      $results["meta"]["code"] = 100022;
      $results["meta"]["message"] = "文件必须小于50kb";
    } else {
      $base64_image_content = $file['imgBase64'];
      if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)){
        $results["img"]["1"] = $result;
        $type = $result[2];
        $new_file = "upload/active/img/".date('Ymd',time())."/";
        if(!file_exists($new_file)) {
          //检查是否有该文件夹，如果没有就创建，并给予最高权限
          mkdir($new_file, 0700);
        }
        $new_file = $new_file.time().".{$type}";
        if (file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64_image_content)))){
          $results["data"]["file"] = $file;
          $results["meta"]["code"] = 100000;
          $results["meta"]["message"] = "操作成功";
        }else{
          $results["meta"]["code"] = 100026;
          $results["meta"]["message"] = "文件上传失败";
        }
      } else {
        $results["img"]["2"] = $result;
      }
    }
  }

  echo json_encode($results);
	mysql_close();

?>
