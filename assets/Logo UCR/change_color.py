# Script hecho con IA para cambiar los pixeles de un PNG a otro color

import cv2
import numpy as np

# Cargar imagen con alpha
im = cv2.imread('image.png', cv2.IMREAD_UNCHANGED)

# Separar canales
b, g, r, a = cv2.split(im)

# Color HEX #1C0F13 en BGR
new_color = (184, 129, 53)

# Crear máscara de píxeles no transparentes
mask = a > 0

# Aplicar color solo donde no es transparente
b[mask] = new_color[0]
g[mask] = new_color[1]
r[mask] = new_color[2]

# Recombinar imagen
result = cv2.merge((b, g, r, a))

cv2.imwrite('result2.png', result)
