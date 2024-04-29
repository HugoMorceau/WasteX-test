import type { Brewery } from '@/types/Brewery'
import axios from 'axios'
const API_BASE_URL = 'https://api.openbrewerydb.org'

export const fetchBreweriesPage = async (query: string, page: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/v1/breweries?by_name=${encodeURIComponent(query)}&page=${page}`
    )
    return response.data
  } catch (error) {
    console.error('Failed to fetch breweries:', error)
    return []
  }
}
export const fetchBreweriesByIDs = async (ids: string[]) => {
  try {
    const request = `${API_BASE_URL}/v1/breweries?by_ids=${ids.join(',')}`

    const response = await axios.get(request)
    return response.data
  } catch (error) {
    console.error('Failed to fetch breweries:', error)
    return []
  }
}
export const fetchNearbyBreweries = async (lat: number, lng: number) => {
  try {
    const request = `${API_BASE_URL}/v1/breweries?by_dist=${lat},${lng}`

    const response = await axios.get(request)
    return response.data
  } catch (error) {
    console.error('Failed to fetch breweries:', error)
    return []
  }
}

export const fetchBreweries = async (query: string, pagesLimit: number = 0) => {
  let page = 1
  const perPage = 20
  let hasMore = true
  const breweries: Brewery[] = []
  try {
    while (hasMore && (!pagesLimit || page <= pagesLimit)) {
      const request = `${API_BASE_URL}/v1/breweries?by_name=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`

      const response = await axios.get(request)

      hasMore = response.data.length === perPage
      page++
      breweries.push(...response.data)
    }

    return breweries
  } catch (error) {
    console.error('Failed to fetch breweries:', error)
    return []
  }
}
