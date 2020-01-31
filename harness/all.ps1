Write-Output "Creating user and machine installers"


$create = @{
    msi = 1;
    exe = 0;
}



Write-Output "Done"

if ($create.msi -eq 1) {
    Write-Output "Creating MSI time ~1mn"
    Remove-Item msi -Force  -Recurse
    ..\node_modules\.bin\ts-node.cmd .\harness.ts --platform win32 --dist user --ext msi
    Move-Item .\msi\MonSisra2Int.msi .\msi\MonSisra2User.msi -Force
    ..\node_modules\.bin\ts-node.cmd .\harness.ts --platform win32 --dist machine --ext msi
    Move-Item .\msi\MonSisra2Int.msi .\msi\MonSisra2Machine.msi -Force
}

if ($create.exe -eq 1) {
    Remove-Item exe -Force  -Recurse
    ..\node_modules\.bin\ts-node.cmd .\harness.ts --platform win32 --dist user --ext exe
    Move-Item .\exe\MonSisra2Int.exe .\exe\MonSisra2User.msi -Force
    ..\node_modules\.bin\ts-node.cmd .\harness.ts --platform win32 --dist machine --ext exe
    Move-Item .\exe\MonSisra2Int.exe .\exe\MonSisra2Machine.msi -Force
}