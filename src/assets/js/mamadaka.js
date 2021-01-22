export const Message = (str)=> {
    let body = document.getElementsByTagName("body")[0]
    let mamad =  document.createElement("h1")
    mamad.innerHTML = str
    body.appendChild(mamad)    
}