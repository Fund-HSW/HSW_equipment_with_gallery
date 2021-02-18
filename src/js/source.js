//helpers
const logThis = (label, info) => {
  console.log(`%c${label}: %c${info}`,"color:#42826D; font-weight:bold", "color:gray; font-style: italic")
};
const createTag = (tag) => document.createElement(`${tag}`);


//currently not in use
const testPhoto = [
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/rekawice_1-scaled.jpg",
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/rekawice_2-scaled.jpg",
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/rekawice_3-scaled.jpg",
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/rekawice_4-scaled.jpg"
];

// basic functions
const increment = (current, max) => {
  if (current < 0 ) {return 0} 
  return current >= max ? 0 : current+1
};
const decrement = (current, max) => {
  if (current > max) {return 0}
  return current <= 0 ? max : current-1
};

const checkIfFullsizeScreen = () => {
  return (document.body.clientWidth > 1000) ? true : false
};

let isFullsizeScreen = checkIfFullsizeScreen();

//
const monitorScreenSize = () => {
  window.addEventListener('resize', 
  () => {isFullsizeScreen = checkIfFullsizeScreen(), 
    logThis("current screen size is:", document.body.clientWidth), 
    logThis("screen considerd Fullsize?", isFullsizeScreen)})
};

const calcPictureWidth = (photoAmount) => {
  return Math.ceil(100/photoAmount)-1
};

//component classes
class EmptyGallery {
  constructor(photoList) {
    const emptyGallery = createTag("div");
    
    emptyGallery.className="photo_gallery";
    emptyGallery.photoList = photoList;
    emptyGallery.currentPhotoID=0;
    emptyGallery.gallerySize = photoList.length;
    
    return emptyGallery;
  }
};

class Picture {
  constructor (photoSrc, maxWidth) {
    let picture = createTag("img");

    picture.src = photoSrc;
    picture.style.maxWidth = `${maxWidth}%` 

    return picture
  };
};

class Counter {
  constructor (currentIndex, maxIndex){

    let counter = document.createElement("div");
    counter.append(document.createElement("p"));
    counter.children[0].innerText= `(${currentIndex+1}/${maxIndex})`;
    
    counter.className="counter"

    return counter
  }
};

const createGalleryDependingOnScreensize = (photoList, gallerySize) => {
  return isFullsizeScreen ? 
  (logThis("making big gallery", `(${document.body.clientWidth})`), 
  new BigScreenGalery(photoList, calcPictureWidth(gallerySize))) : 
  (logThis("making small gallery",`(${document.body.clientWidth})`),
  new SmallScreenGalery(photoList, 0, gallerySize, "100")
  )
};

class Gallery {
  constructor(hook, photoList) {
    logThis("make gallery for", hook)

    let gallery = new EmptyGallery(photoList);
    document.querySelector(`#${hook}`).append(gallery);
    
    gallery.isWidescreenGallery = isFullsizeScreen;
    logThis("is this gallery big?", gallery.isWidescreenGallery)

    gallery.content = createGalleryDependingOnScreensize(gallery.photoList,gallery.gallerySize);

    gallery.append(gallery.content)

    return gallery
  }
};

class SmallScreenGalery {
  constructor(photoSrc, currentID, maxID, imageWidth) {
  const sliderGallery = new Slider(photoSrc, currentID, maxID, imageWidth)
  sliderGallery.style.maxHeight = `${document.body.clientWidth}px`;
  
  return sliderGallery
  }
};

class Interface {
  constructor(currentID, maxID) {
    const intf = createTag("div");
    intf.className ="interface"
    
    if (maxID > 1) {
    const incrementingBtn = createTag("a")
    incrementingBtn.href = "javascript:;"
    incrementingBtn.textContent = ">";

    const decrementingBtn = createTag("a")
    decrementingBtn.href = "javascript:;"
    decrementingBtn.textContent = "<";

    intf.append(decrementingBtn);
    intf.append(new Counter(currentID, maxID));
    intf.append(incrementingBtn);

    incrementingBtn.addEventListener(
      "click", 
      () => {currentID = increment(currentID, maxID), logThis("Click!", currentID)}, currentID);

    decrementingBtn.addEventListener(
       "click", 
      () => {currentID = decrement(currentID, maxID), logThis("Click!", currentID)});
    };

  return intf;
  };
};

class Slider {
  constructor(photoSrc, currentID, maxID, imageWidth) {
    const slider = createTag('div');
    slider.className = "slider";

    slider.append(new Picture (photoSrc[currentID], imageWidth));
    slider.append(new Interface(currentID, maxID))

    return slider
  }
};

class BigScreenGalery {
  constructor(photoSrc, imageWidth) {
    const gallery = createTag("div")
    gallery.className="big_gallery"
    const photos = photoSrc.map(photo => new Picture(photo, imageWidth));

    photos.forEach(photo => gallery.append(photo));

    return gallery    
}
}; 
//needs work
const handleWindowSizeChange = (hook, gallery) => {
  gallery = document.querySelector(`#${hook}`)
  gallery.oldContent = document.querySelector(`#${hook} .photo_gallery`)
  newContent = createGalleryDependingOnScreensize(gallery.photoList, gallery.gallerySize)

  gallery.oldContent = gallery.replaceChild(newContent, gallery.oldContent)
  
  gallery.isWidescreenGallery = isFullsizeScreen
};

const addGallery = (hook, photoList) => {
  let gallery = new Gallery(hook, photoList);
  
  window.addEventListener('resize', ()=>{
    if (gallery.isWidescreenGallery !== isFullsizeScreen) {
      handleWindowSizeChange(hook, gallery)
    }
  }
  )

  return gallery
};

const testFunction = function(arg) {
  return arg};

module.exports = {
increment : increment,
decrement : decrement, 
testFunction : testFunction,
calcPictureWidth : calcPictureWidth
}