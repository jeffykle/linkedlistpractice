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
    return myList.json()

@app.route('/pop-node')
def popNode():
    tail = myList.getTail()
    if(myList.head.next is not None):
        myList.pop()
    else:
        myList.deleteList()
        tail = myList.getTail()
    return {"tail": tail.json()}

@app.route('/get-head')
def getHead():
    head = myList.head
    if(head is not None):
        return {"head": head.json()}
    else:
        return {"head": {
            "value": None,
            "next": None
        }}

@app.route('/get-next')
def getNext(val):
    return None #TODO

@app.route('/reset-list')
def resetList():
    myList.deleteList()
    return {"attr": myList.attr(), "current": None}

if __name__ == "__main__":
    app.run(debug=True)