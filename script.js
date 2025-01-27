const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImages(images) {
  loading.style.display = "block";
  error.textContent = ""; // Clear previous error message
  output.innerHTML = "";  // Clear previous images

  const imagePromises = images.map(image => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
      img.src = image.url;
    });
  });

  Promise.all(imagePromises)
    .then((imageElements) => {
      loading.style.display = "none";
      imageElements.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch((err) => {
      loading.style.display = "none";
      error.textContent = err;
    });
}

btn.addEventListener("click", () => {
  downloadImages(images);
});
