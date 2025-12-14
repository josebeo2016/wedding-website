from PIL import Image
import os
from tqdm import tqdm

def resize_images_in_folder(folder_path):
    os.makedirs(os.path.join(folder_path,'resized'), exist_ok=True)
    files = os.listdir(folder_path)
    for filename in tqdm(files):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif', '.tiff')):
            image_path = os.path.join(folder_path, filename)
            with Image.open(image_path) as img:
                # Calculate new dimensions
                new_dimensions = (int(img.width * 0.9), int(img.height * 0.9))
                # Resize image
                resized_img = img.resize(new_dimensions, Image.LANCZOS)
                # Save resized image
                resized_img.save(os.path.join(folder_path,'resized',filename))
                print(f"Resized {filename} to {new_dimensions}")

# Replace 'your_folder_path' with the path to your folder
resize_images_in_folder('./img/album')
