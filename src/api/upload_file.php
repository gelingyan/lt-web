<?php
//1、判断是不是有效文件
if(!is_uploaded_file($_FILES['upfile']['tmp_name'])){  
    echo "请上传一个有效文件";  
    exit(0);  
}     
//2、判断文件格式  
$file=$_FILES['upfile'];
$isoktype=array("image/jpeg","image/pjpeg","image/gif");  
if(!in_array($file['type'],$isoktype)){  
    echo "请上传一个格式正确的文件";  
    exit(0);      
}     
//3、判断图片大小  
$isoksize=102400;  
if($isoksize<$file["size"]){  
    echo "文件过大";  
    exit(0);          
}  
  
////图片重命名  
$exe=substr($file['name'],stripos($file['name'], '.')+1);  
$newname=time();  
$newname.=rand()*1000;  
//echo $newname.$exe;  
  
//执行保存操作  
$savadir='../upload/';  
move_uploaded_file($file['tmp_name'],$savadir.$newname);//第一个参数是待上传文件的地址，第二个是上传后文件的地址  
$c=$savadir.$newname;  
echo "上传成功"; 

?>

