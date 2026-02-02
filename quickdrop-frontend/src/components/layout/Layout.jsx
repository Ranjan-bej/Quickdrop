import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-[#0f172a] overflow-hidden relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,#1e1b4b_0%,transparent_25%)] opacity-40 blur-3xl animate-pulse" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>
            <div className="relative z-10 flex flex-col min-h-screen">
                {children}
            </div>
        </div>
    );
};

export default Layout;
