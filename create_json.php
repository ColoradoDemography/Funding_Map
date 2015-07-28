<?php

$ajax_object=$_POST['jsobj']; // Object, which You have passed using AJAX


$filename="data/sumtotal.json";

  
  $fp = fopen($filename, 'w');
  fwrite($fp, "sumtotal=".$ajax_object);
  fclose($fp);

  
  
?>


