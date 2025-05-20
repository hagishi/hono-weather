import { describe, it, expect } from 'vitest'
import app from '../src/index'

describe('Weather API', () => {
  // Test the root endpoint
  it('should return welcome message on root path', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    
    const data = await res.json()
    expect(data.message).toBe('Welcome to the Weather API')
    expect(data.version).toBe('1.0.0')
    expect(data.endpoints).toBeInstanceOf(Array)
    expect(data.endpoints.length).toBeGreaterThan(0)
  })

  // Test the /weather endpoint
  it('should return current weather data', async () => {
    const res = await app.request('/weather')
    expect(res.status).toBe(200)
    
    const data = await res.json()
    expect(data).toHaveProperty('location')
    expect(data).toHaveProperty('temperature')
    expect(data).toHaveProperty('condition')
    expect(data).toHaveProperty('humidity')
    expect(data).toHaveProperty('windSpeed')
    expect(data).toHaveProperty('timestamp')
  })

  // Test the /weather/forecast endpoint
  it('should return weather forecast data', async () => {
    const res = await app.request('/weather/forecast')
    expect(res.status).toBe(200)
    
    const data = await res.json()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    
    const forecastItem = data[0]
    expect(forecastItem).toHaveProperty('date')
    expect(forecastItem).toHaveProperty('temperature')
    expect(forecastItem).toHaveProperty('condition')
    expect(forecastItem).toHaveProperty('precipitation')
  })

  // Test the /weather/:location endpoint
  it('should return weather data for specific location', async () => {
    const testLocation = 'London'
    const res = await app.request(`/weather/${testLocation}`)
    expect(res.status).toBe(200)
    
    const data = await res.json()
    expect(data.location).toBe(testLocation)
    expect(data).toHaveProperty('temperature')
    expect(data).toHaveProperty('condition')
    expect(data).toHaveProperty('humidity')
    expect(data).toHaveProperty('windSpeed')
    expect(data).toHaveProperty('timestamp')
  })

  // Test the 404 handling
  it('should return 404 for non-existent routes', async () => {
    const res = await app.request('/non-existent-route')
    expect(res.status).toBe(404)
    
    const data = await res.json()
    expect(data.message).toBe('Not Found')
    expect(data.status).toBe(404)
  })
})