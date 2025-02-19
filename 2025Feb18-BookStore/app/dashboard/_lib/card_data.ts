import { fetcher } from "@/lib/data"

export async function FetchCardData() {
  try {
    const data = await fetcher('/card-data', 'GET', null, { 'Content-Type': 'application/json' }).then((res) => {
      return res
    })
    return data
  } catch (e) {
    console.error("Error fetching data", e)
    return null
  }
}

