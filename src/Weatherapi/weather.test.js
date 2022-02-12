import {act, render,fireEvent} from '@testing-library/react'
import Weathwr from './Weathwr'

describe("weather component",()=>{
    it("header comp",()=>{
        const {queryByTestId}=render(<Weathwr/>);
        const heads=queryByTestId("cloud");
        expect(heads).toBeTruthy();
    });
    // it("changing state changing value",()=>{
    //     act(()=>{
    //        // const {getByTestId}=render(<Weathwr/>);
    //         const {queryByTestId}=render(<Weathwr/>)
    //        
    //         const header=queryByTestId("heads");
    //        
    //         expect(header.innerHTML).toBe(kolkata)
    //     })
    // })
})