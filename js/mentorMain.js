// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx
// xxxxxxxxxx Full Name Validation xxxxxxxxxx
function checkMentorFullName() {
    var userFullName = document.getElementById("mentorFullName");
    var flag = false;
    if (mentorFullName === "") {
        flag = true;
    }
    if (flag) {
        document.getElementById("userFullNameError").style.display = "block";
    } else {
        document.getElementById("userFullNameError").style.display = "none";
    }
}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkMentorEmail() {
    var userEmail = document.getElementById("mentorEmail");
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
function checkMentorPassword() {
    var userPassword = document.getElementById("mentorPassword");
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
function checkBoxLimited() {
    var checkBoxGroup = document.forms['form_names']['checking[]'];
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
function MentorSignUp() {
    /**** SIGNUP Test code START ***********/
    var userFullName = document.getElementById("mentorFullName").value;
    var userEmail = document.getElementById("mentorEmail").value;
    var userPassword = document.getElementById("mentorPassword").value;
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
            firebaseRef.child("Mentor").child(uid).set(userData);

            /* SIGN UP Profile SAVE test code END*/

            /* Skills SAVE test code START*/
            var selChkBox = document.querySelectorAll("input[type=checkbox]:checked");
            console.log(selChkBox);
            for (var c of selChkBox) {
                3
                firebaseRef.child("Mentor").child(uid).child("skills").push(c.value);
            }
            swal('Your Account Created', 'Your account was created successfully.', ).then((value) => {
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
// xxxxxxxxxx Working For Sign Out xxxxxxxxx
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

// var userID = auth.currentUser.uid;
// window.alert("User ID: " + userID);
// console.log("User ID:" + userID);

auth.onAuthStateChanged(user => {
    if(user){
        console.log('user logged in')
        var uid = user.uid;
        console.log("USER:"+uid);
    }else{
        console.log("user logged out")
    }
})