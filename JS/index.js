// get error id
const error = document.getElementById('error')
// spinner
const toggleSpinner = displayStyle =>{
  document.getElementById('spinner').style.display = displayStyle
}
// Main part
const searchButton = () =>{
    // ger search text
    const getSearchText = document.getElementById('search-text');
    const searchText = getSearchText.value;
    getSearchText.value = '';
    toggleSpinner('block')
    if(searchText ==""){
      error.innerText='Please give me search value'
      toggleSpinner('none')
      main.innerHTML ='';
      showPhoneDetails.innerHTML=''
    }
    // load data
    else{
      toggleSpinner('block')
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
    toggleSpinner('none')
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
    toggleSpinner('none')
});
}
// show phone details
const phoneDetails = (Phonedetails) =>{
    showPhoneDetails.innerHTML=''
    fetch(`https://openapi.programming-hero.com/api/phone/${Phonedetails}`)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
    window.scrollTo(0,0)

}
// display phone details
const displayPhoneDetails = (details) =>{
    const div = document.createElement('div');
    div.classList.add('mb-5')
    div.innerHTML = `
    <div class="card shadow p-3 " style="width: 18rem;">
    <img src="${details.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${details.name}</h5>
      <p>Brand: ${details.brand}</p>
      <h6>Released: ${details?.releaseDate ? details.releaseDate : 'Not Found'}</h6>
    </div>
    <h5 class="text-info text-center">Main Features </h5>
      <li class="list-group-item">ChipSet: ${details?.mainFeatures?.chipSet? details.mainFeatures.chipSet:'Not Found'}</li>
      <li class="list-group-item">Display Size: ${details?.mainFeatures?.displaySize? details.mainFeatures.displaySize:'Not Found'}</li>
      <li class="list-group-item">Memory: ${details?.mainFeatures?.memory? details.mainFeatures.memory:'Not Found'}</li>

    <h5 class="text-info text-center">Sensor Information </h5>
      <li class="list-group-item">${details?.mainFeatures?.sensors[0]? details.mainFeatures.sensors[0]:'Not Found'}</li>
      <li class="list-group-item">${details?.mainFeatures?.sensors[1]? details.mainFeatures.sensors[1]:'Not Found'}</li>
      <li class="list-group-item">${details?.mainFeatures?.sensors[2]? details.mainFeatures.sensors[2]:'Not Found'}</li>
      <li class="list-group-item">${details?.mainFeatures?.sensors[3]? details.mainFeatures.sensors[3]:'Not Found'}</li>
      <li class="list-group-item">${details?.mainFeatures?.sensors[4]? details.mainFeatures.sensors[4]:'Not Found'}</li>
      <li class="list-group-item">${details?.mainFeatures?.sensors[5]? details.mainFeatures.sensors[5]:'Not Found'}</li>

    <h5 class="text-info text-center">Others Information</h5>
      <li class="list-group-item">Bluetooth: ${details.others?.Bluetooth? details.others?.Bluetooth:'Not Found'}</li>
      <li class="list-group-item">GPS: ${details?.others?.GPS? details.others.GPS:'Not found'}</li>
      <li class="list-group-item">NFC: ${details?.others?.NFC? details.others.NFC:'Not Found'}</li>
      <li class="list-group-item">Radio: ${details?.others?.Radio? details.others?.Radio:'Not Found'}</li>
      <li class="list-group-item">USB: ${details?.others?.USB? details.others.USB:'Not Found'}</li>
      <li class="list-group-item">WLAN: ${details?.others?.WLAN ? details.others.WLAN : 'Not Found'}</li>

  </div>
    `
    showPhoneDetails.appendChild(div)

}