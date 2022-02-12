import {act, render,fireEvent} from '@testing-library/react'
import Weathwr from './Weathwr'

// describe("weather component",()=>{
//     it("input comp",()=>{
//         const {queryByTestId}=render(<Weathwr/>);
//         const main=queryByTestId("main");
//         expect(main).toBeTruthy();
//     });
//     it("changing input changing value",()=>{
//         act(()=>{
//            // const {getByTestId}=render(<Weathwr/>);
//             const {queryByTestId}=render(<Weathwr/>)
//            // const input=queryByTestId("inp");
//             const header=queryByTestId("heads");
//             const inputword="kolkata"
//            // fireEvent.change(input,{target:{value:inputword}})
//             expect(header.innerHTML).toBe(kolkata)
//         })
//     })
// })