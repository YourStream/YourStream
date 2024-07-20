@echo off
setlocal

REM Вкажіть шлях до кореневої папки
set "rootFolder=L:\YourStream\Services"

REM Команда, яку потрібно виконати у кожній папці
set "command=npm install @types/node dotenv"

REM Ітерація по кожній папці в rootFolder
for /d %%D in ("%rootFolder%\*") do (
    pushd %%D
    %command%
    popd
)

endlocal