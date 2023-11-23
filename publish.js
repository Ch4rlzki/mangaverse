const ghpages = require("gh-pages");

ghpages.publish("dist", {
    branch: "pages"
}, (err) => {
    if (err) {
        return console.log(err);
    }
});

console.log("OK!");