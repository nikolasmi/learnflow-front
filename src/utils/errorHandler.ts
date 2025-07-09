import { AxiosError } from 'axios'

export const errorHandler = (e: unknown): [Record<string, string> | undefined, string] => {
  let data: undefined | Record<string, string> = undefined
  let message = ''
  if (e instanceof AxiosError && e.response?.data.data) {
    data = e.response?.data.data
    message = e.response?.data.message
  } else if (e instanceof AxiosError) message = e.response?.data.message
  else message = 'Došlo je do greške na serveru, molimo pokušajte ponovo.'
  return [data, message]
}
