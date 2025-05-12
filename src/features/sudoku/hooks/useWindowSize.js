import { useState, useEffect } from 'react';

/**
 * Custom React hook to track the current window size.
 * Returns an object with the current width and height of the window.
 */
const useWindowSize = () => {
    // Initialize state with current window dimensions
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        // Handler to call on window resize
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Add event listener on mount
        window.addEventListener('resize', handleResize);

        // Remove event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Return current window width and height
    return { width: size.width, height: size.height };
};

export default useWindowSize;
