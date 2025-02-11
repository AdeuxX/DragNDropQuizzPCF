param (
    [int]$major,
    [int]$minor,
    [int]$patch
)

# Get the current directory
$currentDir = Get-Location

# Define the path to the XML file
$xmlFilePath = Join-Path -Path $currentDir -ChildPath "dragAndDropPcf/ControlManifest.Input.xml"

# Load the XML file
[xml]$xml = Get-Content $xmlFilePath

# If no parameters are passed, get the current version and increment the patch number
if (-not $PSBoundParameters.ContainsKey('major') -and -not $PSBoundParameters.ContainsKey('minor') -and -not $PSBoundParameters.ContainsKey('patch')) {
    $currentVersion = $xml.manifest.control.version
    $versionParts = $currentVersion -split '\.'
    $major = [int]$versionParts[0]
    $minor = [int]$versionParts[1]
    $patch = [int]$versionParts[2] + 1
}

# Define the new version number
$newVersion = "$major.$minor.$patch"

# Update the version attribute in the control element
$xml.manifest.control.version = $newVersion

# Save the updated XML back to the file
$xml.Save($xmlFilePath)

Write-Output "Version updated to $newVersion"
