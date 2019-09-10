# WhatsApp Linux

[![Greenkeeper badge](https://badges.greenkeeper.io/kerrongordon/whatsapp-linux.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/kerrongordon/whatsapp-linux.svg?branch=master)](https://travis-ci.org/kerrongordon/whatsapp-linux)

Simple. Secure. Reliable messaging. With WhatsApp, you'll get fast, simple, secure messaging and calling for free*, available on phones all over the world.

## Download For Linux

[Linux Packages](https://github.com/kerrongordon/whatsapp-linux/releases/latest)



```bash
sudo apt-get install --no-install-recommends -y libopenjp2-tools
sudo apt-get install --no-install-recommends -y rpm
sudo apt-get install --no-install-recommends -y snapcraft
```

## How To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/)

```bash

npm i -g electron
npm i -g electron-builder

# Clone this repository
git clone https://github.com/kerrongordon/whatsapp-linux.git
# Go into the repository
cd whatsapp-linux
# Install dependencies
npm install
# Run the app
npm start
# Build the app
npm run build:linux
```

