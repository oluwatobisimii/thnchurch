<?php
require_once __DIR__ . '/config.php';

// Enforce admin login
requireAdmin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed. Use POST."]);
    exit();
}

$raw_input = file_get_contents('php://input');
$input = json_decode($raw_input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON payload."]);
    exit();
}

// Check for password update request
if (isset($input['change_password']) && $input['change_password'] === true) {
    $current_pass = isset($input['current_password']) ? $input['current_password'] : '';
    $new_pass = isset($input['new_password']) ? $input['new_password'] : '';

    if (empty($current_pass) || empty($new_pass)) {
        http_response_code(400);
        echo json_encode(["error" => "Current and new passwords are required."]);
        exit();
    }

    $auth_data = json_decode(file_get_contents(AUTH_FILE), true);
    $current_hash = isset($auth_data['password_hash']) ? $auth_data['password_hash'] : '';

    if (!password_verify($current_pass, $current_hash)) {
        http_response_code(400);
        echo json_encode(["error" => "Incorrect current password."]);
        exit();
    }

    // Save the new password hash
    $new_hash = password_hash($new_pass, PASSWORD_DEFAULT);
    $auth_data['password_hash'] = $new_hash;
    
    if (file_put_contents(AUTH_FILE, json_encode($auth_data, JSON_PRETTY_PRINT))) {
        echo json_encode(["success" => true, "message" => "Password updated successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to write to authentication storage."]);
    }
    exit();
}

// Regular site data saving
// Validate the structure slightly to prevent empty writes
if (!isset($input['churchInfo']) || !isset($input['programs'])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid data structure. Missing key parameters."]);
    exit();
}

// Backup current data file before saving
if (file_exists(DATA_FILE)) {
    copy(DATA_FILE, DATA_FILE . '.bak');
}

$json_string = json_encode($input, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

if (file_put_contents(DATA_FILE, $json_string)) {
    echo json_encode([
        "success" => true,
        "message" => "Site data saved successfully."
    ]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to write to data storage."]);
}
?>
