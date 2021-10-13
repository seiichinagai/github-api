import React from 'react';
import ReactDom from 'react-dom';
import { render, screen, cleanup } from '@testing-library/react'
import Response from '../components/Response';

it ('renders Response component', () =>{
    render(<Response />)
    const responseElement = screen.getByTestId('response-1')
    expect(responseElement).toBeInTheDocument();
})