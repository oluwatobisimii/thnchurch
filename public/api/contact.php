<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed. Use POST."]);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$phone = isset($input['phone']) ? trim($input['phone']) : '';
$subject = isset($input['subject']) ? trim($input['subject']) : 'New Contact Form Submission';
$message = isset($input['message']) ? trim($input['message']) : '';

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["error" => "Name, Email, and Message are required fields."]);
    exit();
}

// 1. Log the message in messages.json
$new_message = [
    "id" => "msg_" . uniqid() . "_" . time(),
    "name" => $name,
    "email" => $email,
    "phone" => $phone,
    "subject" => $subject,
    "message" => $message,
    "timestamp" => date("Y-m-d H:i:s")
];

$messages = [];
if (file_exists(MESSAGES_FILE)) {
    $existing = file_get_contents(MESSAGES_FILE);
    $messages = json_decode($existing, true);
    if (!is_array($messages)) {
        $messages = [];
    }
}

array_unshift($messages, $new_message); // Newest messages first
file_put_contents(MESSAGES_FILE, json_encode($messages, JSON_PRETTY_PRINT), LOCK_EX);

// 2. Fetch official email details to send notification
$email_sent = false;
$to = 'info@havenation.org'; // Default backup

if (file_exists(DATA_FILE)) {
    $data = json_decode(file_get_contents(DATA_FILE), true);
    if (isset($data['churchInfo']['emails']['official'])) {
        $to = $data['churchInfo']['emails']['official'];
    }
    // Also send CC to recovery if available
    $recovery_email = isset($data['churchInfo']['emails']['recovery']) ? $data['churchInfo']['emails']['recovery'] : '';
}

// Construct Email
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: THN Church Form <noreply@" . $_SERVER['HTTP_HOST'] . ">\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
if (!empty($recovery_email)) {
    $headers .= "Cc: $recovery_email\r\n";
}

$email_subject = "[THN Contact] " . $subject;
$email_body = "
<html>
<head>
  <title>New Contact Form Message</title>
</head>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
  <div style='max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;'>
    <h2 style='color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;'>New Contact Inquiry</h2>
    <p><strong>Name:</strong> {$name}</p>
    <p><strong>Email:</strong> {$email}</p>
    <p><strong>Phone:</strong> " . ($phone ? $phone : 'Not provided') . "</p>
    <p><strong>Subject:</strong> {$subject}</p>
    <p style='background: #f9f9f9; padding: 15px; border-left: 4px solid #6366f1; white-space: pre-wrap;'><strong>Message:</strong><br>{$message}</p>
    <hr style='border: none; border-top: 1px solid #ddd; margin: 20px 0;'>
    <p style='font-size: 12px; color: #777;'>This email was sent dynamically from the THN Church website contact form.</p>
  </div>
</body>
</html>
";

// Use mail() - common in cPanel. Mute errors just in case mail isn't configured in dev env
$email_sent = @mail($to, $email_subject, $email_body, $headers);

echo json_encode([
    "success" => true,
    "message" => "Message sent successfully.",
    "email_sent" => $email_sent
]);
?>
