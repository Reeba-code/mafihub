<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// Collect POST data
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');
$recaptcha_response = $_POST['g-recaptcha-response'] ?? '';

// Verify reCAPTCHA
$secret_key = 'YOUR_SECRET_KEY';
$verify_url = 'https://www.google.com/recaptcha/api/siteverify';
$response = file_get_contents($verify_url . '?secret=' . $secret_key . '&response=' . $recaptcha_response);
$response_data = json_decode($response);

if (!$response_data->success) {
    echo json_encode(['success' => false, 'message' => 'reCAPTCHA verification failed.']);
    exit;
}

// Validate inputs
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

// Email settings
$to = 'rmokwanatle@mafihu.co.za'; // change to your email
$subject = "New Contact Message from $name";
$body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
$headers = "From: $email\r\nReply-To: $email";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send message.']);
}
?>
