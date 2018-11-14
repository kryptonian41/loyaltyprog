const axios = require('axios')
const mongoose = require('mongoose')
const Disease = mongoose.model('diseases')
// for web scrapping
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

// apimedic api URL
const hostUrl = 'https://sandbox-healthservice.priaid.ch'
// google search page host url for web scraping
const googleSearchURL = 'https://www.google.co.in/search?q='

// creating a special axios instance for direct API calls
const apimedic = axios.create({
  baseURL: hostUrl,
  params: {
    language: 'en-gb'
  }
})

// method to get detailes information on a disease using ID
/**
 *
 * @param {disease ID} id
 * @param {Auth Token for the api call} token
 */
const getDiseaseInfoFromApi = (id, token) => {
  return apimedic(`/issues/${id}/info`, {
    params: {
      token: token,
      issue_id: id
    }
  })
    .then(async ({ data }) => {
      const artdata = {
        title: data.Name,
        id,
        description: data.Description,
        treatement: data.TreatmentDescription,
        symptoms: data.PossibleSymptoms
      }
      const disease = new Disease(artdata)
      await disease.save()
      return artdata
    })
    .catch(err => console.log(err))
}

// get all the symptoms
/**
 *
 * @param {Request object} req
 */
const getSymptoms = req => {
  const {
    app: { locals }
  } = req
  return apimedic(`/symptoms`, {
    params: {
      token: locals.key
    }
  })
    .then(({ data }) => data)
    .catch(err => err)
}

// get diagnosis according to the recieved symptoms
const getDiagnosis = req => {
  const {
    body: { symptoms },
    app: { locals }
  } = req
  return apimedic('/diagnosis', {
    params: {
      token: locals.key,
      symptoms: JSON.stringify(symptoms),
      gender: 'male',
      year_of_birth: 1997
    }
  })
    .then(({ data }) => {
      // appending short description to each object cotaining disease data
      const promiseArray = []
      data.forEach(disease => {
        const prom = new Promise((resolve, reject) => {
          Disease.findOne({ id: disease.Issue.ID })
            .then(res => {
              // if available in the DB grab it otherwise make a api call and save in the DB for future use
              if (res) {
                disease.desc = res.description
                resolve()
              } else {
                const { ID: id } = disease.Issue
                // 3rd party api call
                getDiseaseInfoFromApi(id, locals.key)
                  .then(res => {
                    disease.desc = res.description
                    resolve()
                  })
                  .catch(err => reject(err))
              }
            })
            .catch(err => reject(err))
        })
        promiseArray.push(prom)
      })
      return Promise.all(promiseArray).then(() => data)
    })
    .catch(err => err)
}

// Attempt to scrape data from the web (failed for now, could not find a consistent source for medical data)
/**
 *
 * @param {Disease Name} key
 */
const scrapeDiseaseData = key => {
  // todo: implement data scrapping from google search page
  return puppeteer
    .launch()
    .then(function(browser) {
      return browser.newPage()
    })
    .then(function(page) {
      return page.goto(googleSearchURL + key).then(function() {
        return page.content()
      })
    })
    .then(function(html) {
      const $ = cheerio.load(html)
      console.log(html)
      const accordians = $('#knowledge-health__hitf')
      console.log('TCL: containers', accordians)
    })
    .catch(function(err) {
      console.log(err)
    })
}

// get disease data from the database and if not present then fetch the data from the api and save in DB
const getDiseaseData = req => {
  const {
    params: { id },
    app: { locals }
  } = req

  return Disease.findOne({ id }).then(res => {
    if (res) {
      return res
    }
    return getDiseaseInfoFromApi(id, locals.key)
  })
}

module.exports = {
  getSymptoms,
  getDiagnosis,
  getDiseaseData,
  scrapeDiseaseData
}
