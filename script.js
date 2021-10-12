// https://unsplash.com/oauth/applications
// Unsplash API

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
const count = 10;
const apiKey = 'EzKPWJ8MTFfs8kekiq77wJh8-MUu7Vand8aCT6hw4TI';
const apiUrl = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${count}`;

// helper function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}
// Create Elements for links & photos, add to DOM
function displayPhotos() {
	// run function for each obj in photosArray
	photosArray.forEach((photo) => {
		//create <a> to link to unsplash
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});
		//create <img> for photo
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		//put <img> inside <a>, then put both inside imageContainer Element
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}
// get photos from unsplash API
async function getPhotos() {
	try {
	  const response = await fetch(apiUrl);
	  photosArray = await response.json();
	  displayPhotos();
	} catch(error) {

	}
}

// on Load
getPhotos();