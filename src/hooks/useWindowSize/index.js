import React, { useEffect, useState } from 'react'

export  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerWidth
            })
        }
        window.addEventListener("resize", handleResize);
        
        handleResize();
        return () => window.removeEventListener("resize", handleResize)

    }, []);
    return windowSize;
}
