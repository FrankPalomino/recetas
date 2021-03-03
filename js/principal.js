/****************
CONSTANTES DEL DOM
******************/

const PRINCIPAL_DOM = document.getElementById('principal');
let recetaDom = document.getElementById("receta");
let ingredientsDom = document.getElementById("ingredients");
let infoDom = document.getElementById("info");
let preparacioDom = document.getElementById("preparacio");
let presentacioDom = document.getElementById("presentacio");
let notesDom = document.getElementById("notes");

function loadXMLDoc(data) {
  //console.log(data);
  parser = new DOMParser();
  xmlDoc = parser.parseFromString(data, "text/xml");

  //////////////////
  //CONSTANTES DEL XML
  //////////////////
  const ingredientsArray = xmlDoc.getElementsByTagName("ingredient");
  const tagBlurbArray = xmlDoc.getElementsByTagName("blurb");
  const tagGenreArray = xmlDoc.getElementsByTagName("genre");
  const tagAuthorArray = xmlDoc.getElementsByTagName("author");
  const tagYieldArray = xmlDoc.getElementsByTagName("yield");
  const tagPreptimeArray = xmlDoc.getElementsByTagName("preptime");
  const tagTitleArray = xmlDoc.getElementsByTagName("title");
  const fotoXMLString = xmlDoc.getElementsByTagName("img")[0].firstChild.nodeValue;
  const preparacioArray = xmlDoc.getElementsByTagName("preparation");
  const presentacioArray = xmlDoc.getElementsByTagName("serving");
  const notesArray = xmlDoc.getElementsByTagName("notes");



  if (recetaDom === null) {
    recetaDom = document.createElement('div');
    recetaDom.setAttribute("id", "receta");
    ingredientsDom = document.createElement("div");
    ingredientsDom.setAttribute("id", "ingredients");
    infoDom = document.createElement("div");
    infoDom.setAttribute("id", "info");
    preparacioDom = document.createElement("div");
    preparacioDom.setAttribute("id", "preparacio");
    presentacioDom = document.createElement("div");
    presentacioDom.setAttribute("id", "presentacio");
    notesDom = document.createElement("div");
    notesDom.setAttribute("id", "notes");

  } else {
    recetaDom.innerHTML = "";
    ingredientsDom.innerHTML = "";
    infoDom.innerHTML = "";
    preparacioDom.innerHTML = "";
    presentacioDom.innerHTML = "";
    notesDom.innerHTML = "";
  }


  /////////////////////////////
  //CREAMOS LOS ELEMENTOS DEL DOM (TARGETAS)
  /////////////////////////////

  // RECETA //
  let nomRecetaDom = document.createElement("div");
  nomRecetaDom.setAttribute("id", "nom-receta");
  nomRecetaDom.appendChild(document.createTextNode(tagTitleArray[0].firstChild.nodeValue));
  recetaDom.appendChild(nomRecetaDom);

  let imagenDom = document.createElement("div");
  imagenDom.setAttribute("id", "imagen");

  let tagImgDom = document.createElement("img");
  tagImgDom.setAttribute("src", "http://joanqc.no-ip.biz/iesbalmes/wec/receptes/recipes/" + fotoXMLString);
  imagenDom.appendChild(tagImgDom);
  recetaDom.appendChild(imagenDom);
  PRINCIPAL_DOM.appendChild(recetaDom);

  // INGREDIENTES //
  let tituloIngredientDom = document.createElement("div");
  tituloIngredientDom.setAttribute("class", "titulo");
  tituloIngredientDom.appendChild(document.createTextNode("Ingredients"));
  ingredientsDom.appendChild(tituloIngredientDom);

  let contenidoIngredientsDom = document.createElement("div");
  contenidoIngredientsDom.setAttribute("class", "contenido");

  let ulIngredienteDom = document.createElement("ul");


  const iteradorIngredients = ingredientsArray.length;
  for (let i = 0; i < iteradorIngredients; i++) {
    let txt_fooditem = "";
    let txt_quantity = "";
    let txt_unit = "";

    const iteradoHijosDeIngredientes = ingredientsArray[i].childNodes.length;
    for (let k = 0; k < iteradoHijosDeIngredientes; k++) {
      //console.log(ingredients[i].childNodes[k].nodeName);
      const nodoIngrediente = ingredientsArray[i].childNodes[k];
      const nombreNodoIngrediente = nodoIngrediente.nodeName;
      const tamanoNodoHijoDelNodoIngrediente = nodoIngrediente.childNodes.length;

      if (nombreNodoIngrediente === "quantity") {
        if (tamanoNodoHijoDelNodoIngrediente > 0)
          txt_quantity = nodoIngrediente.childNodes[0].nodeValue;
      }
      if (nombreNodoIngrediente === "unit") {
        if (tamanoNodoHijoDelNodoIngrediente > 0)
          txt_unit = nodoIngrediente.childNodes[0].nodeValue;
      }
      if (nombreNodoIngrediente === "fooditem") {
        if (tamanoNodoHijoDelNodoIngrediente > 0)
          txt_fooditem = nodoIngrediente.childNodes[0].nodeValue;
      }
    }

    let liIngredientDom = document.createElement("li");
    let textNodeFinal = txt_fooditem;
    if (txt_quantity !== "" && txt_unit !== "") {
      textNodeFinal += " (" + txt_quantity + " " + txt_unit + ")";
    }

    liIngredientDom.appendChild(document.createTextNode(textNodeFinal));
    ulIngredienteDom.appendChild(liIngredientDom);
  }

  contenidoIngredientsDom.appendChild(ulIngredienteDom);
  ingredientsDom.appendChild(contenidoIngredientsDom);
  PRINCIPAL_DOM.appendChild(ingredientsDom);

  // INFO //
  let tituloIndoDom = document.createElement("div");
  tituloIndoDom.setAttribute("class", "titulo");
  tituloIndoDom.appendChild(document.createTextNode("Informació"));

  infoDom.appendChild(tituloIndoDom);

  let contenidoInfoDom = document.createElement("div");
  contenidoInfoDom.setAttribute("class", "contenido");

  //Crear una lista ul
  let ulContenidoInfoDom = document.createElement("ul");
  if (tagBlurbArray.length > 0 && tagBlurbArray[0].firstChild !== null) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("Descripció: " + tagBlurbArray[0].firstChild.nodeValue))
    ulContenidoInfoDom.appendChild(li);
  }

  if (tagGenreArray.length > 0 && tagGenreArray.firstChild !== null) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("Tipus de plat: " + tagGenreArray[0].firstChild.nodeValue))
    ulContenidoInfoDom.appendChild(li);
  }

  if (tagAuthorArray.length > 0 && tagAuthorArray[0].firstChild !== null) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("Autor: " + tagAuthorArray[0].firstChild.nodeValue))
    ulContenidoInfoDom.appendChild(li);
  }

  if (tagYieldArray.length > 0 && tagYieldArray[0].firstChild !== null) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("Comensals: " + tagYieldArray[0].firstChild.nodeValue))
    ulContenidoInfoDom.appendChild(li);
  }

  if (tagPreptimeArray.length > 0 && tagPreptimeArray[0].firstChild !== null) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("Temps de preparació: " + tagPreptimeArray[0].firstChild.nodeValue))
    ulContenidoInfoDom.appendChild(li);
  }

  contenidoInfoDom.appendChild(ulContenidoInfoDom);

  infoDom.appendChild(contenidoInfoDom);
  PRINCIPAL_DOM.appendChild(infoDom);

  // PREPARACIO //
  let tituloPreparacioDom = document.createElement("div");
  tituloPreparacioDom.setAttribute("class", "titulo");
  tituloPreparacioDom.appendChild(document.createTextNode("Preparació"));

  preparacioDom.appendChild(tituloPreparacioDom);

  let contenidoPreparacioDom = document.createElement("div");
  contenidoPreparacioDom.setAttribute("class", "contenido");

  contenidoPreparacioDom.appendChild(document.createTextNode(preparacioArray[0].firstChild.nodeValue))

  preparacioDom.appendChild(contenidoPreparacioDom);

  PRINCIPAL_DOM.appendChild(preparacioDom);

  // PRESENTACIO //
  let tituloPresentacioDom = document.createElement("div");
  tituloPresentacioDom.setAttribute("class", "titulo");
  tituloPresentacioDom.appendChild(document.createTextNode("Presentació"));

  presentacioDom.appendChild(tituloPresentacioDom);

  let contenidoPresentacioDom = document.createElement("div");
  contenidoPresentacioDom.setAttribute("class", "contenido");

  if (presentacioArray.length > 0) {
    contenidoPresentacioDom.appendChild(document.createTextNode(presentacioArray[0].firstChild.nodeValue))
  } else {
    contenidoPresentacioDom.appendChild(document.createTextNode("No hi ha Presentació"))
  }

  presentacioDom.appendChild(contenidoPresentacioDom);

  PRINCIPAL_DOM.appendChild(presentacioDom);

  // NOTES //
  let tituloNotesDom = document.createElement("div");
  tituloNotesDom.setAttribute("class", "titulo");
  tituloNotesDom.appendChild(document.createTextNode("Notes"));

  notesDom.appendChild(tituloNotesDom);

  let contenidoNotesDom = document.createElement("div");
  contenidoNotesDom.setAttribute("class", "contenido");

  if (notesArray.length > 0) {
    contenidoNotesDom.appendChild(document.createTextNode(notesArray[0].firstChild.nodeValue))
  } else {
    contenidoNotesDom.appendChild(document.createTextNode("No hi ha notas"))
  }

  notesDom.appendChild(contenidoNotesDom);

  PRINCIPAL_DOM.appendChild(notesDom);

}


function inici() {
  load_llista_receptes_jsonp();
}

function load_llista_receptes_jsonp() {
  tempscript = document.createElement("script");
  tempscript.type = "text/javascript";
  tempscript.id = "tempscript";
  tempscript.src = "http://joanqc.no-ip.biz/iesbalmes/wec/receptes/list_recipes_callback.php?callback=JSONPHandlerList";
  document.body.appendChild(tempscript);
}

function loadXMLDoc_jsonp(url) {
  tempscript = document.createElement("script");
  tempscript.type = "text/javascript";
  tempscript.id = "tempscript";
  tempscript.src = "http://joanqc.no-ip.biz/iesbalmes/wec/receptes/read_xml_recipe.php?callback=loadXMLDoc&url=" + url;
  document.body.appendChild(tempscript);
}

function JSONPHandlerList(data) {
  const optionsDom = document.getElementById("recipes");
  optionsDom.innerHTML += data;
}