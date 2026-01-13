from playwright.sync_api import sync_playwright
from ufc_scraper import scrape_fighter
import sys
import time

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

def test_playwright_scraper():
    fighter_slug = "conor-mcgregor"
    
    print("Initializing Playwright...")
    with sync_playwright() as p:
        print("Launching browser...")
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        print(f"Navigating to fighter page: {fighter_slug}")
        start_time = time.time()
        page.goto(f"https://www.ufc.com/athlete/{fighter_slug}")
        
        print("Waiting for page to load...")
        page.wait_for_load_state("networkidle")
        load_time = time.time() - start_time
        print(f"Page loaded in {load_time:.2f} seconds")
        
        print(f"Verifying dynamic content is present...")
        try:
            page.locator(".hero-profile__name").wait_for(timeout=5000)
            print("Dynamic content confirmed loaded")
        except Exception as e:
            print(f"Warning: Could not verify dynamic content: {e}")
        
        browser.close()
        print("Browser closed")
    
    print(f"\nNow scraping {fighter_slug} using existing BeautifulSoup scraper...")
    try:
        scrape_fighter(fighter_slug)
        print(f"\n✓ Successfully scraped {fighter_slug}")
        print(f"Check scraped_data/{fighter_slug}.json for output")
    except Exception as e:
        print(f"\n✗ Error scraping {fighter_slug}: {e}")

if __name__ == "__main__":
    test_playwright_scraper()
