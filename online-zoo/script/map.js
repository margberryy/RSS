//burger
document.querySelector(".header__burger").addEventListener('click', (event) => {
   document.querySelector(".header__burger").classList.toggle("active");
   document.querySelector(".header__nav").classList.toggle("active");
})
//map
//TO DO delete!
/* let outer = document.querySelector('.img').offsetWidth
let inner = document.querySelector('.container_img').offsetWidth;

document.querySelector('.img').scrollLeft = (inner - outer) / 2;
if (outer <= 320) {
   document.querySelector('.img').scrollLeft = (inner - outer) / 2 - 120;
} */
//map resize
const mapImage = document.querySelector(".container_img");
const imgAnimals = document.querySelectorAll(".map__img");

function zoomin() {
   let containerMapCurrWidth = document.querySelector(".img").clientWidth;
   let containerMapCurrHeight = document.querySelector(".img").clientHeight;


   if (mapImage.clientWidth >= 9287) {
      return false;
   } else   if (imgAnimals[0].clientWidth >= 254) {
      return false;
   } else{
     
      mapImage.style.width = mapImage.clientWidth + 580 + "px";
      mapImage.style.height = mapImage.clientHeight + 373 + "px";
      for(let i = 0; i <imgAnimals.length; i++){
         imgAnimals[i].style.width = imgAnimals[i].clientWidth + 3 + 16 + "px";
         imgAnimals[i].style.height = imgAnimals[i].clientHeight + 3 + 16 + "px";
      }
      
   
      document.querySelector('.img').scrollLeft = (mapImage.clientWidth - containerMapCurrWidth) / 2 + 100;
      document.querySelector('.img').scrollTop = (mapImage.clientHeight - containerMapCurrHeight) / 2 ;

   }
}

function zoomout() {
   let containerMapCurrWidth = document.querySelector(".img").clientWidth;
   let containerMapCurrHeight = document.querySelector(".img").clientHeight;

   if (mapImage.clientWidth<= 1170 ) {
      return false;
   } else  if (mapImage.clientWidth<= 1170 ) {
      return false;
   } else{
      mapImage.style.width = mapImage.clientWidth - 580 + "px";
      mapImage.style.height = mapImage.clientHeight - 373 + "px";
      for(let i = 0; i <imgAnimals.length; i++){
         console.log( imgAnimals[i].clientWidth)
         imgAnimals[i].style.width = imgAnimals[i].clientWidth +3 - 16 + "px";
         imgAnimals[i].style.height = imgAnimals[i].clientHeight+3 - 16 + "px";
      }

      document.querySelector('.img').scrollLeft = (mapImage.clientWidth - containerMapCurrWidth) / 2 - 100;
      document.querySelector('.img').scrollTop = (mapImage.clientHeight - containerMapCurrHeight) / 2 ;
   }
}
document.querySelector(".zoom_in").addEventListener('click', zoomin);
document.querySelector(".zoom_out").addEventListener('click', zoomout);

//map drag&drop
const container = document.querySelector(".img");

let topIndent = 0;
let leftIndent = 0;

mapImage.ondragstart = function () { // remove browser Drag’n’Drop
   return false;
}

const calcCoords = (e, elem) => {

   topIndent = e.pageY - mapImage.offsetTop;
   leftIndent = e.pageX - mapImage.offsetLeft;
}
const moveAt = (e) => {
   mapImage.style.left = e.pageX - leftIndent + 'px';
   mapImage.style.top = e.pageY - topIndent + 'px';
  

}
const stopMove = () => {

   document.removeEventListener('mousemove', moveAt);
   mapImage.removeEventListener('mouseup', stopMove);
}


mapImage.addEventListener('mousedown', (e) => {

   /*  if (mapImage.width <= container.offsetWidth){//проверить 18
    return;
   } */
   calcCoords(e, mapImage);


   document.addEventListener('mousemove', moveAt);
   document.addEventListener('mouseup', stopMove);
});

mapImage.addEventListener('mouseout', stopMove);
//footer.addEventListener('mouseenter', stopMove);



