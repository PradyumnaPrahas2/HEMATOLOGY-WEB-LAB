# import pandas as pd
import numpy as np
import pandas as pd
# import numpy as np
import sys
# from sklearn.metrics import accuracy_score,confusion_matrix
# from sklearn.naive_bayes import GaussianNB
# from sklearn.neighbors import KNeighborsClassifier
# from sklearn.linear_model import LogisticRegression
# from sklearn.tree import DecisionTreeClassifier 
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.svm import SVC
import warnings
warnings.filterwarnings('ignore')
l2=[]
gender=0 if (sys.argv[1]=='MALE') else 1
hem=sys.argv[2]
mch=sys.argv[3]
mchc=sys.argv[4]
mcv=sys.argv[5]
model=str(sys.argv[6])
# print(float(gender))
l2.append(float(gender))
l2.append(float(hem))
l2.append(float(mch))
l2.append(float(mchc))
l2.append(float(mcv))
# df=pd.read_csv("anemia data from Kaggle.csv")
# X_train,Y_train=df.iloc[:,:-1],df.iloc[:,-1]
# print(X_train)
# print(Y_train)
# clf=GaussianNB()
# clf2=KNeighborsClassifier()
# clf3=LogisticRegression()
# clf4=DecisionTreeClassifier()
# clf5=RandomForestClassifier()
# clf6=SVC()
# clf.fit(X_train,Y_train)
# clf2.fit(X_train,Y_train)
# clf3.fit(X_train,Y_train)
# clf4.fit(X_train,Y_train)
# clf5.fit(X_train,Y_train)
# clf6.fit(X_train,Y_train)
# X_test=np.array([(1,13.1,86.5)])
X_test=np.array([l2])
# y_pred = clf.predict(X_test)
# y_pred2 = clf2.predict(X_test)
# y_pred3 = clf3.predict(X_test)
# y_pred4 = clf4.predict(X_test)
# y_pred5 = clf5.predict(X_test)
# y_pred6 = clf6.predict(X_test)
# print("Evaluated",y_pred)
# print("Evaluated",y_pred2)
# print("Evaluated",y_pred3)
import pickle 
stack=pickle.load(open("GTmodel","rb"))
pred=stack.predict(X_test)
for i in pred:
    if(i>0.4):
        print('ANEMIC')
    else:
        print('NON ANEMIC')
