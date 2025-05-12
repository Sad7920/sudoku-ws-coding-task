import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {

    test('renders loader logo', () => {
        const { getByAltText } = render(<Loader />);
        expect(getByAltText(/logo/i)).toBeInTheDocument();
    });

})

