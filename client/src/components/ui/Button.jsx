import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary: "bg-primary text-white hover:bg-blue-600 focus:ring-blue-500",
        secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        outline: "bg-transparent border border-primary text-primary hover:bg-blue-50"
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
