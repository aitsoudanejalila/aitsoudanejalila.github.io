window.loadSidebar = function (){
    var items =
    [
        { 
            "id": 1,
            "text": "Acceuil",
            "link": "/"
        },
        {
            "id": 2,
            "text": "Publications et Communications",
            "hasSubItems": true,
            "items": [
                { "_text": "Publications", "_link": "/communications" },
                { "_text": "Communications", "_link": "/publications" }                
            ]
        },
        {
            "id": 3,
            "text": "Activites et Services",
            "hasSubItems": true,
            "items": [
                { "_text": "Activites", "_link": "/activites" },
                { "_text": "Services", "_link": "/services" }                
            ]
        },
        {
            "id": 4,
            "text": "Enseignement",
            "link": "/enseignement"
        },
        {
            "id": 5,
            "text": "Evenements",
            "link": "/evenements"
        },
        {
            "id": 6,
            "text": "Biographie",
            "link": "/biographie"
        },
        {
            "id": 7,
            "text": "Formation",
            "hasSubItems": true,
            "items": [
                { "_text": "License", "_link": "/license" },
                { "_text": "Matser", "_link": "/master" },
                { "_text": "Doctorat", "_link": "/doctorat" },                
            ]
        }
    ];
    $.Mustache.load('./templates/items-template.html')
        .done(function () {
            $("#menu>ul").mustache('item-tmpl', items);
    });
};

$(document).ready(() => window.loadSidebar());