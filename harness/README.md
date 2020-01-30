# Test Harness
Ceci est un emplacement de test pour le package

Placer les dossiers / fichiers MSB.app et MSB.build et MSB.package.json (n'oubliez pas de Grunt pour générer le package.json)

Lancer `npm run harness:msi` pour vérifier que la création d'un .msi

Le package est sur [github](https://github.com/swl-sante/electron-wix-msi/packages).
Pour installer le package suivez la [documentation sur Github](https://help.github.com/en/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages#installing-a-package) 

## Arguments

| /                     | --platform                  | --ext                     | --dist              | --arch                           |
|-----------------------|-----------------------------|---------------------------|---------------------|----------------------------------|
| **Valeurs possibles** | "win32", "darwin"           | "msi", "exe", "all"       | "machine", "user"   | "x32" "x64"                      |
| **description**       | Type d'os Windows ou MacOSX | Extension de l'installeur | mode d'installation | architecture de l'OS Facultatif) |

### ext

* `"msi"` = création d'un installeur MSI (installation avec UI : choix du dossier d'installation)
* `"exe"` = création d'un installeur EXE (installation automatique)

### dist

* `"machine"` = installation sur tout le poste
* `"user"` = installation propre à l'utilisateur

