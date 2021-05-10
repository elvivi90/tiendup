const monthName = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

const containerStyles = {
    maxWidth: 400,
};
const options = [
    { value: "daily", label: "Dia" },
    { value: "monthly", label: "Mes" },
];

const dataNivo = [
    {
        current_date: "2021-03-01",
        total_enrollments: 20,
        paid: 2,
        free: 4,
        trial: 1,
        subscription: 1,
    },
    {
        current_date: "2021-03-02",
        total_enrollments: 1,
        paid: 1,
        free: 10,
        trial: 2,
        subscription: 1,
    },
    {
        current_date: "2021-03-03",
        total_enrollments: 4,
        paid: 1,
        free: 2,
        trial: 0,
        subscription: 1,
    },

    {
        current_date: "2021-03-04",
        total_enrollments: 4,
        paid: 1,
        free: 2,
        trial: 0,
        subscription: 1,
    },
    {
        current_date: "2021-03-05",
        total_enrollments: 1,
        paid: 1,
        free: 10,
        trial: 2,
        subscription: 1,
    },
    {
        current_date: "2021-03-06",
        total_enrollments: 1,
        paid: 1,
        free: 10,
        trial: 2,
        subscription: 1,
    },
    {
        current_date: "2021-03-07",
        total_enrollments: 1,
        paid: 1,
        free: 10,
        trial: 2,
        subscription: 1,
    },
    {
        current_date: "2021-03-08",
        total_enrollments: 1,
        paid: 1,
        free: 10,
        trial: 2,
        subscription: 1,
    },
    {
        current_date: "2021-03-09",
        total_enrollments: 1,
        paid: 1,
        free: 10,
        trial: 2,
        subscription: 1,
    },
    {
        current_date: "2021-03-10",
        total_enrollments: 1,
        paid: 1,
        free: 10,
        trial: 2,
        subscription: 1,
    },
];

export { monthName, containerStyles, options, dataNivo };
