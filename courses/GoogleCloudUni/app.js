
function init(){
  var value1="5Ih3apsd1B30";
  var value2="AIzaSyDfn";
  var value3="GLMjSEjd7b7K3Ndg";
  var firebaseConfig = {
    apiKey: value2+"-"+value1+"r"+value3,
    authDomain: "unversitedersnotlari.firebaseapp.com",
    projectId: "unversitedersnotlari",
    storageBucket: "unversitedersnotlari.appspot.com",
    messagingSenderId: "216544816877",
    appId: "1:216544816877:web:bed8cda14dabb97bff66e4",
    measurementId: "G-SG505SE3WX"
  };

  firebase.initializeApp(firebaseConfig);
}

init();
// drag and drop upload section
var dropZone = document.getElementById('areReady');
var counter=0;
if (document.querySelector("#photo").files[0] != undefined) {
  console.log("içeri girdi")
  $(document).ready(function () {
    $('form input').change(function () {
      $('form p').text(this.files.size / 100.0 + "Mb  file(s) selected");
    });
  });
}
document.querySelector("#photo").addEventListener("change", function (e) {
  if(counter%2==0){
    dropZone.innerHTML="File Selected";
    counter++;
  }else{
    dropZone.innerHTML="New File Selected";
    counter++;
  }
  
}
)
// Upload Function
function uploadImage() {
  let bolum;
  let notturu;
  var bolumler = document.getElementsByName("bolum");
  const file = document.querySelector("#photo").files[0];
  for (var i = 0; i < bolumler.length; i++) {
    if (bolumler[i].checked == true) {
      bolum = bolumler[i].value;
    }
  }
  console.log(bolum);
  var notturleri = document.getElementsByName("notturu");
  for (var i = 0; i < notturleri.length; i++) {
    if (notturleri[i].checked == true) {
      notturu = notturleri[i].value;
    }
  }

  var dersAdi = document.getElementById("lessonName");



  if (dersAdi.value == "" || bolum == undefined || notturu == undefined || file == undefined) {
    if (file == undefined) {
      alert("Dosya Seçilmedi");
    }
    else if (file.size > 10024000) {

      alert("dosya boyutu 10MB dan fazla olamaz");
    }
    else {
      alert("Lütfen Tüm Alanları Doldurunuz");
    }

  }
  else {
    const refValue = bolum + "/" + dersAdi.value + "/" + notturu;
    const ref = firebase.storage().ref(refValue);
    myFunction2();
    const name = +new Date() + "-" + file.name;
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task.then(myFunction)
      .catch(console.error);
  }
}

const errorMsgElement = document.querySelector('span#errorMsg');

function myFunction() {
  var notturleri = document.getElementsByName("notturu");
  for (var i = 0; i < notturleri.length; i++) {
    if (notturleri[i].checked == true) {
      notturleri[i].checked = false;
    }
  }
  var bolumler = document.getElementsByName("bolum");
  for (var i = 0; i < bolumler.length; i++) {
    if (bolumler[i].checked == true) {
      bolumler[i].checked = false;
    }
  }
  document.getElementById("lessonName").value = "";
  document.getElementById("photo").value = "";
  alert("Başarıyla Yüklendi");
}
function myFunction2() {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");
 
  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
}

// Load init
 