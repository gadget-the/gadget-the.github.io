function myFunction() {
    var x = document.getElementById("myPsw").value;
    
    if (x == "password") {
        window.location.href = "Secret_Page.html";
    } else {
        document.getElementById("demo").innerHTML = "Wrong Password";
    }
}