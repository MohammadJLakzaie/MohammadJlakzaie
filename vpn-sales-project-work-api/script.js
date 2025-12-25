
const blogEl = document.querySelector(".first-blog");
const innerBlogEl = document.getElementById("post");
console.log(innerBlogEl);


function loadComponent(id, file) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    });
  // .catch((error) => console.error("Error loading component:", error));
}

// for navbar
loadComponent("navbar", "/components/header/header.html");

//for footer
loadComponent("footer","/components/footer/footer.html");

//variabls
const API = "https://jsonplaceholder.typicode.com/posts";
const cardEL = document.getElementById("body");
const addBtn = document.querySelector(".addBtn");


//const deleteBtn = document.getElementById("deleteBtn");
const fakeOb = {
  "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
};

//api section
//GET
fetch(API)
  .then((res) => res.json())
  .then((ref) => {
ref.forEach((rev) => {
  const link = document.createElement("a");
  link.href = `/pages/users/innerblog.html?id=${rev.id}`;

  const card = document.createElement("div");
  card.className =
    "w-full max-w-[375px] h-[540px] bg-white rounded-2xl shadow-lg p-6 m-5 flex flex-col";

  card.innerHTML = `
    <h2 class="text-xl text-center font-bold text-gray-800 mb-4">
      ${rev.title}
    </h2>
    <p class="text-gray-600 text-sm leading-relaxed flex-1">
      ${rev.body}
    </p>
  `;

  link.append(card);

  cardEL.insertBefore(link,addBtn);
});

  });
  const params = new URLSearchParams(window.location.search);
const id = params.get("id");

  fetch(API)
  .then((res) => res.json())
  .then((data) => {
    const post = data.find((p) => p.id == id);
    return post;
  })
  .then((a) => {
    innerBlogEl.innerHTML += `<div class="w-full max-w-[375px] h-[540px] bg-white rounded-2xl shadow-lg p-6 m-5 flex flex-col mx-auto">
            <!-- Title -->
            <h2 class="text-xl flex justify-center font-bold text-gray-800 mb-4">${a.title}</h2>

            <!-- Details Text -->
            <p class="text-gray-600 text-sm  leading-relaxed flex-1">
            ${a.body}
            </p>
          </div>`;
  });


//POST
function printAndAdd() {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fakeOb),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      return res;
    })
    .then((reg) => {
      cardEL.innerHTML += `
       <div class="w-full max-w-[375px] h-[540px] bg-white rounded-2xl shadow-lg p-6 m-5 flex flex-col mx-auto">
            <!-- Title -->
            <h2 class="text-xl flex justify-center font-bold text-gray-800 mb-4">${reg.title}</h2>

            <!-- Details Text -->
            <p class="text-gray-600 text-sm  leading-relaxed flex-1">
            ${reg.body}
            </p>
          </div>
      `;
    })
    .catch((err) => console.log("this is  erroe : ", err));
}

addBtn.addEventListener("click", printAndAdd);



