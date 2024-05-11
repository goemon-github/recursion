<?php
header('Content-Type: application/json');

$filename = 'request_headers.json';
header(sprintf('Content-Disposition: attachment; filename="%s"', $filename));

echo json_encode(getallheaders() ?? '{}');
?>