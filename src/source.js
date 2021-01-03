const createGallery = () => {
    let createdGallery = document.createElement("div");
    createdGallery.setAttribute("class", "photo_gallery");
    return createdGallery
};
/*
  const createIllustration = (source, imageWidth, counterValue) => {
    let createdIllustration = document.createElement("img");
    createdIllustration.setAttribute("src", source);
    if (imageWidth !== null) 
      {createdIllustration.style.maxWidth = `${imageWidth}%` }
    return createdIllustration
};
*/
class Picture {
  constructor (source, imageWidth, counterValue) {
    let picture = document.createElement("img");

    picture.src = source;
    picture.style.maxWidth = `${imageWidth}%` 

    return picture
  }
}

class Counter {
  constructor (currentIndex,maxIndex){

    let counterBox = document.createElement("div")
    let counter = document.createElement("p")
    counterBox.append(counter)

    counter.innerText= `${currentIndex}/${maxIndex}`

    return counterBox
  }
}
/*
  const createFigure = () => {
    let createdFigure = document.createElement("div");
    createdFigure.setAttribute("class", "figure");
    createdFigure.currentIndex = 0;
    return createdFigure
};
*/
class Figure {
  constructor () {
    let figure = document.createElement("div")
    figure.className = "figure"
    figure.currentIndex = 0
    return figure
  }
}
//work in progress
class Modal {
  constructor () {
    let modal = document.createElement("div")
    modal.className = "modal"

    let modalContent = document.createElement("div")
    modal.className = "modal_content"

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
  </div>

</div>
  }
}


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
        */
       console.log("CLICK! CLICK ;/")
    };
    
        figure.onclick = (() => loadNext());
};

class Galery {
  constructor(id, listOfPictures) {
    window.inderWidth > 500 ? bigScreenGalery(id, listOfPictures) : smallScreenGalery(id, listOfPictures)
  }
};