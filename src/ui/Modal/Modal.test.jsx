import React from 'react';
import { render } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {

    test('renders modal with title and children', () => {
        const { getByText } = render(
            <Modal title="Test Modal" onClose={() => { }}>
                <p>Modal Content</p>
            </Modal>
        );
        expect(getByText('Test Modal')).toBeInTheDocument();
        expect(getByText('Modal Content')).toBeInTheDocument();
    });

})

