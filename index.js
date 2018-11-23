const URL = 'https://trektravel.herokuapp.com/trips'

const reportStatus = (message) => {
  $('#status-message').html(message);
};

const getAllTrips = () => {
  reportStatus("Loading trips...")
  const tripList = $('#trip-list');
  tripList.empty();

  axios.get(URL)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} trips.`);
      response.data.forEach((trip) => {
        tripList.append(`<li><button id="${trip.id}">${trip.name}</button></li>`);
      });
    })
    .catch((error) => {
      reportStatus(`Encountered an error ${error.message}`);
    });
};

const getTripDetail = (id) => {
  reportStatus("Loading trip...")
  const tripDetailList = $('#trip-detail-list');
  tripDetailList.empty();

  axios.get(URL)
    .then((response) => {
      return axios.get(URL + '/' + id);
    })
    .then((response) => {
      reportStatus("Successfully loaded trip!")
      let trip = response.data
      tripDetailList.append(
        `<li>Name: ${trip.name}</li>
        <li>Continent: ${trip.continent}</li>
        <li>Category: ${trip.category}</li>
        <li>Weeks: ${trip.weeks}</li>
        <li>Cost: ${trip.cost}</li>
        <li>About: ${trip.about}</li>`
      );
    })
    .catch((error) => {
      reportStatus(`Encountered an error ${error.message}`);
    });
};

$(document).ready(() => {
  $('#load-all-trips').click(getAllTrips);
  $('ul').on('click', 'button', function(event) {
    let id = $(this).attr('id');
    getTripDetail(id);
  });
});
