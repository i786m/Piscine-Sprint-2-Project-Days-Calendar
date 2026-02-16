

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
  'january','february','march','april','may','june',
  'july','august','september','october','november','december',
]

const monthDropdown = () =>{
    const month = document.getElementById("month")
    MONTHS.forEach(month => {
        option = document.createElement("option")
        option.textContent = month
        month.appendChild(option)
    });

}

const yearDropdown = () => {
    const year = document.getElementById("year")
      years.forEach(year => {
        option = document.createElement("option")
        option.textContent = year
        year.appendChild(option)
    });
}