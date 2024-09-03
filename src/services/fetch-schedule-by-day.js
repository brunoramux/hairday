import dayjs from "dayjs"
import { apiConfig } from "./api-config"

export async function fetchScheduleByDay({date}){
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules`)

    const data = await response.json()

    const filteredData =  data.filter(schedule => dayjs(date).isSame(schedule.when, "day"))

    return filteredData
  } catch (error) {
    console.log(error)
  }
}