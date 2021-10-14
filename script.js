// https://unsplash.com/oauth/applications
// Unsplash API

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imageCount = 0;
let totalImages = 0;
let photosArray = [];

let count = 5; //set the initial load photo count low can improve SEO performence when internet is slow
const apiKey = 'EzKPWJ8MTFfs8kekiq77wJh8-MUu7Vand8aCT6hw4TI';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check  if all images were loaded
function imageLoaded() {
	imageCount++;
	console.log('image loaded');
	if(imageCount === totalImages) {
		ready = true;
		loader.hidden = true; //only show loader at initial load
		console.log('ready = ', ready);
		count = 30; //after initial laod, can increase load photo count
		apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
	}
}
// helper function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}
// Create Elements for links & photos, add to DOM
function displayPhotos() {
	imageCount = 0;
	totalImages = photosArray.length;
	console.log('totalImages: ', totalImages);
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
		//Event Listener, check when each is finished loading
		img.addEventListener('load', imageLoaded);
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

//Check to see if scrolling near bottom of page, load more photos

window.addEventListener('scroll', () =>{
	if (window.innerHeight + window.scrollY >= 
		document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});
// on Load
getPhotos();