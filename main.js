const { app, BrowserWindow, Tray, Menu, nativeImage, shell } = require('electron')
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
    mainMenuBar()
    trayIcon()
});

app.on('activate', () => {
    if (!win) {
        createMainWindow()
    }
    return false
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
    return false
});

const appWindow = () => {
    win = new BrowserWindow({
        height: 600,
        width: 1000,
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
    tray.setToolTip(appName)
    tray.setContextMenu(contextMenu)
}

const winIsVisible = () => {
    win.isVisible() ? win.hide() : win.show()
    return false
}

const winIsCloseIng = () => {
    app.isQuiting = true
    app.quit()
}


const mainMenuBar = () => {
    const menuBar = [{
            label: 'WhatsApp Linux',
            submenu: [{
                label: 'Quit',
                click: () => winIsCloseIng()
            }]
        },
        {
            label: 'Edit',
            submenu: [{
                    role: 'undo'
                },
                {
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'cut'
                },
                {
                    role: 'copy'
                },
                {
                    role: 'paste'
                },
                {
                    role: 'pasteandmatchstyle'
                },
                {
                    role: 'delete'
                },
                {
                    role: 'selectall'
                }
            ]
        },
        {
            label: 'View',
            submenu: [{
                    role: 'reload'
                },
                {
                    role: 'forcereload'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'resetzoom'
                },
                {
                    role: 'zoomin'
                },
                {
                    role: 'zoomout'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'togglefullscreen'
                }
            ]
        },
        {
            role: 'window',
            submenu: [{
                    role: 'minimize'
                },
                {
                    role: 'close'
                }
            ]
        },
        {
            role: 'help',
            submenu: [{
                label: 'Learn More',
                click() { shell.openExternal('https://github.com/kerrongordon/whatsapp-linux') }
            }]
        }
    ]

    const menu = Menu.buildFromTemplate(menuBar)
    Menu.setApplicationMenu(menu)
}