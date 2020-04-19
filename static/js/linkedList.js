import {drawNode, selectNode, toggleDarkmode, pulseNode, eraseNode, eraseAll} from './animation.js'

export function sendRequest(name, callback) {
    const request = new XMLHttpRequest();
    request.open('GET', `/${name}`);
    request.onload = () => {
        const response = JSON.parse(request.responseText);
        callback(response)
                };
    request.send();
}

export function insertNode() {
    sendRequest('insert-node', res => {
        console.log(res)
        document.querySelector('#head').innerHTML = JSON.stringify(res.head.value)
        document.querySelector('#tail').innerHTML = JSON.stringify(res.tail.value)
        document.querySelector('#current').innerHTML = JSON.stringify(res.current != null ? res.current.value : res.current)
        document.querySelector('#previous').innerHTML = JSON.stringify(res.previous != null ? res.previous.value : res.previous)
        document.querySelector('#list-nodes').innerHTML = res.string

        if(res.current != null){
            drawNode(res.current.value)
            selectNode(res.current.value)
        }
    })  
}

export function deleteList() {
    sendRequest('delete-list', res => {
        eraseAll()
        document.querySelector('#head').innerHTML = JSON.stringify(res.head)
        document.querySelector('#tail').innerHTML = JSON.stringify(res.tail)
        document.querySelector('#current').innerHTML = JSON.stringify(res.current)
        document.querySelector('#previous').innerHTML = JSON.stringify(res.previous)
        document.querySelector('#list-nodes').innerHTML = res.string
    })
}




export function popNode() {
    sendRequest('pop-node', res => {
        //modify innerhtml here

        if(res.previous && res.previous.value != null){
            eraseNode(res.previous.value)
            if(res.current){selectNode(res.current.value)}
            console.log(`Popped ${JSON.stringify(res.previous.value)}`)
            document.querySelector('#head').innerHTML = JSON.stringify(res.head ? res.head.value : res.head)
            document.querySelector('#tail').innerHTML = JSON.stringify(res.tail ? res.tail.value : res.tail)
            document.querySelector('#current').innerHTML = JSON.stringify(res.current ? res.current.value : res.current)
            document.querySelector('#previous').innerHTML = JSON.stringify(res.previous ? res.previous.value : res.previous)
            document.querySelector('#list-nodes').innerHTML = res.string
        }
        else {
            console.log('DID NOT POP!')
        }
    })
}


export function getHead() {
    sendRequest('get-head', res => {
        const head = res.head
        console.log('Got the head from python: '+JSON.stringify(head))

        //modify innerhtml
        document.querySelector('#current').innerHTML = JSON.stringify(head)

        //modify svg
        console.log(head.value)
        if(head.value != null){
            selectNode(head.value)
            console.log(`Selected Head:  ${JSON.stringify(head)}`)
        }
        else {
            console.log('DID NOT SELECT HEAD!')
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
        else {
            console.log('CURRENT == NULL!')
        }
    })
}
