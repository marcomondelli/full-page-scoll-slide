let slideElems = document.querySelectorAll('.slide');
let buttonContainerElem = document.querySelector(".buttons");
let slideIndex = 0;
let scrolling = false;
let waitTimeinMS = 1000

//============================================Init======================================================================//

//init

slideElems.forEach((slideElem,index) => {
    buttonContainerElem.innerHTML += `<button class="slidebutton" data-value="${index}"></button>`
});

let sliderButtonElems = document.querySelectorAll('.slidebutton');
showslide(slideIndex)
changeActiveDot();


//======================================================================================================================//


sliderButtonElems.forEach(sliderButton => {
    sliderButton.addEventListener('click', () => {
        slideIndex = sliderButton.dataset.value;
        restrictSlideIndex();
        showslide(slideIndex)
    });	
});

window.addEventListener("wheel", event => {
    if(event.deltaY > 0 && scrolling == false){
        slideIndex++;
        restrictSlideIndex();
        showslide(slideIndex);
    }else if (event.deltaY < 0 && scrolling == false){
        slideIndex--;
        restrictSlideIndex();
        showslide(slideIndex);
    }
});

function restrictSlideIndex(){
    if (slideIndex >= slideElems.length){
        slideIndex = slideElems.length - 1;
    }
    if (slideIndex <= -1){
        slideIndex = 0;
    }
}

function showslide(index){
    scrolling = true;
    setTimeout(() => {
        scrolling = false;
    }, waitTimeinMS);
    slideElems[slideIndex].scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    changeActiveDot();
}

function changeActiveDot(){
    sliderButtonElems.forEach(sliderButton => {
        if (sliderButton.dataset.value == slideIndex){
            sliderButton.classList.add("slidebutton--active")
        }else{
            sliderButton.classList.remove("slidebutton--active")
        };
    });
}