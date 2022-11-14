// import { isValidZip, showAlert } from "/validate";

// Validate Zipcode
// function isValidZip(zip) {
//   return /^\d{5}(-\d{4})?$/.test(zip);
// }

// // Display Alert Message
// function showAlert(message, className) {
//   // Create div
//   const div = document.createElement('div');
//   // Add Classes
//   div.className = `alert alert-${className}`;
//   // Add Text
//   div.appendChild(document.createTextNode(message));
//   // Get Container
//   // const container = document.querySelector('.container-zip');
//   const alertBox = document.querySelector('.alert-msg')
//   // Get Form
//    const input = document.querySelector('.input-zip');
//   // Insert Alert
//   // container.insertBefore(div, container);
//   alertBox.append(div)

//   setTimeout(() => document.querySelector('.alert').remove(), 3000);
// }





//declare empty data variable

let catData 

//fetch the data
//https://api.thecatapi.com/v1/images/search?breed_ids={breed-id}
// https://api.thecatapi.com/v1/breeds
const BREEDS_URL = `https://api.thecatapi.com/v1/breeds?${key}` //breeds api //has all info like temperament

const select = document.querySelector('.breeds-menu') //grabbing breed name



fetch(BREEDS_URL)
    .then(res => res.json())
    .then(data => {
        //  then assign the data
        catData = data
        console.log(catData)
        
      
        return catData //next then is receiving that cat data
        
    })
    .then(res => {
        //  then inject the options into the dropdown
        for(let i = 0; i < res.length; i++){
           //since three names do not have image url remove them from dropdown
                if((res[i].name === 'Persian' || res[i].name === 'European Burmese' || res[i].name === 'Malayan')){
                    console.log('found')
                    continue
                }
             
   
            let option = document.createElement('option') 
            option.classList.add('breed-names')
            option.value = res[i].name
            option.innerText = res[i].name
            select.appendChild(option) //put breeds in drop down
            
        }
    })

    select.addEventListener('change', event => { //on click of breed name from select

        
    let clearIt = document.querySelectorAll('.clear') 
    console.log(clearIt)
    if(clearIt.length > 0){
    [...clearIt].forEach(node => node.remove())
    }
    // let temperamentElem = document.querySelector('h3')
    let breed = event.target.value
    let description = ''
    let catImgUrl = ''
    let temperament = ''
    let shedding = ''
    let energy = ''
    let affection= ''
    let intelligence = ''
    let social = ''
    let wiki = ''

    // temperamentElem.classList.toggle('hidden')

    
    for(let i = 0; i < catData.length; i++){ //interate through the catData
        // let breedName = catData[i].name //grabbing the name for my template literal

     
        if(catData[i].name === breed){ //array item name === breed that was clicked on catData[i].name
            description = catData[i].description
            catImgUrl = catData[i].image.url //  grab img endpoint and show image
            
            temperament = catData[i].temperament  //  grab temperament from data variable 
            wiki = catData[i].wikipedia_url
            console.log(wiki)
            affection = catData[i].affection_level //need to somehow get these 5 injected into table 
            energy = catData[i].energy_level
            shedding = catData[i].shedding_level
            intelligence = catData[i].intelligence
            social = catData[i].social_needs

           

//i need to take these 5 data points and inject them in order into the new cells i created

        let newArr = [affection, energy, shedding, intelligence, social]
        console.log(newArr)
      
        let table = document.querySelector('table')
      

       function generateTable(table, data){
        
        let row = table.insertRow() //create a new row 

        for(let j = 0; j < newArr.length; j++){
            let cell = row.insertCell() //within that row place a cell 5 times
            row.classList.add('traitCells', 'clear') //add these classes
            let text = newArr[j] //add the array data to text
            cell.append(text) // add that text to each new cell created
        }
}
// }
generateTable(table)

     
        let tempList = temperament.split(',') //making temperament into array
        console.log(tempList)
        for(let i = 0; i < tempList.length; i++){ //for each trait
            const li = document.createElement('li') //create li
            li.classList.add('clear')
            li.innerText = tempList[i] //display the trait here
            document.querySelector('ul').appendChild(li)//append the li to ul
         }


    }   

}

    document.querySelector('.description').innerText= description
    document.querySelector('.cat-img').src = catImgUrl
})


document.getElementById('search').addEventListener('click', getCats)


// async function getCats(e){
//   //e.preventDefault()
//   const zip = document.querySelector("#zipCode").value;
//   console.log(zip)
//   if(!isValidZip(zip)){
//     showAlert('Please enter a valid zipcode', 'danger')
//   }


//   //fetch pets

// let token

// await fetch("https://api.petfinder.com/v2/oauth2/token", {
//   method: "POST", // or 'PUT'
//   body: 
//   `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//     // The application/x-www-form-urlencoded content type describes form data that is sent in a single block in the HTTP message body. Unlike the query part of the URL in a GET request, the length of the data is unrestricted.
//   },
  
// })
//   .then((response) => response.json())
//   .then((data) => {
//     token = data.access_token;

//   })
//   .then(() => {
//     // use token to fetch animals
//     fetch(
//       `https://api.petfinder.com/v2/animals?type=Cat`,
//       {
//         method: "GET",
//         mode: "cors",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + token,
//         },
//       }
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data)
//         console.log(data.animals[0].breeds)
//       });
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// }


// async function getCats(e) {
//     //e.preventDefault()
//   const zip = document.querySelector("#zipCode").value;
//   console.log(zip)
//   if(!isValidZip(zip)){
//     showAlert('Please enter a valid zipcode', 'danger')
//   }


//   //fetch pets
// const client_id = "TWbeVCsWr0XVxQ0VkULeEOdV8J11jrtWgKHtz4SmmmfjnVQ3XC";
// const client_secret = "tTSmmgBoz6uhihsFEDbZvlm7XaGKm7NsL8mUfWIt";
// let token
//   try {
//     const [data1, data2] = await Promise.all([
//       fetch(endpoints.one),
//       fetch(endpoints.two),
//     ]);
//     console.log(data1, data2);
//   } catch (err) {
//     console.log(err);
//   }
// }
