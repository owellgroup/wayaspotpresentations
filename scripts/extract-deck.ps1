$root = Split-Path -Parent $PSScriptRoot
$html = [IO.File]::ReadAllText((Join-Path $root "wayaspot-pitch-deck_1.html"))
$pattern = '(?s)<div id="progress">(.*?)<script>'
if ($html -match $pattern) {
  $body = '<div id="progress">' + $Matches[1].Trim()
  $body = $body.Replace('src="wayaspot-logo.png"', 'src="/wayaspot-logo.png"')
  $out = Join-Path $root "src\components\DeckSlides.html"
  [IO.File]::WriteAllText($out, $body, [Text.UTF8Encoding]::new($false))
  Write-Output "Extracted deck slides to DeckSlides.html"
} else {
  Write-Error "Could not extract deck body"
  exit 1
}
