import express from 'express';
import dotenv from "dotenv";
import filemodel from "./model/filemodel.js"
import Busboy from 'busboy';
import fs from 'fs';
import Connect from "./database/db.js"
import cors from 'cors';

import cron from 'node-cron';
import path from "path";
const app = express();
dotenv.config()

// Ensure uploads directory exists
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// Cron job to run every hour
cron.schedule('0 * * * *', () => {
    console.log('Running file cleanup task');
    const uploadsDir = './uploads';

    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(uploadsDir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                const now = Date.now();
                const fileAge = now - stats.birthtimeMs;
                const sevenHours = 7 * 60 * 60 * 1000;

                if (fileAge > sevenHours) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        } else {
                            console.log(`Deleted expired file: ${file}`);
                        }
                    });
                }
            });
        });
    });
});

Connect();

app.use(cors({
    origin: ["http://localhost:5173", "https://quickdrop-rho.vercel.app"]
}))
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT
const backendurl = process.env.BACKENDURL;
app.get("/", (req, res) => {
    res.send("Hello World")
})
app.post('/api/upload/:code', (req, res) => {
    const busboy = Busboy({ headers: req.headers });
    const code = req.params.code;
    let filePath = '';
    let fileName = '';

    busboy.on('file', (name, file, info) => {
        const { filename, mimeType } = info;
        fileName = filename;
        const uniqueSuffix = Date.now();
        const savedFilename = uniqueSuffix + '-' + filename;
        filePath = './uploads/' + savedFilename;

        console.log(`Uploading: ${filename}`);
        const writeStream = fs.createWriteStream(filePath);
        file.pipe(writeStream);
    });

    busboy.on('finish', async () => {
        try {
            if (!filePath) {
                return res.status(400).json({ message: "No file uploaded" });
            }
            const object = {
                path: filePath,
                name: fileName,
                code: code
            };
            const file = await filemodel.create(object);
            return res.status(200).json({ path: `${backendurl}/api/files/${file._id}`, message: "Files are uploaded to the backend" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error during upload" });
        }
    });

    req.pipe(busboy);
});
app.get("/api/files/:id", async (req, res) => {
    try {
        const file = await filemodel.findById(req.params.id)
        if (!file) {
            return res.status(404).json({ message: "File not found" })
        }
        res.download(file.path, file.name)

    }
    catch (err) {
        console.log(err);

    }
})
app.get("/api/download/:code", async (req, res) => {
    const cd = req.params.code;
    const file = await filemodel.find({ code: cd })
    if (file.length == 0) {
        return res.status(200).json({ message: "File code not found" })
    }
    const id = file[0]._id;
    res.json({
        name: file[0].name,
        url: `${backendurl}/api/files/${id}`
    })
})

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname,'/quickdrop-frontend/dist')))
// app.get("*",(req,res)=>{
//     res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
// })
app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`)
})