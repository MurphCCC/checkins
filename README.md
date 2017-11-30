This is the source code for Planning Center's Check-Ins app.  It is an electron based app.  We have made some slight modifications to the code to cause the app to download a custom CSS file when it loads and then apply that CSS file to the webview.  This allows us to customize the Check-Ins experience without having to maintain a lot of custom plugins or make sure that all the stations are set up the same.  

Using some Electron tools, this can very easliy be packaged into a .DMG file for Mac or an .EXE file for Windows.  Currently when the app is launched, it will download the css and inject it into the webview, then cause the app to go full screen.

Source can be packed as an app using the following command: 

<code>electron-packager . --electronVersion=1.7.9 --overwrite --icon=Check-Ins.icns</code>