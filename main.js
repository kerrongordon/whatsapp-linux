const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron')
const contMenu = require('electron-context-menu')
const path = require('path')

let appName = 'WhatsApp-linux'
let win
let tray = null
let appUrl = 'https://web.whatsapp.com/'
let icon = path.join(__dirname, 'resources/icon/64/whatsapp.png')
let iconTray = path.join(__dirname, 'resources/icon/16/whatsapp.png')

contMenu({
    prepend: (params, browserWindow) => [{
        label: 'Menu',
        visible: params.mediaType === 'image'
    }]
})

app.on('ready', () => {
    appWindow()
    trayIcon()
});

app.on('activate', () => {
    if (!win) {
        createMainWindow()
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

const appWindow = () => {
    win = new BrowserWindow({
        height: 600,
        width: 900,
        icon: icon,
        show: false,
        title: appName,
        autoHideMenuBar: true
    })

    win.loadURL(appUrl)

    win.on('ready-to-show', () => {
        win.show()
    });

    win.on('close', (event) => {
        if (!app.isQuiting) {
            event.preventDefault()
            win.hide()
        }
        return false
    })
}

const trayIcon = () => {
    const contextMenu = Menu.buildFromTemplate([{
            label: 'Toggle',
            click: () => winIsVisible()
        },
        { type: 'separator' },
        {
            label: 'Quit',
            click: () => winIsCloseIng()
        }
    ]);
    tray = new Tray(iconTray)
    tray.on('click', winIsVisible)
    tray.setToolTip(appName)
    tray.setContextMenu(contextMenu)
}

const winIsVisible = () => {
    win.isVisible() ? win.hide() : win.show()
}

const winIsCloseIng = () => {
    app.isQuiting = true
    app.quit()
}