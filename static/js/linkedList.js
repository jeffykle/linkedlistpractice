import {drawNode, selectNode, toggleDarkmode, pulseNode, 
    eraseNode, eraseAll, resetMatrixButtons, resetCall, 
    addToExpression, changeLabel, addToHistory, updateAttributes, changePointer} from './animation.js'

export function sendRequest(name, callback, ...args) {
    const request = new XMLHttpRequest();
    if(args.length == 0 ){
        request.open('GET', `/${name}`);
    } else {
    request.open('GET', `/${name}?var=${args[0]}&expr=${args[1]}`);
    }
    request.onload = () => {
        const response = JSON.parse(request.responseText);
        callback(response)
    };
    request.send();
}

export function insertNode() {
    sendRequest('insert-node', res => {
        updateAttributes(res)
        if(res.current != null){
            drawNode(res.current.value)
            selectNode(res.current.value)
            document.querySelector(`#Node-${res.current.value}`).onclick = () => setClickedCurrent(res.current.value)
        }
    })  
}

export function deleteList() {
    sendRequest('delete-list', res => {
        eraseAll()
        updateAttributes(res) 
    })
}

export function popNode() {
    sendRequest('get-list', res => {
        console.log(JSON.stringify(res,null,'\t'))
        eraseNode(res.tail.value) })
    sendRequest('pop-node', res => {
        updateAttributes(res) 
    })
}

export function getHead() {
    sendRequest('get-head', res => {
        const head = res.head
        updateAttributes(res) 

        if(head && head.value != null){
            selectNode(head.value)
        }
    })
};

export function getNext() {
    sendRequest('get-next', res => {
        updateAttributes(res) 
        if(res.current != null){
            selectNode(res.current.value)
        }
    })
}

export function getListVars() {
    sendRequest('get-list', res =>{
        const availableVars = [["Current", res.current], 
                            ["Previous", res.previous], 
                            ["Next", res.next],
                            ["Head", res.head]]

        availableVars.forEach((v, i) => {
            const row = i+1
            const label = v[0]
            const value = v[1] && v[1]['value'].toString()
            const btn = document.querySelector(`#var${row}-1`)

            btn.innerHTML = `${label}: ${value}`
            btn.onclick = event => {
                // First reset the other buttons
                resetMatrixButtons(event)
                document.querySelector(`#var${row}-2`).innerHTML = label
                document.querySelector(`#var${row}-2`).value = label.toLowerCase()
                document.querySelector(`#var${row}-2`).onclick = event => addToExpression(event)
                document.querySelector(`#var${row}-3`).innerHTML = value && label+'.Next'
                document.querySelector(`#var${row}-3`).value = value && label.toLowerCase()+'.next'
                document.querySelector(`#var${row}-3`).onclick = event => addToExpression(event)
            }
        })
    })
}

export function sendCall(statementVar, statementExpr) {
    sendRequest('modify-list', res => {
        console.log(JSON.stringify(res,null,'\t'))
        resetCall()
        getListVars(res)
        addToHistory(statementVar, statementExpr)
        updateAttributes(res) 
        Object.keys(res.diff).forEach( diff => {
            switch (diff) {
                case 'current':
                    res.current && selectNode(res.current.value)
                    break;
                case 'previous':
                    res.previous && changeLabel(res.previous.value,"P")
                    break;
                case 'next':
                    res.next && changeLabel(res.next.value,"N")
                    break;
                case 'head':
                    res.head && changeLabel(res.head.value,"H")
                    break;
                case diff.split('.')[0]+'.next':
                    const newNext = res[diff.split('.')[0]].next//res.current.next
                    const nodeValToChange = res[diff.split('.')[0]].value
                    console.log(`Change an arrow pointer now for  ${diff}`)
                    console.log(`Point ${nodeValToChange} to ${newNext}`)
                    changePointer(nodeValToChange,newNext)
                    break;
                default:
                    // Nothing to change
                    break;
            }
        })
    },
    statementVar, statementExpr)
}

export function setClickedCurrent(val) {
    const statementVar = "current"
    const statementExpr = val
    sendCall(statementVar, statementExpr) 
}
