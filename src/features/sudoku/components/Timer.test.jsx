import React from 'react';
import { render, act } from '@testing-library/react';
import Timer from './Timer';

// Use fake timers to simulate time passing without waiting
jest.useFakeTimers();

describe('Timer', () => {

    // Test that the timer calls setSeconds every second when not paused
    test('Timer increments seconds every second when not paused', () => {
        const setSeconds = jest.fn();
        render(<Timer seconds={0} setSeconds={setSeconds} paused={false} />);

        // Advance fake timers by 1 second
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        // Check if setSeconds was called with a function (increment logic)
        expect(setSeconds).toHaveBeenCalledWith(expect.any(Function));
    });

    // Test that the timer does not call setSeconds when paused
    test('Timer does not increment when paused', () => {
        const setSeconds = jest.fn();
        render(<Timer seconds={0} setSeconds={setSeconds} paused={true} />);

        // Advance fake timers by 2 seconds
        act(() => {
            jest.advanceTimersByTime(2000);
        });

        // Expect no calls to setSeconds since timer is paused
        expect(setSeconds).not.toHaveBeenCalled();
    });

});