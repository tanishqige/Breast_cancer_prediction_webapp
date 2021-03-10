import warnings
# ignore all future warnings
warnings.simplefilter(action='ignore', category=FutureWarning)
warnings.filterwarnings("ignore")


import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
#from sklearn.preprocessing import StandardScaler
#from sklearn.metrics import classification_report, confusion_matrix


data=pd.read_csv(r'F:\lp2_modified\lp2\data.csv')

data=data.fillna(data.mean())

X = data.drop('diagnosis', axis=1)
Y = data.get('diagnosis')

#X.fillna(x.mean())
#Y.fillna(y.mean())
#X=float(X)
#Y=float(Y)

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.25, random_state=42)
#clf = SVC(kernel='rbf',C=1,tol=0.001)
#clf.fit(X_train,Y_train)
clf = DecisionTreeClassifier(criterion = 'entropy',splitter = 'best')
clf.fit(X_train,Y_train)
accu=clf.score(X_train,Y_train)
accu1=clf.score(X_test,Y_test)

datatest=pd.read_csv(r'F:\lp2_modified\lp2\list.csv')
newpre=clf.predict(datatest)

if newpre == 1:
    print("Positive")
else:
    print("Negative")