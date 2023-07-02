document.addEventListener("DOMContentLoaded", function() {
    const filmDetailsEndpoint = "http://localhost:3000/films/1";
    const filmMenuEndpoint = "http://localhost:3000/films";
  
    // Fetch film details
    fetch(filmDetailsEndpoint)
      .then(response => response.json())
      .then(filmDetails => {
        const posterElement = document.getElementById("poster");
        const runtimeElement = document.getElementById("runtime");
        const showtimeElement = document.getElementById("showtime");
        const availableTicketsElement = document.getElementById("available-tickets");
  
        // Update film details in the HTML
        posterElement.style.backgroundImage = `url(${filmDetails.poster})`;
        runtimeElement.textContent = `Runtime: ${filmDetails.runtime} minutes`;
        showtimeElement.textContent = `Showtime: ${filmDetails.showtime}`;
        availableTicketsElement.textContent = `Available Tickets: ${filmDetails.capacity - filmDetails.tickets_sold}`;
      });
  
    // Fetch film menu
    fetch(filmMenuEndpoint)
      .then(response => response.json())
      .then(filmMenu => {
        const filmMenuElement = document.getElementById("film-menu");
  
        // Populate film menu
        filmMenu.forEach(film => {
          const li = document.createElement("li");
          li.classList.add("film-item");
          li.textContent = film.title;
          filmMenuElement.appendChild(li);
        });
      });
  
    // Event listener for buy ticket button
    const buyTicketButton = document.getElementById("buy-ticket");
    buyTicketButton.addEventListener("click", function() {
      const availableTicketsElement = document.getElementById("available-tickets");
      const availableTicketsCount = parseInt(availableTicketsElement.textContent.split(":")[1].trim(), 10);
  
      if (availableTicketsCount > 0) {
        availableTicketsElement.textContent = `Available Tickets: ${availableTicketsCount - 1}`;
      }
    });
  });
  