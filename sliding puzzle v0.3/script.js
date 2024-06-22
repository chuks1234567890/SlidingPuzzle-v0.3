let children
let items
const shuffle = (array) => { 
    return array.sort(() => Math.random() - 0.5);
}; 
let emptyIndex
let RandomArray
let ra
let emptyItem
let count=0
let play_permit=false
let endpoint=16
let divisor
const holder=document.querySelector(".game ul")
const  selection=document.querySelectorAll(".options")
const selection_page=document.querySelector(".selection")
const container=document.querySelector(".container")
var root=document.documentElement
var style1=getComputedStyle(root)
const headTag=document.getElementsByTagName("head")[0]
const styletag=document.createElement("style")
let path

let items_value=[]
let reff
selection[0].onclick=()=>{
    holder.classList.add("three")
    endpoint=9
    reff=10
    divisor=3
    load(reff)
    path="3x3crown"
    selection_page.style.display="none"
    container.style.display="flex"
    styletag.innerHTML=positions[0]
    headTag.appendChild(styletag)
    start_game()
}
selection[1].onclick=()=>{
    holder.classList.add("four")
    endpoint=16
    divisor=4
    reff=17
    load(reff)
    path="4x4crown"
    selection_page.style.display="none"
    container.style.display="flex"
    styletag.innerHTML=positions[1]
    headTag.appendChild(styletag)
    start_game()
}
selection[2].onclick=()=>{
    holder.classList.add("five")
    endpoint=25
    divisor=5
    reff=26
    load(reff)
    path="r3"
    selection_page.style.display="none"
    container.style.display="flex"
    styletag.innerHTML=positions[2]
    headTag.appendChild(styletag)
    start_game()
}
console.log(items_value)
function getIndex(params,item) {
    emptyIndex=params
    emptyItem=item
}

function load(reff){
    for (let i=1; i<reff; i++){
        items_value.push(i)
    }
    for (let i=0; i<items_value.length;i++){
        holder.innerHTML+=` <li data-pos=${i}>${i}</li>`
    }
}
function start_game(){
    const inter=setInterval(()=>{ 
        ra=shuffle(items_value)
        items=document.querySelectorAll(".game ul li")
        items.forEach((item,index)=>{
            item.innerHTML=ra[index] 
            item.style.backgroundImage =`url(./${path}/${ra[index]}.png)`
            if (item.innerText==endpoint){
                item.classList.add("empty")
                
                item.style.backgroundImage="none"
                getIndex(index,item)
            } else{
                item.classList.remove("empty")
            }
        })
        children=document.querySelector("ul").children
    },100)
    // detecting gameover
    
    setTimeout(()=>{
        clearInterval(inter)
        play_permit=true
         items.forEach((item,index,array)=>{
             
            item.addEventListener("click",(e)=>{
                e.preventDefault();    
                if (play_permit){
                    move(e)
                    moveEntireRows(e)
                    game_status()
                }
                if(parseInt(item.innerText)===parseInt(item.dataset.pos)+1){
                    item.classList.add("dd")
                }else{
                    item.classList.remove("dd")
                }
                
            })
        }) 
    },3000)
}
window.onclick=()=>{
    game_status()
}
function move(e){
    var firstPos = parseInt(e.target.dataset.pos);
    var empty = emptyItem
    var secondPos = parseInt(empty.dataset.pos);
    let top = secondPos-divisor;
    let bottom = secondPos+divisor;
    let left = secondPos-1;
    let right = secondPos+1;
    if (secondPos%divisor-left%divisor < 1) {
        left = -1;
    }
    if (right%divisor-secondPos%divisor < 1) {
        right = -1;
    }
    var posibilities = [left, right, top, bottom];  
    if (posibilities.includes(firstPos)) {
        empty.dataset.pos = firstPos;
        e.target.dataset.pos = secondPos;
        count++
    
        document.querySelector("h3 span").innerHTML=count;
        document.querySelector(".h3").innerHTML=count;
    }else{
        e.target.classList.add("shake")
        setTimeout(()=>{
            e.target.classList.remove("shake")
        },450)
    }
}
let stable_items
function game_status(){
    stable_items=document.querySelectorAll(".dd")
    if (stable_items.length===endpoint-1) {
        play_permit=false
        setTimeout(()=>{
            items[emptyIndex].classList.add("join")
            items[emptyIndex].innerHTML=""
            items[emptyIndex].style.backgroundImage =`url(./${path}/${endpoint}.png)`
            document.querySelector(".game ul").style="left:-2.5px; top:-2.5px;"
            items[emptyIndex]``.style.zIndex="0"
            for (let i=0; i<stable_items.length; i++){
                    stable_items[i].classList.add("join")
                    stable_items[i].innerHTML=""
            }
        },1000)
    }
}

function moveEntireRows(e){
    let empty=items[emptyIndex].dataset.pos
    let clickedItem=e.target.dataset.pos
    let row_d=empty%4
    let movement=[]
    console.log(clickedItem-row_d )
}
function reload(){
    window.location.reload()
}
