// https://unsplash.com/oauth/applications
// Unsplash API

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const backTop = document.getElementById('back-to-top');

let ready = false;
let imageCount = 0;
let totalImages = 0;
let photosArray = [];

let isInitialLoad = true;
let count = 5; //set the initial load photo count low can improve SEO performence when internet is slow
const apiKey = 'EzKPWJ8MTFfs8kekiq77wJh8-MUu7Vand8aCT6hw4TI';
const query = 'food-drink';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${query}&count=${count}`;

//after initial laod, increase load photo count
function updateNewPhotoCount(newCount) {
	apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${query}&count=${newCount}`;
}
//check  if all images were loaded
function imageLoaded() {
	imageCount++;
	if(imageCount === totalImages) {
		ready = true;
		loader.hidden = true; //only show loader at initial load	
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
	  if (isInitialLoad) {
	  	updateNewPhotoCount(15);
	  	isInitialLoad = false;
	  }
	} catch(error) {

	}
}

//Check to see if scrolling near bottom of page, load more photos
//** after scrolling begin the backTop img appears at bottom right
window.addEventListener('scroll', () =>{
	if(document.body.scrollTop > 1200 || document.documentElement.scrollTop > 1200){
		backTop.style.display = "block";
	}else{
		backTop.style.display = "none";
	}
	if (window.innerHeight + window.scrollY >= 
		document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});

window.addEventListener('click', ()=>{
	document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});
// on Load
getPhotos();