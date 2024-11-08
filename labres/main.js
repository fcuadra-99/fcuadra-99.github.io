//Fetch products
fetch("/prods.json")
  .then((f) => f.json())
  .then((json) => {
    var jsn = JSON.stringify(json);
    var prod = JSON.parse(jsn);

    let viLi = document.querySelector("#imgList");
    let out = "";

    shuffle(prod);

    for (const i in prod) {
      out += `
      <div class="list">
        <img src="${prod[i]["img"]}" alt="" id="imag" />
        <div class="labe">
          <h2 id="name">${prod[i]["name"]}</h2>
          <p id="deets">${prod[i]["deets"]}</p>
          <p id="hid">${prod[i]["deets"]}</p>
        </div> 
      </div>
    `;
    }

    viLi.innerHTML = out;

    var list = document.querySelectorAll(".list");
    list.forEach((li) => {
      li.addEventListener("click", function () {
        popp();

        if (show % 2 != 0) {
          var isrc = li.querySelector("img").src;
          var name = li.querySelector("#name").innerHTML;
          var deets = li.querySelector("#deets").innerHTML;
          pop.innerHTML = `
        <div class="popImg">
          <img src="${isrc}" alt=""/>
          <div class="deets">
            <h2 id="name">${name}</h2>
            <p id="deets">${deets}</p>
            <form action="/main.js" id="qant">
              <label for="quantity">Quantity:</label>
              <input type="number" id="quantity" name="quantity" min="1" max="99" value="1">
            </form>
            
          </div>
          <div class="btn">Add to Cart</div>
        </div>
        `;

          function cart() {
            quant = document.getElementById("quantity").value;
            if (quant < 0) {
              quant = 1;
            }

            document.getElementById("quantity").value = 1;
            if (!hasDupe()) {
              g.push({
                pname: name,
                details: deets,
                quanti: quant,
                img: isrc,
              });
            } else {
              for (let i = 0; i < g.length; i++) {
                if (g[i].pname == name) {
                  let q = parseInt(g[i].quanti);
                  q = parseInt(parseInt(q) + parseInt(quant));
                  g[i].quanti = q;
                }
              }
            }
            console.log(g);
          }

          function hasDupe() {
            for (let i = 0; i < g.length; i++) {
              if (g[i].pname == name) {
                return true;
              }
            }
            return false;
          }
          var btn = document.querySelector(".btn");
          trns.onclick = popp;
          btn.onclick = cart;
        }
      });
    });
  });

//Intialization
let show = 0;
let cra = 0;
let quant = 1;
let h = ``;
var g = [{ pname: ``, details: ``, quanti: ``, img: `` }];

//Stuff
var trns = document.querySelector(".invis");
var pop = document.querySelector(".show");
document.getElementById("cart").onclick = car;

//import db from "./db.js";
//db.seeProdd();

//Functions
function car() {
  let carte = document.getElementById("carte");
  if (cra % 2 == 0) {
    carte.style.setProperty("width", "30vw");
    for (let i = 1; i < g.length; i++) {
      h += `
      <div class="cprod">
        <img src="${g[i].img}" alt="" id="cmag" />
        <div class="clabe">
          <h2 id="cname">${g[i].pname}</h2>
          <p id="cq">Quantity: ${g[i].quanti}</p>
        </div>
      </div>
      `;
    }
    carte.innerHTML = h;
    console.log(h);
  } else {
    document.getElementById("carte").style.setProperty("width", "0vw");
    h = ``;
  }
  cra++;
}

function popp() {
  if (show % 2 == 0) {
    trns.style.setProperty("height", "2200px");
    pop.style.setProperty("height", "500px");
  } else {
    trns.style.setProperty("height", "0px");
    pop.style.setProperty("height", "0px");
  }
  show++;
}

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));

    var tem = arr[i];
    arr[i] = arr[j];
    arr[j] = tem;
  }
  return arr;
}

//Classes
class Account {
  constructor(name, pass, address) {
    this.name = name;
    this.pass = pass;
    this.address = address;
  }

  order() {
    //Send order POST to DB
  }

  seeProd() {
    //Request GET to DB
    console.log("acc");
  }
}

class Admin extends Account {
  constructor(name, pass, address) {
    super(name, pass, address);
  }
  order() {
    //Send order POST to DB
  }

  seeProd() {
    //Request GET to DB
    console.log("admin");
  }

  addProd() {
    //Send add POST to DB
  }

  removeProd() {
    //Send DELETE to DB
  }

  updateProd() {
    //Send update PUT to DB
  }
}
