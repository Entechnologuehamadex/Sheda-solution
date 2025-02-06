const form = document.getElementById('myForm');

form.addEventListener('submit', (event) => {

  event.preventDefault(); // Prevent default form submission
  const formData = new FormData(form);
  console.log(formData)

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json' // 
      }
    })
    .then(response => {
      if (response.ok) {  // Check for successful response (status 200-299)
        window.location.href = 'thankYou.html';
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