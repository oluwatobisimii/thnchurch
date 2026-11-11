<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed. Use POST."]);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
$password = isset($input['password']) ? trim($input['password']) : '';

if (empty($password)) {
    http_response_code(400);
    echo json_encode(["error" => "Password is required."]);
    exit();
}

if (!file_exists(AUTH_FILE)) {
    http_response_code(500);
    echo json_encode(["error" => "Admin password has not been set up on this server yet."]);
    exit();
}

$auth_data = json_decode(file_get_contents(AUTH_FILE), true);
$hash = isset($auth_data['password_hash']) ? $auth_data['password_hash'] : '';

if (password_verify($password, $hash)) {
    session_regenerate_id(true);
    $_SESSION['admin_logged_in'] = true;
    $_SESSION['login_time'] = time();
    echo json_encode([
        "success" => true,
        "message" => "Authenticated successfully."
    ]);
} else {
    http_response_code(401);
    echo json_encode(["error" => "Invalid password."]);
}
?>
