
//------------------------get APi----------------------------------

const phoneHut = async (searchResult = '12', isShowall) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchResult}`
  );
  const data = await res.json();
  const phones = data.data;
  const status = data.status
  displayPhones(phones, isShowall, status);
};

//-----------------------------------displayed the all phone------------------------------

const displayPhones = (phones, isShowall, status) => {
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.textContent = "";

  //----------------------show all button-----------------------------

  const showBtn = document.getElementById("showAll-btn");
  if (phones.length > "12" && !isShowall) {
    showBtn.classList.remove("hidden");
  } else {
    showBtn.classList.add("hidden");
  }
  if (!isShowall) {
    phones = phones.slice(0, 12);
  }

  //----------------------displayed all single phone as a div--------------------------------

  phones.forEach((phone) => {
    // console.log(phone.slug);
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="" class="rounded-xl">
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="">
            <button onclick="getIdFromApi('${phone.slug}')" class="btn btn-primary w-full">Show Details</button>
            </div>
        </div>
        </div>
        `;
    phonesContainer.appendChild(card);
  });

  //-----------------spinner off--------------------------

  handleSpinner(false);

  //---------------not found search result-----------------

  const noReault = document.getElementById('no-result');
  if(status === false){
    noReault.innerText = "Sorry! we are not found this result"
  }
};

//----------------------search function----------------------------------------------------

const searchPhone = (isShowall) => {
  handleSpinner(true);
  const searchInput = document.getElementById("search-input");
  const searchInputValue = searchInput.value;
  phoneHut(searchInputValue, isShowall);
};

//-----------------------run spinner------------------------------------------------------

const handleSpinner = (isspinn) => {
  const spinner = document.getElementById("spinner");
  if (isspinn) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};
//--------------------------open modal------------------------------------------------

const getIdFromApi = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showDetails(phone);
};

const showDetails = (phoneDetails) => {
  // console.log(phoneDetails);
  const phoneDescription = document.getElementById("phone-description");
  const description = document.createElement("section");
  description.innerHTML = `
    <div class="flex justify-center">
                    <img src="${phoneDetails.image}" alt="">
                </div>
                <h1 class="text-2xl text-center my-4">${phoneDetails.name}</h1>
                <p>Storage : ${
                  phoneDetails.mainFeatures?.storage
                    ? phoneDetails.mainFeatures.storage
                    : "don't show in this device"
                } </p>
                <p>Display Size : ${
                  phoneDetails.mainFeatures?.displaySize
                    ? phoneDetails.mainFeatures.displaySize
                    : "this features is unavailable in this device"
                }</p>
                <p>Chipset : ${
                  phoneDetails.mainFeatures?.chipSet
                    ? phoneDetails.mainFeatures.chipSet
                    : "unavailable"
                }</p>
                <p>Slug :${
                  phoneDetails.slug
                    ? phoneDetails.slug
                    : "this features is unavailable in this device"
                }</p>
                <p>Release data :${
                  phoneDetails.releaseDate
                    ? phoneDetails.releaseDate
                    : "this features is unavailable in this device"
                }</p>
                <p>Brand :${phoneDetails.brand}</p>
                <p>GPS :${
                  phoneDetails.others?.GPS
                    ? phoneDetails.others.GPS
                    : "this features is unavailable in this device"
                }</p>
    `;
  phoneDescription.appendChild(description);

  my_modal_5.showModal();
};
//------------------------------show all button---------------------------------------

const showAll = () => {
  searchPhone(true);
};

phoneHut();
