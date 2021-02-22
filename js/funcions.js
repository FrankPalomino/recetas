function loadXMLDoc(url) {
  url = 'recipes/' + url;

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = ()=>{
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      // Ingredients/ Col1

      let txt = "<h3>Ingredients</h3>";
      txt += "<ul>";


      /****************
      CONSTANTES DEL XML
      ******************/
      const elementoXmlhttpDevuelto = xmlhttp.responseXML.documentElement;
      const ingredients = elementoXmlhttpDevuelto.getElementsByTagName("ingredient");
      const tagGenre = elementoXmlhttpDevuelto.getElementsByTagName("genre");
      const tagTitle = elementoXmlhttpDevuelto.getElementsByTagName("title");
      const fotoXML = elementoXmlhttpDevuelto.getElementsByTagName("img")[0].firstChild.nodeValue;
      const prep = elementoXmlhttpDevuelto.getElementsByTagName("preparation");

      const iteradorIngredients = ingredients.length;
      for (let i = 0; i < iteradorIngredients; i++) {
        //console.log(ingredients[i].innerHTML);      
        let txt_fooditem = "";
        let txt_quantity = "";
        let txt_unit = "";

        const iteradoHijosDeIngredientes = ingredients[i].childNodes.length;
        for (let k = 0; k < iteradoHijosDeIngredientes; k++) {
          //console.log(ingredients[i].childNodes[k].nodeName);
          const nodoIngrediente = ingredients[i].childNodes[k];
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

        let txt_ingredient = "<li>" + txt_fooditem;
        if (txt_quantity !== "" && txt_unit !== "")
          txt_ingredient += " (" + txt_quantity + " " + txt_unit + ")";
        txt_ingredient += "</li>";
        txt += txt_ingredient;
      }
      txt += "</ul>";

      /****************
      CONSTANTES DEL DOM
      ******************/

      const infoColDom = document.getElementById('info-col1');
      const h3Dom = document.getElementById('h3');
      const pictureDom = document.getElementById('picture');
      const titolDom = document.getElementById('titol');
      const div2Dom = document.getElementById('div2');
      const div3Dom = document.getElementById('div3');

      infoColDom.innerHTML = txt;

      // gènere
      let genere = "";
      
      if (tagGenre.length > 0) {
        genere = '<h3>' + tagGenre[0].firstChild.nodeValue + '</h3>';
      } else {
        genere = '<h3></h3>';
      }
      h3Dom.innerHTML = genere;

      // Foto
      

      pictureDom.src = 'recipes/' + fotoXML;

      // Títol
      let titol = "";
      
      if (tagTitle.length > 0) {
        titol = '<h2>' + tagTitle[0].firstChild.nodeValue;
        titol = titol + '</h2>';
      } else {
        titol = '<h2></h2>';
      }
      titolDom.innerHTML = titol;

      // Preparació

      if (prep.length > 0) {
        const preparacio = prep[0].firstChild.nodeValue;
        div2Dom.innerHTML = '<h3>Preparació</h3>' + "<p>" + preparacio + "</p>";
      } else {
        div2Dom.innerHTML = '<h3>Preparació</h3>';
      }

      serv = elementoXmlhttpDevuelto.getElementsByTagName("serving");
      if (serv.length > 0) {
        div3Dom.innerHTML = '<h3>Presentació</h3>' + "<p>" + serv[0].firstChild.nodeValue + "</p>";
      } else {
        div3Dom.innerHTML = '<h3>Presentació</h3>';
      }

    }
  }
  

}
