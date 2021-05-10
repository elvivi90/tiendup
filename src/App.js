import "./App.css";
import React from "react";
import EnrollmentReport from "./components/enrollmentReport/EnrollmentsReport";
import NivoChart from "./components/chart/Nivochart";
//import {VictoryChart, VictoryStack, VictoryAxis, VictoryBar} from 'victory';
//import Datos from './json/datos.json';

const App = () => {
    return (
        <div className="NivoChart">
            <EnrollmentReport />
            {/* <NivoChart /> */}
        </div>
    );
};
export default App;
