const form = document.querySelector("#booking-form");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  const obj ={
    name : document.querySelector("#name").value,
    email : document.querySelector("#email").value,
    phone : document.querySelector("#phone").value
  }

  axios.post("https://crudcrud.com/api/50588dc5cb9a43df8148490243831572/Create", obj)
    .then(response => {
      console.log(response);
      updateStoredDataDisplay();
    })
    .catch(err => {
      console.log(err);
    });
  alert("Booking confirmed! Details stored in the backend.");
});

function updateStoredDataDisplay() {
  const storedDataContainer = document.querySelector("#stored-data");
  storedDataContainer.innerHTML = "";

  axios.get("https://crudcrud.com/api/50588dc5cb9a43df8148490243831572/Create")
    .then(response => {
      const submissions = response.data;
      submissions.forEach((submission, index) => {
        storedDataContainer.innerHTML += `
          <p>
            Name: ${submission.name} |
            Email: ${submission.email} |
            Phone: ${submission.phone}
            <button class="edit-button" data-index="${index}" data-id="${submission._id}">Edit</button>
            <button class="delete-button" data-index="${index}" data-id="${submission._id}">Delete</button>
          </p>
        `;
      });

      const editButtons = document.querySelectorAll(".edit-button");
      editButtons.forEach(button => {
        button.addEventListener("click", function() {
          const index = Number(this.dataset.index);
          const submissions = response.data;
          const submission = submissions[index];
          document.querySelector("#name").value = submission.name;
          document.querySelector("#email").value = submission.email;
          document.querySelector("#phone").value = submission.phone;
        });
      });

      const deleteButtons = document.querySelectorAll(".delete-button");
      deleteButtons.forEach(button => {
        button.addEventListener("click", function() {
          const id = this.dataset.id;
          axios.delete(`https://crudcrud.com/api/50588dc5cb9a43df8148490243831572/Create/${id}`)
            .then(response => {
              console.log(response);
              updateStoredDataDisplay();
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
}

updateStoredDataDisplay();
