function myFunction() {
    var x = document.getElementById("myPsw").value;
    
    if (x == "password") {
        window.location.href = "Secret_Page.html"; // open the page
    } else {
        document.getElementById("demo").innerHTML = "Wrong Password"; // use text element to let them know the password is wrong
    }
}