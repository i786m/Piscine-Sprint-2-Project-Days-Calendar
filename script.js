

import { getCalendarMatrix } from "./common.mjs"

// const generateCells = () => {
//     const calendarGrid = document.getElementById("calendarGrid")

//     for (let i = 0; i < 42; i++) {
//         const dayCell = document.createElement("div")
//         dayCell.classList.add("dayCell")
//         calendarGrid.appendChild(dayCell)
//     }

// }
// generateCells()


const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
let currentMonth = new Date().getMonth();
const monthDropdown = () => {
    const monthSelect = document.getElementById("month")
    monthSelect.innerHTML = ""
    MONTHS.forEach((monthName, index) => {
        const option = document.createElement("option")
        option.textContent = monthName
        option.value = index
        monthSelect.appendChild(option)
    });
    monthSelect.value = currentMonth

}
monthDropdown();
document.getElementById("month").addEventListener("change", (e) => {
    currentMonth = Number(e.target.value)
    renderCalendar()
})

let currentYear = new Date().getFullYear()
const yearDropdown = () => {
    const selectYear = document.getElementById("year")
    selectYear.innerHTML = ""
    for (let i = 1900; i <= 2100; i++) {
        const option = document.createElement("option")
        option.textContent = i
        option.value = i
        selectYear.appendChild(option)
    }
    selectYear.value = currentYear
}

yearDropdown();
document.getElementById("year").addEventListener("change", (e) => {
    currentYear = Number(e.target.value)
    renderCalendar()
})

const renderCalendar = () => {
    const calendarGrid = document.getElementById("calendarGrid")
    calendarGrid.innerHTML = ""

    const monthName = MONTHS[currentMonth]
    const yearString = String(currentYear)

    const matrix = getCalendarMatrix(yearString, monthName)

    matrix.forEach(week => {
        week.forEach(day => {
            const cell = document.createElement("div")
            cell.classList.add("dayCell")

            if (day !== null) {
                cell.textContent = day
            }

            calendarGrid.appendChild(cell)
        })
    })
}


renderCalendar();




