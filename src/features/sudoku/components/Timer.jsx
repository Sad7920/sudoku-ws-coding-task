import React, { useEffect, useRef } from 'react';

/**
 * Timer component that displays an incrementing timer in MM:SS format.
 * 
 * Props:
 * - seconds: current number of elapsed seconds
 * - setSeconds: function to update the seconds state
 * - paused: boolean flag to pause/resume the timer
 */
const Timer = ({ seconds, setSeconds, paused }) => {
    // Ref to store interval ID so we can clear it later
    const intervalRef = useRef(null);

    useEffect(() => {
        // If timer is not paused, start incrementing seconds every 1000ms
        if (!paused) {
            intervalRef.current = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        }

        // Clear interval when paused or component unmounts to avoid memory leaks
        return () => clearInterval(intervalRef.current);
    }, [paused]);

    // Converts total seconds to MM:SS string format
    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    // Render formatted time inside a span
    return <span className="timer">{formatTime(seconds)}</span>;
};

export default Timer;