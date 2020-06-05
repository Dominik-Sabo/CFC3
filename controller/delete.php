<?php
require __DIR__ . "./../dbhandler.php";

use Db\DbHandler;

$todoId = $_GET['id'];

$db = new DbHandler();
$db->delete("$todoId");


