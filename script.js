// https://unsplash.com/oauth/applications
// Unsplash API
const count = 10;
const apiKey = 'EzKPWJ8MTFfs8kekiq77wJh8-MUu7Vand8aCT6hw4TI';
const apiUrl = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${count}`;

// get photos from unsplash API
async function getPhotos() {
	try {
	  const response = await fetch(apiUrl);
	  const data = await response.json();
	  console.log(data);
	} catch(error) {

	}
}

// on Load
getPhotos();