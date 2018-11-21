Software store Web Application - Offline

Requires:
IISExpress 64-bit
Web Browser (This website was developed in Google Chrome)
SQLite Runtime components for Windows 64-bit (.NET Framework 4.5)

To run the offline website:
Using a text editor, open both Web.config files located in the OpenService and ClosedService folders (C:\Users\User\Downloads\softwareWebApp\OpenService)
In line 4 of both files, change the value to the location of the "Data" folder in the root directory e.g. C:\Users\User\Downloads\softwareWebApp\Data

In Windows PowerShell, have two instances open.
In one window type in the command:
& "C:\Program Files\IIS Express\IISExpress.exe" /port:8188 "/path:C:\folderLocation\OpenService"

In the other window type in the command:
& "C:\Program Files\IIS Express\IISExpress.exe" /port:8189 "/path:C:\folderLocation\ClosedService"

Open your browser and type in:
http://localhost:8189/softwareServiceApp.html

