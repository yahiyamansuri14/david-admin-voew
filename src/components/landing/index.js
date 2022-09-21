import React, { Children, useCallback, useEffect, useState } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
import Header from './header';
import Sidebar from './sidebar';

export default function Landing(props) {
    const { children } = props;
    // useEffect(() => {
    //     console.log("landing page rendered")
    // })
    const { width } = useWindowSize();
    const [sidebarOpen, setsidebarOpen] = useState(window.innerWidth >= 992)

    useEffect(() => {
        console.log("Width is", width)
        if(width < 992) setsidebarOpen(false);
        else setsidebarOpen(true);
    }, [width])

    const handleSidebarToggle = useCallback(() => {
        console.log("handle sidebar toggle function called", sidebarOpen)
        setsidebarOpen((prevState) => !prevState)
    }, [])

    const handleSidebarClose = useCallback(() => {
        setsidebarOpen(false);
    }, [])

  return (
    <div className='layout-wrapper'>
        <Header  onSidebarToggle={handleSidebarToggle}/>
        <Sidebar open={sidebarOpen} onClose={handleSidebarClose}/>
        <div className={`main-content ${sidebarOpen ? "" : "margin-left-0"}`}>
            <div className='page-content'>
                <div className='container-fluid'>{children}</div>
            </div>
        </div>
    </div>
  )
}
