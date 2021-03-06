// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx
// xxxxxxxxxx Full Name Validation xxxxxxxxxx
function checkUserFullName() {
    var userFullName = document.getElementById("userFullName");
    var flag = false;
    if (userFullName === "") {
        flag = true;
    }
    if (flag) {
        document.getElementById("userFullNameError").style.display = "block";
    } else {
        document.getElementById("userFullNameError").style.display = "none";
    }
}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkUserEmail() {
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if (userEmail.value.match(userEmailFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userEmailError").style.display = "block";
    } else {
        document.getElementById("userEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword() {
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var flag;
    if (userPassword.value.match(userPasswordFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userPasswordError").style.display = "block";
    } else {
        document.getElementById("userPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Limiting check box selection xxxxxxxxxx
function checkBoxLimit() {
    var checkBoxGroup = document.forms['form_name']['check[]'];
    var limit = 3;
    for (var i = 0; i < checkBoxGroup.length; i++) {
        checkBoxGroup[i].onclick = function () {
            var checkedcount = 0;
            for (var i = 0; i < checkBoxGroup.length; i++) {
                checkedcount += (checkBoxGroup[i].checked) ? 1 : 0;
            }
            if (checkedcount > limit) {
                console.log("You can select maximum of " + limit + " checkboxes.");
                alert("You can select maximum of " + limit + " checkboxes.");
                this.checked = false;
            }
        }
    }
}
// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp() {
    /**** SIGNUP Test code START ***********/
    var userFullName = document.getElementById("userFullName").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userFullNameFormate = /^([A-Za-z.\s_-])/;
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    auth.createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
        // alert("student signup success");
        var user = auth.currentUser;
        // alert("student signup success user :" + user);
        var uid;
        if (user != null) {
            uid = user.uid;
            // alert("student uid" + uid);

            /* SIGN UP Profile SAVE test code START*/
            var firebaseRef = firebase.database().ref();
            var userData = {
                userFullName: userFullName,
                userEmail: userEmail,
                userPassword: userPassword,
            }
            firebaseRef.child("Student").child(uid).set(userData);

            /* SIGN UP Profile SAVE test code END*/

            /* Skills SAVE test code START*/
            var selChkBox = document.querySelectorAll("input[type=checkbox]:checked");
            console.log(selChkBox);
            for (var c of selChkBox) {
                3
                firebaseRef.child("Student").child(uid).child("skills").push(c.value);
            }
            swal('Your Account Was Created', 'Your account was created successfully.', ).then((value) => {
                setTimeout(function () {
                    window.location = "/pages/SignIn.html";
                }, 1000)
            });
        }
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        swal({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
        });
        /* Skills SAVE test code END*/


        /**** SIGNUP Test code END ***********/

    });
}
// xxxxxxxxxx Working For Sign Out xxxxxxxxxx
function signOut() {
    auth.signOut().then(function () {
        // Sign-out successful.
        swal({
            icon: 'success',
            title: 'Signed Out',
        }).then((value) => {
            setTimeout(function () {
                window.location.replace("../index.html");
            }, 1000)
        });
    }).catch(function (error) {
        // An error happened.
        let errorMessage = error.message;
        swal({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
        })
    });
}

auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in')
        var uid = user.uid;
        console.log("USER:" + uid);
    } else {
        console.log("user logged out")
    }
})

var userID = auth.currentUser.uid;
var userDataRef = firebase.database().ref("Student/" + userID + "/").orderByKey();
userDataRef.once("value").then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();

        var name_val = childSnapshot.val().userFullName;
        var id_val = childSnapshot.val().userEmail;

        $("#name").append(name_val);
        $("#email").append(id_val);

    });
});