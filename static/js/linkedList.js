import {drawNode, selectNode, toggleDarkmode, pulseNode, 
    eraseNode, eraseAll, resetMatrixButtons, resetCall, 
    addToExpression, changeHead, addToHistory, updateAttributes} from './animation.js'

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
        console.log(typeof res.string)
        console.log(res.string)
        updateAttributes(res, ['head','tail','current','previous','list-nodes']) 
        // document.querySelector('#head').innerHTML = JSON.stringify(res.head.value)
        // document.querySelector('#tail').innerHTML = JSON.stringify(res.tail.value)
        // document.querySelector('#current').innerHTML = JSON.stringify(res.current)
        // document.querySelector('#previous').innerHTML = JSON.stringify(res.previous)
        // document.querySelector('#list-nodes').innerHTML = res.string

        if(res.current != null){
            drawNode(res.current.value)
            selectNode(res.current.value)
        }
    })  
}

export function deleteList() {
    sendRequest('delete-list', res => {
        eraseAll()
        updateAttributes(res, ['head','tail','current','previous','list-nodes']) 
        // document.querySelector('#head').innerHTML = JSON.stringify(res.head)
        // document.querySelector('#tail').innerHTML = JSON.stringify(res.tail)
        // document.querySelector('#current').innerHTML = JSON.stringify(res.current)
        // document.querySelector('#previous').innerHTML = JSON.stringify(res.previous)
        // document.querySelector('#list-nodes').innerHTML = res.string
    })
}

export function popNode() {
    sendRequest('get-list', res => eraseNode(res.tail.value) )
    sendRequest('pop-node', res => {
        updateAttributes(res, ['head','tail','current','previous','list-nodes']) 
        
            // document.querySelector('#head').innerHTML = JSON.stringify(res.head ? res.head.value : res.head)
            // document.querySelector('#tail').innerHTML = JSON.stringify(res.tail ? res.tail.value : res.tail)
            // document.querySelector('#current').innerHTML = JSON.stringify(res.current ? res.current.value : res.current)
            // document.querySelector('#previous').innerHTML = JSON.stringify(res.previous ? res.previous.value : res.previous)
            // document.querySelector('#list-nodes').innerHTML = res.string
    })
}

export function getHead() {
    sendRequest('get-head', res => {
        const head = res.head
        updateAttributes(res, ['head','current']) 

        if(head && head.value != null){
            selectNode(head.value)
            console.log(`Selected Head:  ${JSON.stringify(head)}`)
        }
    })
};

export function getNext() {
    sendRequest('get-next', res => {
        //modify innerhtml
        document.querySelector('#current').innerHTML = JSON.stringify(res.current)
        document.querySelector('#previous').innerHTML = JSON.stringify(res.previous)

        //modify svg
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
        resetCall()
        addToHistory(statementVar, statementExpr)
        updateAttributes(res, ['head','tail','current','previous','list-nodes']) 
        Object.keys(res).forEach( diff => {
            // console.log("Updating graphics for "+diff)
            console.log(diff.split('.')[0]+'.next')
            switch (diff) {
                case 'current':
                    selectNode(res.current.value)
                    break;
                case 'previous':
                    // set "P" label
                    break;
                case 'next':
                    // change arrow pointer
                    break;
                case 'head':
                    changeHead(res.head.value)
                    break;
                case diff.split('.')[0]+'.next':
                    console.log("Change an arrow pointer now")
                    break;
                default:
                    // statements_def
                    break;
            }
        })

    },
    statementVar, statementExpr)

}
