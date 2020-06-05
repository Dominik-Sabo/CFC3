<?php
require __DIR__ . "./../dbhandler.php";

use Db\DbHandler;

$name = $_POST['name'];
$age = $_POST['age'];
$catInfo = $_POST['catInfo'];
$wins = $_POST['wins'];
$losses = $_POST['losses'];

$saveLocation="../../images/";
$saveLocationShort="images/";

$saveLocation=$saveLocation.basename($_FILES['uploadFile']['name']);
$saveLocationShort=$saveLocationShort.$_FILES['uploadFile']['name'];
move_uploaded_file($_FILES['uploadFile']['tmp_name'],$saveLocation);

$db = new DbHandler();
$id = $db->getRowNumber() + 1; //   The id of the newly added member has to be the same as the exact number of rows when it is added
$db->insert("INSERT INTO fighters(id,name,age,info,wins,losses,picture) VALUES ($id, '$name',$age,'$catInfo',$wins,$losses,'$saveLocationShort')");
