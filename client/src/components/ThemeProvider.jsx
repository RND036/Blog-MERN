import React from 'react'
import { useSelector } from 'react-redux'

export default function ThemeProvider({ children }) {
    const {theme} = useSelector((state) => state.theme);// take theme from redux store
  return (
    //to add the children to the theme
    <div className={theme}>
        <div className='bg-white text-gray-700 dark:bg-[rgb(16,23,42)] dark:text-gray-200 min-h-screen '>

        { children }
        </div>
    </div>
  ); 
}
