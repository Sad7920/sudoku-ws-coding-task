import React from 'react';
import { render, act } from '@testing-library/react';
import Timer from './Timer';

jest.useFakeTimers();

describe('Timer', () => {
    test('Timer increments seconds every second when not paused', () => {
        const setSeconds = jest.fn();
        render(<Timer seconds={0} setSeconds={setSeconds} paused={false} />);

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(setSeconds).toHaveBeenCalledWith(expect.any(Function));
    });

    test('Timer does not increment when paused', () => {
        const setSeconds = jest.fn();
        render(<Timer seconds={0} setSeconds={setSeconds} paused={true} />);

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        expect(setSeconds).not.toHaveBeenCalled();
    });

})

