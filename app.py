from flask import Flask, jsonify, render_template, request, url_for, session
from LinkedList import *
import os, uuid

app = Flask(__name__)

app.secret_key = os.environ.get('sessionKey')

savedLists = dict()

@app.route('/clear')
def clear():
    session.clear()
    return "Session cleared."

@app.route('/')
def index():
    if 'id' not in session:
        session['id'] = str(uuid.uuid1())
        savedLists[session['id']] = LinkedList()
    else:
        if session['id'] not in savedLists:
            savedLists[session['id']] = LinkedList()
    array = {
        'array': savedLists[session['id']].list()
    }
    return render_template("index.html", myList = json.loads(savedLists[session['id']].json()), array = array)

@app.route('/insert-node')
def insertNode():
    savedLists[session['id']].insertNode(savedLists[session['id']].getTail().value + 1 if savedLists[session['id']].head else 0)
    return savedLists[session['id']].json()

@app.route('/pop-node')
def popNode():
    savedLists[session['id']].pop()
    return savedLists[session['id']].json()

@app.route('/get-head')
def getHead():
    savedLists[session['id']].current = savedLists[session['id']].head
    return savedLists[session['id']].json()

@app.route('/get-next')
def getNext():
    savedLists[session['id']].selectNext()
    return savedLists[session['id']].json()

@app.route('/get-list')
def getList():
    return savedLists[session['id']].json()

@app.route('/delete-list')
def deleteList():
    savedLists[session['id']].deleteList()
    return savedLists[session['id']].json()

@app.route('/modify-list')
def modifyList():
    var = request.args.get('var').split('.') # [previous, next]
    oldvalue = getattr(savedLists[session['id']], var[0]) if len(var) == 1 else getattr(getattr(savedLists[session['id']], var[0]), var[1])
    expr = request.args.get('expr').split('.') # [current, next]

    if expr[0].isnumeric(): #clicking a node will pass in a numeric value to set as current
        selected = savedLists[session['id']].head
        while selected.next and selected.value != int(expr[0]):
            selected = selected.next
        right = selected if selected.value == int(expr[0]) else None
    else:
        right = getattr(savedLists[session['id']], expr[0]) if len(expr) == 1 else getattr(getattr(savedLists[session['id']], expr[0]), expr[1]) # previous OR previous.next
    if(len(var)==1):
        setattr(savedLists[session['id']], var[0], right)
    else:
        setattr(getattr(savedLists[session['id']],var[0]),"next",right)

    result = json.loads(savedLists[session['id']].json())
    result['diff'] = {".".join(var): oldvalue.json() if oldvalue else oldvalue}
    result = json.dumps(result)

    return result
    

if __name__ == "__main__":
    port = int(os.environ.get('PORT',33507))
    app.run(host='0.0.0.0', port=port)