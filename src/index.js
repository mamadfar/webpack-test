import {Message} from "./assets/js/mamadaka"
import _ from "lodash";
import "./assets/css/index.css"
import "./assets/scss/index.scss"
import "./assets/img/1.webp"
import data from "./assets/data/data.json"

data.map(item => console.log(item.age))

_.map([1, 2], item => console.log(item))

// let elem = document.createElement("img");
// elem.setAttribute("src", saffron);

// document.body.appendChild(elem)

Message("index.html")