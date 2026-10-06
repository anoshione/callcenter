Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap("screenshot/ref-site-01.png")
$rect = New-Object System.Drawing.Rectangle(1100, 30, 600, 100)
$crop = $bmp.Clone($rect, $bmp.PixelFormat)
$crop.Save("scratch/nav_ref.png")
$bmp.Dispose()
$crop.Dispose()
