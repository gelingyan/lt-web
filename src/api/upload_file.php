<?php
    header('Content-Type:application/json; charset=UTF-8');

    //根据年月日分计算并创建目录
    function mk_dir(){
        $dir = date('Y/m', time());
        if(is_dir('../upfiles/' .$dir)){
            return $dir;
        }else{
            mkdir('../upfiles/'.$dir,0777,true);
            return $dir;
        }
    }
    //获取文件后缀
    function getExt($file) {
        $tmp = explode('.',$file);
        return end($tmp);
    }
    //随机生成移动后的文件名
    function fileName($file) {
        $str = 'abcdefghijkmnpqrstwxyz23456789';
        return date("Y").date("m").date("d").date("H").date("i").date("s").substr(str_shuffle($str),0,6);
    }

    $results = array();
    //判断错误代码，=0则上传成功，!=0则上传失败
    if ($_FILES['upfile']['error'] !=0){
        $results["meta"]["code"] = 100024;
        $results["meta"]["message"] = "上传文件失败";
    } else {
        //处理上传过程
        $upfile = $_FILES['upfile'];

        //拼接文件路径
        $target_name = '../upfiles/' .mk_dir().'/'.fileName($upfile['name']). '.' .getExt($upfile['name']);

        //移动
        if(move_uploaded_file($upfile['tmp_name'],$target_name)) {
            $results["data"]=$upfile;
            $results["data"]["data"]=$target_name.ltrim($str, ".");
            $results["meta"]["code"] = 100000;
            $results["meta"]["message"] = "操作成功";
        } else{
            $results["meta"]["code"] = 100024;
            $results["meta"]["message"] = "创建文件夹或保存文件失败";
        }
    }
 
    echo json_encode($results);
?>