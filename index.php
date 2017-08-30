<?php
    $dir='main';
    $filename='index';
    //判断路径是否存在
    if(array_key_exists('PATH_INFO', $_SERVER)){
        $path=$_SERVER['PATH_INFO'];
        $str=substr($path, 1);
        $arr=explode('/', $str);
        if(count($arr)==2){
            $dir=$arr[0];
            $filename=$arr[1];
        }else{
            $filename='login';
        }
    }
    //嵌入一个子页面
    include('./views/'.$dir.'/'.$filename.'.html')

?>