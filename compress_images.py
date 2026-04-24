import os
import glob
from PIL import Image

def compress_images(directory):
    # Encontrar todas las imágenes jpg/jpeg
    search_pattern = os.path.join(directory, "*.jpg")
    files = glob.glob(search_pattern)
    
    if not files:
        print(f"No se encontraron imágenes JPG en {directory}")
        return

    print(f"Encontradas {len(files)} imágenes para comprimir...")
    
    saved_bytes = 0
    max_size = (800, 800)

    for file_path in files:
        try:
            original_size = os.path.getsize(file_path)
            
            with Image.open(file_path) as img:
                # Convertir a RGB por si acaso
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Redimensionar manteniendo la proporción
                img.thumbnail(max_size, Image.Resampling.LANCZOS)
                
                # Crear ruta webp
                base_name = os.path.splitext(file_path)[0]
                webp_path = f"{base_name}.webp"
                
                # Guardar como webp
                img.save(webp_path, "WEBP", quality=80, method=4)
                
                new_size = os.path.getsize(webp_path)
                saved_bytes += (original_size - new_size)
                
            # Eliminar original jpg
            os.remove(file_path)
            print(f"Comprimida: {os.path.basename(file_path)} -> {os.path.basename(webp_path)}")
            
        except Exception as e:
            print(f"Error procesando {file_path}: {e}")

    saved_mb = saved_bytes / (1024 * 1024)
    print(f"\n¡Proceso completado! Se han ahorrado {saved_mb:.2f} MB de espacio en disco.")

if __name__ == "__main__":
    img_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "img", "tienda")
    compress_images(img_dir)
