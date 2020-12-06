const createGallery = () => {
  let createdGallery = document.createElement("div");
  createdGallery.setAttribute("class", "photo_gallery");
  return createdGallery
};

const createIllustration = (source, imageWidth, counter) => {
  let createdIllustration = document.createElement("img");
  createdIllustration.setAttribute("src", source);
  if (imageWidth !== null) 
  {console.log(imageWidth)
    createdIllustration.style.maxWidth = `${imageWidth}%` }
  return createdIllustration;
}

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
  let insertionSite = document.getElementById(id);
  let gallery = createGallery();

  let counterBox = document.createElement("div");
  let counter = document.createElement("p");
  counterBox.append(counter);

  let illustration = document.createElement("img");

  let current = 0;

  illustration.setAttribute("src", photoArray[current]);
  counter.innerText = `${current + 1}/${photoArray.length}`;

  illustration.onclick = () => {
    console.log(`preclic ${current}`);
    current < photoArray.length - 1 ? (current = current + 1) : (current = 0);
    console.log(`postclick: ${current}`);
    illustration.setAttribute("src", photoArray[current]);
    counter.innerText = `${current + 1}/${photoArray.length}`;
  };

  let figure = document.createElement("div");
  figure.setAttribute("class", "figure");

  [illustration,counterBox].forEach((element) => {
    figure.append(element);
  })

  gallery.append(figure);

  insertionSite.append(gallery);
};
const addGalery = (id, photoArray) => {
  window.innerWidth > 500
    ? bigScreenGalery(id, photoArray)
    : smallScreenGalery(id, photoArray);
};
addGalery("heavyGlovesInfo", [
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/rekawice_1-scaled.jpg",
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/rekawice_2-scaled.jpg",
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/rekawice_3-scaled.jpg",
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/rekawice_4-scaled.jpg"
]);
addGalery("plastronInfo", [
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/plastron_1-scaled.jpg",
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/underplastron_1-scaled.jpg",
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/underplastron_2-scaled.jpg"
]);

addGalery("jacketInfo", [
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/przeszywanica_1-scaled.jpg"
]);

addGalery("miscInfo", [
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/plecy_1-scaled.jpg"
]);
addGalery("jointInfo", [
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/nalokietniki_2-scaled.jpg",
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/nalokietniki_1-scaled.jpg",
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/nakolanniki_1-scaled.jpg"
]);
addGalery("hoodInfo", [
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/nakladka_1-scaled.jpg",
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/nakladka_2-scaled.jpg",
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/nakladka_3-scaled.jpg"
]);
addGalery("maskInfo", [
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/maska_1-scaled.jpg"
]);
addGalery("headPaddingInfo", [
  "https://historycznesztukiwalki.pl/wp-content/uploads/2020/12/czepek_1-scaled.jpg"
]);
