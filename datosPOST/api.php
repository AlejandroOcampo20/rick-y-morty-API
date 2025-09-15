<?php
header("Content-Type: application/json");

$url = "https://rickandmortyapi.com/api/character";

$response = file_get_contents($url);

echo $response;
