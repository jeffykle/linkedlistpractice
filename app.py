from flask import Flask, jsonify, render_template, request, url_for, session
from flask_session import Session
from LinkedList import *
import os


app = Flask(__name__)

app.secret_key = os.environ.get('sessionKey')



myList = LinkedList()

@app.route('/')
def index():
    array = {
        'array': myList.list()
    }
    # if session['myList'] is not None:
    #     session['myList'] = LinkedList()

    # print(session)
    print('Page reloaded.', flush=True)
    return render_template("index.html", myList = json.loads(myList.json()), array = array)

@app.route('/insert-node')
def insertNode():
    myList.insertNode(myList.getTail().value + 1 if myList.head else 0)
    print('Node inserted', flush=True)
    return myList.json()

@app.route('/pop-node')
def popNode():
    myList.pop()
    return myList.json()

@app.route('/get-head')
def getHead():
    myList.current = myList.head
    return myList.json()

@app.route('/get-next')
def getNext():
    myList.selectNext()
    return myList.json()

@app.route('/get-list')
def getList():
    return myList.json()

@app.route('/delete-list')
def deleteList():
    myList.deleteList()
    return myList.json()

@app.route('/modify-list')
def modifyList():
    var = request.args.get('var').split('.') # [previous, next]
    oldvalue = getattr(myList, var[0]) if len(var) == 1 else getattr(getattr(myList, var[0]), var[1])
    
    expr = request.args.get('expr').split('.') # [current, next]
    print(".".join(var)+" = "+".".join(expr))
    if expr[0].isnumeric(): #clicking a node will pass in a numeric value to set as current
        selected = myList.head
        while selected.value != int(expr[0]):
            selected = selected.next
        right = selected
    else:
        right = getattr(myList, expr[0]) if len(expr) == 1 else getattr(getattr(myList, expr[0]), expr[1]) # previous OR previous.next
    if(len(var)==1):
        setattr(myList, var[0], right)
    else:
        setattr(getattr(myList,var[0]),"next",right)

    result = json.loads(myList.json())
    result['diff'] = {".".join(var): oldvalue.json() if oldvalue else oldvalue}
    result = json.dumps(result)
    
    return result
    

if __name__ == "__main__":
    port = int(os.environ.get('PORT',33507))
    app.run(host='0.0.0.0', port=port)