import React, { useEffect, useRef } from 'react';

const Timer = ({ seconds, setSeconds, paused }) => {
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!paused) {
            intervalRef.current = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [paused]);

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return <span className="timer">{formatTime(seconds)}</span>;
};

export default Timer;
