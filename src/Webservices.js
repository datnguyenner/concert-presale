const url = 'https://app.ticketmaster.com/discovery/v2';

const fetchEvents = async () => {
  let date = new Date(Date.now()).toISOString();
  date = date.substring(0, date.length - 5).concat('Z');
  console.log(date);
  let response = await fetch(url + "/events.json?size=50&radius=100&onsaleStartDateTime=" + date + "&startDateTime=" + date + "&unit=miles&sort=date,asc&genreId=KnvZfZ7vAvF&apikey=AAnmpsnxBu1lnxN07CW7taV7TmPmMeVM");
  let data = await response.json();
  let events = data._embedded.events;
  return events;
}

export { fetchEvents }