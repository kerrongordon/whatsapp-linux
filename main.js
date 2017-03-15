const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

require('electron-context-menu')({
    prepend: (params, browserWindow) => [{
        label: 'Menu',
        // only show it when right-clicking images
        visible: params.mediaType === 'image'
    }]
});

let win;
let tray = null;
let icon = path.join(__dirname, 'resources/icon/64/whatsapp.png');
let iconTray = path.join(__dirname, 'resources/icon/16/whatsapp.png');

function createMainWindow() {
    win = new BrowserWindow({
        height: 600,
        width: 900,
        icon: icon,
        show: false,
        autoHideMenuBar: true
    });

    win.loadURL('https://web.whatsapp.com/');

    win.on('ready-to-show', () => {
        win.show();
    });

    win.on('minimize', (event) => {
        event.preventDefault();
        win.hide();
    });

    win.on('close', (event) => {
        if (!app.isQuiting) {
            event.preventDefault();
            win.hide();
        }
        return false;
    });


    // tray icon

    tray = new Tray(iconTray);
    const contextMenu = Menu.buildFromTemplate([{
            label: 'Toggle',
            click: () => {
                win.isVisible() ? win.hide() : win.show()
            }
        },
        { type: 'separator' },
        {
            label: 'Quit',
            click: () => {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);
    tray.setToolTip('WhatsApp');
    tray.setContextMenu(contextMenu);

}

app.on('ready', () => {
    createMainWindow();
});

app.on('activate', () => {
    if (!win) {
        createMainWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});