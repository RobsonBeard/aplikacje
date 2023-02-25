<?php
function getSeats() {
    $set_checkbox = [];

    for ($i = 0; $i < 15; $i++) {
        for ($j = 0; $j < 20; $j++) {
            $checkbox_name = 'input-'.$i.'-'.$j;
            if (isset($_POST[$checkbox_name])) {
                $checkbox_id[0] = $i;
                $checkbox_id[1] = $j;
                array_push($set_checkbox, $checkbox_id);
            }
        }
    }
    
    return $set_checkbox;
}

function sendToDatabase($checkbox_arr, $movie, $user_id) {
    $conn = @new mysqli('localhost', 'root', '', 'ab_kino');
    if ($conn->connect_errno) {
        die("Błąd połaczenia: " . $conn->connect_error);
        $conn->close();
    } else {
        foreach ($checkbox_arr as $checkbox) {
            $pre_stmt = $conn->prepare("SELECT id FROM rezerwacje WHERE id_filmu = ? AND rzad = ? AND miejsce = ?");
            $pre_stmt->bind_param('iiii', $movie, $checkbox[0], $checkbox[1]);
            $pre_stmt->execute();
            $result = $pre_stmt->get_result();
            $pre_stmt->close();

            if ($result->num_rows <= 0) {
                // $pre_stmt->prepare("SELECT id FROM loginy WHERE id = ?");
                // $pre_stmt->bind_param('s', $name);
                // $pre_stmt->execute();
                // $result = $pre_stmt->get_result();
                // if ($result->num_rows > 0) {
                    // $user_id = $result->fetch_assoc();
                    $stmt = $conn->prepare("INSERT INTO rezerwacje (id_filmu, id_uzytkownika, rzad, miejsce) VALUES (?, ?, ?, ?)");
                    $stmt->bind_param('iiii', $movie, $user_id, $checkbox[0], $checkbox[1]);
                    $stmt->execute();
                // }
                
            }
        }
        if (isset($stmt)) {
            $stmt->close();
        }
        $conn->close();
        header('Location: powodzenie.php');
        exit();
    }
}

$set_checkbox = getSeats();

if (empty($set_checkbox)) {
    echo "Error: no checkbox are set";
    header('Location: rezerwacja.php');
    exit();
} else if (!isset($_POST['movie']) || !isset($_POST['user_id'])) {
    echo "Error: inputs are not set";
    header('Location: rezerwacja.php');
    exit();
} else {
    sendToDatabase($set_checkbox, $_POST['movie'], $_POST['user_id']);
}
