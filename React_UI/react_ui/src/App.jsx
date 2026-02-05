import React from 'react'
import Header from './Components/Header'
import FileUpload from './Components/FileUpload'
import MainPart from './Components/MainPart'
import Loader from './Components/Loader'


const App = () => {
  return (
    <div className="bg-blue-400 min-h-screen">
      <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-4 sm:py-6 md:py-8 overflow-auto no-scrollbar">
        <Header />
        <FileUpload />
        <MainPart />
      </div>
    </div>

  )
}

export default App