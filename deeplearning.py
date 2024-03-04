import warnings
warnings.filterwarnings('ignore')
import pickle
import tensorflow as tf
import matplotlib.pyplot as plt
import cv2
import os
import sys
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.preprocessing import image
import matplotlib.pyplot as plt
x=sys.argv[1]
x=str(x)
clone_model=pickle.load(open("dlmodel","rb"))
dir_path=r'uploads/'+x
img=image.load_img(dir_path,target_size=(200,200,3))
plt.imshow(img)
X=image.img_to_array(img)
X=np.expand_dims(X,axis=0)
images=np.vstack([X])
ans=clone_model.predict(images,verbose=0)
if(ans[0]<0.5):
    print("EOSINOPHIL")
else:
    print("NEUTROPHIL") 
# File name
file = str(x)
 
# File location
location = r'uploads/'
 
# Path
path = os.path.join(location, file)
 
# Remove the file
# 'file.txt'
os.remove(path)
