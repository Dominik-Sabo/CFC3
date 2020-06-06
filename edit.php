<?php
require "./dbhandler.php";

use Db\DbHandler;

$id = $_POST['fighter_id'];
$name = $_POST['name'];
$age = $_POST['age'];
$info = $_POST['info'];
$wins = $_POST['wins'];
$losses = $_POST['losses'];

if($_POST['deleting']=="delete"){
    $db = new DbHandler();
    $db->delete($id);
}else{
    $db = new DbHandler();
    $db->update("UPDATE fighters SET name='$name' WHERE id=$id");
    $db->update("UPDATE fighters SET age='$age' WHERE id=$id");
    $db->update("UPDATE fighters SET info='$info' WHERE id=$id");
    $db->update("UPDATE fighters SET wins='$wins' WHERE id=$id");
    $db->update("UPDATE fighters SET losses='$losses' WHERE id=$id");
    
    if(!($_FILES['uploadFile']['name'] == "")){
        $saveLocation="images/";
        $saveLocationShort="images/";
        $saveLocation=$saveLocation.basename($_FILES['uploadFile']['name']);
        $saveLocationShort=$saveLocationShort.$_FILES['uploadFile']['name'];
        move_uploaded_file($_FILES['uploadFile']['tmp_name'],$saveLocation);
        $db = new DbHandler();
        $db->update("UPDATE fighters SET picture='$saveLocationShort' WHERE id=$id");
    }
}