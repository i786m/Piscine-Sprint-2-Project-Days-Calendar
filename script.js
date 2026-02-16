const generateCells = () => {
    const calendarGrid = document.getElementById("calendarGrid")

    for( let i = 0; i<42 ; i++){
    const dayCell = document.createElement("div")
    dayCell.classList.add("dayCell")
    calendarGrid.appendChild(dayCell)
    }

}
generateCells()
console.log(calendarGrid);
