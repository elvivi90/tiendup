import axios from "axios";
import moment from "moment";
import "moment/locale/es";

const getEnrollments = async (period, values) => {
    let url = "json/daily.json";
    if (period.value !== "daily") {
        url = "json/monthly.json";
    }

    const res = await axios.get(url);
    const paid = [];
    const free = [];
    const trial = [];
    const subscription = [];
    const paids = [];

    const dataNivo = [];
    let sum = 0;
    moment.locale("es");

    res.data.data.forEach((d) => {
        const currentDate = getCurrentDate(res.data.type, d.current_date);
        paid.push({
            date: currentDate,
            value: values.includes("paid") ? d.types.paid : 0,
            label: `Pagos: ${d.types.paid}`,
        });
        free.push({
            date: currentDate,
            value: values.includes("free") ? d.types.free : 0,
            label: `Gratis: ${d.types.free}`,
        });
        trial.push({
            date: currentDate,
            value: values.includes("trial") ? d.types.trial : 0,
            label: `Prueba: ${d.types.trial}`,
        });
        subscription.push({
            date: currentDate,
            value: values.includes("subscription") ? d.types.subscription : 0,
            label: `Subscripcion: ${d.types.subscription}`,
        });
        sum++;
    });
    const totalAmount = [];
    paids.push(paid, free, trial, subscription);
    totalAmount.push(paids);
    totalAmount.push(res.data.total_amount);
    dataNivo.push(res.data.data);
    totalAmount.push(dataNivo);
    totalAmount.push(sum);
    return totalAmount;
};

const getCurrentDate = (type, date) => {
    const start_date = new Date(date);
    if (type === "monthly") {
        return moment(start_date).format("MMMM YYYY");
        // const year = start_date.getFullYear();
        // return monthName[start_date.getMonth() + 1] + " " + year;
    }

    return moment(start_date).format("DD MMM YYYY");
};

export { getEnrollments };
