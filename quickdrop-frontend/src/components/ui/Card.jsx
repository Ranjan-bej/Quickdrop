import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Card = ({ className, children, glass = false, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
                'rounded-xl border border-slate-800 bg-surface/50 p-6 shadow-xl backdrop-blur-xl',
                glass && 'bg-slate-900/40 border-slate-700/50',
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
