import React from 'react';
import { Upload, Download, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Navbar = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-tr from-primary to-secondary rounded-lg shadow-lg shadow-primary/20">
                    <Cloud className="text-white" size={24} />
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    QuickDrop
                </h1>
            </div>

            <div className="flex bg-slate-800/50 p-1 rounded-lg border border-slate-700/50">
                <button
                    onClick={() => setActiveTab('upload')}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all relative",
                        activeTab === 'upload' ? "text-white" : "text-slate-400 hover:text-slate-200"
                    )}
                >
                    {activeTab === 'upload' && (
                        <motion.div
                            layoutId="tab"
                            className="absolute inset-0 bg-primary/20 rounded-md border border-primary/20"
                            initial={false}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <Upload size={16} />
                    <span>Upload</span>
                </button>
                <button
                    onClick={() => setActiveTab('download')}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all relative",
                        activeTab === 'download' ? "text-white" : "text-slate-400 hover:text-slate-200"
                    )}
                >
                    {activeTab === 'download' && (
                        <motion.div
                            layoutId="tab"
                            className="absolute inset-0 bg-secondary/20 rounded-md border border-secondary/20"
                            initial={false}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <Download size={16} />
                    <span>Download</span>
                </button>
            </div>

            <div className="w-10">
                {/* Spacer for centering logic if needed, or user profile in future */}
            </div>
        </nav>
    );
};

export default Navbar;
