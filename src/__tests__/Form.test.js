import React from 'react';
import ReactDom from 'react-dom';
import { render, screen, cleanup } from '@testing-library/react'
import Form from '../components/Form';

it ('renders Form component', () =>{

    render(<Form />)
    const formElement = screen.getByTestId('form-1')
    expect(formElement).toBeInTheDocument();
})