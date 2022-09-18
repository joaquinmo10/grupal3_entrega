const nasaURL = "https://images-api.nasa.gov/search?q=";
let imgUrl = "https://images-api.nasa.gov/";
const container = document.getElementById("contenedor");
document.getElementById("btnBuscar").addEventListener("click", nasaSearch);


async function nasaSearch(){

    container.innerHTML = ""
    let buscador = document.getElementById("inputBuscar").value
    const result = await getJSONData(nasaURL + buscador)
    let imagesArray = result.data.collection.items
    let htmlToAppend = ""
    console.log(imagesArray)
    for(let i = 0; i< imagesArray.length; i++){
        if(imagesArray[i].data[0].media_type === "image"){
            htmlToAppend += `
            <div class="col-sm-4 d-flex justify-content-center pb-4 mb-4 cards">
                <div class="card col-4" style="width: 100%; hieght: 450px; box-shadow: 1px 4px 7px #8888888;">
                <img style="height: 250px ; width:400px" src="` + imagesArray[i].links[0].href + `" class="card-img-top" alt="...">
                    <div class="card-body overflow-auto">
                        <h5 class="card-tittle">` + imagesArray[i].data[0].title + `</h5>
                        <p class="card-text">` + imagesArray[i].data[0].description + `</p>
                    </div>
                    <p class="card-text">` + imagesArray[i].data[0].date_created + `</p> 
                </div>
            </div>`
        }
    }
    container.innerHTML = htmlToAppend
}





let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}


