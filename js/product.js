let body = document.querySelector(".body");
let sort = document.querySelector(".sort");
let inp = document.getElementById("inp");
let allData = []; // Barcha ma'lumotlarni saqlash
let loader = document.querySelector(".loader__parent"); // Loader elementi

// Ma'lumotlarni qisqartirish funksiyasi
const truncate = (text, limit) => {
  if (text.length > limit) {
    return text.slice(0, limit) + "...";
  }
  return text;
};

// Ma'lumotlarni render qilish funksiyasi
const renderData = (data) => {
  body.innerHTML = ""; // Boshatish oldingi cardlarni
  data.forEach((item) => {
    let boxInner = document.createElement("div");
    boxInner.innerHTML = `
    <div class="card">
      <div class="card-image">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="card-content">
        <h1 class="card-title">${item.title}</h1>
        <p class="card-description">${truncate(item.description, 100)}</p>
        <p class="card-rating">⭐ ${item.rating.rate} (${item.rating.count} reviews)</p>
        <strong class="card-price">$${item.price}</strong>
      </div>
    </div>
    `;
    body.appendChild(boxInner);
  });
};

// API dan ma'lumotlarni olish funksiyasi
async function getData() {
  loader.classList.remove("loader_close"); // Loaderni ko'rsatish
  loader.classList.add("loader__parent"); 

  // Avval localStorage'dan ma'lumotlarni tekshiramiz
  const storedData = localStorage.getItem('products');
  if (storedData) {
    allData = JSON.parse(storedData); // localStorage'dan saqlangan ma'lumotlarni olamiz
    renderData(allData); // Agar mavjud bo'lsa, ularni ekranga chiqaramiz
    loader.classList.add("loader_close"); // Loaderni yashirish
  } else {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    loader.classList.add("loader_close"); // Loaderni yashirish
    allData = data; // Barcha ma'lumotlarni saqlash
    localStorage.setItem('products', JSON.stringify(data)); // Ma'lumotlarni localStorage ga saqlash
    renderData(allData); // Ma'lumotlarni chiqarish
  }

  // Qidiruv va sortlash eventlari
  inp.addEventListener("keyup", () => searchFilter(allData)); // Search filteri
  sort.addEventListener("change", (e) => sortData(e, allData)); // Sortlash
}

// Qidiruv filteri
const searchFilter = (data) => {
  const searchValue = inp.value.toLowerCase().trim();
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchValue) // Qidiruvni titlega qarab filtrlash
  );
  localStorage.setItem('products', JSON.stringify(filteredData)); 
  renderData(filteredData); // Filtrlangan ma'lumotlarni ko'rsatish
};

// Narx bo'yicha sort qilish
const sortData = (e, data) => {
  const sortValue = e.target.value; // Sort variantini olish

  let sortedData = [];
  if (sortValue === "asc") {
    sortedData = [...data].sort((a, b) => a.price - b.price); // Arzonidan qimmatiga
  } else if (sortValue === "desc") {
    sortedData = [...data].sort((a, b) => b.price - a.price); // Qimmatidan arzoniga
  } else {
    sortedData = data; // Hech qanday sort bo'lmasa, asli ma'lumotni qaytarish
  }

  localStorage.setItem('products', JSON.stringify(sortedData)); // Sortlangan ma'lumotlarni localStorage ga saqlash
  renderData(sortedData); // Sortlangan ma'lumotlarni ko'rsatish
};

getData();
