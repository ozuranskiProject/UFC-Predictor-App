import requests #used for downloading web pages
from bs4 import BeautifulSoup #lets you pick a part said web pages

url = "https://www.ufc.com/athlete/weili-zhang" #!!!use quotes for website

response = requests.get(url) #downloads usable url/page

soup = BeautifulSoup(response.text, 'html.parser') # BeautifulSoup() returns a manipulatable HTML document object
#response.text turns the url in to raw html, and then uses a parser for html ('html.parser') to make the raw html... not... raw? cooked?

name = soup.find('h1', class_="hero-profile__name").text.strip() # .find uses tags to look for and class to look for (you can use inspect to find how a website is structured)
# .text.strip() is needed to take JUST the text and not any HTML junk

stats = soup.find_all('div', class_="c-stat-compare__number")

#for i, item in enumerate(stats):
    #print (f"[{i}] {item.text.strip()}")

#.text.replace("Str. Acc.:", "").strip()
SLpM = stats[0].text.strip() #Sig. Str. Landed Per Min

SApM = stats[1].text.strip() #Sig. Str. Absorbed Per Min

TDAvg = stats[2].text.strip() #Takedown avg Per 15 Min (3 rounds)

subAvg = stats[3].text.strip() #Submission avg Per 15 Min

strDef = stats[4].text.replace("%", "").strip() #Sig. Str. Defense

TDDef = stats[5].text.replace("%", "").strip() #Takedown Defense

KDAvg = stats[6].text.strip() #Knockdown Avg

FTAvg = stats[7].text.strip() #Average fight time


pie_chart_stats = soup.find_all('text', class_="e-chart-circle__percent")

strAcc = pie_chart_stats[0].text.replace("%", "").strip() #Striking accuracy

TDAcc = pie_chart_stats[1].text.replace("%", "").strip() #Takedown Accuracy


img_tag = soup.find('img', class_='hero-profile__image')
img_url = img_tag['src']

wClass = soup.find('p', class_="hero-profile__division-title").text.replace(" Division", "").strip()

record = soup.find('p', class_="hero-profile__division-body").text.replace("(W-L-D)", "").strip()


win_by_stats = soup.find_all('div', class_="c-stat-3bar__value")

wbKO = win_by_stats[3].text.strip()

wbDec = win_by_stats[4].text.strip()

wbSub = win_by_stats[5].text.strip()


age = soup.find('div', class_="field field--name-age field--type-integer field--label-hidden field__item").text.strip()


bio_stats = soup.find_all('div', class_="c-bio__text")

style = bio_stats[3].text.strip()

height = bio_stats[5].text.strip()

reach = bio_stats[8].text.strip()

leg_reach = bio_stats[9].text.strip()

print("Name:", name)

print("Profile_URL:", img_url)

print("Age:", age)

print("Weight Class:", wClass)

print("Style:", style)

print("Height:", height)

print("Record:", record)

print("Reach:", reach)

print("Leg Reach:", reach)

print("Win by KO:", wbKO)

print("Win by dec:", wbDec)

print("Win by sub:", wbSub)

print("SLpM:", SLpM)

print("SApm:", SApM)

print("TDAvg:", TDAvg)

print("subAvg:", subAvg)

print("strDef:", strDef)

print("TDAvg:", TDAvg)

print("TDDef:", TDDef)

print("KDAvg:", KDAvg)

print("FTAvg:", FTAvg)
#
print("strAcc:", strAcc)

print("TDAcc:", TDAcc)