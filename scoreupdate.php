<?php
require "./dbhandler.php";

use Db\DbHandler;

$winner = $_POST["winner"];
$wins = $_POST["wins"];
$loser = $_POST["loser"];
$losses =$_POST["losses"];

$db = new DbHandler();
$db->update("UPDATE fighters SET wins='$wins' WHERE id = $winner");
$db->update("UPDATE fighters SET losses='$losses' WHERE id = $loser");
