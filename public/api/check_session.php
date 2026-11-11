<?php
require_once __DIR__ . '/config.php';

if (isAdmin()) {
    echo json_encode([
        "authenticated" => true,
        "message" => "Session active."
    ]);
} else {
    echo json_encode([
        "authenticated" => false,
        "message" => "Session inactive."
    ]);
}
?>
