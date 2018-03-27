<?php
  $params = file_get_contents('php://input');
  $params = json_decode($params, TRUE);

  $results = array();
  $base64_image_content =  $params[0]['data'];
  //匹配出图片的格式
  if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)){
    $type = $result[2];
    $new_file = "/lt/static/img/";

    if (!file_exists($new_file)){
      //检查是否有该文件夹，如果没有就上传失败
      $results["meta"]["code"] = 100001;
      $results["meta"]["message"] = "没有文件夹";
    } else {
      $new_file = $new_file.time().".{$type}";

      if (file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64_image_content)))){
        $results["errno"] =  0;
        $results["data"] =  $new_file;
        $results["meta"]["code"] = 100000;
        $results["meta"]["message"] = "操作成功";
      }else{
        $results["errno"] =  1;
      }
    }
  }

  // 将数组转成json格式
  echo json_encode($results);
?>
