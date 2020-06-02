const electron = require('electron');
const { app, BrowserWindow , ipcMain } = electron;
const ffmpeg = require('fluent-ffmpeg');
let mainWindow;

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration : true
		}
	});	
	//mainWindow.loadURL(`file:/${__dirname}/index.html`);
	mainWindow.loadFile('index.html')
});

ipcMain.on('video:submit', (event, path) =>{
	ffmpeg.ffprobe(path, (err, metadata) =>{
		// console.log("Video duration is : " , metadata.format.duration);
		mainWindow.webContents.send('video:metadata', metadata.format.duration);
	});
});
 