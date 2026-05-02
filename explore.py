import aiohttp
import asyncio
from bs4 import BeautifulSoup

async def explore():
    async with aiohttp.ClientSession() as session:
        # Try a category page
        category_url = 'https://sflearnershub.com/category/blog/salesforce-platform/salesforce-development/'
        print(f'Exploring: {category_url}')
        
        async with session.get(category_url, timeout=aiohttp.ClientTimeout(total=15)) as resp:
            if resp.status == 200:
                html = await resp.text()
                soup = BeautifulSoup(html, 'html.parser')
                
                # Look for article containers
                print('Looking for articles...')
                articles = soup.find_all('article')
                print(f'Found {len(articles)} articles')
                
                if articles:
                    article = articles[0]
                    print('\nFirst article structure:')
                    # Find title
                    title_elem = article.find(['h2', 'h3'])
                    if title_elem:
                        print(f'  Title: {title_elem.get_text(strip=True)[:100]}')
                    
                    # Find links
                    links = article.find_all('a', href=True)
                    print(f'  Links found: {len(links)}')
                    for i, link in enumerate(links[:3]):
                        href = link.get('href')
                        text = link.get_text(strip=True)[:50]
                        print(f'    {i+1}. {text} -> {href}')
                    
                    # Find image
                    img = article.find('img')
                    if img:
                        print(f'  Image: {img.get("src", "")}')
                
                # Look for all post links
                post_urls = []
                for link in soup.find_all('a', href=True):
                    href = link['href']
                    if '/blog/' in href and '/category/' not in href and href.count('/') > 3:
                        post_urls.append(href)
                
                post_urls = list(set(post_urls))
                print(f'\nFound {len(post_urls)} potential post URLs')
                for url in post_urls[:5]:
                    print(f'  {url}')

asyncio.run(explore())

