from selenium import webdriver                                   #Lets you control web browser
from selenium.webdriver.common.by import By                      #How selenium located elements
from selenium.webdriver.support.ui import WebDriverWait          #Lets you add explicit waits
from selenium.webdriver.support import expected_conditions as EC #ig lets you specify those waits in this case, like conditions
from ufc_scraper import scrape_fighter
import time
import sys
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    
options = webdriver.ChromeOptions() #creates options to let you configure browser
options.add_argument('--headless') #do all ts behind the scenes as opposed to simulating browser on pc
driver = webdriver.Chrome(options=options) #starts browser with options
driver.get("https://www.ufc.com/athletes/all") 
wait = WebDriverWait(driver, 10) #wait ten seconfs for conditions

prev_count = 0
retry_attempts = 0
clicks = 0
MAX_RETRIES = 3 #sometimes you just need to retry so ive found so allowing up to 3 times
MAX_TOTAL_CLICKS = 300  # prevent infinite loops

while retry_attempts < MAX_RETRIES and clicks < MAX_TOTAL_CLICKS:
    try:
        load_more = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, 'a.button[title="Load more items"]')))
        #find and wait until "Load more items" button can be clicked
        driver.execute_script("arguments[0].scrollIntoView(true);", load_more) #scroll until the button is in browser frame
        driver.execute_script("arguments[0].click();", load_more) #click dat shit baby
        print(f"Clicked 'Load More' ({clicks + 1})") #track dat shit baby
        clicks += 1

        # Wait for new fighters
        for _ in range(8):  # give it 8 chances over 8 seconds
            time.sleep(1)
            fighters = driver.find_elements(By.CLASS_NAME, "c-listing-athlete__name") #find fighter names on website
            if len(fighters) > prev_count: #basically checks if we are getting more fighters after attempting to load more, if not, stop dat shit baby
                prev_count = len(fighters)
                retry_attempts = 0  # reset retry counter
                break
        else:
            print("oops No new fighters loaded, retrying...")
            retry_attempts += 1

    except Exception as e:
        print(f"Done loading (or fatal error): {e}")
        break

slugs = list({f.text.strip().lower().replace(" ", "-") for f in driver.find_elements(By.CLASS_NAME, "c-listing-athlete__name")})
#take and format all gotten figher names
print(f"\n Final total: {len(slugs)} fighters found.\n")

# plug in every slug and scrape their infor using the function i wrote and imported
for slug in slugs:
    print(f" \nScraping {slug}...")
    try:
        scrape_fighter(slug)
        time.sleep(1)
    except Exception as e:
        print(f"X Error scraping {slug}: {e}")

driver.quit()
