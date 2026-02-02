import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

const Button = ({
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    children,
    ...props
}) => {
    const variants = {
        primary: 'bg-primary hover:bg-violet-600 text-white shadow-lg shadow-violet-500/25',
        secondary: 'bg-surface hover:bg-slate-700 text-slate-200 border border-slate-700',
        ghost: 'bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-white',
        danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20',
    };

    const sizes = {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </motion.button>
    );
};

export default Button;
