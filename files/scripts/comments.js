// if (!window.hcb_user) {
//     hcb_user = {};
// } ( function () { var s = document.createElement("script"), l = hcb_user.PAGE || ("" + window.location).replace(/'/g, "%27"), h = "//www.htmlcommentbox.com"; s.setAttribute("type", "text/javascript"); s.setAttribute("src", h + "/jread?page=" + encodeURIComponent(l).replace("+", "%2B") + "&opts=16862&num=10&ts=1513187332420"); if (typeof s != "undefined") document.getElementsByTagName("head")[0].appendChild(s); })();

function sendComment() {
    var screenName = document.getElementById("screen_name").value;
    var commentBox = document.getElementById("comment_box").value;
    
    print("user: " + screenName + " comment: " + commentBox);

    document.getElementById("comments").innerHTML = "Wrong Password";
    // document.getElementById("demo").innerHTML = "Wrong Password";
}