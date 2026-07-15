import os
from PIL import Image, ImageOps

def make_transparent(img_path):
    print(f"Processing: {img_path}")
    try:
        img = Image.open(img_path)
        img = img.convert("RGBA")
        
        datas = img.getdata()
        newData = []
        
        # We will make pixels close to pure white transparent
        # Threshold: if R, G, B are all above 240
        for item in datas:
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                # Make it transparent
                # Calculate simple alpha scale to smooth edges if wanted,
                # but simple zero alpha works well for solid backgrounds
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
                
        img.putdata(newData)
        img.save(img_path, "PNG")
        print(f"Success: {img_path}")
    except Exception as e:
        print(f"Error processing {img_path}: {e}")

if __name__ == "__main__":
    images_dir = r"e:\Pro\embarquesoft-customer-app\public\images"
    files = [
        "locations.png",
        "invoices.png",
        "pickup.png",
        "claim.png",
        "shipto.png",
        "nav_home.png",
        "nav_pickup.png",
        "nav_profile.png",
        "hdr_bell.png",
        "hdr_whatsapp.png",
        "hdr_contact.png",
        "prof_user.png",
        "prof_lock.png",
        "prof_logout.png"
    ]
    for file in files:
        full_path = os.path.join(images_dir, file)
        if os.path.exists(full_path):
            make_transparent(full_path)
        else:
            print(f"File not found: {full_path}")
