.\script\updateVersionComponent.ps1; # versionning composant if no argument increment patch version

# versionning solution
# .\script\updateVersionSolution.ps1 0 0 7 1
# msbuild;

# pac solution version -bv 7 -sp ./ExportExcelSol/src/Other/Solution.xml
# pac solution import -p .\ExportExcelSol\bin\Debug\ExportExcelSol.zip

# push solution and pcf
pac pcf push --publisher-prefix ad