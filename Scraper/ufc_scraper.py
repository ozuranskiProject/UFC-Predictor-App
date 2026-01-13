import requests 
from bs4 import BeautifulSoup 

import json
import os
import sys

# Ensure UTF-8 encoding, as certain special characters in names may (will) cause issues
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    
# Function to scrape fighter data given their slug    
def scrape_fighter(slug):  
    def safe_get(dictionary, key): 

        value = dictionary.get(key)
        return value if value is not None else "N/A"
    
    try:
        url = f"https://www.ufc.com/athlete/{slug}"
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        if response.url.endswith("/404") or "Page Not Found" in soup.text:
            print(f"!!! Page not found for {slug}, skipping.")
            return
        
        name = soup.find('h1', class_="hero-profile__name").text.strip()

# Find all stat blocks
        stats = soup.find_all('div', class_="c-stat-compare__number")

        #dictionary to hold stats with default None values
        fight_stats = {
            "SLpM": None,
            "SApM": None,
            "TDAvg": None,
            "Sub.Avg": None,
            "Str.Def": None,
            "TDDef": None,
            "KDAvg": None,
            "Avg Fight Time": None
        }

        # defines label order (based on site layout)
        labels = list(fight_stats.keys())

        # Loop through and assign values to apt label if present
        for i, stat in enumerate(stats):
            text = stat.text.replace("%", "").strip()
            if i < len(labels):
                fight_stats[labels[i]] = text

        #-Accuracy-
        accuracy_stats = {
            "Str. Acc.": None,
            "TD Acc.": None
        }

        # Find all pie chart stat elements
        pie_chart_stats = soup.find_all('text', class_="e-chart-circle__percent")

        # Define labels in expected order
        labels = list(accuracy_stats.keys())

        for i, stat in enumerate(pie_chart_stats):
            text = stat.text.replace("%", "").strip()
            if i < len(labels):
                accuracy_stats[labels[i]] = text

        #-Image-
        img_tag = soup.find('img', class_='hero-profile__image')

        # Use actual image if available otherwise set to None
        if img_tag and img_tag.get('src'):
            img_url = img_tag['src']
        else:
            img_url = None

        #-Weightclass-
        wClass = soup.find('p', class_="hero-profile__division-title").text.replace(" Division", "").strip()

        #-Record/Win methods-
        record = soup.find('p', class_="hero-profile__division-body").text.replace("(W-L-D)", "").strip()
        wins, losses, draws = record.split('-')

        win_methods = {
            "KO": None,
            "DEC": None,
            "SUB": None
        }

        labels = soup.find_all('div', class_='c-stat-3bar__label')
        values = soup.find_all('div', class_='c-stat-3bar__value')

        for label, value in zip(labels, values):
            label_text = label.text.strip().upper()
            value_text = value.text.strip()

            if "(" in value_text and "%" in value_text:
                percent = value_text.split("(")[-1].split("%")[0].strip()

                if "KO" in label_text:
                    win_methods["KO"] = percent
                elif "DEC" in label_text:
                    win_methods["DEC"] = percent
                elif "SUB" in label_text:
                    win_methods["SUB"] = percent

        #-Style-
        style_stat = soup.find_all('div', class_="c-bio__field c-bio__field--border-bottom-small-screens")

        style_data = {"Fighting Style": None}

        for stat in style_stat:
            text = stat.text.strip()
            if "Fighting style" in text:
                style_data["Fighting style"] = text.split("Fighting style")[-1].strip()

        #-Bio-
        bio_stats = soup.find_all('div', class_="c-bio__field")

        bio_data = {
            "Age": None,
            "Height": None,
            "Reach": None,
            "Leg reach": None,
        }

        for stat in bio_stats:
            text = stat.text.strip()
            if "Age" in text:
                bio_data["Age"] = text.split("Age")[-1].strip()
            elif "Height" in text:
                bio_data["Height"] = text.split("Height")[-1].strip()
            elif "Reach" in text and "Leg" not in text:
                bio_data["Reach"] = text.split("Reach")[-1].strip()
            elif "Leg reach" in text:
                bio_data["Leg reach"] = text.split("Leg reach")[-1].strip()

        #structured json data
        fighter_data = {
            "name": name,
            "profile_url": img_url,
            "weight_class": wClass,
            "record": {
                "wins": wins,
                "losses": losses,
                "draws": draws
            },
            "win_methods": {
                "KO": safe_get(win_methods, "KO"),
                "DEC": safe_get(win_methods, "DEC"),
                "SUB": safe_get(win_methods, "SUB")
            },
            "bio": {
                "age": safe_get(bio_data, "Age"),
                "height": safe_get(bio_data, "Height"),
                "reach": safe_get(bio_data, "Reach"),
                "leg_reach": safe_get(bio_data, "Leg reach"),
                "fighting_style": safe_get(style_data, "Fighting style")
            },
            "fight_stats": {
                "SLpM": safe_get(fight_stats, "SLpM"),
                "SApM": safe_get(fight_stats, "SApM"),
                "TDAvg": safe_get(fight_stats, "TDAvg"),
                "Sub.Avg": safe_get(fight_stats, "Sub.Avg"),
                "Str.Def": safe_get(fight_stats, "Str.Def"),
                "TDDef": safe_get(fight_stats, "TDDef"),
                "KDAvg": safe_get(fight_stats, "KDAvg"),
                "Avg Fight Time": safe_get(fight_stats, "Avg Fight Time"),
                "Str. Acc.": safe_get(accuracy_stats, "Str. Acc."),
                "TD Acc.": safe_get(accuracy_stats, "TD Acc.")
            }
        }

        file_name = slug + ".json"
        file_path = f"scraped_data/{file_name}"

        os.makedirs("scraped_data", exist_ok=True)

        with open(file_path, "w") as f:
            json.dump(fighter_data, f, indent=2)

        print(f"YAY! Scraped: {name} -> saved to {file_path}")

    except Exception as e:
        print(f"XXX Unexpected error scraping {slug}: {e}")