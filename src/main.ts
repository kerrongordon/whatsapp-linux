import { app, BrowserWindow, nativeImage, nativeTheme, Menu, Tray, shell } from 'electron'
import * as path from 'path'

require('electron-context-menu')({
  prepend: (params: Electron.ContextMenuParams) => [{
    visible: params.mediaType === 'image',
  }],
})

let mainWindow: Electron.BrowserWindow
const appURL = 'https://web.whatsapp.com/'
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
    webPreferences: {
      nativeWindowOpen: true
    }
  })

  nativeTheme.themeSource = 'system'

  mainWindow.loadURL(appURL)
  mainWindow.setTitle(appName)
  mainWindow.setAutoHideMenuBar(true)
  mainWindow.setMenuBarVisibility(false)
  mainWindow.on('ready-to-show', () => mainWindow.show())
  mainWindow.on('close', (event) => {
    event.preventDefault()
    mainWindow.hide()
  })

  mainWindow.webContents.on('new-window', (e, url) => {
    e.preventDefault()
    shell.openExternal(url)
  });
}

let tray = null
const trayIcon = nativeImage.createFromPath(path.join(__dirname, 'icon/32x32.png'))

app.whenReady().then(() => {
  tray = new Tray(trayIcon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Toggle', click() {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
      }
    },
    {
      label: 'Quit', click() {
        mainWindow.destroy();
        app.quit();
      }
    }
  ]);
  tray.setToolTip(appName)
  tray.setContextMenu(contextMenu)
})

app.on('ready', () => createWindow())
app.on('window-all-closed', () => app.quit())
