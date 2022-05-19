function galeryFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;
  console.log(data)

  let srcMedia = `./assets/images/${photographerId}/`;
  if (image) {
    srcMedia += image;
  } else {
    srcMedia += video;
  }

  console.log();

  function getUserGaleryDOM() {
    const divImg = document.createElement("div")
    const figureGalery = document.createElement("figure");
    figureGalery.classList.add(id);
    
    const legendGalery = document.createElement("figcaption");
    const legendTitle = document.createElement("div");
    const legendLikes = document.createElement("span")
    console.log(legendLikes)
    
    const h4Page = document.createElement("h4");
    h4Page.textContent = title;

    /*const pricePerDay = document.createElement("h6")
    console.log(pricePerDay)*/

    const h5Page = document.createElement("h5");
    console.log(h5Page)
    //Affichage des likes sur la page
    h5Page.innerHTML = '<span>' + likes + '</span> <i class="fa-solid fa-heart"></i>' 
    

    if (image) {
      const imgPhoto = document.createElement("img");
      imgPhoto.setAttribute("src", srcMedia);
      divImg.appendChild(imgPhoto);
    } else {
      
      const vidPhoto = document.createElement("video");
      vidPhoto.setAttribute("type", "video/mp4");
      vidPhoto.setAttribute("src", srcMedia);
      vidPhoto.setAttribute("controls", null);
      divImg.appendChild(vidPhoto);
    }
    figureGalery.appendChild(divImg);
    figureGalery.appendChild(legendGalery);
    legendGalery.appendChild(legendTitle);
    legendTitle.appendChild(h4Page);
    legendLikes.appendChild(h5Page);
    legendTitle.appendChild(legendLikes);
    
    return figureGalery;
  }



  return {id, photographerId, title, image, video, likes, date, price, srcMedia, getUserGaleryDOM};
}
