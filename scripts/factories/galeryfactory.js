function galeryFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  let srcMedia = `./assets/images/${photographerId}/`;
  if (image) {
    srcMedia += image;
  } else {
    srcMedia += video;
  }

  console.log();

  function getUserGaleryDOM() {
    const figureGalery = document.createElement("figure");
    figureGalery.classList.add(id);
    
    const legendGalery = document.createElement("figcaption");
    const legendTitle = document.createElement("div");
    
    
    const h4Page = document.createElement("h4");
    h4Page.textContent = title;
    if (image) {
      const imgPhoto = document.createElement("img");
      imgPhoto.setAttribute("src", srcMedia);
      figureGalery.appendChild(imgPhoto);
    } else {
      
      const vidPhoto = document.createElement("video");
      vidPhoto.setAttribute("type", "video/mp4");
      vidPhoto.setAttribute("src", srcMedia);
      vidPhoto.setAttribute("controls", null);
      figureGalery.appendChild(vidPhoto);
    }
    
    figureGalery.appendChild(legendGalery);
    legendGalery.appendChild(legendTitle);
    legendTitle.appendChild(h4Page);
    
    return figureGalery;
  }



  return {id, photographerId, title, image, video, likes, date, price, srcMedia, getUserGaleryDOM};
}
