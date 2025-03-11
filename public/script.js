// document.addEventListener("DOMContentLoaded", function () {
//     document.querySelector("form").addEventListener("submit", async (event) => {
//         event.preventDefault();
        
//         const formData = new FormData(event.target);
//         const response = await fetch("/users", {
//             method: "POST",
//             body: formData,
//         });

//         const result = await response.json();
//         if (result.redirect) {
//             window.location.href = result.redirect;
//         } else {
//             alert(result.message);
//         }
//     });
// });

