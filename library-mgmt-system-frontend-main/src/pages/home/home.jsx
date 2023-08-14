import React from "react"
import BasicCard from "../../components/cards/card"
import "./home.css"

export default function Home(){
    return (
        <div className="home">
            <h1>
                Home
            </h1>
            <div className="card-structure">
                <BasicCard/>
                <BasicCard/>
                <BasicCard/>
                <BasicCard/>

            </div>
        </div>
    )
}