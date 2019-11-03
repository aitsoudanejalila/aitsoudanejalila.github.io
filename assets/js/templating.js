$(document).ready(function() {
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
                    { "text": "Publications", "link": "/communications" },
                    { "text": "Communications", "link": "/publications" }                
                ]
            },
            {
                "id": 3,
                "text": "Activites et Services",
                "hasSubItems": true,
                "items": [
                    { "text": "Activites", "link": "/activites" },
                    { "text": "Services", "link": "/services" }                
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
                    { "text": "License", "link": "/license" },
                    { "text": "Matser", "link": "/master" },
                    { "text": "Doctorat", "link": "/doctorat" },                
                ]
            }
        ];
    $.Mustache.load('./templates/items-template.html')
        .done(function () {
            $('.items').mustache('item-tmpl', items);
    });
})();