const filters = document.querySelector(".filters");
const inputs = document.querySelectorAll('.filters input');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const download = document.querySelector('.btn-save');

const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);
  /* let blur = rootStyles.getPropertyValue('--blur');
  let invert = rootStyles.getPropertyValue('--invert');
  let sepia = rootStyles.getPropertyValue('--sepia');
  let saturate = rootStyles.getPropertyValue('--saturate');
  let hue = rootStyles.getPropertyValue('--hue'); */
const img = new Image(); 
let filtersArr = new Object();
window.addEventListener('DOMContentLoaded',() => {drawImage(); reset()});

function drawImage(url) {
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = url || "assets/img/img.jpg";
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.filter =`blur(${filtersArr.blur||0}px) invert(${filtersArr.invert||0}%) 
    sepia(${filtersArr.sepia||0}%) saturate(${filtersArr.saturate||100}%) 
    hue-rotate(${filtersArr.hue||0}deg)`; 
    ctx.drawImage(img, 0, 0);
    
  }; 
}



//Add filters

filters.addEventListener('input', event => {handleUpdate(event);
  ctx.filter = "none";
ctx.filter =`blur(${filtersArr.blur||0}px) invert(${filtersArr.invert||0}%) 
sepia(${filtersArr.sepia||0}%) saturate(${filtersArr.saturate||100}%) 
hue-rotate(${filtersArr.hue||0}deg)`; 
ctx.drawImage(img, 0, 0);});



function handleUpdate(event) {
  //let suffix = event.target.dataset.sizing;
filtersArr[event.target.name]=`${event.target.value}`;
  //document.documentElement.style.setProperty(`--${event.target.name}`, event.target.value + suffix);
  document.querySelector(`output[name='result ${event.target.name}']`).innerHTML = event.target.value;
  
}


//button reset
const reset = function(){
  inputs.forEach(element => {
   // const suffix = element.dataset.sizing || '';
  element.value = "0";
    //document.documentElement.style.setProperty(`--${element.name}`, element.value + suffix);
    document.querySelector(`output[name='result ${element.name}']`).innerHTML = element.value;
    filtersArr = {};
    
    ctx.filter = 'saturate(100%)';
    if (element.name == "saturate") {
      element.value = "100";
     
    //  document.documentElement.style.setProperty(`--${element.name}`, element.value + suffix);
      document.querySelector(`output[name='result ${element.name}']`).innerHTML = element.value;
    }
    ctx.drawImage(img,0,0);
  });
}
document.querySelector(`.btn-reset`).onclick = function () {
  reset()
}
//button next picture

const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let timesOfDay;
let i = 0;
const imageContainer = document.querySelector('canvas');
const button = document.querySelector('.btn-next')

  function getImage() {
  let date = new Date();
 switch(date.getHours()){
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
       timesOfDay = 'night'; break;
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11: 
      timesOfDay = 'morning'; break;
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
       timesOfDay = 'day'; break;
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    timesOfDay = 'evening'; break;
  } 
  const index = i % images.length;
  const imageSrc = base + timesOfDay + '/'+ images[index];
  drawImage(imageSrc);
  i++;
}  
button.onclick =  function () { getImage() };

//button load picture
const fileInput = document.querySelector('.btn-load--input');

fileInput.addEventListener('change', function(e) {
  const file = fileInput.files[0];
  const reader = new FileReader();
    reader.onload = () => {
      drawImage(reader.result);
      console.log(reader.result);
  }
  
  reader.readAsDataURL(file); 
});


//button save picture
download.addEventListener('click', function(e) {
  let link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
});


//Add fullscreen
function activateFullscreen(document) {
  if (document.webkitRequestFullscreen) {
    document.webkitRequestFullscreen();
  }
  else if (document.mozRequestFullScreen) {
    document.mozRequestFullScreen();
  }
  else if (document.requestFullscreen) {
    document.requestFullscreen();
  }
  else if (document.msRequestFullscreen) {
    document.msRequestFullscreen();
  }
};

function deactivateFullscreen() {
  if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }else if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } 
};

document.querySelector(`.fullscreen`).onclick = function () {
  if (document.querySelector('.fullscreen').classList.contains('openfullscreen')) {
    activateFullscreen(document.documentElement);
    document.querySelector('.fullscreen').classList.remove('openfullscreen');
  } else {
    document.querySelector('.fullscreen').classList.add('openfullscreen');
    deactivateFullscreen();
  } 
}