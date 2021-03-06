//Inicijalizacija stranice
$(document).ready(function() {
    $(window).on("load",function() {
        $(".preloader").fadeOut();
        navScrollEvent();
        statsAnimation();
    });
    $(this).scroll(navScrollEvent);
    $("#home .hero-text a").click(function(event){
        scrollToElement("#deals");
        event.preventDefault();
        $(this).blur();
    });
});
function navScrollEvent(){
    if($(window).scrollTop() > 100){
        $("#navigation").addClass("navbar-fixed");
    }
    else {
        if(!$("#mobile_menu").hasClass("active")){
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
function scrollToElement(elementId){
    let skrol = elementTop(elementId);
    $("html").stop().animate({scrollTop:`${skrol}px`}, 400);
}
function elementTop(elementId){
    let distanca = document.querySelector(elementId).getBoundingClientRect().top;
    return  distanca + $(window).scrollTop();
}

//Navigacija - dinamicko ucitavanje
let navigation = new Array(
    {
        title: "Home",
        href: "#home"
    },
    {
        title: "Pick destination",
        href: "#deals"
    },
    {
        title: "Top deals",
        href: "#special_package"
    },
    {
        title: "Why us",
        href: "#why_choose"
    },
    {
        title: "Gallery",
        href: "#gallery"
    },
    {
        title: "Testimonials",
        href: "#testimonials"
    },
    {
        title: "Contact",
        href: "#contact"
    },
    {
        title: "Author",
        href: "#author"
    }
);
let navLista = document.createElement("ul");
document.querySelector("#main-menu").appendChild(navLista);
let mobileLista = document.createElement("ul");
document.querySelector("#mobile_menu").appendChild(mobileLista);
let footerLista = document.createElement("ul");
document.querySelector("#footer-nav").appendChild(footerLista);
for (i in navigation){
    let navLi = document.createElement("li");
    let navLi1 = document.createElement("li");
    let navLi2 = document.createElement("li");
    navLi.classList.add("text-shadow");
    let navA = document.createElement("a");
    navA.setAttribute("href", navigation[i].href);
    navA.appendChild(document.createTextNode(navigation[i].title));
    navLi.appendChild(navA);
    navLista.appendChild(navLi);
    let navA1 = navA.cloneNode(true);
    navLi1.appendChild(navA1);
    mobileLista.appendChild(navLi1);
    let navA2 = navA.cloneNode(true);
    navLi2.appendChild(navA2);
    footerLista.appendChild(navLi2);
    navA.addEventListener("click", function(event) {
        event.preventDefault();
        scrollToElement($(this).attr("href"));
        $(this).blur();
    });
    navA1.addEventListener("click", function(event) {
        event.preventDefault();
        scrollToElement($(this).attr("href"));
        $(this).blur();
        mobileToggleClick(event);
    });
    navA2.addEventListener("click", function(event) {
        event.preventDefault();
        scrollToElement($(this).attr("href"));
        $(this).blur();
    });
}
$("#mobile-button").click(mobileToggleClick);
function mobileToggleClick(event){
    event.preventDefault();
    if($("#mobile_menu").is(":visible")) {
        $("#mobile_menu").stop()
            .slideUp()
            .animate(
                {"opacity": "0"},
                {queue: false}
                )
            .removeClass("active");
        navScrollEvent();
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
    }
}

//Home - Slajder
//Inicijalizacija slika za slajder
for(let i = 1; i < 4; i++){
    let temp = document.createElement("img");
    temp.setAttribute("src",`assets/img/slider/${i}.jpg`);
}

let slider = document.querySelector("#home");
let imgIndex = 1;
let sliderInterval;
$(window).on("load", function(){
    sliderInterval = setInterval(nextImage, 5000);
});
$("#sliderPrev").click(function(event){
    sliderClick("prev", event);
});
$("#sliderNext").click(function(event){
    sliderClick("next", event);
});
function sliderClick(direction, event){
    event.preventDefault();
    clearInterval(sliderInterval);
    if(direction == "next"){
        nextImage();
    }
    else {
        prevImage();
    }
    $("#sliderPrev, #sliderNext").fadeOut(100);
    setTimeout(function(){
        $("#sliderPrev, #sliderNext").fadeIn(100);
    }, 1100);
    sliderInterval = setInterval(nextImage, 5000);
}
function nextImage(){
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
}
function prevImage(){
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
    scrollToElement("#deals");
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
    event.stopPropagation();
    $(document.body).removeAttr("style");
    $("#dealModal").removeClass("modalShow");
    clearFormErrors();
    document.bookForm.reset();
}
function stopPropagation(event){
    event.stopPropagation();
}

//Validacija forme globalno
function clearFormErrors(){
    $(".error-message").hide();
    $(".error-icon").hide();
    $(".success-message").hide();
}
function formError(formElement, message){
    $(formElement).next()
            .text(message)
            .fadeIn()
            .next()
            .fadeIn();
}

//Modal forma validacija
$("#bookForm").on("submit", function(event){
    event.preventDefault();
    clearFormErrors();
    let forma = document.bookForm;
    let error = false;
    let nameExp = /^\p{Uppercase_Letter}\p{Letter}{1,14}(\s\p{Uppercase_Letter}\p{Letter}{1,14}){1,3}$/u;
    if(forma.fullName.value.length <= 40){
        if(forma.fullName.value == "") {
            formError(forma.fullName, "Please input your full name.");
            error = true;
        }
        else if(!nameExp.test(forma.fullName.value)){
            formError(forma.fullName, "Please input a valid full name. All words must begin with a capital letter.");
            error = true;
        }
    }
    else {
        formError(forma.fullName, "Full name can't be more than 40 characters long.");
        error = true;
    }
    let emailExp = /^[a-z]((\.|-)?[a-z0-9]){2,}@[a-z]((\.|-)?[a-z0-9]+){2,}\.[a-z]{2,6}$/;
    if(forma.email.value.length <= 50){
        if(forma.email.value == "") {
            formError(forma.email, "Please input your email address.");
            error = true;
        }
        else if(!emailExp.test(forma.email.value)){
            formError(forma.email, "Invalid email address. Use only lowercase letters and symbols .-@");
            error = true;
        }
    }
    else {
        formError(forma.email, "Email can't be more than 50 characters long.");
        error = true;
    }
    let phoneExp = /^\+\d{1,3}(\s?\d){8,}$/;
    if(forma.phone.value.length <= 20){
        if(forma.phone.value == "") {
            formError(forma.phone, "Please input your phone number.");
            error = true;
        }
        else if(!phoneExp.test(forma.phone.value)){
            formError(forma.phone, "Invalid phone number. Use symbol + and numbers. You can separate with space. (e.g. +381 60 123456)");
            error = true;
        }
    }
    else {
        formError(forma.phone, "Phone number can't be more than 20 digits and spaces long.");
        error = true;
    }
    let dateExp = /^((0?[1-9]|[12]\d|3[01])\.(0?[1-9]|1[012])\.(19\d\d|20([01]\d|2[01]))\.|(19\d\d|20([01]\d|2[01]))-(0?[1-9]|1[012])-(0?[1-9]|[12]\d|3[01]))$/;
    if(dateExp.test(forma.date.value)){
        let proslo = false;
        if(forma.date.value.indexOf(".") != -1){
            let datumString = forma.date.value.substring(0,forma.date.value.length-1);
            let datumNiz = datumString.split(".");
            let unetDatum = new Date();
            unetDatum.setDate(Number(datumNiz[0]));
            unetDatum.setMonth(Number(datumNiz[1])-1);
            unetDatum.setFullYear(Number(datumNiz[2]));
            let datumSada = new Date();
            if (unetDatum < datumSada){
                proslo = true;
            }
        }
        else {
            let datumNiz = forma.date.value.split("-");
            let unetDatum = new Date();
            unetDatum.setDate(Number(datumNiz[2]));
            unetDatum.setMonth(Number(datumNiz[1])-1);
            unetDatum.setFullYear(Number(datumNiz[0]));
            let datumSada = new Date();
            if (unetDatum < datumSada){
                proslo = true;
            }
        }
        if(proslo){
            formError(forma.date, "You can't book tour on a date that has already passed.");
            error = true;
        }
    }
    else {
        if(forma.date.value == "") {
            formError(forma.date, "Please input date.");
        }
        else{
            formError(forma.date, "Please enter a valid date a year from now. Allowed formats are DD.MM.YYYY. and YYYY-MM-DD");
        }
        error = true;
    }
    if(forma.people.options.selectedIndex == 0){
        formError(forma.people, "Please select number of people.");
        error = true;
    }
    if(!error){
        $("#tourBookingBtn").next()
            .fadeIn();
        forma.reset();
    }
});

//Top deals - dinamicki sadrzaj
let topDeals = ["ph0", "th1"];
for(deal of topDeals){
    let country = deal.match(/[a-z]+/)[0];
    let indeks = Number(deal.match(/\d+/)[0]);
    createTopDeal(deals[country].dealsList[indeks], deals[country].title);
}
function createTopDeal(dealObj, countryTitle){
    let kontejner = document.querySelector("#top-deals");
    let topDeal = document.createElement("div");
    topDeal.classList.add("single_package", "col-12", "col-md-5", "p-0");
    kontejner.appendChild(topDeal);
    let topDealLink = document.createElement("a");
    topDealLink.setAttribute("href","#!");
    $(topDealLink).click(function(event){
        event.preventDefault();
        openModal(dealObj, countryTitle);
    });
    topDeal.appendChild(topDealLink);
    let htmlSadrzaj = `<div class="pack_image">
            <img class="img-fluid" src="${dealObj.img}" alt="${dealObj.title}"/>
            <span class="pack_price">$${dealObj.price.toLocaleString()}</span></div>
        <div class="package-hover">
            <div class="tour-rating">`;
    for(let i = 0; i < dealObj.stars; i++){
        htmlSadrzaj += `<span class="fa fa-star"></span>`;
    }
    for(let i = 0; i < 5 - dealObj.stars; i++){
        htmlSadrzaj += `<span class="fa fa-star text-black-20"></span>`;
    }
    htmlSadrzaj += `</div><h5>${dealObj.title}</h5>
            <div class="tour-locaton">
            <i class="icofont-location-pin"></i>${countryTitle}</div>
            <span class="time_zone"></span></div>`;
    topDealLink.innerHTML = htmlSadrzaj;
    setInterval(function(){
        let datum = new Date();
        let sati = 23 - datum.getHours();
        let minuti = 59 - datum.getMinutes();
        let sekunde = 59 -datum.getSeconds();
        $(".time_zone").text(`Expires in ${sati < 10 ? "0" + sati : sati}:${minuti < 10 ? "0" + minuti : minuti}:${sekunde < 10 ? "0" + sekunde : sekunde}`);
    }, 1000);
}

//Why choose us - skrol animacija
$(document).ready(function(){
    $("#why-wrapper").children()
        .first()
        .css("left","-100px")
        .next()
        .css("right","-100px");
    let x = false;
    $(this).scroll(function(){
        let sectionDistanca = elementTop("#why_choose");
        if($(this).scrollTop() > sectionDistanca - 500 && $(this).scrollTop() < sectionDistanca + $("#why_choose").height() - 200){
            if(!x){
                $("#why_choose").stop()
                .animate({"opacity":"1"}, 750);
                $("#why-wrapper").children()
                    .first()
                    .stop()
                    .animate({"left":"0px"}, 500)
                    .next()
                    .stop()
                    .animate({"right":"0px"}, 500);
                x=true;
            }
        }
        else {
            if(x){
                $("#why_choose").stop()
                .animate({"opacity":"0"}, 750);
                $("#why-wrapper").children()
                    .first()
                    .stop()
                    .animate({"left":"-100px"}, 500)
                    .next()
                    .stop()
                    .animate({"right":"-100px"}, 500);
                x=false;
            }
        }
    });
});

//Statistika firme - dinamicki sadrzaj
let statistika = ["32652|Happy Customers|icofont-users-alt-3", "1821|Amazing Tours|icofont-airplane", "5660|In Business|icofont-handshake-deal", "11859|Support Cases|icofont-live-support"];
let statsHtml = "";
for(i in statistika){
    statsHtml += `<div class="col-md-3 col-sm-6 col-xs-12">
                    <div class="single-counter"><i class="${statistika[i].match(/icofont-[a-z\d-]+/)[0]}"></i>
                        <div class="counter-content">
                            <h2 class="counter-num">${parseInt(statistika[i])}</h2>
                            <p>${statistika[i].match(/[A-z\s]+/)[0]}<span></span></p>
                        </div></div></div>`;
}
$("#statisticsWrapper").html(statsHtml);
//Statistika animacija
function statsAnimation(){
    let prviPut = true;
    $(this).scroll(function(){
        let sectionDistanca = elementTop("#statistics");
        if($(this).scrollTop() > sectionDistanca - 250 && $(this).scrollTop() < sectionDistanca + $("#statistics").height()){
            if(prviPut){
                let ispis = document.querySelectorAll(".counter-num");
                let trenutno = [0, 0, 0, 0];
                let gotovo = 0;
                let statsInterval = setInterval(function(){
                    for(i in trenutno){
                        let statsBroj = parseInt(statistika[i]);
                        if(trenutno[i]<statsBroj){
                            if(statsBroj-trenutno[i]<50){
                                trenutno[i] = statsBroj;
                                gotovo++;
                            }
                            else if(statsBroj-trenutno[i]<100){
                                trenutno[i] += 7;
                            }
                            else if(statsBroj-trenutno[i]<500){
                                trenutno[i] += 39;
                            }
                            else if(statsBroj-trenutno[i]<5000){
                                trenutno[i] += 253;
                            }
                            else if(statsBroj-trenutno[i]<10000){
                                trenutno[i] += 852;
                            }
                            else {
                                trenutno[i] += 9857;
                            }
                            ispis[i].textContent = String(trenutno[i]);
                        }
                    }
                    if(gotovo == 4) clearInterval(statsInterval);
                },30);
                prviPut = false;
            }
        }
        else {
            prviPut =  true;
        }
    });
}

//Galerija - LightGallery plugin
galleryHeight();
$(window).resize(galleryHeight);
function galleryHeight(){
    $(".single-gallery").height($(".single-gallery").width());
}
$(document).ready(function(){
    $("#lightgallery").lightGallery({
        selector: ".single-gallery a"
    });
});

//Utisci - dinamicki sadrzaj i slajder
let utisci = new Array(
    {
        name: "Jessica",
        review: "Meeting your professional travel team really made a huge impression on me of how helpful, warm, and fun you all are.",
        img: "assets/img/review/1.png"
    },
    {
        name: "Dylan",
        review: "I want to express my appreciation for your agents. They are such a joy to work with and always so pleasant on the phone.",
        img: "assets/img/review/2.png"
    },
    {
        name: "Courtney",
        review: "Every time I reach out for help with my travel needs for the VPs, your team does an excellent job!",
        img: "assets/img/review/1.png"
    },
    {
        name: "Luke",
        review: "It was hectic and last minute, but your responsiveness and adaptability was greatly appreciated through the entire process.",
        img: "assets/img/review/3.png"
    },
    {
        name: "Kevin",
        review: "I wanted to take a moment to sing the praises of one of your representatives — each encounter that I have had has been one of pure joy!",
        img: "assets/img/review/2.png"
    }
);
let utisciHtml = "";
for(i in utisci){
    utisciHtml += `<div class="single-testimonial col-12">
    <div class="testimonial-content">${utisci[i].review}</div>
    <div class="testimonial-bottom"><img src="${utisci[i].img}" alt="review image">
        <h3 class="title">${utisci[i].name}</h3><div class="test-rating">
            <ul class="list-inline">
                <li class="list-inline-item">
                    <i class="icofont-star"></i>
                    <i class="icofont-star"></i>
                    <i class="icofont-star"></i>
                    <i class="icofont-star"></i>
                    <i class="icofont-star"></i>			
                </li></ul></div></div></div>`
}
$("#testimonial-slider").html(utisciHtml);
//Inicijalizacija slajdera sa utiscima
$("#testimonial-slider .single-testimonial")
    .first()
    .css("opacity","1")
    .show();
utisakStrelice();
$("#tPrev").click(function(event){
    event.preventDefault();
    utisakPrev();
});
$("#tNext").click(function(event){
    event.preventDefault();
    utisakNext();
});
let utisciTajmer;
function utisakNext(){
    let utisak = $("#testimonial-slider .single-testimonial:visible");
    utisak.animate(
        {
            "left":`-${utisak.width()}px`,
            "opacity" : "0"
        },
        {
            duration: 500,
            queue : false,
            complete : function(){
                $(this).hide();
            }
        })
        .next()
        .css({
                "left":`${utisak.width()}px`,
                "position":"absolute"
            })
        .show()
        .animate({
            "left":"0px",
            "opacity" : "1"
        },
        {
            duration: 600,
            queue : false,
            complete: function(){
                utisak.next().css("position","relative");
            }
        });
        
    $("#testimonial-wrapper a").hide();
    clearTimeout(utisciTajmer);
    utisciTajmer = setTimeout(function(){
        utisakStrelice();
    }, 800);
}
function utisakPrev(){
    let utisak = $("#testimonial-slider .single-testimonial:visible");
    utisak
        .animate({
            "left":`${utisak.width()}px`,
            "opacity" : "0"
        },
        {
            duration: 500,
            queue : false,
            complete : function(){
                $(this).hide();
            }
        })    
        .prev()
        .css({
            "left":`-${utisak.width()}px`,
            "position":"absolute"
        })
        .show()
        .animate(
        {
            "left":"0px",
            "opacity" : "1"
        },
        {
            duration: 600,
            queue : false,
            complete: function(){
                utisak.prev().css("position","relative");
            }
        });
        
    $("#testimonial-wrapper a").hide();
    clearTimeout(utisciTajmer);
    utisciTajmer = setTimeout(function(){
        utisakStrelice();
    }, 800);
}
function utisakStrelice(){
    if($("#testimonial-slider .single-testimonial:visible").next().length){
        $("#tNext").fadeIn();
    }
    if($("#testimonial-slider .single-testimonial:visible").prev().length){
        $("#tPrev").fadeIn();
    }
}

//Contact forma validacija
let textarea = document.contactForm.message;
$(textarea).on("keyup", function(){
    if(textarea.value == "") {
        $(".word-count").fadeOut();
    }
    else {
        $(".word-count").fadeIn();
    }
    if(textarea.value.length >= 200){
        $(".word-count").addClass("primary-color");
        textarea.value = textarea.value.substring(0,200);
    }
    else {
        $(".word-count").removeClass("primary-color");
    }
    $(".word-count").text(String(200-textarea.value.length));
});
$(document.contactForm).on("submit", function(event){
    event.preventDefault();
    clearFormErrors();
    let forma = document.contactForm;
    let error = false;
    let nameExp = /^\p{Uppercase_Letter}\p{Letter}{1,14}(\s\p{Uppercase_Letter}\p{Letter}{1,14}){0,2}$/u;
    if(forma.name.value.length <= 30){
        if(forma.name.value == "") {
            formError(forma.name, "Please input your name.");
            error = true;
        }
        else if(!nameExp.test(forma.name.value)){
            formError(forma.name, "Please input a valid name. All words must begin with a capital letter.");
            error = true;
        }
    }
    else {
        formError(forma.name, "Name can't be more than 30 characters long.");
        error = true;
    }
    let emailExp = /^[a-z]((\.|-)?[a-z0-9]){2,}@[a-z]((\.|-)?[a-z0-9]+){2,}\.[a-z]{2,6}$/;
    if(forma.email.value.length <= 50){
        if(forma.email.value == "") {
            formError(forma.email, "Please input your email address.");
            error = true;
        }
        else if(!emailExp.test(forma.email.value)){
            formError(forma.email, "Invalid email address. Use only lowercase letters and symbols .-@");
            error = true;
        }
    }
    else {
        formError(forma.email, "Email can't be more than 50 characters long.");
        error = true;
    }
    let subjectExp = /^\p{Uppercase_Letter}[\p{Letter}\.,\?!\/-]*(\s[\p{Letter}\.,\?!\/-]+)*$/u;
    if(forma.subject.value.length <= 30){
        if(forma.subject.value == "") {
            formError(forma.subject, "Please provide subject of your question.");
            error = true;
        }
        else if(!subjectExp.test(forma.subject.value)) {
            formError(forma.subject, "Subject is in incorrect form. First letter must be a capital. You can use symbols .,-/?!");
            error = true;
        }
    }
    else {
        formError(forma.subject, "Subject can't be more than 30 characters long.");
        error = true;
    }
    if(forma.message.value == "") {
        formError(forma.message, "Please write a message.");
        error = true;
    }
    else if(forma.message.value.length < 20) {
        formError(forma.message, "Message is too short. Minimum characters: 20.");
        error = true;
    }
    if(!error){
        $("#submitButton").next()
            .fadeIn();
        forma.reset();
        $(".word-count").text("200").fadeOut();
    }
});
