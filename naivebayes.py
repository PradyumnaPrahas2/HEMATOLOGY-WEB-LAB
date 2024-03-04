import pandas as pd
import numpy as np
# import pandas as pd
# import numpy as np
import sys
import pickle
# from sklearn.metrics import accuracy_score,confusion_matrix
# from sklearn.naive_bayes import GaussianNB
# from sklearn.neighbors import KNeighborsClassifier
# from sklearn.linear_model import LogisticRegression
# from sklearn.tree import DecisionTreeClassifier 
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.svm import SVC
import warnings
warnings.filterwarnings('ignore')
l=[]
gender=0 if (sys.argv[1]=='MALE') else 1
hem=sys.argv[2]
mch=sys.argv[3]
mchc=sys.argv[4]
mcv=sys.argv[5]
model=str(sys.argv[6])
# print(float(gender))
l.append(float(gender))
l.append(float(hem))
l.append(float(mch))
l.append(float(mchc))
l.append(float(mcv))
# df=pd.read_csv("anemia data from Kaggle.csv")
# X_train,Y_train=df.iloc[:,:-1],df.iloc[:,-1]
# print(X_train)
# print(Y_train)
if(model=='GNB'):
    clf=pickle.load(open("GNBmodel","rb"))
elif(model=='KNN'):
    clf=pickle.load(open("KNNmodel","rb"))
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
if(y_pred[0]>=0.5):
    print("ANEMIC")

else:
    print("NON ANEMIC")
