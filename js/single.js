const url = location.search;
const productId = new URLSearchParams(url).get("product-id");
console.log(productId);

let body = document.querySelector(".body");

const renderData = (item) => {
  console.log(item);
  body.innerHTML = ""; // Boshatish oldingi cardlarni

  let boxInner = document.createElement("div");
  boxInner.innerHTML = `
    <div class="single_card">
      <div class="single_card-image">
        <a href="../pages/Single.html?product-id=${item.id}">
          <img src="${item.image}" alt="${item.title}">
        </a>
      </div>
      <div class="single_card-content">
        <h1 class="single_card-title">${item.title}</h1>
        <p class="single_card-description">${truncate(item.description, 100)}</p>
        <p class="single_card-rating">⭐ ${item.rating.rate} (${item.rating.count} reviews)</p>
        <strong class="single_card-price">$${item.price}</strong>
      </div>
    </div>
  `;
  body.appendChild(boxInner);
};

function truncate(text, length) {
  return text.length > length ? text.substring(0, length) + "..." : text;
}

function getData() {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(res => res.json())
    .then(data => renderData(data));
}

getData();
