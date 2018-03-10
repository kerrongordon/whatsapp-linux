import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'

require('electron-context-menu')({
	prepend: (params: Electron.ContextMenuParams, browserWindow: BrowserWindow) => [{
    // label: 'Rainbow',

		// Only show it when right-clicking images
		visible: params.mediaType === 'image'
	}]
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
