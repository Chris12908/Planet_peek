# Global Info Explorer

This project is a simple country information explorer built using plain HTML, CSS and vanilla JavaScript. It fetches data from the REST Countries API and displays searchable, filterable country cards with a detail modal.

Important: Submission & Demo Requirements

- You are required to submit a link to your GitHub repository containing all of your source code. Make sure to include a `.gitignore` file to exclude unnecessary files and to prevent sensitive information, such as API keys, from being uploaded.
- For grading purposes, if you must provide any API keys, provide them in the repository comment section (for example, an issue or PR comment) rather than committing secrets to the codebase. DO NOT commit secret keys in plain text for production use; use a backend proxy or environment variables instead.
- Alongside your code, provide a short demo video (maximum 2 minutes) demonstrating how to run the app locally and how to access it via the load balancer. Show the key features and interactions (search, filter, country details).

README should include:
- How to run locally
- How to deploy to two standard web servers and behind a load balancer (example steps)
- API information and links
- Challenges and solutions
- Credits and attributions

Local setup
1. Open `index.html` in a modern browser, or serve the folder with a simple static server:

```powershell
cd 'C:\Users\CHRIS\OneDrive\Desktop\summarives'
python -m http.server 5500
# then open http://localhost:5500
```

2. Use the search box to find countries. Click a country card to view details.

If network fetch fails, the app automatically falls back to a small embedded dataset so the UI remains interactive for testing.

API Credits
- REST Countries API — https://restcountries.com

Security note
- Never commit production API keys. Use `.gitignore` to exclude secrets and use a backend to store keys when required.
