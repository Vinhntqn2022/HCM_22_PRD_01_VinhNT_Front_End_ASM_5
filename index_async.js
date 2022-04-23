const axios = require('axios');

async function getCovidData() {
   try{
        const response = await axios.get('https://api.covid19api.com/summary');
        return response.data
   } catch(error) {
       console.log(error)
   }
   
}
// dữ liệu covid hôm nay
async function getCovidNews() {
    const covidData = await getCovidData();
    const newCases = covidData.Global.NewConfirmed
    const newDeaths = covidData.Global.NewDeaths
    const totalDeaths = covidData.Global.TotalDeaths
    return [newCases, newDeaths, totalDeaths]
}
// tìm quốc gia có số người chết nhiều nhất
async function getCountryHasMostDeaths() {
    const covidData = await getCovidData();
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
    return [countryMaxDeath, maxDeath]
    
}
  // tìm quốc gia có số người nhiễm nhiều nhất trong ngày
async function getCountryHasMostNewcases() {
    const covidData = await getCovidData();
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
async function main() {
    console.log('Đang lấy dữ liệu, xin vui lòng chờ...')
    console.log(' Đã lấy dữ liệu thành công, đang xuất thống kê:')
    console.log('Dữ liệu Covid hôm nay:')
    const [newCases, newDeaths, totalDeaths] = await getCovidNews()
    console.log(`Nhiễm mới: ${newCases} - Số người chết mới: ${newDeaths} - Tổng số người chết: ${totalDeaths}`)
    const [countryMaxDeath, maxDeath] = await getCountryHasMostDeaths()
    console.log(`Quốc Gia có số lượng tổng cộng người chết nhiều nhất là: ${countryMaxDeath}(${maxDeath})`)
    const [countryMaxNewCases, maxNewCases] = await getCountryHasMostNewcases()
    console.log(`Quốc Gia có số lượng người mắc mới trong ngày nhiều nhất là: ${countryMaxNewCases}(${maxNewCases})`)
}

main()

