from bs4 import BeautifulSoup
import requests

def scrape_website(url):
    # Send an HTTP request to the website
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    if response.status_code != 200:
        print(f"Failed to retrieve content from {url}")
        return None

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.content, "html.parser")

    # Extract relevant text from specific HTML tags (e.g., paragraphs <p>, headers <h1>, <h2>, etc.)
    article_text = ""

    # Example: Extract text from all <p> tags (paragraphs)
    for paragraph in soup.find_all('p'):
        article_text += paragraph.get_text() + " "

    return article_text