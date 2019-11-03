var items =
    [
        {
            "id": 1,
            "text": "Sarah",
            "link": 35
        },
        {
            "id": 2,
            "text": "Tricia",
            "link": 38
        },
        {
            "id": 3,
            "text": "Joanna",
            "link": 29
        },
        {
            "id": 4,
            "text": "Libby",
            "link": 37
        }
    ];
$.Mustache.load('./templates/items-template.html')
    .done(function () {
        $('.items').mustache('item-tmpl', items);
});