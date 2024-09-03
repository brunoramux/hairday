import dayjs from "dayjs"
import {openingHours} from "../utils/opening-hours"
import {hoursClick} from "./form/hours-click"
import {fetchScheduleByDay} from '../services/fetch-schedule-by-day'

const selectedDate = document.getElementById("date")
const elementHours = document.getElementById("hours")

const morning = document.getElementById('period-morning')

export async function loadSchedules(){
  // Pega valor da data do select de data do formulários
  const date = selectedDate.value

  // Reseta lista ul
  elementHours.innerHTML = ""

  // Carrega horários disponíveis
  const opening = await hoursLoad({date})

  // Monta horários na tela usando as diferentes classes do CSS
  opening.forEach(({hour, available}) => {
    const li = document.createElement("li")
    li.classList.add("hour")
    li.classList.add(available ? "hour-available" : "hour-unavailable") 

    li.textContent = hour,
    elementHours.append(li)
  })

  // Adiciona lógica de click do botão
  hoursClick()

  const schedules = await fetchScheduleByDay({ date })
  const schedulesSort = schedules.sort((a, b) => dayjs(a.when).hour() - dayjs(b.when).hour())

  scheduleShow({ schedules })
}

async function hoursLoad({ date }){
  const schedules = await fetchScheduleByDay({date})
  const opening = openingHours.map((hour) => {
    const [hr,_] = hour.split(":")

    // Verifica se cada um dos horários já está no futuro usando a criação de DateTime do Dayjs e método de comparação de datas
    const isHourPast = dayjs(date).add(hr, "hour").isBefore(dayjs())
    
    const isHourTaken = schedules.find(schedule => dayjs(schedule.when).isSame(dayjs(date).add(hr, "hour")))

    return {
      hour,
      available: !isHourPast && !isHourTaken
    }
  })
  return opening
}
  
function scheduleShow({ schedules }){
  try {
    morning.innerHTML = ""

    schedules.forEach(schedule => {
      const item = document.createElement('li')
      const time = document.createElement('strong')
      const name = document.createElement('span')
      
      item.setAttribute("data-id", schedule.id)
      time.textContent = dayjs(schedule.when).format("HH:mm")
      name.textContent = schedule.name

      const cancelIcon = document.createElement("img")
      cancelIcon.classList.add("cancel-icon")
      cancelIcon.setAttribute("src", "./src/assets/cancel.svg")
      cancelIcon.setAttribute("alt", "Cancelar")

      item.append(time, name, cancelIcon)
      morning.append(item)
    })

    
  } catch (error) {
    console.log(error)
  }
}