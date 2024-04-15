<?php
$server = 'sql211.byetcluster.com';
$db = 'if0_36270576_tbl_portfoloio';
$user_name = 'if0_36270576';
$password = '2qKv6NkMp3TJy';

$conn = new mysqli($server, $user_name, $password, $db);

if($conn->connect_error){
    die("Connection failed:" . $conn->connect_error);
}

?>