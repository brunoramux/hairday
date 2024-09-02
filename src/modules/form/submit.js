import dayjs from "dayjs"
import {createSchedule} from "../../services/create-schedule"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

const today = dayjs(new Date()).format("YYYY-MM-DD")

selectedDate.value = today
selectedDate.min = today

form.onsubmit = async (event) => {
  event.preventDefault()

  try {
    // Pega nome digitado no input do formulário
    const name = clientName.value.trim()
    if(!name){
      return alert("Informe o nome do cliente.")
    }

    // Pega data selecionada no formulário
    const hourSelected = document.querySelector(".hour-selected")
    if(!hourSelected){
      return alert("Selecione o horário para agendamento.")
    }

    // Pega a hora selecionada na lista
    const [hour,_] = hourSelected.innerText.split(":")

    // Criar objeto DateTime do Dayjs para inclusão na API
    const when = dayjs(selectedDate.value).add(hour, "hour")

    // Cria id para inclusão na API
    const id = new Date().getTime()

    await createSchedule({id, name, when})

  } catch (error) {
    alert("Não foi possível realizar o agendamento.")
    console.log(error)
  }
}