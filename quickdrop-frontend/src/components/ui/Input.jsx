import React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ className, icon: Icon, ...props }, ref) => {
    return (
        <div className="relative w-full">
            {Icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Icon size={18} />
                </div>
            )}
            <input
                className={cn(
                    'flex h-10 w-full rounded-lg border border-slate-700 bg-surface px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
                    Icon && 'pl-10',
                    className
                )}
                ref={ref}
                {...props}
            />
        </div>
    );
});

Input.displayName = "Input";

export default Input;
