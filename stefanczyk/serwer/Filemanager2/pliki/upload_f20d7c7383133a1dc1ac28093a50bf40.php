<?php
session_start();
function checkSit($stmt, int $row, int $sit, int $movie_id) {
    $stmt->bind_param('iii', $movie_id, $row, $sit);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0)
        return false;
    else
        return true;
}

function createTable(int $movie_id) {
    $conn = @new mysqli('localhost', 'root', '', 'ab_kino');
    if ($conn->connect_errno) {
        die("Błąd połaczenia: " . $conn->connect_error);
    } 
    $stmt = $conn->prepare("SELECT rzad, miejsce FROM rezerwacje WHERE id_filmu = ? AND rzad = ? AND miejsce = ?");

    echo "<form action='rezerwuj.php' method='post' class='form-register'>";
    echo "<table class='register'>";
    echo "<tr><td></td><th colspan='20' class='title'>Wybierz miejsca</th></tr>";
    echo "<tr><td></td><td colspan='20' class='ekran'>Ekran</td></tr><tr><td colspan='21'></td></tr>";
    for ($i = 1; $i <= 15; $i++) {
        echo "<tr>";
        echo "<th>$i</th>";
        for ($j = 1; $j <= 20; $j++) {
        echo "<td>";
        if (checkSit($stmt, $i, $j, $movie_id)) {
            echo "<input type='checkbox' id='input-$i-$j' name='input-$i-$j'><label for='input-$i-$j'>$j</label>";
        } else {
            echo "<input type='checkbox' id='input-$i-$j'  name='input-$i-$j' disabled><label for='input-$i-$j'>$j</label>";
        }
        echo "</td>";
        }
        echo "</tr>";
    }
    echo "</table>";
    // echo "<input type='text' name='name' placeholder='Podaj imię'>";
    // echo "<input type='text' name='phone' placeholder='Podaj telefon'>";
    echo "<input type='hidden' name='movie' value='$movie_id'>";
    if (isset($_SESSION["login"])) {
        $user_id = $_SESSION["login"]["id"];
        echo "<input type='hidden' name='user_id' value='$user_id'>";
        echo "<button type='submit'>Rezerwuj</button>";
    }
    echo "</form>";

    $stmt->close();
    $conn->close();
}

?>
<!DOCTYPE html>
<HTML lang="pl-PL">
<HEAD>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<TITLE>Rezerwacja</TITLE>
	<link rel="stylesheet" href="./css/style.css">
</HEAD>
<BODY>
    <?php
    if (!isset($_POST['movie'])) {
        header('Location: glowna.php');
        exit();
    } else {
        // echo $_POST['movie'];
        createTable($_POST['movie']);
    }?>
</BODY>
</HTML> 