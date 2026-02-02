import React from 'react';
import { Upload, PlusCircle, FileUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import FileList from './FileList';

const FileUploader = ({ files, setFiles, handleUpload, generatedCode, isLoading }) => {
    const handleFileChange = (e) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
        }
    };

    return (
        <div className="max-w-2xl mx-auto w-full p-4">
            <Card glass className="flex flex-col gap-6">
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
                        <Upload size={24} />
                    </div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Upload Files
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Share files securely. Links expire automatically in 7 days.
                    </p>
                </div>

                <label
                    htmlFor="fileInput"
                    className="relative group cursor-pointer"
                >
                    <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 hover:border-primary/50 hover:bg-slate-800/30 transition-all duration-300 ease-in-out text-center">
                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            onChange={handleFileChange}
                            multiple
                        />

                        {files.length > 0 ? (
                            <div className="space-y-4">
                                <FileList files={files} onRemove={(idx) => {
                                    setFiles(prev => {
                                        const newFiles = [...prev];
                                        newFiles.splice(idx, 1);
                                        return newFiles;
                                    });
                                }} />
                                <div className="flex items-center justify-center text-primary text-sm font-medium pt-2">
                                    <PlusCircle className="mr-2" size={16} /> Add more files
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 py-8">
                                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                                    <FileUp className="text-slate-400 group-hover:text-primary transition-colors" size={32} />
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-slate-300">
                                        Click to browse files
                                    </p>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Max file size 100MB
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </label>

                {files.length > 0 && (
                    <Button
                        onClick={handleUpload}
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                        size="lg"
                        isLoading={isLoading}
                    >
                        <Upload size={18} className="mr-2" /> Upload and Generate Code
                    </Button>
                )}

                {generatedCode && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-slate-900/80 rounded-xl border border-primary/50 text-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-primary/10 blur-xl"></div>
                        <div className="relative z-10">
                            <p className="text-sm text-slate-400 mb-2 uppercase tracking-wider font-semibold">Your Download Code</p>
                            <div className="text-4xl font-mono font-bold text-white tracking-widest selection:bg-primary/30">
                                {generatedCode}
                            </div>
                            <p className="text-xs text-slate-500 mt-3">Share this code to let others download your files</p>
                        </div>
                    </motion.div>
                )}
            </Card>
        </div>
    );
};

export default FileUploader;
