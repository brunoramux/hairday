import dayjs from "dayjs"
import {openingHours} from "../utils/opening-hours"
import {hoursClick} from "./form/hours-click"

const selectedDate = document.getElementById("date")
const elementHours = document.getElementById("hours")

export function loadSchedules(){
  // Pega valor da data do select de data do formulários
  const date = selectedDate.value

  // Reseta lista ul
  elementHours.innerHTML = ""

  // Carrega horários disponíveis
  const opening =  hoursLoad({date})

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
}

function hoursLoad({date}){
  const opening = openingHours.map(hour => {
    const [hr,_] = hour.split(":")

    // Verifica se cada um dos horários já está no futuro usando a criação de DateTime do Dayjs e método de comparação de datas
    const isHourPast = dayjs(date).add(hr, "hour").isBefore(dayjs())
    return {
      hour,
      available: !isHourPast
    }
  })
  return opening
}