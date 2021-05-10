import React, { useState, useEffect } from "react";
import "./enrollmentsReport.css";
import {
    RadioButtonGroup,
    CheckboxGroup,
    DatePicker,
    Spinner,
} from "react-rainbow-components";
import StackedChart from "../chart/StackedChart";
import NivoChart from "../chart/Nivochart";
import { options } from "../chart/chartOption";
import { getEnrollments } from "../../repo/repoEnrollments";
import Card from "../UI/Card";
//import TransformFile from './transformFile';

const optionsCheckBox = [
    { value: "paid", label: "Pagos", disabled: false },
    { value: "free", label: "Gratis", disabled: false },
    { value: "trial", label: "Prueba", disabled: false },
    { value: "subscription", label: "Subscripcion", disabled: false },
];

const EnrollmentsReport = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [date, setDate] = useState({ range: undefined });
    const [period, setPeriod] = useState({ value: "daily" });
    const [totalAmount, settotalAmount] = useState();
    const [nivodata, setNivodata] = useState();
    const [rotate, setRotate] = useState();
    const [changed, setChanged] = useState(true);
    const [prueba, setPrueba] = useState(true);
    const [isLoading, setIsloading] = useState(false);

    const [values, setValues] = useState([
        "paid",
        "free",
        "subscription",
        "trial",
    ]);

    const changeCheckboxHandler = (newValues) => {
        setValues(newValues);
    };
    const changeDateHandler = (newValues) => {
        setDate({ range: newValues });
    };
    const rename = (e) => {
        setPeriod({ value: e.target.value });
    };

    useEffect(() => {
        setIsloading(true);
        const getenrollmentsType = async () => {
            const enrollmentsType = await getEnrollments(period, values);
            setEnrollments(enrollmentsType[0]);
            settotalAmount(enrollmentsType[1]);
            setNivodata(enrollmentsType[2]);
            setRotate(enrollmentsType[3]);
            setPrueba(enrollmentsType);

            setIsloading(false);
            console.log("renderizando");
        };
        getenrollmentsType();
    }, [period, values]);

    // console.log(Periods);

    return (
        <div className="enrollmentsReport">
            <div className="rainbow-p-vertical_large rainbow-p-left_xx-large">
                <CheckboxGroup
                    id="checkbox-group-1"
                    options={optionsCheckBox}
                    value={values}
                    onChange={changeCheckboxHandler}
                    label="seleecione los tipos"
                    orientation="horizontal"
                />
            </div>
            <DatePicker
                id="datePicker-15"
                label="     "
                placeholder="Seleccione el rango"
                selectionType="range"
                formatStyle="large"
                variant="single"
                value={date.range}
                onChange={changeDateHandler}
            />
            <div className="rainbow-p-around_x-large rainbow-align-content_center">
                <RadioButtonGroup
                    id="radio-button-group-component-1"
                    options={options}
                    value={period.value}
                    onChange={rename}
                />
                {console.log(prueba)}
            </div>
            <div className="NivoChart">
                <Card>Total:{totalAmount}</Card>
                {isLoading ? (
                    <Spinner size="large" type="arc" variant="brand" />
                ) : (
                    <StackedChart values={enrollments} rotate={rotate} />
                )}
                {/* <NivoChart values={nivodata} /> */}
            </div>
        </div>
    );
};

export default EnrollmentsReport;
