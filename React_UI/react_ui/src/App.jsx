import React from 'react'
import Header from './Components/Header'
import FileUpload from './Components/FileUpload'
import MainPart from './Components/MainPart'

// bg-[#F0F3FC]

const App = () => {
  return (
    <div className='bg-blue-400 min-h-screen'>
      <div className="h-screen w-full px-50 py-5 no-scrollbar overflow-auto">
        <Header />
        <FileUpload />
        <MainPart />
      </div>
    </div>
  )
}

export default App