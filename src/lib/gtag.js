export const GA_MEASUREMENT_ID = 'G-JLM7SQV8Q4'

export const existsGaId = GA_MEASUREMENT_ID !== ''

export const pageview = (path) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
  })
}

export const event = (event_name) => {
  gtag('event', event_name)
}
