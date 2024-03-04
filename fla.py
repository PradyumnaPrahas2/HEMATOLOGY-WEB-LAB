from flask import Flask
app= Flask(__name__)
@app.route("/table")
def table():
    import random
    import pandas as pd
    import numpy as np
    import pandas as pd
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
    gender=0 if (sys.argv[1]=='MALE') else 1
    hem=sys.argv[2]
    mch=sys.argv[3]
    mchc=sys.argv[4]
    mcv=sys.argv[5]
    L2=[]
    L1=[]
    L1.append(float(gender))
    L1.append(float(hem))
    L1.append(float(mcv))
    L2.append(float(gender))
    L2.append(float(hem))
    L2.append(float(mch))
    L2.append(float(mchc))
    L2.append(float(mcv))
    df=pd.read_csv("anemia data from Kaggle.csv")
    X_train,Y_train=df.iloc[:,[0,1,4]],df.iloc[:,-1]
    X2_train,Y2_train=df.iloc[:,:-1],df.iloc[:,-1]
    clf=GaussianNB()
    clf2=KNeighborsClassifier()
    clf3=LogisticRegression()
    clf4=DecisionTreeClassifier()
    clf5=RandomForestClassifier()
    clf6=SVC()
    clf.fit(X_train,Y_train)
    clf2.fit(X_train,Y_train)
    clf3.fit(X_train,Y_train)
    clf4.fit(X_train,Y_train)
    clf5.fit(X_train,Y_train)
    clf6.fit(X_train,Y_train)
    X_test=np.array([L1])
    # X_test=np.array([(1,10.9,93.2)])
    y_pred = clf.predict(X_test)
    y_pred2 = clf2.predict(X_test)
    y_pred3 = clf3.predict(X_test)
    y_pred4 = clf4.predict(X_test)
    y_pred5 = clf5.predict(X_test)
    y_pred6 = clf6.predict(X_test)
    # print("Evaluated",y_pred)
    # print("Evaluated",y_pred2)
    # print("Evaluated",y_pred3)
    l=[]
    # print("\n\n")
    # print("GNB: ",end='')
    if(y_pred==[1]):
        l.append("ANEMIC")
        # print("ANEMIC")

    else:
        l.append("NON ANEMIC")
        # print("NON ANEMIC")
    # print("KNN: ",end='')
    if(y_pred2==[1]):
        l.append("ANEMIC")
        # print("ANEMIC")

    else:
        l.append("NON ANEMIC")
        # print("NON ANEMIC")
    # print("LR: ",end='')
    if(y_pred3==[1]):
        l.append("ANEMIC")
        # print("ANEMIC")

    else:
        l.append("NON ANEMIC")
        # print("NON ANEMIC")
    # print("DT: ",end='')
    if(y_pred4==[1]):
        l.append("ANEMIC")
        # print("ANEMIC")

    else:
        l.append("NON ANEMIC")
        # print("NON ANEMIC")
    # print("RF: ",end='')
    if(y_pred5==[1]):
        l.append("ANEMIC")
        # print("ANEMIC")

    else:
        l.append("NON ANEMIC")
    #     print("NON ANEMIC")
    # print("SVM: ",end='')
    if(y_pred6==[1]):
        l.append("ANEMIC")
        # print("ANEMIC")

    else:
        l.append("NON ANEMIC")
        # print("NON ANEMIC")
    clf.fit(X2_train,Y2_train)
    clf2.fit(X2_train,Y2_train)
    clf3.fit(X2_train,Y2_train)
    clf4.fit(X2_train,Y2_train)
    clf5.fit(X2_train,Y2_train)
    clf6.fit(X2_train,Y2_train)
    X2_test=np.array([L2])
    # X2_test=np.array([(1,10.9,21,30,93.2)])
    y2_pred = clf.predict(X2_test)
    y2_pred2 = clf2.predict(X2_test)
    y2_pred3 = clf3.predict(X2_test)
    y2_pred4 = clf4.predict(X2_test)
    y2_pred5 = clf5.predict(X2_test)
    y2_pred6 = clf6.predict(X2_test)
    l2=[]
    # print("\n\n")
    # print("GNB: ",end='')
    if(y2_pred==[1]):
        l2.append("ANEMIC")
        # print("ANEMIC")

    else:
        l2.append("NON ANEMIC")
        # print("NON ANEMIC")
    # print("KNN: ",end='')
    if(y2_pred2==[1]):
        l2.append("ANEMIC")
        # print("ANEMIC")

    else:
        l2.append("NON ANEMIC")
        # print("NON ANEMIC")
    # print("LR: ",end='')
    if(y2_pred3==[1]):
        l2.append("ANEMIC")
        # print("ANEMIC")

    else:
        l2.append("NON ANEMIC")
        # print("NON ANEMIC")
    # print("DT: ",end='')
    if(y2_pred4==[1]):
        l2.append("ANEMIC")
        # print("ANEMIC")

    else:
        l2.append("NON ANEMIC")
        # print("NON ANEMIC")
    # print("RF: ",end='')
    if(y2_pred5==[1]):
        l2.append("ANEMIC")
        # print("ANEMIC")

    else:
        l2.append("NON ANEMIC")
    #     print("NON ANEMIC")
    # print("SVM: ",end='')
    if(y2_pred6==[1]):
        l2.append("ANEMIC")
        # print("ANEMIC")

    else:
        l2.append("NON ANEMIC")
        # print("NON ANEMIC")
    return {"GNB":l[0],"KNN":l[1],"LR":l[2],"DT":l[3],"RF":l[4],"SVM":l[5],"GNB2":l2[0],"KNN2":l2[1],"LR2":l2[2],"DT2":l2[3],"RF2":l2[4],"SVM2":l2[5]}
if __name__=='__main__':
    app.run(debug=True)