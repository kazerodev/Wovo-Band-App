# Wovo Band icon generator — uses System.Drawing (GDI+)
# Outputs: icon.png, adaptive-icon.png, splash-icon.png, favicon.png

Add-Type -AssemblyName System.Drawing

$OUT = "C:\Users\akaga\wovo-band-app\assets\images"

# ── Colors ───────────────────────────────────────────────────────
$BG_COLOR    = [System.Drawing.Color]::FromArgb(255,   8,   8,  16)   # #080810
$TEAL_COLOR  = [System.Drawing.Color]::FromArgb(255,  45, 212, 191)   # #2DD4BF
$TEAL_GLOW   = [System.Drawing.Color]::FromArgb( 55,  45, 212, 191)   # teal glow
$RING_COLOR  = [System.Drawing.Color]::FromArgb( 28,  45, 212, 191)   # subtle ring
$TEXT_COLOR  = [System.Drawing.Color]::FromArgb(200, 240, 240, 248)   # off-white

# ── W path relative coords (base for 1024px canvas) ─────────────
# The W spans -290..+290 on X, and -180..+175 on Y (relative to center)
# Center notch is at Y=-40 (shallower = classier W)
$W_REL = @(
    @(-290.0, -180.0),   # top-left
    @(-148.0,  175.0),   # bottom-left
    @(   0.0,  -40.0),   # center notch
    @( 148.0,  175.0),   # bottom-right
    @( 290.0, -180.0)    # top-right
)

function New-Icon {
    param(
        [int]   $Size,
        [float] $WScale,    # 1.0 = full canvas W, 0.6 = 60% (adaptive safe zone)
        [float] $CY = 0.5,  # Y center as fraction of canvas (0.5 = middle)
        [bool]  $ShowText = $false,
        [bool]  $ShowRing = $true,
        [bool]  $ShowGlow = $true,
        [string]$OutputPath
    )

    $bmp = New-Object System.Drawing.Bitmap($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g   = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode        = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint    = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.InterpolationMode    = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

    # Background
    $bgBrush = New-Object System.Drawing.SolidBrush($BG_COLOR)
    $g.FillRectangle($bgBrush, 0, 0, $Size, $Size)
    $bgBrush.Dispose()

    $cx = [float]$Size * 0.5
    $cy = [float]$Size * $CY
    $scale = $WScale * ([float]$Size / 1024.0)   # normalise to canvas size

    # Decorative ring
    if ($ShowRing -and $Size -ge 128) {
        $ringPen = New-Object System.Drawing.Pen($RING_COLOR, [float][Math]::Max(2.0, $Size * 0.005))
        $rD = [int]([float]$Size * 0.60)
        $rO = [int](([float]$Size - $rD) / 2.0)
        $g.DrawEllipse($ringPen, $rO, $rO, $rD, $rD)
        $ringPen.Dispose()

        # Inner smaller ring
        $ring2Pen = New-Object System.Drawing.Pen($RING_COLOR, [float][Math]::Max(1.0, $Size * 0.003))
        $r2D = [int]([float]$Size * 0.72)
        $r2O = [int](([float]$Size - $r2D) / 2.0)
        $g.DrawEllipse($ring2Pen, $r2O, $r2O, $r2D, $r2D)
        $ring2Pen.Dispose()
    }

    # Build W PointF array
    $pts = New-Object 'System.Drawing.PointF[]' 5
    for ($i = 0; $i -lt 5; $i++) {
        $px = $cx + $W_REL[$i][0] * $scale
        $py = $cy + $W_REL[$i][1] * $scale
        $pts[$i] = New-Object System.Drawing.PointF($px, $py)
    }

    $sw = [float][Math]::Max(3.0, $Size * 0.066)   # stroke width proportional

    # Glow layer (wider, low opacity)
    if ($ShowGlow -and $Size -ge 128) {
        $glowPen = New-Object System.Drawing.Pen($TEAL_GLOW, ($sw * 2.8))
        $glowPen.StartCap  = [System.Drawing.Drawing2D.LineCap]::Round
        $glowPen.EndCap    = [System.Drawing.Drawing2D.LineCap]::Round
        $glowPen.LineJoin  = [System.Drawing.Drawing2D.LineJoin]::Round
        $g.DrawLines($glowPen, $pts)
        $glowPen.Dispose()
    }

    # Main W
    $wPen = New-Object System.Drawing.Pen($TEAL_COLOR, $sw)
    $wPen.StartCap  = [System.Drawing.Drawing2D.LineCap]::Round
    $wPen.EndCap    = [System.Drawing.Drawing2D.LineCap]::Round
    $wPen.LineJoin  = [System.Drawing.Drawing2D.LineJoin]::Round
    $g.DrawLines($wPen, $pts)
    $wPen.Dispose()

    # "WOVO  BAND" text under W (splash only)
    if ($ShowText -and $Size -ge 256) {
        $fontSize = [float]([Math]::Max(14.0, $Size * 0.052))
        $font    = New-Object System.Drawing.Font("Arial", $fontSize, [System.Drawing.FontStyle]::Bold)
        $tBrush  = New-Object System.Drawing.SolidBrush($TEXT_COLOR)
        $sf      = New-Object System.Drawing.StringFormat
        $sf.Alignment  = [System.Drawing.StringAlignment]::Center

        # Spacing: draw letter by letter to simulate tracking
        $text   = "KINORA"
        $charW  = $fontSize * 0.68
        $totalW = $text.Length * $charW
        $startX = $cx - $totalW / 2.0
        $textY  = $cy + 215 * $scale

        for ($ci = 0; $ci -lt $text.Length; $ci++) {
            $charX = $startX + $ci * $charW
            $g.DrawString($text[$ci], $font, $tBrush, $charX, $textY, $sf)
        }

        $font.Dispose()
        $tBrush.Dispose()
        $sf.Dispose()
    }

    $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()

    $info = Get-Item $OutputPath
    Write-Host ("Created: " + (Split-Path $OutputPath -Leaf) + " (" + $Size + "x" + $Size + ", " + [Math]::Round($info.Length/1024) + " KB)")
}

# icon.png — main app icon, W fills 90% of safe area
New-Icon -Size 1024 -WScale 0.90 -CY 0.50 -ShowGlow $true -OutputPath "$OUT\icon.png"

# adaptive-icon.png — W in 60% safe zone for Android adaptive cropping
New-Icon -Size 1024 -WScale 0.60 -CY 0.50 -ShowGlow $true -OutputPath "$OUT\adaptive-icon.png"

# splash-icon.png — W + text, W slightly above center
New-Icon -Size 1024 -WScale 0.72 -CY 0.45 -ShowText $true -ShowGlow $true -OutputPath "$OUT\splash-icon.png"

# favicon.png — compact, no ring or glow at small size
New-Icon -Size 64 -WScale 0.85 -CY 0.50 -ShowRing $false -ShowGlow $false -OutputPath "$OUT\favicon.png"

Write-Host "Done."
