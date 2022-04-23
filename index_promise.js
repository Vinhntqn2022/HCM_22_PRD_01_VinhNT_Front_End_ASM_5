const axios = require('axios');

function getCovidData() {
   return axios.get('https://api.covid19api.com/summary')
         .then(response => {
             return response.data          
         })
         .catch(error => console.log(error))
}
function getCovidNews(covidData) {    
    const newCases = covidData.Global.NewConfirmed
    const newDeaths = covidData.Global.NewDeaths
    const totalDeaths = covidData.Global.TotalDeaths
    return [newCases, newDeaths, totalDeaths]        
}
function getCountryHasMostDeaths(covidData) {
    const countries = covidData.Countries
    const countriesDeaths = countries.map(country => {
        return [country.Country, country.TotalDeaths]
    });
    const Deaths = countries.map(country => {
        return country.TotalDeaths
    })
    const maxDeath =  Math.max(...Deaths)
    let countryMaxDeath = ''
    countriesDeaths.forEach(element => {
        if(element[1] === maxDeath) {
            countryMaxDeath = element[0]
        }
    });
    return [countryMaxDeath, maxDeath];
}
function getCountryHasMostNewcases(covidData) {
    const countries = covidData.Countries
    const countriesNewCases = countries.map(country => {
        return [country.Country, country.NewConfirmed]
        })
    const totalCases = countries.map(country => {
            return country.NewConfirmed
        })
    const maxNewCases = Math.max(...totalCases)
    let countryMaxNewCases = ''
    countriesNewCases.forEach(element => {
        if(element[1] === maxNewCases) {
            countryMaxNewCases = element[0]
        }
    });
    return [countryMaxNewCases, maxNewCases]     
}
function main(){
    console.log('Đang lấy dữ liệu, xin vui lòng chờ...')
    console.log(' Đã lấy dữ liệu thành công, đang xuất thống kê:')
    console.log('Dữ liệu Covid hôm nay:')
    getCovidData()
      .then(covidData => {
         const [newCases, newDeaths, totalDeaths] = getCovidNews(covidData)
         console.log(`Nhiễm mới: ${newCases} - Số người chết mới: ${newDeaths} - Tổng số người chết: ${totalDeaths}`) 
      })
      .then(() => {
          return  getCovidData()
                    .then(covidData => {
                        getCountryHasMostDeaths(covidData)
                        const [countryMaxDeath, maxDeath] = getCountryHasMostDeaths(covidData);
                        console.log(`Quốc Gia có số lượng tổng cộng người chết nhiều nhất là: ${countryMaxDeath}(${maxDeath})`)
                    })
      })
      .then(() => {
        return getCovidData()
          .then(covidData => {
            const [countryMaxNewCases, maxNewCases] = getCountryHasMostNewcases(covidData)
            console.log(`Quốc Gia có số lượng người mắc mới trong ngày nhiều nhất là: ${countryMaxNewCases}(${maxNewCases})`)
          })
      })
      .catch(error => console.log(error))
}
main()