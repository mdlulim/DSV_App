<?php 
$method = "GET";
$url = "https://private.qa.api.dsv.com:8442/v1/ExternalBooking/BookingAvailability"; 
$data = array(
    "CustomerGroupCode" => "RECO",
    "DivisionCode"      => "MSD",
    "TownCode"          => "RDB",
    "SuburbName"        => "RANDBURG",
    "ClientName"        => "Tom Smith",
    "ClientIDPassport"  => "8012120144084"
);
// Method: POST, PUT, GET etc
// Data: array("param" => "value") ==> index.php?param=value

// function CallAPI($method, $url, $data = false)
// {
    $curl = curl_init();

    switch ($method)
    {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);

            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_PUT, 1);
            break;
        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    //}

    // Optional Authentication:
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($curl, CURLOPT_USERPWD, "api.mounties.reco:MUJkx474");

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);
    var_dump($result);die;

    curl_close($curl);

    return $result;
}