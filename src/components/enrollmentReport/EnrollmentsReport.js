import React, { useState, useEffect } from 'react';
import './enrollmentsReport.css';
import { RadioButtonGroup, CheckboxGroup, DatePicker, Spinner } from 'react-rainbow-components';
import StackedChart from '../chart/StackedChart';
import NivoChart from '../chart/Nivochart';
import { options } from '../chart/chartOption';
import { getEnrollments } from '../../repo/repoEnrollments';
import Card from '../UI/Card';

const optionsCheckBox = [
    { value: 'paid', label: 'Pagos', disabled: false },
    { value: 'free', label: 'Gratis', disabled: false },
    { value: 'trial', label: 'Prueba', disabled: false },
    { value: 'subscription', label: 'Subscripcion', disabled: false },
];

const EnrollmentsReport = () => {
    const [state, setState] = useState({
        enrollments: [],
        totalAmount: 0,
        nivoData: [],
        rotate: 0,
        period: { value: 'daily' },
        isLoading: true,
        values: ['paid', 'free', 'subscription', 'trial'],
        date: { range: undefined },
    });

    const changeCheckboxHandler = (newValues) => {
        setState((currentState) => ({ ...currentState, values: newValues }));
    };

    const changeDateHandler = (newRanges) => {
        setState((currentState) => ({ ...currentState, range: newRanges }));
    };

    const rename = ({ target: { value } }) => {
        setState((currentState) => ({ ...currentState, period: { value } }));
    };

    useEffect(() => {
        setState((currentState) => ({ ...currentState, isLoading: true }));
        const getEnrollmentsType = async () => {
            const enrollmentsType = await getEnrollments(state.period, state.values);
            const [enrollments, totalAmount, nivoData, rotate] = enrollmentsType;

            setState((currentState) => ({
                ...currentState,
                enrollments,
                totalAmount,
                nivoData,
                rotate,
                isLoading: false,
            }));
        };
        getEnrollmentsType();
    }, [state.period, state.values]);

    return (
        <div className="enrollmentsReport">
            <div className="rainbow-p-vertical_large rainbow-p-left_xx-large">
                <CheckboxGroup
                    id="checkbox-group-1"
                    options={optionsCheckBox}
                    value={state.values}
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
                value={state.date.range}
                onChange={changeDateHandler}
            />
            <div className="rainbow-p-around_x-large rainbow-align-content_center">
                <RadioButtonGroup id="radio-button-group-component-1" options={options} value={state.period.value} onChange={rename} />
            </div>
            <div className="NivoChart">
                <Card>Total:{state.totalAmount}</Card>
                {state.isLoading ? (
                    <Spinner size="large" type="arc" variant="brand" />
                ) : (
                    <StackedChart values={state.enrollments} rotate={state.rotate} />
                )}
            </div>
        </div>
    );
};

export default EnrollmentsReport;
