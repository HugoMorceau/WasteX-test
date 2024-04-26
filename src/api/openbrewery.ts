import axios from 'axios'

const API_BASE_URL = 'https://api.openbrewerydb.org/breweries'

export const fetchBreweries = async () => {
  try {
    // const response = await axios.get(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`)
    const response = await axios.get(API_BASE_URL)
    console.log('Fetched breweries:', response.data)
    return response.data
  } catch (error) {
    console.error('Failed to fetch breweries:', error)
    return []
  }
}
