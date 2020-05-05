#LinkedList

- LinkedList.py contains a custom class written for this demonstration. This flask app uses this LinkedList class to maintain a list which is then rendered in JavaScript using D3.

- Every node has a value and a pointer to the next node.

- Node.Next is null when a node is created. Each Node's next value is represented by an arrow. It is null if not pointed at another node.

- Inserted nodes will automatically be given a value starting with 0 for the List.Head. The new node will be assigned as the value for Node.Next of the list's tail.

- The list instance contains four variables that you may modify: Head, Current, Previous, and Next.
	- Head is automatically set as the first node created in the list and will be labeled with an H.
	- Current will automatically be set to the new node when insterting a node. The Current Node is represented in orange.
	- Previous and Next nodes will remain null unless you change their values. They are represented by "P" and "N", respectively.

- show available vars, then show available values