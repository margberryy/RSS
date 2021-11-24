//burger
document.querySelector(".header__burger").addEventListener('click', (event) => {
   document.querySelector(".header__burger").classList.toggle("active");
   document.querySelector(".header__nav").classList.toggle("active");
})
//how it works slaider

const mainCarousel = document.querySelector('.main__list');
const carouselImg = document.querySelectorAll('.main__iteme');
const elems = Array.from(carouselImg);

mainCarousel.addEventListener('click', function (event) {
  var newActive = event.target.parentElement;
  update(newActive);
});

const update = function(newActive) {
   const newActivePos = newActive.dataset.pos;

   const current = elems.find((elem) => elem.dataset.pos == 0);
   const prev = elems.find((elem) => elem.dataset.pos == -1);
   const next = elems.find((elem) => elem.dataset.pos == 1);
   const first = elems.find((elem) => elem.dataset.pos == -2);
   const last = elems.find((elem) => elem.dataset.pos == 2);
   
   
   [current, prev, next, first, last].forEach(item => {
     var itemPos = item.dataset.pos;
 
     item.dataset.pos = getPos(itemPos, newActivePos)
   });
 };
 
 const getPos = function (current, active) {
   const diff = current - active;
 
   if (Math.abs(current - active) > 2) {
     return -current
   }
 
   return diff;
 }
//pop-up feedback
document.querySelector(".feedback__btn").addEventListener('click', (event) => {
   document.querySelector(".overlay").classList.add("active");
   document.querySelector(".testimonials__leave_feadback").classList.add("active");
})
document.querySelector(".testimonial__leave_feadback__submit").addEventListener('click', (event) => {
   document.querySelector(".overlay").classList.remove("active");
   document.querySelector(".testimonials__leave_feadback").classList.remove("active");
})

document.querySelector(".overlay").addEventListener('click', (event) => {
   document.querySelector(".overlay").classList.remove("active");
   document.querySelector(".testimonials__leave_feadback").classList.remove("active");
})
document.querySelector(".close_pop_up__feadback").addEventListener('click', (event) => {
   document.querySelector(".overlay").classList.remove("active");
   document.querySelector(".testimonials__leave_feadback").classList.remove("active");
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


//pets slider start

const carousel = document.querySelector('pets__slider');//slider
const slider = document.querySelector(".pets__collection"),
  content = document.querySelector(".pets__collection__container"),//  sliderItems
  next = document.querySelector(".slider__btn__right"),
  prev = document.querySelector(".slider__btn__left");
  let width = 1000;
  

 
  

  function slide(content, prev, next) {
   let posInitial,
      slides = document.querySelectorAll(".pets__itemes__container");
       slidesLength = slides.length,
       firstSlide = slides[0],
       slideSize = firstSlide.offsetWidth,
       lastSlide = slides[slidesLength - 1],
       cloneFirst = firstSlide.cloneNode(true),
       cloneLast = lastSlide.cloneNode(true),
       index = 0,
       allowShift = true;
   
   // Clone first and last slide
   content.appendChild(cloneFirst);
   content.insertBefore(cloneLast, firstSlide);
  
   
   // Click events
   prev.addEventListener('click', function () { shiftSlide(-1) });
   next.addEventListener('click', function () { shiftSlide(1) });
   
   content.addEventListener('transitionend', checkIndex);
   
   
   function shiftSlide(dir, action) {
     content.classList.add('shifting');
     
     if (allowShift) {
       if (!action) { posInitial = content.offsetLeft; }
      
       if (dir == 1) {
         content.style.left = (posInitial - slideSize-1) + "px";
         index++;   
       } else if (dir == -1) {
         content.style.left = (posInitial + slideSize-1) + "px";
         index--;      
       }
     };
     
     allowShift = false;
   }
 
   function checkIndex (){
     content.classList.remove('shifting');
     
     if (index == -1) {
       content.style.left = -(slidesLength * slideSize) + "px";
       index = slidesLength - 1;
     }
 
     if (index == slidesLength) {
       content.style.left = -(1 * slideSize) + "px";

       index = 0;
     }
     
     allowShift = true;
   }
 }
 
 slide(content, prev, next);
//pets__slider end



  