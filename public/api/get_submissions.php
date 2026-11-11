<?php
require_once __DIR__ . '/config.php';

// Enforce admin check
requireAdmin();

$visits_file = __DIR__ . '/visit_plans.json';
$ministry_file = __DIR__ . '/ministry_joins.json';
$academy_file = __DIR__ . '/academy_registers.json';
$testimonies_file = __DIR__ . '/testimonies_submitted.json';

$response = [
    "visits" => file_exists($visits_file) ? json_decode(file_get_contents($visits_file), true) : [],
    "ministry" => file_exists($ministry_file) ? json_decode(file_get_contents($ministry_file), true) : [],
    "academy" => file_exists($academy_file) ? json_decode(file_get_contents($academy_file), true) : [],
    "testimonies" => file_exists($testimonies_file) ? json_decode(file_get_contents($testimonies_file), true) : []
];

// Ensure all are arrays
foreach ($response as $key => $val) {
    if (!is_array($val)) {
        $response[$key] = [];
    }
}

echo json_encode($response);
?>
