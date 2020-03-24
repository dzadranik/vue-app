export default function Calendar() {
    let daysInMonth,
        firstDay,
        month,
        employeeId,
        day,
        year,
        today,
        todayMonth,
        todayYear;
    // daysInMonth-количество дней в месяце,
    // firstDay-день недели первого дня,
    // month-индекс месяца,
    // employeeId- id сотрудника для формирования js-month-** класса,
    // day- счетчик дней

    const setEmployeeId = id => {
        return (employeeId = id);
    };

    const setMonthInformation = monthIndex => {
        let todayDate = new Date();
        today = todayDate.getDate();
        todayMonth = todayDate.getMonth();
        todayYear = todayDate.getFullYear();
        month = monthIndex;
        daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        let frD = new Date(year, monthIndex, 1).getDay();
        frD === 0 ? (firstDay = 6) : (firstDay = frD - 1); //сделать отсчет дней недели с понедельника
    };

    const getYearContent = (i = 0, monthArray = []) => {
        if (i < 12) {
            monthArray.push(getOneMonth(i));
            return getYearContent(i + 1, monthArray);
        } else {
            return monthArray;
        }
    };

    const getOneMonth = m => {
        day = 1;
        setMonthInformation(m);
        //js-month-{employeeId}-{month} формируется класс для поиска дня => отобразить event
        return `<div class="calendar__month js-month-${employeeId}-${m}"> 
						${getWeeks()}
					</div>`;
    };

    const getWeeks = (i = 0, content = "") => {
        if (day <= daysInMonth) {
            content += getOneWeek();
            return getWeeks(i + 1, content);
        } else {
            return content;
        }
    };

    const getOneWeek = () => {
        return `<div class="calendar__week">
					${getDays()}
				</div>`;
    };

    const getDays = (i = 0, daysContent = "") => {
        if (i < 7) {
            if ((firstDay > 0 && day < 7) || day > daysInMonth) {
                daysContent += getOneDay("calendar__empty");
                firstDay--;
            } else {
                daysContent += getOneDay("calendar__day");
            }
            return getDays(i + 1, daysContent);
        }
        return daysContent;
    };

    const getIsLastDay = () => {
        if (todayYear > year) return true;
        if (todayYear < year) return false;
        if (todayYear === year) {
            if (todayMonth < month) {
                return false;
            }
            if (todayMonth === month) {
                return day < today;
            }
            return true;
        }
    };

    const getOneDay = dayClass => {
        let isEmptyDay = dayClass === "calendar__empty",
            isLastDay = getIsLastDay();
        !isEmptyDay ? day++ : "";
        //чтобы не вводить лишнюю переменную сначала прибавить день, а в формировании класса его вычесть
        return `<div class="${dayClass} ${
            !isEmptyDay ? `js-day-${day - 1}-${month}-${employeeId}` : ``
        } ${isLastDay && !isEmptyDay ? "calendar__day--last" : ""}" ></div>`;
    };

    return {
        getYear: (id, viewYear) => {
            year = viewYear;
            setEmployeeId(id);
            return getYearContent();
        }
    };
}
