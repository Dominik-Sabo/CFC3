<?php

namespace db;
require_once __DIR__ . "./../env.php";

use db\DbConfig as Config;


class DbHandler{
    public $connection;

    public function connect(){
        $this->connection = new \mysqli(
            Config::HOST,
            Config::USER,
            Config::PASS,
            Config::DB
        );

        if ($this->connection->connect_errno) {
            echo "Connection failed {$this->connection->connect_errno}";
        }
    }

    public function disconnect(){
        $this->connection->close();
    }

    public function getRowNumber(){                         //  Returns number of rows in fighters table to                                                  
        $query = $this->select("SELECT id FROM fighters");  //  help with assigning ids when a fighter is added or deleted
        $rowNumber = mysqli_num_rows($query); 
        return $rowNumber;
    }

    public function insert($queryInput){
        $this->connect();

        $sql = $this->connection->query($queryInput);

        if (!$sql) {
            echo "Query fail";
        }

        $this->disconnect();
    }

    public function select($queryInput){
        $this->connect();

        $sql = $this->connection->query($queryInput);

        if (!$sql) {
            echo "Query fail";
        }

        $this->disconnect();

        return $sql;
    }

    public function delete($queryInput){
        $this->connect();

        $sql = $this->connection->query("DELETE FROM fighters WHERE id = $queryInput");

        if (!$sql) {
            echo "Query fail";
        }

        $this->disconnect();

        for($i = $queryInput; $i <= $this->getRowNumber() + 1; $i++){               //  When a fighter is deleted, decrements ids of all following fighters
            $this->update("UPDATE fighters SET id = '$i' WHERE id = $i+1");         //  to keep them in an orderly rising fashion in the table
        }

    }

    public function update($queryInput){
        $this->connect();

        $sql = $this->connection->query($queryInput);

        $this->disconnect();
    }
}