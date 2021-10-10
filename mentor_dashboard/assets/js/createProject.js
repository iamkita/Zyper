function addProject() {
    const ref = firebase.storage().ref();
    const file = document.querySelector('#photo').files[0];
    document.getElementById("someImg").src = file;
    projectDescription = document.getElementById("ProjectDescrip").value;
    console.log(projectDescription);
    const name = (+new Date()) + '-' + file.name;
    const metadata = {
        contentType: file.type
    };
    const task = ref.child("Mentor Files").child("uid").child("skill").put(file, metadata);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then((url) => {
            //console.log(url);
            alert("File uploaded successfully");
            document.querySelector('#someImg').src = url;
            var brRef = firebase.database().ref("ImageDetails");
            brRef.push({
                username: uid,
                imgURL: url,
                projectDescription: projectDescription
            });

            firebase.database().ref('ImgInfo/' + "uid" + '/' + new Date()).set({
                imgurl: url,
                stars: 5,
                projectDescription: projectDescription
            });

            db.collection("ImageDetails").doc().set({
                    url: url,
                    username: uid,
                    projectDescription: projectDescription
                })
                .then(() => {
                    alert('Document Created!')
                    createRequest.reset();
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        })
        .catch(console.error);
}

// function showDetails() {
//     let nm = document.getElementById('name').value;
//     db.collection('ImageDetails').where('user', '==', nm).get().then(snapshot => {
//         snapshot.docs.forEach(doc => {
//             console.log(doc.data());
//             //alert(data().url);
//             document.getElementById('info').innerHTML =
//                 `${doc.data().user} and ${doc.data().url}`;
//             let row = `<tr>
//                     <td>${doc.data().user}</td>
//                     <td>${doc.data().url}</td>    
//                     <td><img src=${doc.data().url} width='100px' /></td>    

//               </tr>`;
//             let table = document.getElementById('myTab');
//             table.innerHTML += row;
//         })
//     })
// }