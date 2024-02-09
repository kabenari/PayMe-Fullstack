import React from 'react'
import Navbar from '../navbar/Navbar'

const PageLayout = ({children}) => {
  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div>
            {children}
        </div>
    </div>
  )
}

export default PageLayout