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
    }
    // load data
    else{
        error.innerText =''
        main.innerHTML =''
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(response => response.json())
        .then(data =>displayPhones(data.data))
    }
}
// get main div id
const main = document.getElementById('main');
// display phones
const displayPhones = (phoneList) =>{
const first20Phone = phoneList.slice(0, 20);
if(phoneList.length == 0){
    error.innerText='Result did not found'
}
first20Phone?.forEach(phone => {
    console.log(phone)
    const div = document.createElement('div')
    // add class
    div.classList.add('col-lg-4')
    div.classList.add('mb-5')
    div.classList.add('rounded')
    div.innerHTML = `
    <div class="card shadow" style="width: 18rem;">
        <img src="${phone.image}" class="card-img-top p-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
                <button type="button" class="btn btn-outline-primary  rounded-pill">See Details</button>
        </div>
    </div>
    `
    main.appendChild(div)
});
}