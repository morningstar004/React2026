import './App.css'
import { useState } from 'react'

function App() {

  const [color, setColor] = useState('#242424')

  return (
    <div className='w-screen h-screen duration-200 items-center flex flex-col justify-evenly' style={{backgroundColor : color}}>
      <h1 className='text-[#F2AF29] font-bold font-mono'>BackGround Changer</h1>
      <div id='ButtonContainer' className='bg-[#AD343E] shadow-xl rounded-lg flex flex-wrap max-w-230 justify-center p-2 m-8 gap-2'>
        <button onClick={() => setColor('#003049')} className='bg-[#003049] rounded-lg shadow-md'>Space Blue</button>
        <button onClick={() => setColor('#D62828')} className='bg-[#D62828] rounded-lg shadow-md'>Flag Red</button>
        <button onClick={() => setColor('#F77F00')} className='bg-[#F77F00] rounded-lg shadow-md'>Tangerine Orange</button>
        <button onClick={() => setColor('#EAE2B7')} className='bg-[#EAE2B7] rounded-lg shadow-md'>Custard fade</button>
        <button onClick={() => setColor('#84A59D')} className='bg-[#84A59D] rounded-lg shadow-md'>Teal</button>
        <button onClick={() => setColor('#F6BD60')} className='bg-[#F6BD60] rounded-lg shadow-md'>Honey Brown</button>
        <button onClick={() => setColor('#FFBE0B')} className='bg-[#FFBE0B] rounded-lg shadow-md'>Golds Yellow</button>
      </div>
    </div>
  )
}

export default App
