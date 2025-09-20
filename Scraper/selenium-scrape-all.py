from selenium import webdriver                                   
from selenium.webdriver.common.by import By                      
from selenium.webdriver.support.ui import WebDriverWait          
from selenium.webdriver.support import expected_conditions as EC 
from ufc_scraper import scrape_fighter
import time
import sys

# Ensure UTF-8 encoding, as certain special characters in names may (will) cause issues
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    
options = webdriver.ChromeOptions() 
options.add_argument('--headless') #do all behind the scenes as opposed to simulating browser on pc, I ran into issues with this so I disabled it
driver = webdriver.Chrome(options=options) 
driver.get("https://www.ufc.com/athletes/all") 
wait = WebDriverWait(driver, 10) 

prev_count = 0
retry_attempts = 0
clicks = 0
MAX_RETRIES = 3 
MAX_TOTAL_CLICKS = 300  

while retry_attempts < MAX_RETRIES and clicks < MAX_TOTAL_CLICKS:
    try:
        load_more = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, 'a.button[title="Load more items"]')))
        driver.execute_script("arguments[0].scrollIntoView(true);", load_more) 
        driver.execute_script("arguments[0].click();", load_more) 
        print(f"Clicked 'Load More' ({clicks + 1})") 
        clicks += 1

        for _ in range(8):  
            time.sleep(1)
            fighters = driver.find_elements(By.CLASS_NAME, "c-listing-athlete__name") 
            if len(fighters) > prev_count: 
                prev_count = len(fighters)
                retry_attempts = 0 
                break
        else:
            print("oops No new fighters loaded, retrying...")
            retry_attempts += 1

    except Exception as e:
        print(f"Done loading (or fatal error): {e}")
        break

slugs = list({f.text.strip().lower().replace(" ", "-") for f in driver.find_elements(By.CLASS_NAME, "c-listing-athlete__name")})

print(f"\n Final total: {len(slugs)} fighters found.\n") # debug

# plug in every slug and scrape their infor using the function i wrote and imported
for slug in slugs:
    print(f" \nScraping {slug}...")
    try:
        scrape_fighter(slug)
        time.sleep(1)
    except Exception as e:
        print(f"X Error scraping {slug}: {e}")

driver.quit()
