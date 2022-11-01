const mainImages = document.querySelectorAll(".images a");
const popup = document.querySelector(".popup")
const sliderImg = document.querySelector(".inner img")
const uploadIcon = document.querySelector(".icon i");
const inputFile = document.querySelector("input");

uploadIcon.addEventListener("click", function () {

    this.nextElementSibling.click();
});
inputFile.addEventListener("change", function (e) {
    const { files } = e.target;
    imageUploader(files);
});
mainImages.forEach((img) => {
    // console.log(img);
    img.addEventListener("click", function (e) {
        e.preventDefault();
        // console.log(this);
        let imgSrc = this.getAttribute("href");
        sliderImg.setAttribute("src", imgSrc)
        popup.style.display = "block";

    })
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains("popup")) {
        popup.style.display = "none";
    }
})

const images = document.querySelector(".images");

export function imageUploader(files) {
  const imageList = [];
  for (let file of files) {
    const fileReader = new FileReader();

    fileReader.onloadend = (e) => {
      const { result } = e.target;
      const img = document.createElement("img");
      img.setAttribute("src", result);

      imageList.push({ fileName: file.name, result });

      localStorage.setItem("imageSlides", JSON.stringify(imageList));
      images.append(img);
    };

    fileReader.readAsDataURL(file);
  }
}