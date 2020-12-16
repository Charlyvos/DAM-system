let modal = document.getElementsByClassName("modal")[0];
let assetImg = document.getElementsByClassName("assetThumb");
let modalImg = document.getElementById("previewThumb");
let span = document.getElementsByClassName("close")[0];
let previewTitle = document.getElementById("previewTitle");
let fileExtension = document.getElementsByClassName("fileExtension")[0];

// Loop through all assets and set the src file in the preview.
for (let i = 0; i < assetImg.length; i++) {
    //find img src from background property
    let imgSrc = window.document.defaultView.getComputedStyle(document.getElementsByClassName('assetThumb')[i], null).getPropertyValue('background-image').split(/'|\"/)[1];
    let imgTitle = $(assetImg[i]).find(".title").text();
    let imgExtension = $(assetImg[i]).find(".extension").text();

    assetImg[i].addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = imgSrc;
        previewTitle.innerHTML = imgTitle;
        fileExtension.innerHTML = imgExtension;
    });
}

// close modal onclick span (X button)
span.addEventListener("click", () => {
    modal.style.display = "none";
});

//close modal onclick outside the modal
window.onclick = (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  }