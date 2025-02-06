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
      button.src = "/images/arrow-down.svg";
      button.classList.remove("expanded");
    } else {
      button.src = "/images/arrow-up.svg";
      button.classList.add("expanded");
    }
  });
});

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
  btn.classList.toggle('active');
  if(menuToggle.classList.contains("expanded")){
    menuToggle.src = "/images/toggle-button.svg"
    menuToggle.classList.remove("expanded")
  }else{
    menuToggle.src = "/images/toggle-close-x-svgrepo-com.svg"
    menuToggle.classList.add("expanded")
    }
  }
);




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