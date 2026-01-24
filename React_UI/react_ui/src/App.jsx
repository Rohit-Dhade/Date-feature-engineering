import React from 'react'
import Header from './Components/Header'
import FileUpload from './Components/FileUpload'
import MainPart from './Components/MainPart'

const App = () => {
  return (
    <div className='bg-[#F0F3FC] h-screen w-full px-50 py-5 no-scrollbar'>
      <Header/>
      <FileUpload/>
      <MainPart/>
    </div>
  )
}

export default App