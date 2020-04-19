from flask import Flask, render_template, url_for
from LinkedList import *


app = Flask(__name__)


myList = LinkedList()

@app.route('/')
def index():
    print(myList)
    return render_template("index.html", myList = myList)

@app.route('/insert-node')
def insertNode():
    myList.insertNode(myList.getTail().value + 1 if  myList.head else 0)
    print(myList.json())
    return myList.json()

@app.route('/pop-node')
def popNode():
    myList.pop()
    print(myList.json())
    return myList.json()

@app.route('/get-head')
def getHead():
    myList.current = myList.head
    return myList.json()

@app.route('/get-next')
def getNext():
    myList.selectNext()
    return myList.json()

@app.route('/delete-list')
def deleteList():
    myList.deleteList()
    print(myList.json())
    return myList.json()

if __name__ == "__main__":
    app.run(debug=True)