import {useEffect, useState} from 'react'
import './App.css'
import {RouteObject, useRoutes} from "react-router-dom";
import {getRoutes} from "./router";

function App() {
    const [routes, setRoutes] = useState<RouteObject[] | null>(null);
    const routing = useRoutes(routes || []);
    useEffect(() => {
        getRoutes().then(r => {
            setRoutes(r);
        });
    }, []);
  return (
    <>
        {routing}
    </>
  )
}

export default App
