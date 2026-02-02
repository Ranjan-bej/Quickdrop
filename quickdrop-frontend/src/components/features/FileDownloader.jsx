import React from 'react';
import { Download, Search, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

const FileDownloader = ({ code, setCode, handleDownload, url, message, isLoading }) => {
    return (
        <div className="max-w-xl mx-auto w-full p-4 mt-8">
            <Card glass className="flex flex-col gap-6">
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mx-auto mb-4">
                        <Download size={24} />
                    </div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Download Files
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Enter the 6-digit code to retrieve your files.
                    </p>
                </div>

                <div className="space-y-4">
                    <Input
                        icon={Search}
                        placeholder="Enter 5-digit file code"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        maxLength={6}
                        className="text-center text-lg tracking-widest font-mono uppercase h-12"
                    />

                    <Button
                        onClick={handleDownload}
                        className="w-full"
                        variant="secondary"
                        size="lg"
                        isLoading={isLoading}
                        disabled={code.length < 5}
                    >
                        <Download size={18} className="mr-2" /> Find File
                    </Button>
                </div>

                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg flex items-center gap-3 text-sm"
                        >
                            <AlertCircle size={18} />
                            <span>{message}</span>
                        </motion.div>
                    )}

                    {url && !message && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <a
                                href={url}
                                className="block w-full"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20">
                                    <Download size={18} className="mr-2" /> Download Now
                                </Button>
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!message && !url && (
                    <div className="bg-slate-900/50 p-4 rounded-lg text-xs text-slate-500 flex items-start gap-2 border border-slate-800">
                        <AlertCircle size={14} className="mt-0.5 shrink-0" />
                        <p>
                            Ask for the code from the person who shared the file with you, enter it above, and click Find File to download it.
                        </p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default FileDownloader;
