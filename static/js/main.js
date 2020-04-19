import {sendRequest, insertNode, deleteList, popNode, getHead, getNext} from './linkedList.js'
// Renders contents of new page in main view.


document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#toggle-darkmode').onclick = ()  => toggleDarkmode()

    document.querySelector('#insert-node').onclick = ()  => insertNode()

    document.querySelector('#pop-node').onclick = ()  => popNode()

    document.querySelector('#get-head').onclick = ()  => getHead()

    document.querySelector('#get-next').onclick = ()  => getNext()

    document.querySelector('#delete-list').onclick = ()  => deleteList('delete-list')

});