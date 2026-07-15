import markdown

file_path = r"E:\Pro\embarquesoft-customer-app\Docs\Tenant_Admin_Business_Rules.md"
html_path = r"E:\Pro\embarquesoft-customer-app\Docs\Tenant_Admin_Business_Rules.html"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# Try to use markdown module if available, otherwise do a simple replace
try:
    html_body = markdown.markdown(text)
except NameError:
    # Basic fallback if markdown is not installed (we will try to install it or use it if available)
    html_body = "<p>Markdown module not found. Please install markdown.</p>"

html_content = f"""
<!DOCTYPE html>
<html>
<head>
<style>
  body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #000; }}
  h1 {{ font-size: 24pt; font-weight: bold; margin-bottom: 12pt; }}
  h2 {{ font-size: 18pt; font-weight: bold; margin-top: 24pt; margin-bottom: 10pt; border-bottom: 1px solid #ccc; }}
  h3 {{ font-size: 14pt; font-weight: bold; margin-top: 16pt; margin-bottom: 8pt; }}
  ul {{ margin-bottom: 12pt; }}
  li {{ margin-bottom: 6pt; }}
  p {{ margin-bottom: 12pt; }}
</style>
</head>
<body>
{html_body}
</body>
</html>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Created {html_path}")
