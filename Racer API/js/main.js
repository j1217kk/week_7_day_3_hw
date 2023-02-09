


const DOM_Elements = {
    racer_list: '.racer-list'
}



const getData = async (query_season, query_round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${query_season}/${query_round}/driverStandings.json`)
    console.log(response)
    return response.data
}

const create_list = (position, points, wins, firstName, lastName, number, brand) => {
    // document.querySelector(DOM_Elements.racer_list).insertAdjacentHTML('beforeend', html)

    var table = document.getElementById("race-table")
    var row = table.insertRow(-1)
    var pos = row.insertCell(0)
    var pnt = row.insertCell(1)
    var win = row.insertCell(2)
    var first = row.insertCell(3)
    var last = row.insertCell(4)
    var num = row.insertCell(5)
    var car = row.insertCell(6)
    pos.innerHTML = `${position}`;
    pnt.innerHTML = `${points}`;
    win.innerHTML = `${wins}`;
    first.innerHTML = `${firstName}`;
    last.innerHTML = `${lastName}`;
    num.innerHTML = `${number}`;
    car.innerHTML = `${brand}`;
}

const clear_data = () => {
    document.querySelector("table").innerHTML='';

}

const form = document.querySelector('#input-data')

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    let query_season = document.querySelector('#season')
    let query_round = document.querySelector('#round')
    const x = await getData(query_season.value, query_round.value)
    console.log(x)
    const y = x.MRData.StandingsTable.StandingsLists[0].DriverStandings
    const html = `<tr>
    <th>Position</th>
    <th>Points</th>
    <th>Wins</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Number</th>
    <th>Brand</th>
    </tr>`
    document.querySelector("table").insertAdjacentHTML('beforeend', html)
    y.forEach(element => {
        create_list(element.position, element.points, element.wins, element.Driver.givenName, element.Driver.familyName, element.Driver.permanentNumber, element.Constructors[0].constructorId)
        })
    }
)