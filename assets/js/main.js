//Inicijalizacija stranice
$(document).ready(function() {
    $(window).on("load",function() {
        $(".preloader").fadeOut();
    });
    navScrollEvent();
    $(this).scroll(navScrollEvent);
});

function navScrollEvent(){
    if(window.scrollY > 100){
        $("#navigation").addClass("navbar-fixed");
    }
    else {
        $("#navigation").removeClass("navbar-fixed");
    }
}
//DEALS - dinamicki sadrzaj
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
            stars: 5,
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
            stars: 5,
            description: "Sitting on the edge of the Mediterranean, Marseille is nothing like Paris, and that’s a good thing. With almost constant sunshine, miles of beautiful beaches, and a wonderful mix of cultures—the city has a flavor you won’t find anywhere else in France...",
            price: 760
            }]
    }
}
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
        dealH4.appendChild(stars);
        dealLink.addEventListener("click", () => {openModal(dealObj, countryTitle);})
    }
    $(dealBlock).hide();
    dealsWrapper.appendChild(dealBlock);
    $(dealBlock).ready(function(){
        $(dealBlock).fadeIn(200);
        setTimeout(() => {
            $(dealsWrapper).removeAttr("style");
        },200);
    });
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
        for(deal in countryObj.dealsList){
        createDeal(countryObj.dealsList[deal],countryObj.title);
        }
    },300);
        
}
function openModal(dealObj,countryTitle){
    $(document.body).css("overflow", "hidden");
    $("#dealModal").addClass("modalShow");
    let header = `<div class="col-12 col-lg-7"><img src="${dealObj.img}" alt="${dealObj.title}" class="img-fluid rounded"/></div><div class="col-12 col-lg-5 d-flex flex-column align-items-center align-items-lg-start"><h4>${dealObj.title}</h4><span class="font-weight-light">${countryTitle}</span><div class="tour-rating">`;
    for(let i = 0; i < dealObj.stars; i++){
        header += `<span class="fa fa-star"></span>`;
    }
    header += `</div><div class="primary-color">$${dealObj.price.toLocaleString()}</div></div>`;
    $("#modalLeftHeader").html(header);
    $("#modalLeftBody").html(`<p>${dealObj.description}</p>`);
    
}
function modalClose(event){
    $(document.body).css("overflow", "visible");
    $("#dealModal").removeClass("modalShow");
    event.stopPropagation();
}
function stopPropagation(event){
    event.stopPropagation();
}
//MODAL FORM VALIDACIJA

