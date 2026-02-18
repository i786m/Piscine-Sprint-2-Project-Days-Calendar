

const generateCells = () => {
    const calendarGrid = document.getElementById("calendarGrid")

    for( let i = 0; i<42 ; i++){
    const dayCell = document.createElement("div")
    dayCell.classList.add("dayCell")
    calendarGrid.appendChild(dayCell)
    }

}
generateCells()


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
monthDropdown()

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

yearDropdown()