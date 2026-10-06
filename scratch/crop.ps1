Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap("screenshot/ref-site-01.png")
$rect = New-Object System.Drawing.Rectangle(200, 560, 600, 200)
$crop = $bmp.Clone($rect, $bmp.PixelFormat)
$crop.Save("scratch/hero_buttons_ref.png")
$bmp.Dispose()
$crop.Dispose()
