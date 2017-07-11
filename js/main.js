/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var categories = [
    {title: "Contact Info",
        headerData: writeMainContent,
        mainContent:"<ul class='descriptiveText'>\n\
        <li>Email: vanselow@ualberta.ca</li>\n\
        <li>Linkedin: <a href='https://ca.linkedin.com/in/harley-vanselow-2a3296124'>Harley Vanselow</a></li>\n\
        <li>Github: <a href='https://github.com/HarleyVanselow'>harleyvanselow</a></li>\n\
        </ul>"
    },
    {title: "Skill Summary",
        headerData: drawIcons,
        resources: [
            {image: "resources/java.svg", alt: "java", descriptiveText: "I am proficient in Java and OO design, and have experience in writing RESTful API's that integrate with Tomcat servers. In my most recent job as Java developer for GE Digital, I was given the opportunity to lead educational seminars on some of the nuances of Java, including details on Java 8's functional programming tools, and implementing polymorphic behavior."},
            {image: "resources/webwork.png", alt: "web", descriptiveText: "I have experience writing HTML, CSS, and Javascript, and am familiar with jQuery and Bootstrap. I am also skilled at working with RESTful API via AJAX requests, and have basic PHP experience.<br>Some examples of web development I have done can be found <a href='https://github.com/HarleyVanselow/harleyvanselow.github.io'>here</a> and <a href='http://tinyurl.com/hvwebwork'>here</a>."},
            {image: "resources/Android_robot.png", alt: "android", descriptiveText: "I have independently and collaboratively worked on Android applications, and am familiar with their planning, testing, and coding.<br> An app I personally wrote can be found <a href='https://github.com/HarleyVanselow/AndroidReminderApp'>here</a>. <br>An app I collaborated on can be found <a href='https://github.com/CMPUT301F16T12/CloudyCar'>here</a>."},
            {image: "resources/c-logo.png", alt: "C", descriptiveText: "I am productive in C, and am familiar with essentials, such as pointer usage, manual memory management, and basic networking using sockets.<br> Examples of C projects I have worked on can be found <a href='https://github.com/HarleyVanselow/ClientServer'>here</a> and <a href='https://github.com/HarleyVanselow/WorkingSetSimulator'>here</a>."},
            {image: "resources/sql.png", alt: "sql", descriptiveText: "I am familiar with MySQL and MSSQL, and am knowledgable in the use of stored procedures, triggers, transactions, and basic relational design."}]},
    {title: "Work Experience",
        headerData: drawIcons,
        resources: [
            {image:"resources/nait.png",alt:"nait",descriptiveText:"NAIT- Computer Engineering Technology Department, Summer 2015<ul class='descriptiveTextList'>\n\
                                                                    <li>Evaluated ICAs (in class assignments) and labs for Computer Engineering Technology courses on Object Oriented Programming, Database Technologies, Web Technologies, and Web Application Development</li>\n\
                                                                    <li>Provided feedback on exercise appropriateness, content, depth, and continuity</li>\n\
                                                                    <li>Edited assignments for terminology, clarity, and conciseness</li></ul>"},
            {image:"resources/room.jpg",alt:"theroom",descriptiveText:"'the room' (escape room), Summer 2015<ul class='descriptiveTextList'>\n\
                                                                        <li>Developed an easy to maintain custom FAQ field for a website</li>\n\
                                                                        <li>Quickly responded to changing employer requests</li>\n\
                                                                        <li>Implemented requested additions seamlessly into existing framework</li></ul>"},
            {image:"resources/ge.gif",alt:"ge",descriptiveText:"GE Digital, January-August 2016<ul class='descriptiveTextList'>\n\
                                                                <li>Worked collaboratively in a scaled Agile framework with other professional developers and directly contributed to the international release of GE Digital’s Web HMI 1.0 product</li>\n\
                                                                <li>Produced maintainable, extensible, and thoroughly tested Java code that integrated cleanly with 3rd party services and communicated asynchronously using RESTful API’s</li>\n\
                                                                <li>Took initiative to coordinate and plan the merging of code from multiple developers</li>\n\
                                                                <li>Created content for and ran seminars on Java language nuances</li></ul>"},

            {image:"resources/ibm.png",alt:"tbd",descriptiveText:"I am currently working for IBM as a software development intern! Have joined IBM in April 2017, I will be working in the Markham lab developing quality code until December 2017, at which point I will be returning to university to complete my degree"}
        ]},


    {title: "About Me",
        headerData: writeMainContent,
        mainContent:"<span class='descriptiveText'>I'm a fourth year computer engineering student at the University of Alberta. In my free time I enjoy playing jazz piano, gaming, off-trail hiking (in the summer), and making impossibly obscure movie and tv references.</span>"}
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
function writeMainContent(){
    return this.mainContent;
}
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
        $(".mdl-layout-title").click(function(){
           $('main').animate({scrollTop: 0},400);
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
    var resourceDescription="";
    if(category.hasOwnProperty("resources")){
        resourceDescription = "<div class='descriptiveText'></div>";
    }
    var data = {
        Title: category.title,
        SupportingContent: category.headerData(),
        ResourceDescription:resourceDescription,
        Id: genCardId(category.title)
    };
    var output = Mustache.render(template, data);
    $(".pageContent").append(output);

    if (category.hasOwnProperty("resources")) {
        category.resources.forEach(function (resource) {
            $("#" + resource.alt).parent().click(function () {
                $("#" + genCardId(category.title)).find(".descriptiveText").first().html(resource.descriptiveText);
                var newSelector = $("#" + genSelectorId(resource.alt));
                var prevSelector = $(this).parent().parent().find('.active-selector').first();
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