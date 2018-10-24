import { app, BrowserWindow } from 'electron'
import * as path from 'path'

require('electron-context-menu')({
  prepend: (params: Electron.ContextMenuParams, browserWindow: BrowserWindow) => [{
    visible: params.mediaType === 'image',
  }],
})

let mainWindow: Electron.BrowserWindow
const appURL = 'https://web.whatsapp.com/'
const appName = 'WhatsApp linux'
const bgColor = '#f2f2f2'

const createWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: bgColor,
    height: 600,
    icon: path.join(__dirname, 'icon/64x64.png'),
    show: false,
    width: 900,
  })

  mainWindow.loadURL(appURL)
  mainWindow.setTitle(appName)
  mainWindow.setAutoHideMenuBar(true)
  mainWindow.setMenuBarVisibility(false)
  mainWindow.on('ready-to-show', () => mainWindow.show())
}

app.on('ready', () => createWindow())
app.on('window-all-closed', () => app.quit())
