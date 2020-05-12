# LinkedList

## Purpose

- The original goal of this project was to create an interactive linked list, that could be used to practice actions such as reversing the list. Try building a list, then reversing it!

## Description

- LinkedList.py contains a custom class written for this demonstration. This flask app uses this LinkedList class to maintain a list which is then rendered in JavaScript using D3.

- Every node has a value and a pointer to the next node.

- Node.Next is null when a node is created. Each Node's next value is represented by an arrow. It is null if not pointed at another node.

- Inserted nodes will automatically be given a value starting with 0 for the List.Head. The new node will be assigned as the value for Node.Next of the list's tail.

- The list instance contains four variables that you may modify, as well as each of their "Next" attribute: Head, Current, Previous, and Next.
	- Head is automatically set as the first node created in the list and will be labeled with an H.
	- Current will automatically be set to the new node when insterting a node. The Current Node is represented in orange.
	- Previous and Next nodes will remain null unless you change their values. They are represented by "P" and "N", respectively.

- The app uses async Javascript requests to the Flask server to modify the list in Python and retrieve JSON data about the list.

## Caveats

- This is a self-made work in progress.There may be unexpected consequences of the visual behavior when changing pointers on the list. If you get stuck working with a list, you can always delete it to start over.

- Refreshing the page will try to re-render the list, but may not display all nodes that had been created if the pointers have been modified.