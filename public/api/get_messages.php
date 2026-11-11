<?php
require_once __DIR__ . '/config.php';

// Enforce admin login
requireAdmin();

if (!file_exists(MESSAGES_FILE)) {
    echo json_encode([]);
    exit();
}

$messages = file_get_contents(MESSAGES_FILE);
echo $messages;
?>
