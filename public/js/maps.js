function initMap() {
  var uluru = {lat: $("#info").data("lat"), lng: $("#info").data("lng")};
  if(uluru.lat && uluru.lng) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(map);
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: uluru,
        origin: pos.coords.latitude + ", " + pos.coords.longitude,
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    });
  }
}

var photos = [];
var currentPhoto = 0;

$("#photos").each(function() {
  photos = $(this).find(".photo").map(function() {
    return $(this).data("photo");
  }).toArray()
})

$(document).ready(function () {
  $(".err").each(function() {
    if($(this).data("err")) alert("Could not find, try again")
  })
})

$("#slideshow-button").click(function () {
  currentPhoto = currentPhoto+1 == photos.length ? 0 : currentPhoto+1;
  $("#slideshow").attr("src", photos[currentPhoto])
})
