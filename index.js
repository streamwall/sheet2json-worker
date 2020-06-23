const Papa = require('papaparse')
const camelCase = require('lodash.camelcase')
const mapKeys = require('lodash.mapkeys')

const transformRows = require('./transform')

addEventListener('fetch', event => {
  event.respondWith(generateJSON())
})

function parseCSV(csvString, config) {
  return new Promise((resolve, reject) => {
    Papa.parse(csvString, {
      ...config,
      complete: ({ data }) => resolve(data),
      error: reject,
    })
  })
};

async function generateJSON() {
  const url = `https://docs.google.com/spreadsheets/d/${DOC_ID}/gviz/tq?tqx=out:csv&headers=0&sheet=${encodeURIComponent(SHEET_NAME)}`

  const resp = await fetch(url, {
    cf: {
      cacheTtl: Number(TTL),  // seconds
    },
  })
  const csv = await resp.text()

  const rows = await parseCSV(csv, {
    header: true,
    transformHeader: camelCase,
  })
  const transformedRows = transformRows(rows)

  response = new Response(JSON.stringify(transformedRows), {
    headers: {
      'Cache-Control': `max-age=${TTL}`,
      'Content-Type': 'application/json',
    },
  })
  return response
}
