import axios from 'axios'

const API_BASE_URL = 'https://api.openbrewerydb.org'

export const fetchBreweriesPage = async (query: string, page: number) => {
  try {
    console.log('Api call')
    const response = await axios.get(
      `${API_BASE_URL}/v1/breweries?by_name=${encodeURIComponent(query)}&page=${page}`
    )
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
  const breweries: any[] = []
  try {
    while (hasMore && (!pagesLimit || page <= pagesLimit)) {
      // console.log('fetching page', page, "hasMore", hasMore, "pagesLimit", pagesLimit)
      const request = `${API_BASE_URL}/v1/breweries?by_name=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`
      console.log('Api call')
      const response = await axios.get(request)
      // console.log(request, response.data)
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
