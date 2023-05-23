import dayjs from "dayjs";

function getMonth(date = dayjs()) {
    // months is a value from 0 to 11
    const month = date.month();
    const year = date.year();
    const firstDayOfMonth = dayjs(new Date(year, month, 0)).day(); // return index from 0 to 6
    let currentMonthCount = 0 - firstDayOfMonth;
    const daysMatrix = new Array(6).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        });
    });
    return daysMatrix;
}

export { getMonth };
