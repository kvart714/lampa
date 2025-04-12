$User = "admin"
$Pass = "714bdfy714"
$IP = "192.168.1.1"  # Или IP сервера
$IP = "localhost"  # Или IP сервера
$Port = "9091"

$URL = "http://$IP`:$Port/transmission/rpc"

# Кодируем логин и пароль в Base64
$Base64Auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$User`:$Pass"))
$Headers = @{
    "Authorization" = "Basic $Base64Auth"
}

# $Headers["X-Transmission-Session-Id"] = $SessionID
$Body = @{ 
    "method" = "torrent-get"; 
    "arguments" = @{ 
        "fields" = @("status", "totalSize", "percentComplete", "percentDone", "name", "id") 
    } 
} | ConvertTo-Json -Depth 10

# Получаем session-id
$Response = Invoke-WebRequest -Uri $URL -Method Post -Headers $Headers -ErrorAction Stop -ContentType "application/json" #-Body $Body 

$Response.Headers


# $SessionID = $Response.Headers["X-Transmission-Session-Id"]

# # Делаем запрос с session-id
# $Headers["X-Transmission-Session-Id"] = $SessionID
# $Body = @{ "method" = "session-get" } | ConvertTo-Json -Depth 10

# $Response = Invoke-WebRequest -Uri $URL -Method Post -Headers $Headers -Body $Body -ContentType "application/json"

# $Response.Content | ConvertFrom-Json
