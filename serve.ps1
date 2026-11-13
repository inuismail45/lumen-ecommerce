<#
.SYNOPSIS
  Zero-dependency local HTTP server for LUMEN E-Commerce Platform.
  Uses Windows built-in .NET HttpListener. No Node, Python or external tools required.

.EXAMPLE
  .\serve.ps1
  .\serve.ps1 -Port 8080
#>

param(
  [int]$Port = 8080
)

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
  $listener.Start()
  Write-Host "==========================================================" -ForegroundColor Cyan
  Write-Host "  LUMEN E-Commerce Platform Local Server Running!        " -ForegroundColor Green
  Write-Host "  Address: $prefix                                       " -ForegroundColor Yellow
  Write-Host "  Press Ctrl+C to terminate the server                    " -ForegroundColor Gray
  Write-Host "==========================================================" -ForegroundColor Cyan

  # Auto-open in default browser
  Start-Process $prefix

  $mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
  }

  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $urlPath = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($urlPath)) {
      $urlPath = "index.html"
    }

    $filePath = Join-Path $PSScriptRoot $urlPath

    if (Test-Path $filePath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
      $mime = $mimeTypes[$ext]
      if (-not $mime) { $mime = "application/octet-stream" }

      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $response.ContentType = $mime
      $response.ContentLength64 = $bytes.Length
      $response.StatusCode = 200
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $notFoundMsg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
      $response.StatusCode = 404
      $response.ContentLength64 = $notFoundMsg.Length
      $response.OutputStream.Write($notFoundMsg, 0, $notFoundMsg.Length)
    }

    $response.OutputStream.Close()
  }
}
catch {
  Write-Error $_
}
finally {
  $listener.Stop()
  $listener.Close()
}
