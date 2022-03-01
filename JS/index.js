// get error id
const error = document.getElementById('error')
const searchButton = () =>{
    // ger search text
    const getSearchText = document.getElementById('search-text');
    const searchText = getSearchText.value;
    getSearchText.value = '';
    console.log(searchText)
    if(searchText ==""){
      error.innerText='Please give me search value'
    }
    // load data
    else{
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(response => response.json())
        .then(data => console.log(data.data))
    }
}
