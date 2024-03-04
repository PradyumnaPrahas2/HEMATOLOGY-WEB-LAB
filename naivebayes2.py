import pandas as pd
import pickle
import numpy as np
import sys
from sklearn.metrics import accuracy_score,confusion_matrix
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier 
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
import warnings
warnings.filterwarnings('ignore')
l=[]
hem=sys.argv[1]
mch=sys.argv[2]
mcv=sys.argv[3]
model=str(sys.argv[4])
# print(float(gender))
l.append(float(hem))
l.append(float(mch))
l.append(float(mcv))
# print(X_train)
# print(Y_train)
if(model=='GNB'):
    clf=GaussianNB()
elif(model=='KNN'):
    clf=KNeighborsClassifier()
elif(model=='LR'):
    clf=pickle.load(open("LRmodel","rb"))
elif(model=='DT'):
    clf=pickle.load(open("DTmodel","rb"))
elif(model=='RF'):
    clf=pickle.load(open("RFmodel","rb"))
elif(model=='SVM'):
    clf=pickle.load(open("SVMmodel","rb"))
# X_test=np.array([(gender,hem,mch,mchc,mcv)])
X_test=np.array([l])
y_pred = clf.predict(X_test)
# print(y-pred)
if(y_pred==[1]):
    print("ANEMIC")

else:
    print("NON ANEMIC")
