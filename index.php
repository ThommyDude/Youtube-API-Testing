<?php
    //replace with either a $key = "api key" or a functioning path to the file... XAMPP is being a bit "unfriendly" about it!
    include_once "../../htdocs/youtube-api-test/incl/apiKey.php";
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="youtube-api-test/js/script.js"></script> <!-- Same here, for some reason XAMPP won't allow me to just do ./js/script.js -->
        <title>Youtube Reader</title>
    </head>
    <body>
        <h3>Read the code</h3>
        <form method="post">
            <input type="text" placeholder="Enter video ID" name="vidID">
            <input type="submit" value="Get that data!">
        </form>
        <?php
            if(isset($_POST["vidID"]) && !empty($_POST["vidID"]))
            {
                echo '<script type="text/javascript">getVid("' . $_POST["vidID"] . '", "' . $key . '");</script>';
            }
        ?>
        <div id="infoHolder">
        </div>
    </body>
</html>