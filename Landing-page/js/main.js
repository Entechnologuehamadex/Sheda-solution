const toggleButtons = document.querySelectorAll(".toggle-answer");
const menuToggle = document.getElementById("menu-toggle");
const menu = document.querySelector(".menu");
const btn = document.querySelector(".btn");

//handles the faq answeer togglers
toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.closest(".question").querySelector(".answer");
    answer.classList.toggle("show");
    if (button.classList.contains("expanded")) {
      button.src = "images/arrow-down.svg";
      button.classList.remove("expanded");
    } else {
      button.src = "images/arrow-up.svg";
      button.classList.add("expanded");
    }
  });
});

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
  btn.classList.toggle('active');
  if(menuToggle.classList.contains("expanded")){
    menuToggle.src = "images/toggle-button.svg"
    menuToggle.classList.remove("expanded")
  }else{
    menuToggle.src = "images/toggle-close-x-svgrepo-com.svg"
    menuToggle.classList.add("expanded")
    }
  }
);


const form = document.getElementById('myForm');

form.addEventListener('submit', (event) => {

  event.preventDefault(); // Prevent default form submission
  const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json' // 
      }
    })
    .then(response => {
      if (response.ok) {  // Check for successful response (status 200-299)
        window.location.href = 'thankyou.html';
        form.reset(); // Clear the form
      } else {
        return response.json().then(err => {throw new Error(err.message)});
      }
    })
    .catch(error => {
      alert("An error occurred: " + error.message);
      console.error('Error:', error);
    });
  });


// const currentPath = window.location.pathname; 
// const navLinks = document.querySelectorAll('nav .menu li a');

// navLinks.forEach(link => {
//   if (link.getAttribute('href') === currentPath) {
//     link.classList.add('active');
//   } else {
//     link.classList.remove('active');
//   }
// });

// toggle-close-x-svgrepo-com.svg