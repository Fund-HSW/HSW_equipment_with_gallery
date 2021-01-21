//small helper
const logThis = (label, info) => {
  console.log(`%c${label}: %c${info}`,"color:#42826D; font-weight:bold", "color:gray; font-style: italic")
};
const createTag = (tag) => document.createElement(`${tag}`);

const testPhoto = [
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/rekawice_1-scaled.jpg",
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/rekawice_2-scaled.jpg",
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/rekawice_3-scaled.jpg",
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/rekawice_4-scaled.jpg"
];

const increment = (current, max) => {
  return current >= max-1 ? 0 : current+1
};
const decrement = (current, max) => {
  return current <= 0 ? max-1 : current-1
};

const checkScreenSize = () => {
  return (document.body.clientWidth > 1000) ? true : false
};

let isBigscreen = checkScreenSize();

const monitorScreenSize = () => {
  window.addEventListener('resize', () => {isBigscreen = checkScreenSize(), logThis("current screen size is:", document.body.clientWidth), logThis("screen considerd big?", isBigscreen)})
};

const calcPhotoWidth = (photoAmount) => {
  return Math.ceil(100/photoAmount)-1
}

class EmptyGallery {
  constructor(photoList, currentPhotoID) {
    const emptyGallery = createTag("div");
    
    emptyGallery.className="photo_gallery";
    emptyGallery.photoList = photoList;
    emptyGallery.currentPhotoID=currentPhotoID;
    emptyGallery.gallerySize = photoList.length;
    
    return emptyGallery;
  }
};

class Picture {
  constructor (photoSrc, imageWidth) {
    let picture = createTag("img");

    picture.src = photoSrc;
    picture.style.maxWidth = `${imageWidth}%` 

    return picture
  }
}

class Counter {
  constructor (currentIndex,maxIndex){

    let counter = document.createElement("div");
    counter.className="counter"
    counter.append(document.createElement("p"));
    counter.children[0].innerText= `(${currentIndex+1}/${maxIndex})`;

    return counter
  }
}
/*
class Modal {
  constructor () {
    let modal = document.createElement("div")
    modal.className = "modal"

    let modalContent = document.createElement("div")
    modal.className = "modal_content"

  <-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
  </div>

</div>
  }
}
*/
/* do przepisania 
const preparePhotoData = (step,sourceData) => {
    let prepearedPhotoData = {}
    prepearedPhotoData.illustration = createIllustration(sourceData[step])
    prepearedPhotoData.counter = createCounter(step+1,sourceData.length)
    return prepearedPhotoData
};
const cycleThroughRange = (figure, range) => {
    let present = figure.currentIndex;
    (present < range - 1) ? (present = present + 1) : (present = 0);
    figure.currentIndex = present
};

const bigScreenGalery = (id, photoArray) => {
    let insertionSite = document.getElementById(id);
    let gallery = createGallery();
    let imageWidth = Math.floor(100 / photoArray.length - 0.5);
    photoArray.forEach((element) => {
        gallery.append(createIllustration(element,imageWidth));
    });
    insertionSite.append(gallery);
};
const smallScreenGalery = (id, photoArray) => {
    let insertionSite = document.getElementById(id)
    let gallery = createGallery()
    let figure = createFigure();

    let photoData = preparePhotoData(figure.currentIndex, photoArray); 

    const loadPicture = () => {
        [photoData.illustration,photoData.counter].forEach(
        (element) => figure.append(element)
        )
    };

    loadPicture();
   
    gallery.append(figure);
    insertionSite.append(gallery);
    
    const loadNext = () => {
      /*  cycleThroughRange(figure,photoArray.length);
        photoData = preparePhotoData(figure.currentIndex, photoArray)
        
        figure.children[0] = photoData.illustration
        figure.children[1] = photoData.counter
        gallery.children[0] = figure
        insertionSite.children[0] = gallery
        
       console.log("CLICK! CLICK ;/")
    };
    
        figure.onclick = (() => loadNext());
};
*/

const createGalleryDependingOnScreensize = (photoList, gallerySize) => {
  return isBigscreen ? 
  (logThis("making big gallery", `(${document.body.clientWidth})`), 
  new BigScreenGalery(photoList, calcPhotoWidth(gallerySize))) : 
  (logThis("making small gallery",`(${document.body.clientWidth})`),
  new SmallScreenGalery(photoList, 0, gallerySize, "100")
  );
}

class Gallery {
  constructor(hook, photoList) {
    logThis("make gallery for", hook)

    let gallery = new EmptyGallery(photoList);
    document.querySelector(`#${hook}`).append(gallery);
    
    gallery.isWidescreenGallery = isBigscreen;
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
      () => {currentID = increment(currentID, maxID), logThis("Click!", currentID)});

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

const handleWindowSizeChange = (hook, gallery) => {
  gallery = document.querySelector(`#${hook} .photo_gallery`)
  gallery.content = createGalleryDependingOnScreensize(gallery.photoList,gallery.gallerySize)

  gallery.replaceChildren(gallery.content, gallery.children[0])
  gallery.isWidescreenGallery = isBigscreen
};

const addGallery = (hook, photoList) => {
  let gallery = new Gallery(hook, photoList);
  
  window.addEventListener('resize', ()=>{
    if (gallery.isWidescreenGallery !== isBigscreen) {
      handleWindowSizeChange(hook, gallery)
    }
  }
  )

  return gallery
};