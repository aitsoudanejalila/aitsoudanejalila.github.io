var navbarItems = [];
var NavBarItems;
//     { text: "rubrique1", link: "https://github.com/ktf1989.github.io/rubrique1" },
//     { text: "rubrique2", link: "https://github.com/ktf1989.github.io/rubrique2" },
//     { text: "rubrique3", link: "https://github.com/ktf1989.github.io/rubrique3" },
//     { text: "rubrique4", link: "https://github.com/ktf1989.github.io/rubrique4" },
// ];

var db = Window.fireApp.firestore();
db.collection("navbarItems").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        navbarItems.push(doc.data());
        console.log(doc.id, " => ", doc.data());
    }); 
    NavBarItems = ko.observableArray(ko.utils.arrayMap(navbarItems, function(item) {
        return { linkText: item.text, link: item.link };
    }));
    ko.applyBindings();
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
});
// var docMd = require()
var md = window.markdownit();
var result = md.render('# markdown-it rulezz!');

