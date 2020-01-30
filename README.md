# Electron MSI builder

Ce dépot contient un package pour créer des installeurs .msi et .exe à partir d'application electron (prendre le dossier harness comme exemple)

Le package est sur [github](https://github.com/swl-sante/electron-wix-msi/packages).

Pour installer le package suivez la [documentation sur Github](https://help.github.com/en/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages#installing-a-package)

## Utilisation des .MSI

`msiexec /i <nom du fichier .msi>` -> installation normal : équivalent à double cliquer dessus

`msiexec /a <nom du fichier .msi>` -> installation en mode administrateur

`msiexec /x <nom du fichier .msi>` -> désinstalation 

----------

`msiexec /i <nom du fichier .msi> /passive` -> installation silencieuse : bar de progression affichée mais pas d'action demandée à l'utilisateur, chemin d'installation par défaut

`msiexec /i <nom du fichier .msi> APPLICATIONROOTDIRECTORY=<dossier d'installation> /passive` -> installation silencieuse avec chemin d'installation souhaité

----------

Exemple : `msiexec /i MonSisra2Int.msi APPLICATIONROOTDIRECTORY="C:\GCS SARA\MSB" /passive` -> installation silencieuse dans le répertoire C:\GCS SARA\MSB
