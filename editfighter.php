
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zadatak 1</title>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
</head>
<body>
<h1 style="text-align: center;">EDIT FIGHTER</h1>
        <br>
        <div class="container">
                <form>

                <input name="fighter_id" id="fighter_id" type="hidden" value=<?=$_GET['id']?>>
                <input name="deleting" id="deleting" type="hidden">

                        <div class="row">
                                <div class="col-md-1">
                                        <label for="name">Name:</label>
                                </div>
                                <div class="col-md-3">
                                        <input type="text"  id="name" name="name" required>
                                </div>
                        </div>
                        <div class="row">
                                <div class="col-md-1">
                                        <label for="age">Age:</label>
                                </div>
                                <div class="col-md-3">
                                        <input type="text"  id="age" name="age" required>
                                </div>     
                        </div>
                        <div class="row">
                                <div class="col-md-1">
                                        <label for="info">Cat info:</label>
                                </div>
                                <div class="col-md-3">
                                        <input type="text"  id="info" name="info" required>
                                </div>     
                        </div>
                        <div class="row">
                                <div class="col-md-1">
                                        <label for="wins">Wins:</label>
                                </div>
                                <div class="col-md-3">
                                        <input type="number"  id="wins" name="wins" required>
                                </div>
                                <div class="col-md-1">
                                        <label for="Losses">Losses:</label>
                                </div>
                                <div class="col-md-3">
                                        <input type="number"  id="losses" name="losses" required>
                                </div>       
                        </div>
                        <br>
                        <div class="row">
                                <div class="col-md-2">
                                        <label for="uploadFile">Cat Image:</label>
                                </div>
                                <div class="col-md-2">
                                        <p id="oldPicture">text</p>
                                </div>
                                
                                <div class="col-md-3">
                                        <input name="uploadFile" type="file">         
                                </div>  
                        </div>
                        <br><br><br>
                        <div class="row">
                                <div class="col-md-1">
                                        <input type="button"  id="back" name="back" value="Back" onclick="location.href='index.php'">  
                                </div>
                                <div class="col-md-7" style="text-align: center;">
                                        <input type="submit"  id="submit" name="submit" value="Submit">
                                        <input type="submit"  id="delete" name="delete" value="Delete">
                                </div>
                        </div>
                </form>
        </div>

        <?php
        require "./controller/DbHandler.php";
        use Db\DbHandler;
        $db=new DbHandler();

        $id = $_GET['id'];
        $req = $db->select("SELECT * from fighters WHERE id=$id");
        $row = $req->fetch_assoc();

        $name = $row["name"];
        $age = $row["age"];
        $info = $row["info"];
        $wins = $row["wins"];
        $losses = $row["losses"];
        $picture = $row["picture"];

        echo "
            <script>
                document.getElementById('name').value = '$name';
                document.getElementById('age').value  = '$age';
                document.getElementById('info').value  = '$info';
                document.getElementById('wins').value  = '$wins';
                document.getElementById('losses').value  = '$losses';
                document.getElementById('oldPicture').textContent  = '$picture';
            </script>" 

?>
<script src="./src/app_edit.js"></script>
</body>
</html>
