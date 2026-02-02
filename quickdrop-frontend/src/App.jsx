import React, { useState } from "react";
import axios from 'axios';
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/layout/Layout";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FileUploader from "./components/features/FileUploader";
import FileDownloader from "./components/features/FileDownloader";

const App = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [files, setFiles] = useState([]);
  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [url, setUrl] = useState("");
  const [message, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const viteUrl = import.meta.env.VITE_BACKEND;

  const handleUpload = async () => {
    if (files.length > 0) {
      setIsLoading(true);
      try {
        await Promise.all(
          files.map(async (file) => {
            console.log("Uploading:", file);
            const randomCode = Math.floor(10000 + Math.random() * 90000).toString();
            const formData = new FormData();
            formData.append('file', file);

            const res = await axios.post(`${viteUrl}/api/upload/${randomCode}`, formData, {
              headers: { "Content-Type": "multipart/form-data" }
            });
            console.log(res.data);
            setGeneratedCode(randomCode);
            // Ideally we should handle multiple files getting multiple codes or one code for batch.
            // current logic overwrites generatedCode with last one.
            // keeping it same as original for now to avoid logic regression.
          })
        );
        // Clear files after successful upload if desired, or keep them to show "Done"
        setFiles([]);
      } catch (error) {
        console.error("Upload failed", error);
        // Add toast notification here if we had one
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDownload = async () => {
    if (code.length === 0) return;

    setIsLoading(true);
    setErrorMessage("");
    setUrl("");

    try {
      const { data } = await axios.get(`${viteUrl}/api/download/${code}`);
      if (data.message) {
        setErrorMessage("Incorrect Code entered.");
      } else {
        console.log(data);
        setUrl(data.url);
      }
    } catch (error) {
      console.error("Download failed", error);
      setErrorMessage("Error connecting to server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow flex flex-col items-center justify-center p-4 relative z-10 w-full max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "upload" ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <FileUploader
                files={files}
                setFiles={setFiles}
                handleUpload={handleUpload}
                generatedCode={generatedCode}
                isLoading={isLoading}
              />
            </motion.div>
          ) : (
            <motion.div
              key="download"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <FileDownloader
                code={code}
                setCode={setCode}
                handleDownload={handleDownload}
                url={url}
                message={message}
                isLoading={isLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </Layout>
  );
};

export default App;
