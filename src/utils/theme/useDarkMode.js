import {useState, useEffect} from 'react';



export const useDarkMode = () => {

    const [theme, setTheme] = useState('light');

    const [componentMounted, setComponentMounted] = useState(false);


    const setMode = (mode) =>{
        window.localStorage.setItem('theme',mode);
        setTheme(mode);
    }


    const themeToggeler = () => {
            theme ==='light' ? setMode('dark') : setMode('light');
    }


    useEffect(()=>{

        let localTheme = window.localStorage.getItem('theme');
        localTheme ? setTheme(localTheme) : setMode('light')
        setComponentMounted(true);

    },[])


    return [theme, themeToggeler, componentMounted]

}