import React from "react";
import {useNavigate} from "react-router-dom";

const Home:React.FC = ()=>{
    const navigate = useNavigate()
    const ClickToSecondPage = ()=>{
    //     点击后前往error页面
        navigate('/error')
    }
    return (
        <>
        Home
            <button onClick={ClickToSecondPage}>
                Click ME
            </button>
        </>
    )
}

export default Home;