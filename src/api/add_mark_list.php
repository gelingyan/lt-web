<?php
    require 'config.php';

    $paramsList = file_get_contents('php://input');
    $paramsList = json_decode($paramsList, TRUE);

    $results = array();
    $num = 0;
    for ($i=0; $i<sizeof($paramsList); $i++) {
        $params = $paramsList[$i];
        $_markID = time() . "-" . $i; //保证唯一性

        for ($x=0; $x<sizeof($params['files']); $x++) {
            $file = "INSERT INTO lt_file(data,size,name,type,mark_id,isDelete)
                    VALUES ('{$params['files'][$x]['data']}','{$params['files'][$x]['size']}','{$params['files'][$x]['name']}','{$params['files'][$x]['type']}','{$_markID}',1)";
            mysql_query($file) or die('新增失败！'.mysql_error());
        }

        $query = "INSERT INTO lt_mark(date,mark_id,title,apply,classify,price,similarGroup,explicate,timeLimit,hot,isDelete)
                VALUES (now(),'{$_markID}','{$params['title']}','{$params['apply']}','{$params['classify']}','{$params['price']}','{$params['similarGroup']}','{$params['explicate']}','{$params['timeLimit']}','{$params['hot']}',1)";

        mysql_query($query) or die('新增失败！'.mysql_error());

        $row = array();
        $row['index'] = $i;
        $row['title'] = $params['title'];
        $row['apply'] = $params['apply'];

        if (!mysql_affected_rows()) {
            $num += 1;
            $row['msg'] = 'error';
        } else {
            $row['msg'] = 'success';
        }

        $results["data"][] = $row;
    }
  
    if ($num == 0) { //上传成功
        $results["meta"]["code"] = 100000;
        $results["meta"]["message"] = "操作成功";
    } else {
        $results["meta"]["code"] = 100022;
        $results["meta"]["message"] = "商标批量上传失败";
    }

    echo json_encode($results);
	mysql_close();

?>
