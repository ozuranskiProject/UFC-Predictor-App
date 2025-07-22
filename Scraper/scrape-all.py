from ufc_scraper import scrape_fighter
import requests
from bs4 import BeautifulSoup
import time

slugs = []


from ufc_scraper import scrape_fighter
import requests #used for downloading web pages
from bs4 import BeautifulSoup #lets you pick a part said web pages
import time

url = "https://www.ufc.com/athletes/all"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

fighters = soup.find_all('span', class_="c-listing-athlete__name")
# Example list of slugs (these normally come from scraping the UFC site or a file)
slugs = []

for fighter in fighters:
    name = fighter.text.strip().lower().replace(" ", "-")
    slugs.append(name)

print("🔍 Slugs to be scraped:")
for slug in slugs:
    print("-", slug)

print(f"📦 Total fighters: {len(slugs)}")

for slug in slugs:
    print(f"🔎 Scraping {slug}...")
    scrape_fighter(slug)
    time.sleep(1)
    