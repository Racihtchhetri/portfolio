<?php
// Include the database connection file
include 'conn.php';

if(isset($_POST['submit'])){
    
    // Retrieve form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // SQL query to insert data into the database
    $sql = "INSERT INTO tbl_portfolio (name, email, message) VALUES ('$name', '$email', '$message')";

    // Execute the query
    $result = mysqli_query($conn, $sql);

    // Check if the query was successful
    if($result){
        echo 'Form submitted successfully';
    }
    else{
        echo 'Error: ' . mysqli_error($conn); // Display error message
    }
}
?>
