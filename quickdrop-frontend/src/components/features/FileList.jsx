import React from 'react';
import { File, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

const FileList = ({ files, onRemove }) => {
    const shortenName = (name) => {
        return name.length > 30 ? name.slice(0, 27) + "..." : name;
    };

    return (
        <div className="space-y-2 w-full max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            <AnimatePresence>
                {files.map((file, idx) => (
                    <motion.div
                        key={`${file.name}-${idx}`} // rudimentary key
                        initial={{ opacity: 0, height: 0, x: -20 }}
                        animate={{ opacity: 1, height: 'auto', x: 0 }}
                        exit={{ opacity: 0, height: 0, x: 20 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 group hover:border-slate-600 transition-colors"
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="p-2 rounded-md bg-slate-700/50 text-slate-300">
                                <File size={16} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-medium text-slate-200 truncate">{shortenName(file.name)}</span>
                                <span className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => { e.stopPropagation(); onRemove(idx); }}
                            className="text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                        >
                            <Trash2 size={16} />
                        </Button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default FileList;
