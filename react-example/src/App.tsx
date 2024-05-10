import {useState} from 'react'
import './App.css'
import ReactLogoSvg from './assets/react.svg';
import {BubbleChartItem} from "@kompike/stencil-web-components";

const DATA: Array<BubbleChartItem> = [
    {
        "x": 3.69,
        "y": 57.83,
        "size": 4,
        "label": "Saint Kitts and Nevis"
    },
    {
        "x": 9.59,
        "y": 69.7,
        "size": 4,
        "label": "China"
    },
    {
        "x": 12.67,
        "y": 15.8,
        "size": 7,
        "label": "Bhutan"
    },
    {
        "x": 77.39,
        "y": 85.34,
        "size": 3,
        "label": "Virgin Islands (British)"
    },
    {
        "x": 92.23,
        "y": 51.81,
        "size": 4,
        "label": "Barbados"
    },
    {
        "x": 31.73,
        "y": 43.91,
        "size": 4,
        "label": "Burundi"
    },
    {
        "x": 70.33,
        "y": 92.36,
        "size": 1,
        "label": "Comoros"
    },
    {
        "x": 65.08,
        "y": 59.81,
        "size": 1,
        "label": "Uruguay"
    },
    {
        "x": 38.35,
        "y": 66.98,
        "size": 4,
        "label": "French Guiana"
    },
    {
        "x": 17.67,
        "y": 63.6,
        "size": 6,
        "label": "Grenada"
    }
];

function App() {
    const [data] = useState(DATA)

    return (
        <>
            <header>
                <img alt="React logo" className="logo" src={ReactLogoSvg} width="125" height="125"/>
                <h1>Stencil + React</h1>
            </header>

            <stencil-bubble-chart data={data} chartTitle="Stencil Chart in React"></stencil-bubble-chart>
        </>
    )
}

export default App
