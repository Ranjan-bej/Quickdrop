import express from 'express';
import dotenv from "dotenv";
import filemodel from "./model/filemodel.js"
import multer from 'multer'
import Connect from "./database/db.js"
import cors from 'cors';
// import path from "path";
const app = express();
dotenv.config()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() 
        cb(null, uniqueSuffix+'-'+file.originalname)
    }
})
Connect();
const upload = multer({ storage:storage })
app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT
const backendurl = process.env.BACKENDURL;
app.get("/", (req, res) => {
    res.send("Hello World")
})
app.post('/upload/:code',upload.single('file') ,async (req,res)=>{
    const object ={ 
        path:req.file.path,
        name:req.file.originalname,
        code:req.params.code
    }    
    const file =await filemodel.create(object);
    // console.log(file)
    return res.status(200).json({path:`${backendurl}/files/${file._id}`})
})
app.get("/files/:id",async (req,res)=>{
    try{
        const file = await filemodel.findById(req.params.id)
        if(!file){
            return res.status(404).json({message:"File not found"})
        }
        res.download(file.path,file.name)
        
    }
    catch(err){
        console.log(err);
        
    }
})
app.get("/download/:code",async (req,res)=>{
    const cd = req.params.code;
    const file = await filemodel.find({code:cd})
    if(file.length==0){
        return res.status(200).json({message:"File code not found"})
    }
    const id = file[0]._id;    
    res.json({
        name:file[0].name,
        url:`${backendurl}/files/${id}`
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