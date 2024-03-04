import os
 
# File name
file = '_3_6498.jpeg'
 
# File location
location = r'uploads/'
 
# Path
path = os.path.join(location, file)
 
# Remove the file
# 'file.txt'
os.remove(path)