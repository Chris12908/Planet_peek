Planet Peek is a simple and interactive web application that allows users to search for any country in the world and view detailed information about it. The app displays useful details such as the capital city, population, region, sub-region, languages, currencies, borders, area, calling code, and time zones. It is designed to be easy to use, responsive, and accessible both locally and through an online load-balanced setup.

The application allows users to search for any country and instantly view comprehensive information about it. It includes a clean and responsive design, and it provides error messages when a user enters an invalid country name. The app works smoothly when opened locally on a computer and is also configured to run through an Nginx load balancer, which distributes traffic across two backend web servers


How to Run the Application Locally

Clone the repository from GitHub and open it in Visual Studio Code or any code editor. You can either open index.html directly in a browser or use the Live Server extension for a local development environment.

How to Deploy the Application to the Web Servers

The setup uses one load balancer and two backend web servers. Upload your project files to /var/www/planetpeek on both backend servers and configure Nginx to serve the site. On the load balancer, configure an upstream pointing to the backend IPs and restart Nginx to enable load balancing.

Enabling HTTPS

Run Certbot on the load balancer to generate an SSL certificate and secure the site. Choose the redirect option to forward all HTTP traffic to HTTPS. The site will then show as secure in browsers.

API Used

The app uses the REST Countries API (https://restcountries.com/v3.1/name/{country}) to fetch country details like population, languages, borders, flags, and time zones. Documentation: https://restcountries.com
.

Project File Structure

The project contains index.html (structure), style.css (appearance), and script.js (functionality).



Demo video link: https://youtu.be/ooTyqI-qPOQ