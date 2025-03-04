// if (!window.hcb_user) {
//     hcb_user = {};
// } ( function () { var s = document.createElement("script"), l = hcb_user.PAGE || ("" + window.location).replace(/'/g, "%27"), h = "//www.htmlcommentbox.com"; s.setAttribute("type", "text/javascript"); s.setAttribute("src", h + "/jread?page=" + encodeURIComponent(l).replace("+", "%2B") + "&opts=16862&num=10&ts=1513187332420"); if (typeof s != "undefined") document.getElementsByTagName("head")[0].appendChild(s); })();

function sendComment() {
    var screenName = document.getElementById("screen_name").value;
    var commentText = document.getElementById("comment_box").value;

    console.log("user: " + screenName + " comment: " + commentText);

    var commentsListElement = document.getElementById("comments"); // get list element
    
    var commentName = document.createElement("dt"); // create list item element
    var commentContents = document.createElement("dd"); // create list item element
    
    commentName.appendChild(document.createTextNode(screenName)); // add text to list item
    commentContents.appendChild(document.createTextNode(commentText)); // add text to list item
    
    commentsListElement.appendChild(commentName); // add list item to list element
    commentsListElement.appendChild(commentContents); // add list item to list element
}