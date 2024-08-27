const loadPhone = async (searchText = 13, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones.length);
    // result not found
    const resultError = document.getElementById('result-not-found');
    if (phones.length === 0) {
        handleSpinner(false);
        resultError.classList.remove('hidden')
    }
    else {
        resultError.classList.add('hidden')
        // handleSpinner(true);
    }
    // show all
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 9 && !isShowAll) {
        showAllContainer.classList.remove('hidden');//show all btn dekhabe
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // slice
    if (!isShowAll) {
        phones = phones.slice(0, 9);
    }
    const cardContainer = document.getElementById('card-container');
    // clear display
    cardContainer.textContent = '';
    phones.forEach(phone => {
        // console.log(phone);
        const createdCard = document.createElement('div');
        createdCard.classList = 'card bg-base-100 w-full shadow-xl pt-12 border';
        createdCard.innerHTML = `
        <figure>
        <img src="${phone.image}"/>
        </figure>
        <div class="card-body text-center">
            <h2 class="text-3xl font-semibold">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <h2 class="text-2xl font-bold">$999</h2>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn bg-[#0D6EFD] text-white">Show Details</button>
            </div>
        </div>
        `
        cardContainer.appendChild(createdCard);
        // hide spinner
        handleSpinner(false);
    });
}

const handleShowDetail = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data
    phoneDetailsModal(phone)
}

const phoneDetailsModal = (phone) => {
    const showDetailsContainer = document.getElementById('show-detail-container');
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}"/>
    <h3 class="text-3xl font-bold">${phone.name}</h3>
    <p><span class="text-[18px] font-semibold">Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span class="text-[18px] font-semibold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class="text-[18px] font-semibold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class="text-[18px] font-semibold">Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p><span class="text-[18px] font-semibold">Slug: </span>${phone?.slug}</p>
    <p><span class="text-[18px] font-semibold">Release data: </span>${phone?.releaseDate}</p>
    <p><span class="text-[18px] font-semibold">Brand: </span>${phone?.brand}</p>
    <p><span class="text-[18px] font-semibold">GPS: </span>${phone?.others?.GPS || 'No GPS available'}</p>
    `
    //open modal
    my_modal_5.showModal()
}

// search button
const handleSearch = (isShowAll) => {
    handleSpinner(true);
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}

// handle spinner
const handleSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner-div')
    if (isLoading) {
        spinner.classList.remove('hidden')
    }
    else {
        spinner.classList.add('hidden');
    }
}
// show all button
const handleShowAll = () => {
    handleSearch(true)
}

loadPhone();