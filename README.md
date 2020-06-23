# sheet2json-worker

A Cloudflare worker which transforms a Google Sheet into JSON.


## Usage:

### Edit the vars in wrangler.toml:

Follow the [Cloudflare workers quickstart](https://developers.cloudflare.com/workers/quickstart#setup) to fill in `account_id`, `route`, and `zone_id` in your `wrangler.toml` file.

Set the following vars to point the worker at your spreadsheet:

```
vars = {
  # From your spreadsheet URL: docs.google.com/spreadsheets/d/DOC_ID/...
  DOC_ID = "",
  # Name of spreadsheet tab to get data from
  SHEET_NAME = "",
  # Seconds to cache data
  TTL = "5",
}
```


### Add an optional transform function

If you'd like to transform the data before returning it, edit `transform.js`.

Example:

```
// Only emit rows containing an id
module.exports = (rows) => rows.filter(row => row.id)
```


### Publish!

Run `npm run publish` to publish your new worker.
