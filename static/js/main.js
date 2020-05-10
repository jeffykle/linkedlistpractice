import {sendRequest, insertNode, deleteList, popNode, getHead, getNext, getListVars, sendCall} from './linkedList.js'
import {redrawList, toggleDarkmode, openContructControls, openModifyControls, backspaceCall} from './animation.js'

document.addEventListener('DOMContentLoaded', () => {

    true && toggleDarkmode()

	myList.current && redrawList(myList.current.value)

    document.querySelector('#construct-list').onclick = ()  => openContructControls()

    document.querySelector('#modify-list').onclick = ()  => {
    	getListVars()
    	openModifyControls()
    }

    document.querySelector('#insert-node').onclick = ()  => insertNode()

    document.querySelector('#pop-node').onclick = ()  => popNode()

    document.querySelector('#get-head').onclick = ()  => getHead()

    document.querySelector('#get-next').onclick = ()  => getNext()

    document.querySelector('#delete-list').onclick = ()  => deleteList('delete-list')

    document.querySelector('#toggle-darkmode').onclick = ()  => toggleDarkmode()

    document.querySelector("#cancel-call").onclick = () => backspaceCall()

    document.querySelector("#confirm-call").onclick = () => {
        const statementVar = document.querySelector("#statement-var").attributes.value.value
        const statementExpr = document.querySelector("#statement-expr").attributes.value.value
        sendCall(statementVar, statementExpr)
    }

});