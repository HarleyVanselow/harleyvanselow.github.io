/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var categories = [
    {title: "Contact Info",
        headerData: placeholder},
    {title: "Skill Summary",
        headerData: drawIcons,
        resources: [
            {image: "resources/java.svg", alt: "java", descriptiveText: "I do java gud"},
            {image: "resources/webwork.png", alt: "web", descriptiveText: "I do webwork gud!!"},
            {image: "resources/Android_robot.png", alt: "android", descriptiveText: "I do android gud"},
            {image: "resources/python.png", alt: "python", descriptiveText: "I do python gud"},
            {image: "resources/sql.png", alt: "sql", descriptiveText: "I do sql gud"}]},
    {title: "Work Experience",
        headerData: drawIcons,
        resources: [
            {image:"resources/nait.png",alt:"nait",descriptiveText:"I evaluated material for NAIT!"},
            {image:"resources/room.jpg",alt:"theroom",descriptiveText:"I did some webdev for 'the room'!"},
            {image:"resources/ge.gif",alt:"ge",descriptiveText:"I worked at GE Digital! I did lots and lots and lots of cool stuff, such as programming. I worked with Ravil and Archie and Chad and Bo and Ryan and James, and we wrote code, the best code. We wrote such great code, believe me, it was tremendous."},
            {image:"resources/questionmark.png",alt:"tbd",descriptiveText:"I want to work in the future!"}
        ]},
    {title: "About Me",
        headerData: placeholder}
];
var templates;
$(document).ready(function () {
    loadTemplates();
});

function buildPage() {
    buildNavBarHtml();
    buildAllCards();
}
function placeholder() {}

function drawIcons() {
    var selectorBarHtml = "";
    var imageHtml = "";
    var templateImage = $(templates).filter("#imageResource").html();
    var templateImageWrapper = $(templates).filter("#imageResourceWrapper").html();
    this.resources.forEach(function (resource) {
        selectorBarHtml += "<div class='selector mdl-color--accent' id='" + genSelectorId(resource.alt) + "'></div>";
        var imageData = {
            image: resource.image, imageAlt: resource.alt, imageId: resource.alt
        };
        imageHtml += Mustache.render(templateImage, imageData);
    });
    return Mustache.render(templateImageWrapper, {iconHtml: imageHtml, selectorHtml: selectorBarHtml});
}
function buildNavBarHtml() {
    categories.forEach(function (category) {
        var navId = genNavId(category.title);
        var cardId = genCardId(category.title);
        var template = $(templates).filter("#navLinkHtml").html();
        var completedHtml = Mustache.render(template, {topic: category.title, navId: navId, cardId: cardId});
        $("#topNavBar").append(completedHtml);

        $("#" + navId).on("click", function (e) {
            e.preventDefault();
            var cardId = $(this).attr('href');
            var correspondingCard = document.getElementById(cardId);
            var cardPosition = correspondingCard.offsetTop - parseInt($("#" + cardId).css('margin-top'), 10) + 5;
            $('main').animate({scrollTop: cardPosition}, 400);
        });
    });
}

function buildAllCards() {
    categories.forEach(function (category) {
        buildCard(category);
    });
    $(".imageWrapper").materialripple();
}

function buildCard(category) {
    var template = $(templates).filter("#basicCardBody").html();
    var data = {
        Title: category.title,
        SupportingText: category.headerData(),
        Id: genCardId(category.title)
    };
    var output = Mustache.render(template, data);
    $(".pageContent").append(output);

    if (category.hasOwnProperty("resources")) {
        category.resources.forEach(function (resource) {
            $("#" + resource.alt).click(function () {
                $("#" + genCardId(category.title)).find(".mdl-card__actions").first().html(resource.descriptiveText);
                var newSelector = $("#" + genSelectorId(resource.alt));
                var prevSelector = $(this).parent().parent().parent().find('.active-selector').first();
                if(newSelector.attr('id') === prevSelector.attr('id')){return;}
                var distanceBetween = $(newSelector).offset().left - $(prevSelector).offset().left;
                prevSelector.animate(
                        {left:distanceBetween
                },{duration:250,done:function(){
                    newSelector.addClass('active-selector');
                    prevSelector.removeClass('active-selector');
                    prevSelector.css('left',0);
                }});
                        
            });
        });
        $("#" + genSelectorId(category.resources[0].alt)).addClass('active-selector');//Have the first element selected
        $("#" + category.resources[0].alt).click();
    }
}

function genCardId(title) {
    return title.replace(/\s+/g, '') + "Card";
}
function genNavId(title) {
    return title.replace(/\s+/g, '') + "NavId";
}
function genSelectorId(resourceAltName) {
    return resourceAltName + "Selector";
}
function loadTemplates() {
    $.get('resources/templates.html').done(function (data) {
        templates = data;
        buildPage();
    });
}