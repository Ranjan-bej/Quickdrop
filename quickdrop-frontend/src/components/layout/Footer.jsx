import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full py-6 text-center text-slate-500 text-sm border-t border-slate-800/50 mt-auto bg-slate-900/30">
            <p>© {new Date().getFullYear()} QuickDrop. Sleek, secure file sharing.</p>
            <p className="text-xs mt-1 text-slate-600">Files are automatically deleted 7 days after upload.</p>
        </footer>
    );
};

export default Footer;
