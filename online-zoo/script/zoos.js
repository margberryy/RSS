//dropdown information panels
document.querySelector(".more__info").addEventListener('click', (event) => { 
  console.log(event.target);
   if(event.target.classList.contains("more__info__container")){ 
      event.target.nextElementSibling.classList.toggle("more__info_arrow_active");
      event.target.parentNode.classList.toggle ("more__info__iteme_active"); 
      event.target.children[1].classList.toggle ("more__info__text_active");
  
   }
   if(event.target.classList.contains("more__info_arrow")){ 
      event.target.classList.toggle("more__info_arrow_active");
      event.target.closest(".more__info__iteme").classList.toggle ("more__info__iteme_active"); 
      event.target.previousElementSibling.children[1].classList.toggle ("more__info__text_active");
  
   }
   if(event.target.parentNode.classList.contains("more__info__container")){ 
      event.target.parentNode.nextElementSibling.classList.toggle("more__info_arrow_active");
      event.target.parentNode.parentNode.classList.toggle ("more__info__iteme_active"); 
      event.target.parentNode.children[1].classList.toggle ("more__info__text_active");
  
   }
})

//float sidebar
document.querySelector(".button__sidebar").addEventListener('click', (event) => {  
      event.target.style.display = "none";
      document.querySelector(".sidebar").classList.toggle("sidebar_active"); 
     
   
})
//button tooltip
document.querySelector(".sidebar").addEventListener('mouseover', (event) => {  
   if(event.target.classList.contains("map__img")){ 
      event.target.children[0].classList.add ("buttton_tultip_active");
  
   }
 
})
document.querySelector(".sidebar").addEventListener('mouseout', (event) => { 
   if(event.target.classList.contains("map__img")/*  &&  !event.target.parentElement.contains("map__img") */){ 
      event.target.children[0].classList.remove ("buttton_tultip_active");
   }

})
//burger
document.querySelector(".header__burger").addEventListener('click', (event) => {  
   document.querySelector(".header__burger").classList.toggle("active");
   document.querySelector(".header__nav").classList.toggle("active");
})
//pop-up donate start
document.querySelector(".donate__btn").addEventListener('click', (event) => {
   document.querySelector(".overlay").classList.add("active");
   document.querySelector(".donate_field").classList.add("active");
})
document.querySelector(".donate_field__btn").addEventListener('click', (event) => {
   if (document.getElementById("amount").value ==""){
      document.getElementById("amount").classList.add("invalid");
   }else{
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
   for(let i =0; i<document.getElementsByClassName("currency__item").length; i++){
      document.getElementsByClassName("currency__item")[i].classList.toggle("active");
    }
    if(event.target.classList.contains("currency__item")){
      for(let i =0; i<document.getElementsByClassName("currency__item").length;i++){
       
         document.getElementsByClassName("currency__item")[i].classList.remove("selected");
      }
      event.target.classList.add("selected");
   }
   
})
//donate__menu drop-down list

document.querySelector(".donate__menu__list").addEventListener('click', (event) => {
   for(let i = 0; i < document.getElementsByClassName("donate__menu__item").length;i++){
     document.getElementsByClassName("donate__menu__item")[i].classList.toggle("active");
   }
   if(event.target.classList.contains("donate__menu__item")){
      for(let i = 0; i<document.getElementsByClassName("donate__menu__item").length;i++){
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
   if (card_number.value ==""){
      card_number.classList.add("invalid");
   }else{
      card_number.classList.remove("invalid");
   }
   if(month.value ==""){
      month.classList.add("invalid");
   } else{
      month.classList.remove("invalid");
   }
   if(year.value ==""){
      year.classList.add("invalid");
   }else{
      year.classList.remove("invalid");
   }
    if(name.value ==""){
      name.classList.add("invalid");
   }else{
      name.classList.remove("invalid");
   }
    if(cvc.value ==""){
      cvc.classList.add("invalid");
   }else{
      cvc.classList.remove("invalid");
   }
   
   if(!card_number.value =="" && !month.value == "" && !year.value=="" && !name.value==""&&!cvc.value==""){
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