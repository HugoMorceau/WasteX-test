import axios from 'axios'

const API_BASE_URL = 'https://api.openbrewerydb.org'

export const fetchBreweries = async (query: string, pagesLimit: number = 0) => {
  let page = 1
  const perPage = 20
  let hasMore = true
  const breweries: any[] = []
  try {
    while (hasMore && (!pagesLimit || page <= pagesLimit)) {
      console.log('fetching page', page)

      const response = await axios.get(
        `${API_BASE_URL}/v1/breweries?by_name=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`
      )
      console.log('searched name:', query, 'page', page, 'hasMore', hasMore)
      console.log('Fetched breweries:', response.data)
      hasMore = response.data.length === perPage
      page++
      console.log(response.data.length)

      breweries.push(...response.data)
    }
    return breweries
  } catch (error) {
    console.error('Failed to fetch breweries:', error)
    return []
  }
}
