// get error id
const error = document.getElementById('error')
// Main part
const searchButton = () =>{
    // ger search text
    const getSearchText = document.getElementById('search-text');
    const searchText = getSearchText.value;
    getSearchText.value = '';
    if(searchText ==""){
      error.innerText='Please give me search value'
      main.innerHTML ='';
      showPhoneDetails.innerHTML=''
    }
    // load data
    else{
        error.innerText =''
        main.innerHTML =''
        showPhoneDetails.innerHTML=''
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(response => response.json())
        .then(data =>displayPhones(data.data))
    }
}
// get  div id
const main = document.getElementById('main');
const showPhoneDetails = document.getElementById('show-phone-details')
// display phones
const displayPhones = (phoneList) =>{
const first20Phone = phoneList.slice(0, 20);
if(phoneList.length == 0){
    error.innerText='Result did not found'
}
first20Phone?.forEach(phone => {
    const div = document.createElement('div')
    // add class
    div.classList.add('col-lg-4')
    div.classList.add('mb-5')
    div.classList.add('rounded')
    div.innerHTML = `
    <div class="card shadow mx-auto mt-3" style="width: 18rem;">
        <img src="${phone.image}" class="card-img-top p-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
                <button onclick="phoneDetails('${phone.slug}')" type="button" class="btn btn-outline-primary  rounded-pill">See Details</button>
        </div>
    </div>
    `
    main.appendChild(div)
});
}
// show phone details
const phoneDetails = (Phonedetails) =>{
    showPhoneDetails.innerHTML=''
    fetch(`https://openapi.programming-hero.com/api/phone/${Phonedetails}`)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))

}
// display phone details
const displayPhoneDetails = (details) =>{
    const div = document.createElement('div');
    div.classList.add('mb-5')
    div.innerHTML = `
    <div class="card mt-3 shadow p-3 " style="width: 18rem;">
    <img src="${details.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${details.name}</h5>
      <p>Brand: ${details.brand}</p>
      <h6>Released: ${details.releaseDate ? details.releaseDate : 'Not found'}</h6>
    </div>
    <h5 class="text-info text-center">Main Features </h5>
      <li class="list-group-item">ChipSet: ${details.mainFeatures.chipSet}</li>
      <li class="list-group-item">Display Size: ${details.mainFeatures.displaySize}</li>
      <li class="list-group-item">Memory: ${details.mainFeatures.memory}</li>

    <h5 class="text-info text-center">Sensor Information </h5>
      <li class="list-group-item">${details.mainFeatures.sensors[0]}</li>
      <li class="list-group-item">${details.mainFeatures.sensors[1]}</li>
      <li class="list-group-item">${details.mainFeatures.sensors[2]}</li>
      <li class="list-group-item">${details.mainFeatures.sensors[3]}</li>
      <li class="list-group-item">${details.mainFeatures.sensors[4]}</li>
      <li class="list-group-item">${details.mainFeatures.sensors[5]}</li>

    <h5 class="text-info text-center">Others Information</h5>
      <li class="list-group-item">Bluetooth: ${details.others.Bluetooth}</li>
      <li class="list-group-item">GPS: ${details.others.GPS}</li>
      <li class="list-group-item">NFC: ${details.others.NFC}</li>
      <li class="list-group-item">Radio: ${details.others.Radio}</li>
      <li class="list-group-item">USB: ${details.others.USB}</li>
      <li class="list-group-item">WLAN: ${details.others.WLAN}</li>

  </div>
    `
    showPhoneDetails.appendChild(div)

}