import React, { useState } from "react";
import { Upload, Download, Trash2, Clock, PlusCircle } from "lucide-react";
import axios from 'axios'
const App = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [files, setFiles] = useState([]);
  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [url, setUrl] = useState("");
  const [message, setErrorMessage] = useState("")
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
  };

  const handleDelete = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleUpload = (e) => {
    if (files.length > 0) {
      files.map(async file => {
        console.log("Uploading:", file);
        const randomCode = Math.floor(10000 + Math.random() * 90000).toString();
        const formData = new FormData();
        formData.append('file', file)
        const res = await axios.post(`http://127.0.0.1:5000/upload/${randomCode}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        console.log(res.data);
        setGeneratedCode(randomCode+res.data.message);
      })
    }
  };

  const handleDownload = async () => {
    if (code.length == 0) {
      return;
    }
    const { data } = await axios.get(`http://127.0.0.1:5000/download/${code}`);
    if (data.message) {
      setErrorMessage("Incorrect Code entered.")
    }
    else {
      console.log(data);
      setUrl(data.url);
      setErrorMessage("")
    }
  };

  const shortenName = (name) => {
    return name.length > 25 ? name.slice(0, 22) + "..." : name;
  };

  return (
    <div className="min-h-screen bg-[#0e0e1a] text-white font-sans">
      <div className="bg-gradient-to-r from-purple-700 to-blue-600 p-4 flex justify-between items-center">
        <div className="text-xl font-bold flex items-center gap-2">
          <Upload size={20} /> QuickDrop
        </div>
        <div className="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8.66-4.34l-.71-.71M4.05 4.05l-.71-.71m16.97 0l-.71.71M4.05 19.95l-.71.71M21 12h1M2 12H1" />
          </svg>
        </div>
      </div>

      <div className="flex gap-4 p-4">
        <button
          onClick={() => setActiveTab("upload")}
          className={`px-4 py-2 rounded ${activeTab === "upload" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400"}`}
        >
          Upload
        </button>
        <button
          onClick={() => setActiveTab("download")}
          className={`px-4 py-2 rounded ${activeTab === "download" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400"}`}
        >
          Download
        </button>
      </div>

      {activeTab === "upload" && (
        <div className="p-4">
          <div className="bg-[#1a1a2e] p-6 rounded-xl shadow-lg max-w-xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">📤 Upload Files</h2>
            <label
              htmlFor="fileInput"
              className="block border-2 border-dashed border-gray-500 hover:border-blue-500 transition p-6 rounded-lg cursor-pointer text-center text-gray-400 hover:text-white"
            >
              {files.length > 0 ? (
                <div className="space-y-2">
                  {files.map((f, idx) => (
                    <div key={idx} className="flex items-center justify-between px-4 text-sm font-medium text-white truncate w-full">
                      <span>{shortenName(f.name)}</span>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(idx); }} className="text-red-400 hover:text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center justify-center text-blue-400 text-sm mt-4">
                    <PlusCircle className="mr-2" size={18} /> Add more files
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm">Click to choose files</p>
                  <p className="text-xs mt-1">Max total size: 100MB</p>
                </div>
              )}
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />
              <button type="submit"
                onClick={handleUpload}
                className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Upload size={18} /> Upload and Generate Code
              </button>
            </label>


            {generatedCode && (
              <div className="mt-4 p-4 bg-[#111827] rounded-lg text-center text-lg font-mono text-green-400 border border-green-600">
                Your file code: <span className="text-white">{generatedCode}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "download" && (
        <div className="p-4">
          <div className="max-w-xl mx-auto bg-[#1a1a2e] p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">📥 Download a File</h2>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={6}
              className="w-full p-2 mb-4 rounded bg-[#0e0e1a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the 6-digit file code"
            />
            <button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <Download size={18} /> Find File
            </button> <br />
            {url.length == 0 ? null : <a href={url} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
            ><Download size={18} />Download</a>}
            <div className="mt-6 p-4 rounded bg-[#111827] text-sm text-gray-400">
              {
                message.length != 0 ? <span className="font-medium text-red-500">Incorrect Code Entered</span> : <><div className="flex items-center gap-2 mb-1">
                  <Upload size={16} />
                  <span className="font-medium text-white">How to download files</span>
                </div>
                  Ask for the code from the person who shared the file with you, enter it above, and click Find File to download it.</>
              }

            </div>
          </div>
        </div>
      )}

      <footer className="text-center text-gray-500 text-sm mt-8 mb-4">
        © 2025 QuickDrop. Sleek, secure file sharing.<br />
        Files are automatically deleted 7 days after upload.
      </footer>
    </div>
  );
};

export default App;
