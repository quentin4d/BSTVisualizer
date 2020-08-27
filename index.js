
function createTree(){
    userTree = new BST();
}
class BSTNode {
    constructor(key) {
        this.key = parseFloat(key);
        this.right = null;
        this.left = null;
        this.parent = null;
        this.height = 1;
        this.leftLocation = parseInt(document.body.clientWidth/2)-8;
        this.hasLeft = function () { 
            if (this.left != null) 
                return true;
            else
                return false;
        };
        this.hasRight = function () {
            if (this.right != null) 
                return true;
            else
                return false;
        };
        this.getLeft = function () {
            return this.left;
        };
        this.getRight = function () {
            return this.right;
        };
        this.setParent = function (n) {
            this.parent = n;
        };
        this.getParent = function () {
            return this.parent;
        };
    }
}
class BST {
    constructor() {
        this.nodeList = [];
        this.root = null;
        this.rootTop = 150;
        this.levels = new Array(10);
        this.numKeys = 0;
        this.repositionRight = false;
        this.repositionLeft = false;
        this.i = 0;
        this.j = 0;
        this.isRightChild = false; 
        this.isLeftChild = false;
        this.rightOfRightChild = 0;
        this.leftOfLeftChild = 0;
        this.rightOfLeftChild = 0;
        this.leftOfRightChild = 0;
        this.rootLocation = 350;
        this.rootLeftLocation = 250;
        this.rootRightLocation = 450;
        this.smallestKey = null;
        this.largestKey = null;
        this.getInOrderTraversal = function () { };
        this.inOrderHelper = function (n) { };
        this.getPreOrderTraversal = function () { };
        this.preOrderHelper = function (n) { };
        this.getPostOrderTraversal = function () { };
        this.postOrderHelper = function (n) { };
        this.getLevelOrderTraversal = function () { };
        this.levelOrderHelper = function (n) { };
        this.getDepth = function (n) {
            return this.getDepthHelper(this.root, n.key);
        };
        this.getDepthHelper = function (n, k) {
            if (n.key < k)
                return 1 + this.getDepthHelper(n.right, k);
            else if (n.key > k)
                return 1 + this.getDepthHelper(n.left, k);
            else
                return 0;
        };
        this.getHeight = function () {
            return getHeight(this.root);
        };
        this.getHeight = function (n) {
            if (n == null)
                return 0;
            return 1 + Math.max(this.getHeight(n.left), this.getHeight(n.right));
        };
        this.insert = function (key) {
            if (this.root == null) {
                this.smallestKey = key;
                this.largestKey = key;
            }
            else if (key > this.largestKey) {
                this.largestKey = key;
            }
            else if (key < this.smallestKey) {
                this.smallestKey = key;
            }
            this.root = this.insertHelper(key, this.root);
            this.numKeys++;
        };
        this.insertHelper = function (key, n) {
            if (n == null) {
                var newNode = new BSTNode(key);
                this.nodeList.push(newNode);
                return newNode;
            }
            if (key < n.key) {
                n.left = this.insertHelper(key, n.left);
                n.left.setParent(n);
            }
            else {
                n.right = this.insertHelper(key, n.right);
                n.right.setParent(n);
            }
            return n;
        };
        this.remove = function (key) {
            this.root = this.removeHelper(key, this.root);
            this.numKeys--;
        };
        this.removeHelper = function (key, n) {
            if(n == null)
                return n;
            if (key < n.key)
                n.left = this.removeHelper(key, n.left);
            else if (key > n.key)
                n.right = this.removeHelper(key, n.right);
            else {
                this.nodeList.splice(this.nodeList.indexOf(n), 1);
                for(let i = 0; i < document.body.children.length; i++){
                    if(document.body.children[i].id == key){
                        console.log("REMOVED");
                        document.body.removeChild(document.body.children[i]);
                    }
                }
                if (n.right == null) 
                    return n.left;
                else if (n.left == null)
                    return n.right;
                else {
                    n.key = this.getInOrderPredecessor(n.left);
                    n.left = this.removeHelper(n.key, n.left);
                }
            }
            return n;
        };
        this.getInOrderPredecessor = function (n) {
            while (n.right != null)
                n = n.right;
            return n.key;
        };
        this.contains = function (key) {
            return contains(this.root, key);
        };
        this.contains = function (n, key) {
            if (n == null)
                return false;
            if (n.key < key) { return contains(n.right, key); }
            else if (n.key > key) { return contains(n.left, key); }
            else { return true; }
        };
    }
}
let nodeNum = 0; 
let userTree = null;
async function insertNode(e){
    e.preventDefault();
    //let divBorder = document.createElement("Div"); 
    
    let x = document.getElementById("userInput").value;
    document.getElementById('inputForm').reset();
    if(userTree.nodeList.find(elem => elem.key == x) == undefined){
        userTree.insert(x); 

        var currentNode = userTree.nodeList.find(node => node.key == x);
        
        var currentParent = currentNode.parent;
        
        if(currentParent != null){
            if(currentParent.left == currentNode)   
                (currentNode.leftLocation = currentParent.leftLocation-50);
            if(currentParent.right == currentNode)
                (currentNode.leftLocation = currentParent.leftLocation+50);
        }
        
        currentNode.topLocation = userTree.getDepth(currentNode)*50+userTree.rootTop+25;
        
        if(userTree.nodeList.find(node => node.leftLocation < 0 || node.leftLocation > document.body.clientWidth) != undefined){
            userTree.remove(x)
            alert("OUT OF BOUNDS")
        }else{
            let newDiv = document.createElement("Div");  
            $(newDiv).attr({
                'id': 'Node'+nodeNum++
            }); 
            $(newDiv).css({
                'color': 'black',
                'position': 'absolute', 
                'left': currentNode.leftLocation+'px',
                'top': currentNode.topLocation+'px',
                'height': '20px',  
                'width': '30px',  
                'border': '1px solid green', 
                'border-radius':'50%', 
                'text-align':'center', 
            });
            document.body.appendChild(newDiv);
        

            await checkForCollision(currentNode); 

            for(let i = 0; i < lineNum; i++){//clear all lines before each insertion
                for(let j = 0; j < document.body.children.length; j++){
                    if(document.body.children[j].id == "Line"+i){
                        document.body.removeChild(document.body.children[j]);
                    }
                }
            }
            await addLines(userTree.root)
            
            $(newDiv).append(x); 
            $(this.root).append(this.leftBorder); 
            $(this.root).append(this.rightBorder);
            if(userTree.nodeList.find(node => node.leftLocation < 0 || node.leftLocation > document.body.clientWidth) != undefined){
                for(var i = 0; i < userTree.nodeList.length; i++){
                    userTree.remove(userTree.nodeList[i].key);
                }
                alert("OUT OF BOUNDS")
            }
        }
    }
}