//button tooltip
document.querySelector(".img").addEventListener('mouseover', (event) => {
   if (event.target.classList.contains("map__img")) {
      event.target.children[0].classList.add("buttton_tultip_active");

   }

})
document.querySelector(".img").addEventListener('mouseout', (event) => {
   if (event.target.classList.contains("map__img")) {
      event.target.children[0].classList.remove("buttton_tultip_active");
   }

})
//pop-up donate start
document.querySelector(".donate__btn").addEventListener('click', (event) => {
   document.querySelector(".overlay").classList.add("active");
   document.querySelector(".donate_field").classList.add("active");
})
document.querySelector(".donate_field__btn").addEventListener('click', (event) => {
   if (document.getElementById("amount").value == "") {
      document.getElementById("amount").classList.add("invalid");
   } else {

      document.querySelector(".donate_field_pay").classList.add("active");
      document.querySelector(".donate_field").classList.remove("active");
   }

})

document.querySelector(".overlay").addEventListener('click', (event) => {
   document.querySelector(".overlay").classList.remove("active");
   document.querySelector(".donate_field").classList.remove("active");
})
document.querySelector(".close_pop_up__donate").addEventListener('click', (event) => {
   document.querySelector(".overlay").classList.remove("active");
   document.querySelector(".donate_field").classList.remove("active");
})
// donate currency drop-down list 
document.querySelector(".donate__currency__list").addEventListener('click', (event) => {

   document.querySelector(".donate__currency__list").classList.toggle("active");
   for (let i = 0; i < document.getElementsByClassName("currency__item").length; i++) {
      document.getElementsByClassName("currency__item")[i].classList.toggle("active");
   }
   if (event.target.classList.contains("currency__item")) {
      for (let i = 0; i < document.getElementsByClassName("currency__item").length; i++) {

         document.getElementsByClassName("currency__item")[i].classList.remove("selected");
      }
      event.target.classList.add("selected");
   }

})
//donate__menu drop-down list

document.querySelector(".donate__menu__list").addEventListener('click', (event) => {
   for (let i = 0; i < document.getElementsByClassName("donate__menu__item").length; i++) {
      document.getElementsByClassName("donate__menu__item")[i].classList.toggle("active");
   }
   if (event.target.classList.contains("donate__menu__item")) {
      for (let i = 0; i < document.getElementsByClassName("donate__menu__item").length; i++) {
         document.getElementsByClassName("donate__menu__item")[i].classList.remove("selected");
      }
      event.target.classList.add("selected");
   }
   document.querySelector(".donate__menu__list").classList.toggle("arrow_up")
})
//pop-up donate end
//pop-up pay start
document.querySelector(".donate_pay__btn").addEventListener('click', (event) => {
   let card_number = document.getElementById("card_number");
   let month = document.getElementById("month");
   let year = document.getElementById("year");
   let name = document.getElementById("name");
   let cvc = document.getElementById("cvc")
   if (card_number.value == "") {
      card_number.classList.add("invalid");
   } else {
      card_number.classList.remove("invalid");
   }
   if (month.value == "") {
      month.classList.add("invalid");
   } else {
      month.classList.remove("invalid");
   }
   if (year.value == "") {
      year.classList.add("invalid");
   } else {
      year.classList.remove("invalid");
   }
   if (name.value == "") {
      name.classList.add("invalid");
   } else {
      name.classList.remove("invalid");
   }
   if (cvc.value == "") {
      cvc.classList.add("invalid");
   } else {
      cvc.classList.remove("invalid");
   }

   if (!card_number.value == "" && !month.value == "" && !year.value == "" && !name.value == "" && !cvc.value == "") {
      document.querySelector(".overlay").classList.remove("active");
      document.querySelector(".donate_field_pay").classList.remove("active");
   }
})
document.querySelector(".close_pop_up__pay").addEventListener('click', (event) => {
   document.querySelector(".overlay").classList.remove("active");
   document.querySelector(".donate_field_pay").classList.remove("active");
})
document.querySelector(".overlay").addEventListener('click', (event) => {
   document.querySelector(".overlay").classList.remove("active");
   document.querySelector(".donate_field_pay").classList.remove("active");
})
//pop-up pay end