# from sklearn.metrics import accuracy_score,confusion_matrix
# from sklearn.naive_bayes import GaussianNB
# from sklearn.neighbors import KNeighborsClassifier
# from sklearn.linear_model import LogisticRegression
# from sklearn.tree import DecisionTreeClassifier 
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.svm import SVC
# import pandas as pd,numpy as np
# from mlxtend.regressor import StackingCVRegressor
# clf=GaussianNB()
# clf2=KNeighborsClassifier()
# clf3=LogisticRegression()
# clf4=DecisionTreeClassifier()
# clf5=RandomForestClassifier()
# clf6=SVC()
# df=pd.read_csv("anemia data from Kaggle.csv")
# X_train,Y_train=df.iloc[:,:-1],df.iloc[:,-1]
# clf.fit(X_train,Y_train)
# clf2.fit(X_train,Y_train)
# clf3.fit(X_train,Y_train)
# clf4.fit(X_train,Y_train)
# clf5.fit(X_train,Y_train)
# clf6.fit(X_train,Y_train)
# X_test=np.array([[0,9,67,20,20]])
# from sklearn.linear_model import LinearRegression
# xgb=LinearRegression()
# stack=StackingCVRegressor(regressors=(clf,clf2,clf3,clf4,clf5,clf6),
#                          meta_regressor=xgb,cv=12,use_features_in_secondary=True,store_train_meta_features=True,shuffle=False,random_state=42)
# stack.fit(X_train,Y_train)
# pred=stack.predict(X_test)
# import pickle
# pickle.dump(stack,open("GTmodel","wb"))
import numpy as np
X_test=np.array([[0,19,167,20,20]])
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
print(int(pred))