async function recursiveCollisionCheck(root){
    if(root == null) return; 
    recursiveCollisionCheck(root.left)
    await checkForCollision(root);
    recursiveCollisionCheck(root.right)
}
async function checkForCollision(currentNode){
    for(var i = 0; i < userTree.nodeList.length; i++){
        if(currentNode != userTree.nodeList[i] && currentNode.topLocation == userTree.nodeList[i].topLocation && //check for collisions (if at same level and interfering with another node)
            currentNode.leftLocation > userTree.nodeList[i].leftLocation - 32 && currentNode.leftLocation < userTree.nodeList[i].leftLocation + 32){
                console.log(currentNode.key+" COLLISION WITH "+userTree.nodeList[i].key);
                //await fixCollision(currentNode, currentNode.parent);
                await fixCollision(currentNode,  userTree.nodeList[i]);
                await addLines(userTree.root)
        }
    }
}
async function fixCollision(n, collisionNode){ 
    let temp1 = $.extend(true, {}, n);
    let temp2 = $.extend(true, {}, collisionNode);
    while(temp1.parent != temp2.parent){//end up with common parent
        temp1.parent = temp1.parent.parent; 
        temp2.parent = temp2.parent.parent;
    }
    let commonParent = temp1.parent; 
    console.log("COMMON PARENT: "+commonParent.key)
    collision(commonParent)
    // if(n.parent.left == n){//current node is a left child
    //     await leftCollision(commonParent.right)
    //     await recursiveCollisionCheck(commonParent.right);
    // }
    // if(n.parent.right == n){//current node is a right child
    //     await rightCollision(commonParent.left)
    //     await recursiveCollisionCheck(commonParent.left);
    // }
}
async function collision(root){
    if(root == null){
        return;
    }
    await shiftLeft(root.left); 
    await shiftRight(root.right);
    await addLines(userTree.root);
}

async function shiftLeft(root){
    if(root == null){
        return;
    }
    shiftLeft(root.left);
    for(var i = 0; i < userTree.nodeList.length; i++){
        if(userTree.nodeList[i].key == root.key){
            if(parseInt(document.getElementById("Node"+i).style.left)-20 > 0){
                $(document.getElementById('Node'+i)).css({
                    'left': parseInt(document.getElementById("Node"+i).style.left)-20+'px'
                })
                userTree.nodeList[i].leftLocation = parseInt(document.getElementById('Node'+i).style.left);
            }
            await checkForCollision(userTree.nodeList[i]);
            //await addLines(userTree.root);
        }
    }
    shiftLeft(root.right);
}
async function shiftRight(root){
    if(root == null){
        return;
    }
    shiftRight(root.left);
    for(var i = 0; i < userTree.nodeList.length; i++){
        if(userTree.nodeList[i].key == root.key){
            if(parseInt(document.getElementById("Node"+i).style.left)+50 < document.body.clientWidth){
                $(document.getElementById('Node'+i)).css({
                    'left': parseInt(document.getElementById("Node"+i).style.left)+20+'px'
                })
                userTree.nodeList[i].leftLocation = parseInt(document.getElementById('Node'+i).style.left);
            }
            await checkForCollision(userTree.nodeList[i]);
            //await addLines(userTree.root);
        }
    }
    shiftRight(root.right);
}
let lineNum = 0;
async function addLines(root){
    if(root == null){ 
        return;
    }
    await addLines(root.left)
    currentNode = root; 
    currentParent = root.parent; 
    if(currentParent != null){
        dist = Math.sqrt(Math.pow((currentNode.leftLocation - currentParent.leftLocation), 2) + Math.pow((currentNode.topLocation - currentParent.topLocation), 2)); 
        xMid = (currentNode.leftLocation + currentParent.leftLocation+30)/2; 
        yMid = (currentNode.topLocation + currentParent.topLocation+20)/2; 
        slopeInRad = Math.atan2(currentNode.topLocation-currentParent.topLocation, currentNode.leftLocation - currentParent.leftLocation); 
        slopeInDegrees = (slopeInRad*180)/Math.PI; 
        let line = document.createElement("Div");
        line.style.transform = "rotate("+slopeInDegrees+"deg)"; 
        document.body.appendChild(line);
        $(line).attr({
            'id': "Line"+lineNum++
        })
        $(line).css({
            'color': 'black', 
            'width': (dist-30)+'px',
            'top': yMid+'px',
            'left': (xMid - ((dist-30)/2))+'px',
            'position': 'absolute', 
            'border': '1px solid black'
        });
    }
    await addLines(root.right)
}
    