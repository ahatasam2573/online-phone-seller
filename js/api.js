//load data from API
const loadPhones = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    // load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))

}

//search phone 
document.getElementById('error-message').style.display = 'none';
const displaySearchResult = data => {
    if (data.length == 0) {
        const displayError = document.getElementById('error-message').style.display = 'block';
    }
    else if (data.length <= 20) {
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
        data.forEach(info => {
            // console.log(info);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-80 w-80 mx-auto mt-5">
                    <img src="${info.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h4 class="card-title">${info.phone_name}</h4>
                        <p class="card-text fw-bold">${info.brand}</p>
                        <button onclick="loadPhoneDetail('${info.slug}')" class="bg-success ps-2 pe-2 rounded text-white">Explore</button>
                    </div>
            </div>
            `;
            searchResult.appendChild(div);
            document.getElementById('error-message').style.display = 'none';
        });
    }
    else if (data.length > 20) {
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
        const size = data.length;
        const objects = JSON.parse(size);
        const items = objects.slice(0, 20);
    }
    else {
        const searchResult = document.getElementById('search-result').style.display = 'none';
    }

}

//load phone and details
const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;

    fetch(url)
        .then(res => res.json())
        .then(data => phoneDetail(data.data))
}
const phoneDetail = info => {
    // console.log(info);
    const phoneDetail = document.getElementById('phone-details');
    phoneDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${info.image}" class="card-img-top w-100 h-100" alt="...">  
        <div class="card-body h-300 w-300"                                                                                                                                                                                                                             ">
             <h5 class="card-title fw-bold">${info.name}</h5>
             <p class="card-text">ReleaseDate : ${info.releaseDate ? info.releaseDate : 'No relese date found!!'}</p>
             <p class="card-text">Sensors : ${info.mainFeatures.sensors}</p>
             <p class="card-text">Storage : ${info.mainFeatures.storage}</p>
             <p >Others : ${info.others.WLAN}</p>
        </div>
    `;
    phoneDetail.appendChild(div);
}