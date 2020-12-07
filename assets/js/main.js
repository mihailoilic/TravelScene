//Inicijalizacija stranice
$(document).ready(function() {
    $(window).on("load",function() {
        $(".preloader").fadeOut();
        navScrollEvent();
    });
    $(this).scroll(navScrollEvent);
    $("#home .hero-text a").click(function(event){
        scrollTo("#deals");
        event.preventDefault();
        $(this).blur();
    });
});
function navScrollEvent(){
    if($(window).scrollTop() > 100){
        $("#navigation").addClass("navbar-fixed");
    }
    else {
        if(!($("#mobile_menu").hasClass("active"))){
            $("#navigation").removeClass("navbar-fixed");
        }
    }
    let links = $("#main-menu a");
    $(links).removeClass("primary-color");
    $("#mobile_menu a").removeClass("primary-color");
    for(let i = links.length - 1; i >= 0; i--){
        if($(window).scrollTop() >= elementTop($(links[i]).attr("href")) - 1){
            $(links[i]).addClass("primary-color");
            $(`#mobile_menu a[href="${$(links[i]).attr("href")}"]`).addClass("primary-color");
            break;
        }
    }
}
function scrollTo(elementId){
    let scrollDistance = elementTop(elementId);
    $("html").stop().animate({scrollTop:`${scrollDistance}px`}, 400);
}
function elementTop(elementId){
    let t = document.querySelector(elementId).getBoundingClientRect().top;
    return  t + $(window).scrollTop();
}
//Dinamicko ucitavanje navigacije
let navigation = new Array(
    {
        type: "single",
        title: "Home",
        href: "#home"
    },
    {
        type: "single",
        title: "Pick destination",
        href: "#deals"
    },
    {
        type: "menu",
        title: "Top deals",
        href: "#special_package"
    },
    {
        type: "single",
        title: "Why us",
        href: "#why_choose"
    },
    {
        type: "single",
        title: "Gallery",
        href: "#gallery"
    },
    {
        type: "single",
        title: "Contact",
        href: "#contact"
    }
);
let lista = document.createElement("ul");
document.querySelector("#main-menu").appendChild(lista);
let lista1 = document.createElement("ul");
document.querySelector("#mobile_menu").appendChild(lista1);
for (i in navigation){
    let navLi = document.createElement("li");
    navLi.classList.add("text-shadow");
    let navA = document.createElement("a");
    navA.setAttribute("href", navigation[i].href);
    navA.appendChild(document.createTextNode(navigation[i].title));
    if(navigation[i].type == "menu") {
        let arrow = document.createElement("span");
        arrow.classList.add("icofont-rounded-down");
        navA.appendChild(arrow);
    }
    navA.addEventListener("click", function(event) {
        event.preventDefault();
        scrollTo($(this).attr("href"));
        $(this).blur();
    });
    let navA1 = navA.cloneNode(true);
    navA1.addEventListener("click", function(event) {
        event.preventDefault();
        scrollTo($(this).attr("href"));
        $(this).blur();
        mobileToggleClick(event);
    });
    navLi.appendChild(navA);
    lista.appendChild(navLi);
    let navLi1 = document.createElement("li");
    navLi1.appendChild(navA1);
    lista1.appendChild(navLi1);
}
let mobileToggle = false;
$("#mobile-button").click(mobileToggleClick);
function mobileToggleClick(event){
    event.preventDefault();
    if(mobileToggle) {
        $("#mobile_menu").stop()
            .slideUp()
            .animate(
                {"opacity": "0"},
                {queue: false}
                )
            .removeClass("active");
        navScrollEvent();
        mobileToggle = false;
    }
    else {
        $("#navigation").addClass("navbar-fixed");
        $("#mobile_menu").stop()
            .slideDown()
            .animate(
            {"opacity": "1"},
            {queue: false}
            )
            .addClass("active");
        mobileToggle = true;
    }
}
//Home - Slajder
//inicijalizacija slika za slajder
for(let i = 1; i < 4; i++){
    let temp = document.createElement("img");
    temp.setAttribute("src",`assets/img/slider/${i}.jpg`);
}
let slider = document.querySelector("#home");
let imgIndex = 1;
let sliderInterval = setInterval(nextImage, 4000);
function nextImage(){
    clearInterval(sliderInterval);
    imgIndex++;
    if(imgIndex > 3){
        imgIndex = 1;
    }
    let nextImg = document.createElement("img");
    slider.appendChild(nextImg);
    nextImg.setAttribute("src",`assets/img/slider/${imgIndex}.jpg`);
    nextImg.setAttribute("alt", `Slider Image ${imgIndex}`);
    $(nextImg).hide();
    let width = $(window).width();
    $(nextImg).stop()
        .css({"left": `${width}px`})
        .fadeIn(200)
        .animate({"left" : "0"}, {duration: 700, queue: false, easing: "linear"});
    setTimeout(function(){
        $(nextImg).prev()
        .stop()
        .animate({"left": `-${width}px`}, 1000, "linear", function(){
            $(this).remove();
        });
    }, 200);
    $("#sliderPrev, #sliderNext").fadeOut(100);
    setTimeout(function(){
        $("#sliderPrev, #sliderNext").fadeIn(100);
    }, 1100);
    sliderInterval = setInterval(nextImage, 4000);
}
function prevImage(){
    clearInterval(sliderInterval);
    imgIndex--;
    if(imgIndex < 1){
        imgIndex = 3;
    }
    let prevImg = document.createElement("img");
    slider.appendChild(prevImg);
    prevImg.setAttribute("src",`assets/img/slider/${imgIndex}.jpg`);
    prevImg.setAttribute("alt", `Slider Image ${imgIndex}`);
    $(prevImg).hide();
    let width = $(window).width();
    $(prevImg).stop()
        .css({"left": `-${width}px`})
        .fadeIn(200)
        .animate({"left" : "0"}, {duration: 700, queue: false, easing: "linear"});
    setTimeout(function(){
        $(prevImg).prev()
        .stop()
        .animate({"left": `${width}px`}, 1000, "linear", function(){
            $(this).remove();
        });
    }, 200);
    $("#sliderPrev, #sliderNext").fadeOut(100);
    setTimeout(function(){
        $("#sliderPrev, #sliderNext").fadeIn(100);
    }, 1100);
    sliderInterval = setInterval(nextImage, 4000);
}
//Deals - dinamicki sadrzaj
let deals = {
    "th": {
        type: "country",
        title: "Thailand",
        img: "assets/img/deals/thailand.jpg",
        dealsList:[{
            type: "deal",
            title:"Phuket",
            img: "assets/img/deals/phuket.jpg",
            stars: 5,
            description: "Phuket, Thailand’s largest island, is the region’s major resort destination for families, package tourists and novice divers. Its dining, shopping and entertainment facilities are second to none. Phuket Town offers handsome Sino-Portuguese architecture and some of the most interesting sleeping, eating and drinking options on the island.",
            price: 1090
        },
        {
            type: "deal",
            title:"Ko Samui",
            img: "assets/img/deals/koSamui.jpg",
            stars: 5,
            description: "Ko Samui is easily one of the most naturally beautiful Thai islands, with its long white-sand beaches and arching fringes of palm trees. Samui has over a dozen scuba-diving companies, offering trips for divers and snorkellers and courses throughout the year. Also on offer are plenty of spas, as well as meditation retreats, island tours, ziplines, kiteboarding and cooking classes.",
            price: 1020
        },
        {
            type: "deal",
            title:"Bangkok",
            img: "assets/img/deals/bangkok.jpg",
            stars: 5,
            description: "You could spend a year in Thailand's capital and still not tick off all the boxes. There are a few absolute must-sees though. Start with Wat Pho, a lively and lavish temple, encompassing the awesome Reclining Buddha. Move onto the Grand Palace, which encompasses the country’s holiest and most beautiful temple, Wat Phra Kaeo. Then the markets…",
            price: 810
        }]
    },
    "ph": {
        type: "country",
        title: "The Philippines",
        img: "assets/img/deals/philippines.jpg",
        dealsList: [{
            type: "deal",
            title:"Manila",
            img: "assets/img/deals/manila.jpg",
            stars: 4,
            description: "Manila offers many attractions for travelers. Historic Intramuros is a good place to start. This walled city is filled with Spanish-era architecture including the Manila Cathedral, Fort Santiago, and San Agustin Church (a UNESCO World Heritage Site). Meanwhile, Makati and Bonifacio Global City (BGC) are the best places to go to experience the nightlife, hip food scene, and the modern side of the city. Beat the tropical heat & shop at Manila’s massive malls.",
            price: 860
        },
        {
            type: "deal",
            title:"Boracay",
            img: "assets/img/deals/boracay.jpg",
            stars: 5,
            description: "Boracay is a vacationer’s paradise. Taking center stage is 4-kilometer White Beach, prized for its incredibly inviting blue waters, fine white sand, and perfect sunsets. This island is the place to go if you want to take it easy and you’re looking forward to enjoying a tropical resort experience. As you can expect, Boracay caters to a more upscale crowd, but don’t fret, there are many budget-friendly options available.",
            price: 970
        },
        {
            type: "deal",
            title:"El Nido",
            img: "assets/img/deals/elNido.jpg",
            stars: 5,
            description: "You came to the country to see spectacular beaches and island views. El Nido in Palawan province will not disappoint. In terms of spectacular “over-the-water” sea views, El Nido is one of the best in the Philippines. Imagine hidden lagoons, uninhabited white sand beaches, and massive forest-covered limestone mountains rising out of pristine tropical waters.",
            price: 1050
        }]
    },
    "fr": {
        type: "country",
        title: "France",
        img: "assets/img/deals/france.jpg",
        dealsList:[{
            type: "deal",
            title:"Nice",
            img: "assets/img/deals/nice.jpg",
            stars: 5,
            description: "Located on the French Riviera, Nice has everything you need for a quintessential weekend away. It boasts year-around sunshine, gorgeous beaches, an intriguing history, museums, and a booming restaurant scene. Plus, it’s a city for all budgets and more affordable than it’s glamorous neighbors Cannes and St. Tropez.",
            price: 640
            },
            {
            type: "deal",
            title:"Marseille",
            img: "assets/img/deals/marseille.jpg",
            stars: 4,
            description: "Sitting on the edge of the Mediterranean, Marseille is nothing like Paris, and that’s a good thing. With almost constant sunshine, miles of beautiful beaches, and a wonderful mix of cultures—the city has a flavor you won’t find anywhere else in France...",
            price: 760
            }]
    }
};
//inicijalizacija slika
for(country in deals){
    for(image of deals[country].dealsList){
        let temp = document.createElement("img");
        temp.setAttribute("src",image.img);
    }
}
//inicijalizacija dealsWrapper
let dealsWrapper = document.createElement("div");
dealsWrapper.setAttribute("id","dealsWrapper");
dealsWrapper.classList.add("row");
document.querySelector("#deals").appendChild(dealsWrapper);
createDealCountries();

