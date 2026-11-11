<?php
require_once __DIR__ . '/config.php';

if (!file_exists(DATA_FILE)) {
    http_response_code(404);
    echo json_encode(["error" => "Data file not found."]);
    exit();
}

$data = file_get_contents(DATA_FILE);
echo $data;
?>
