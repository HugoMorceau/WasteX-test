import axios from 'axios'

const API_BASE_URL = 'https://api.openbrewerydb.org'

export const fetchBreweries = async (query: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/v1/breweries?by_name=${encodeURIComponent(query)}`
    )
    // const response = await axios.get(API_BASE_URL)
    console.log('query:', query)
    console.log('Fetched breweries:', response.data)
    return response.data
  } catch (error) {
    console.error('Failed to fetch breweries:', error)
    return []
  }
}
