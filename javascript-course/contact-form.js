// function successPopup() {
//   document.getElementById('popupContainer').style.display = 'flex';
// }
// function closePopup() {
//   document.getElementById('popupContainer').style.display = 'none';
// }
// const form = document.querySelector('#contactForm');
// form.addEventListener('submit', function (event) {
//   event.preventDefault();
//   const inputs = form.querySelectorAll("input, text, textarea, radio, checkbox");
//   let  allFilled = true;
//   inputs.forEach(function(input){
//     if (input.value.trim() === ""){
//       allFilled = false;
//     }
//   });
//   if (allFilled) {
//     successPopup();
//   } else {
//     alert("please complete all fields before submitting the form")
//   }

// });


  
let allFilled = true;


const form = document.querySelector('#contactForm');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const inputs = form.querySelectorAll("input, textarea, select");


  inputs.forEach(function (input) {
    if ((input.type === "checkbox" || input.type === "radio") && !input.checked) {
      allFilled = false;
    } else if (input.type !== "checkbox" && input.type !== "radio" && input.value.trim() === "") {
      allFilled = false;
    } else{
      allFilled = true;
    }
  });



  function successPopup() {
  if(!allFilled) {
    document.getElementById('popupContainer').style.display = 'none';
  } else{
  document.getElementById('popupContainer').style.display = 'flex';
  }
}
  successPopup();

});

function closePopup() {
  document.getElementById('popupContainer').style.display = 'none';
  location.reload(true);
}