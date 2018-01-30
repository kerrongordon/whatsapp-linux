import { app, BrowserWindow } from 'electron'

let mainWindow: Electron.BrowserWindow
const appURL = 'https://web.whatsapp.com/'
const appName = 'WhatsApp linux'
const iconURL = 'assets/png/64x64.png'
const TrayIconURL = 'assets/png/16x16.png'
const bgColor = '#f2f2f2'

const createWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: bgColor,
    height: 600,
    icon: iconURL,
    width: 900,
  })

  mainWindow.loadURL(appURL)
  mainWindow.setTitle(appName)
  mainWindow.setMenuBarVisibility(false)
  mainWindow.setAutoHideMenuBar(true)
}

const closeApp = () => {
  return app.quit()
}

app.on('ready', () => {
  createWindow()
})
