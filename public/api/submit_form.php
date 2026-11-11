<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed. Use POST."]);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
$type = isset($input['form_type']) ? trim($input['form_type']) : '';

if (empty($type)) {
    http_response_code(400);
    echo json_encode(["error" => "form_type is required."]);
    exit();
}

$submission = [
    "id" => "sub_" . uniqid() . "_" . time(),
    "timestamp" => date("Y-m-d H:i:s"),
    "data" => $input
];

$log_file = '';
if ($type === 'plan_visit') {
    $log_file = __DIR__ . '/visit_plans.json';
} elseif ($type === 'join_ministry') {
    $log_file = __DIR__ . '/ministry_joins.json';
} elseif ($type === 'academy_register') {
    $log_file = __DIR__ . '/academy_registers.json';
} elseif ($type === 'submit_testimony') {
    $log_file = __DIR__ . '/testimonies_submitted.json';
} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid form type: $type"]);
    exit();
}

$entries = [];
if (file_exists($log_file)) {
    $existing = file_get_contents($log_file);
    $entries = json_decode($existing, true);
    if (!is_array($entries)) {
        $entries = [];
    }
}

array_unshift($entries, $submission);
file_put_contents($log_file, json_encode($entries, JSON_PRETTY_PRINT), LOCK_EX);

// Optionally trigger an email to notify leadership of the signup
$to = 'info@havenation.org';
if (file_exists(DATA_FILE)) {
    $data = json_decode(file_get_contents(DATA_FILE), true);
    if (isset($data['churchInfo']['emails']['official'])) {
        $to = $data['churchInfo']['emails']['official'];
    }
}

$subject = "[THN Portal] New " . str_replace('_', ' ', ucwords($type, '_')) . " Submission";
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: THN Church Form <noreply@" . $_SERVER['HTTP_HOST'] . ">\r\n";

$body_details = "";
foreach($input as $key => $val) {
    if ($key === 'form_type') continue;
    $label = str_replace('_', ' ', ucwords($key, '_'));
    $body_details .= "<p><strong>{$label}:</strong> {$val}</p>";
}

$email_body = "
<html>
<head><title>{$subject}</title></head>
<body style='font-family: Arial, sans-serif; color: #333;'>
  <div style='max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;'>
    <h2 style='color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;'>" . str_replace('_', ' ', ucwords($type, '_')) . "</h2>
    {$body_details}
    <hr style='border: none; border-top: 1px solid #ddd; margin: 20px 0;'>
    <p style='font-size: 11px; color: #777;'>Sent from THN Church movement portal.</p>
  </div>
</body>
</html>
";

@mail($to, $subject, $email_body, $headers);

echo json_encode([
    "success" => true,
    "message" => "Submission processed successfully."
]);
?>
