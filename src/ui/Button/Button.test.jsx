import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {

    test('renders button and handles click', () => {
        const handleClick = jest.fn();
        const { getByText } = render(<Button text="Click me" onClick={handleClick} />);
        fireEvent.click(getByText('Click me'));
        expect(handleClick).toHaveBeenCalled();
    });

    test('disabled button does not trigger click', () => {
        const handleClick = jest.fn();
        const { getByText } = render(<Button text="Disabled" onClick={handleClick} disabled />);
        fireEvent.click(getByText('Disabled'));
        expect(handleClick).not.toHaveBeenCalled();
    });

})

