@ECHO ON
SET env=mn4qa
ECHO Environment: %env%
cd.. & ^
for /r %%s in (.\cypress\integration\regression\cic3\*) do npx cypress run --spec %%s --env configFile=%env% --browser chrome --reporter mochawesome