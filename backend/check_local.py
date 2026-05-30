import requests

r = requests.get("http://localhost:8000/api/blogs")
data = r.json()
print("Total posts:", data.get("total", len(data.get("items", []))))
for p in data.get("items", []):
    print(f"  - [{p['difficulty']}] {p['slug']}: {p['title']}")
