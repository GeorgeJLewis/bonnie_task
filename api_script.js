document.addEventListener('DOMContentLoaded', () => {
  const displayElement = document.getElementById('listings')

  const displayListings = data => {
      const listings = data.newsPlayer.assets
      listings.forEach(listing => {
          let el = document.createElement('div')
          el.dataset.id = listing.id
          el.url = listing.manifestUrl
          el.innerHTML = `<h1>${listing.program_nid}</h1><p>${listing.description}</p>`
          displayElement.appendChild(el)
      });
  }
  //This is in preperation to render player with correct assetid
  displayElement.addEventListener('click', event => {
    fetch(`https://playback-api.b17g.net/media/${event.target.parentElement.dataset.id}?service=tv4&device=browser&protocol=hls&is_drm=false`)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          console.log(myJson);
        });
  })

fetch('https://tv4-graphql-prod.herokuapp.com/graphql?query={newsPlayer%20{assets%20{%20id%20program_nid%20description}}}')
  .then(function (response) {
      return response.json();
  })
  .then(function (json) {
      displayListings(json.data)
  });
})
