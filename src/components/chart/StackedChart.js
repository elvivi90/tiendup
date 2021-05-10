import React from "react";
import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryTheme,
    VictoryStack,
    VictoryTooltip,
} from "victory";

const StackedChart = ({ values, rotate }) => {
    return (
        <div>
            <VictoryChart
                domainPadding={20}
                theme={VictoryTheme.material}
                animate={{ duration: 2000 }}
            >
                <VictoryAxis
                    style={{
                        tickLabels: {
                            angle: rotate > 4 ? -70 : 0,
                            padding: 1,
                            fontSize: 8,
                            textAnchor: rotate > 4 ? "end" : "middle",
                        },
                    }}
                    tickFormat={(d) => d}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => x}
                    style={{
                        tickLabels: {
                            fontSize: 8,
                        },
                    }}
                />
                <VictoryStack>
                    {values.map((enr, i) => {
                        return (
                            <VictoryBar
                                data={enr}
                                x="date"
                                y="value"
                                key={enr.Date}
                                labelComponent={
                                    <VictoryTooltip
                                        cornerRadius={0}
                                        pointerLength={0}
                                        style={{
                                            fontSize: 8,
                                        }}
                                    />
                                }
                                events={[
                                    {
                                        target: "data",
                                        eventHandlers: {
                                            onMouseOver: () => {
                                                return [
                                                    // {
                                                    //     target: "data",
                                                    //     mutation: () => ({
                                                    //         style: {
                                                    //             fill: "gold",
                                                    //             width: 8,
                                                    //         },
                                                    //     }),
                                                    // },
                                                    {
                                                        target: "labels",
                                                        mutation: () => ({
                                                            active: true,
                                                        }),
                                                    },
                                                ];
                                            },
                                            onMouseOut: () => {
                                                return [
                                                    {
                                                        target: "data",
                                                        mutation: () => {},
                                                    },
                                                    {
                                                        target: "labels",
                                                        mutation: () => ({
                                                            active: false,
                                                        }),
                                                    },
                                                ];
                                            },
                                        },
                                    },
                                ]}
                            />
                        );
                    })}
                </VictoryStack>
            </VictoryChart>
        </div>
    );
};

export default StackedChart;
