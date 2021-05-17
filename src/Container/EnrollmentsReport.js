import React, { useState, useEffect } from "react";
import "./enrollmentsReport.css";
import {
    RadioButtonGroup,
    CheckboxGroup,
    DatePicker,
    Spinner,
} from "react-rainbow-components";
import StackedChart from "../components/chart/StackedChart";
import { getEnrollments } from "../repo/repoEnrollments";
import Card from "../components/UI/Card";
import { useTranslation } from "react-i18next";

const EnrollmentsReport = () => {
    const [state, setState] = useState({
        enrollments: [],
        totalAmount: 0,
        nivoData: [],
        rotate: 0,
        period: { value: "daily" },
        isLoading: true,
        values: ["paid", "free", "subscription", "trial"],
        date: { range: undefined },
    });

    const { t } = useTranslation();

    const optionsCheckBox = [
        { value: "paid", label: t("paids"), disabled: false },
        { value: "free", label: t("free"), disabled: false },
        { value: "trial", label: t("trial"), disabled: false },
        { value: "subscription", label: t("subscription"), disabled: false },
    ];

    const options = [
        { value: "daily", label: t("day") },
        { value: "monthly", label: t("month") },
    ];

    const changeCheckboxHandler = (newValues) => {
        setState((currentState) => ({ ...currentState, values: newValues }));
    };

    const changeDateHandler = (newRanges) => {
        setState((currentState) => ({ ...currentState, range: newRanges }));
    };

    const changeDateRange = ({ target: { value } }) => {
        setState((currentState) => ({ ...currentState, period: { value } }));
    };

    useEffect(() => {
        setState((currentState) => ({ ...currentState, isLoading: true }));
        const getEnrollmentsType = async () => {
            const enrollmentsType = await getEnrollments(
                state.period,
                state.values
            );
            const [
                enrollments,
                totalAmount,
                nivoData,
                rotate,
            ] = enrollmentsType;

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
            <CheckboxGroup
                id="checkbox-group-1"
                options={optionsCheckBox}
                value={state.values}
                onChange={changeCheckboxHandler}
                label="seleecione los tipos"
                orientation="horizontal"
            />

            <DatePicker
                id="datePicker-15"
                label="     "
                placeholder={t("Select_range")}
                selectionType="range"
                formatStyle="large"
                variant="single"
                value={state.date.range}
                onChange={changeDateHandler}
            />
            <div className="rainbow-p-around_x-large rainbow-align-content_center">
                <RadioButtonGroup
                    id="radio-button-group-component-1"
                    options={options}
                    value={state.period.value}
                    onChange={changeDateRange}
                />
            </div>
            <div className="NivoChart">
                <Card>
                    {t("total")}:{state.totalAmount}
                </Card>
                {state.isLoading ? (
                    <div className="logoContainer">
                        <div className="logo">
                            <div className="circle"></div>
                            <div className="line"></div>
                        </div>
                    </div>
                ) : (
                    // <div className="rainbow-p-vertical_xx-large">
                    //     <div className="rainbow-position_relative rainbow-p-vertical_xx-large">
                    //         <Spinner size="large" type="arc" variant="brand" />
                    //     </div>
                    // </div>

                    <StackedChart
                        values={state.enrollments}
                        rotate={state.rotate}
                    />
                )}
            </div>
        </div>
    );
};

export default EnrollmentsReport;
