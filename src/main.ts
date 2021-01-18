import { app, BrowserWindow, nativeImage, nativeTheme } from 'electron'
import * as path from 'path'

require('electron-context-menu')({
  prepend: (params: Electron.ContextMenuParams) => [{
    visible: params.mediaType === 'image',
  }],
})

let mainWindow: Electron.BrowserWindow
const appURL = 'https://web.whatsapp.com/'
const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36';
const appName = 'WhatsApp'
const bgColor = '#f2f2f2'

const iconLink = nativeImage.createFromPath(path.join(__dirname, 'icon/1024x1024.png'))

const createWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: bgColor,
    height: 700,
    center: true,
    icon: iconLink,
    show: false,
    width: 1200,
  })

  nativeTheme.themeSource = 'system'

  mainWindow.loadURL(appURL, { userAgent })
  mainWindow.setTitle(appName)
  mainWindow.setAutoHideMenuBar(true)
  mainWindow.setMenuBarVisibility(false)
  mainWindow.on('ready-to-show', () => mainWindow.show())
}

app.on('ready', () => createWindow())
app.on('window-all-closed', () => app.quit())
