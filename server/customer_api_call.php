<?php
  //GET Customer Booking Availability 
  function getEmployeesList(){
    $url = 'https://private.qa.api.dsv.com:8442/v1/ExternalBooking/BookingAvailability';

    $dataArray = array("CustomerGroupCode"=>'RECO',
                        "DivisionCode"=>"MSD",
                        "TownCode"=>"RDB",
                        "SuburbName"=>"RANDBURG",
                        "ClientName"=>"Tom Smith",
                        "ClientIDPassport"=>"8012120144084"
    );
    $data = http_build_query($dataArray);
    $getUrl = $url."?".$data;

    try {
        $ch = curl_init(); 
        if ($ch === false) {
            throw new Exception('failed to initialize');
        }
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($ch, CURLOPT_USERPWD, "api.mounties.reco:MUJkx474");

        curl_setopt($ch, CURLOPT_URL, $getUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    
        //curl_setopt(/* ... */);

        $content = curl_exec($ch);
            echo $content; //exit();
        if ($content === false) {
            throw new Exception(curl_error($ch), curl_errno($ch));
        }
        curl_close($ch);
    } catch(Exception $e) {

        trigger_error(sprintf(
            'Curl failed with error #%d: %s',
            $e->getCode(), $e->getMessage()),
            E_USER_ERROR);

    }
}