function createDeal(dealObj, countryTitle = "none"){
    let dealBlock = document.createElement("div");
    dealBlock.classList.add("col-md-4","col-xs-12");
    let dealContent = document.createElement("div");
    dealContent.classList.add("single-deal");
    dealBlock.appendChild(dealContent);
    let  dealLink = document.createElement("a");
    dealLink.setAttribute("href","#!");
    dealContent.appendChild(dealLink);
    let dealFigure = document.createElement("figure");
    dealLink.appendChild(dealFigure);
    let dealFigureImg = document.createElement("img");
    dealFigureImg.setAttribute("src", dealObj.img);
    dealFigureImg.setAttribute("alt", dealObj.title);
    dealFigure.appendChild(dealFigureImg);
    let dealFigureFigcaption = document.createElement("figcaption");
    dealFigure.appendChild(dealFigureFigcaption);
    let dealH4 = document.createElement("h4");
    dealFigureFigcaption.appendChild(dealH4);
    let locationIcofont = document.createElement("span");
    locationIcofont.classList.add("icofont-location-pin");
    dealH4.appendChild(locationIcofont);
    dealH4.appendChild(document.createTextNode(dealObj.title));
    if(dealObj.type=="country"){
        dealLink.addEventListener("click", () => {countrySelected(dealObj);})
    }
    else
    {
        dealH4.appendChild(document.createElement("br"));
        let h4Country = document.createElement("span");
        h4Country.appendChild(document.createTextNode(countryTitle));
        h4Country.classList.add("font-weight-light");
        dealH4.appendChild(h4Country);
        dealH4.appendChild(document.createElement("br"));
        let price = document.createElement("p");
        price.appendChild(document.createTextNode(`$${dealObj.price.toLocaleString()}`));
        price.classList.add("d-inline","mr-2")
        dealH4.appendChild(price);
        let stars = document.createElement("span");
        stars.classList.add("tour-rating");
        for (let i = 0; i < dealObj.stars; i++){
            stars.innerHTML += `<span class="fa fa-star"></span>`;
        }
        for(let i = 0; i < 5 - dealObj.stars; i++){
            stars.innerHTML += `<span class="fa fa-star text-white-50"></span>`;
        }
        dealH4.appendChild(stars);
        dealLink.addEventListener("click", () => {openModal(dealObj, countryTitle);})
    }
    $(dealBlock).hide();
    dealsWrapper.appendChild(dealBlock);
    $(dealBlock).fadeIn(200);
    setTimeout(() => {
        $(dealsWrapper).removeAttr("style");
    },100);
}
function createDealCountries(){
    clearDealsWrapper();
    setTimeout(() => {
        for(country in deals){
            createDeal(deals[country]);
        }
    },300);
}
function clearDealsWrapper(){
    $(dealsWrapper).css("min-height",`${$(dealsWrapper).height()}px`);
    $(dealsWrapper).fadeOut(200,function() {
        $(this).html("");
        $(this).show();
    });
}
function countrySelected(countryObj){
    clearDealsWrapper();
    setTimeout(() => {
        let backBtn = document.createElement("a");
        backBtn.classList.add("deals-backBtn", "primary-color","btn","btn-default", "font-weight-bold");
        backBtn.setAttribute("href","#!");
        backBtn.addEventListener("click", createDealCountries);
        backBtn.innerHTML = `<span class="fa fa-angle-left"></span> Countries`;
        dealsWrapper.appendChild(backBtn);
        for(deal of countryObj.dealsList){
            createDeal(deal, countryObj.title);
        }
    },300);
    scrollTo("#deals");
}
function openModal(dealObj,countryTitle){
    $(document.body).css("overflow", "hidden");
    $("#dealModal").addClass("modalShow");
    let header = `<div class="col-12 col-lg-7"><img src="${dealObj.img}" alt="${dealObj.title}" class="img-fluid rounded"/></div><div class="col-12 col-lg-5 d-flex flex-column align-items-center align-items-lg-start"><h4>${dealObj.title}</h4><span class="font-weight-light">${countryTitle}</span><div class="tour-rating">`;
    for(let i = 0; i < dealObj.stars; i++){
        header += `<span class="fa fa-star"></span>`;
    }
    for(let i = 0; i < 5 - dealObj.stars; i++){
        header += `<span class="fa fa-star text-black-20"></span>`;
    }
    header += `</div><div class="primary-color">$${dealObj.price.toLocaleString()}</div></div>`;
    $("#modalLeftHeader").html(header);
    $("#modalLeftBody").html(`<p>${dealObj.description}</p>`);
}
function modalClose(event){
    $(document.body).removeAttr("style");
    $("#dealModal").removeClass("modalShow");
    event.stopPropagation();
}
function stopPropagation(event){
    event.stopPropagation();
}
//MODAL FORM VALIDACIJA

