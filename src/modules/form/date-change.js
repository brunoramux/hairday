import { loadSchedules } from "../load-schedules"

const selectedDate = document.getElementById("date")

selectedDate.onchange = () => {
  loadSchedules()
}