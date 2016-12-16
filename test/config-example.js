module.exports = {
	API_KEY: '',
	SUBDOMAIN: 'unit-test',
	ENVIRONMENT: 'sandbox',
	DEBUG: false,
	API_VERSION: 2,
  XML2JS_OPTIONS: {
    explicitArray: false,
    ignoreAttrs:true,
    emptyTag: null,
    valueProcessors: [
      'parseNumbers',
      'parseBooleans'
    ]
  }
}
