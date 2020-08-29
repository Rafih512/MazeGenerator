var cols,  rows; //Declaring the global Variables
var w = 40; //size of each cell
var grid = []; //to store all the cell objects
var stack = [];

function windowResized() {
//	console.log('resized')
	resizeCanvas(600, 600);
}


function setup() {
let cnv = createCanvas(600, 600);
cnv.position(650, 250);
	cols = floor(width/w); //number of columns
	rows = floor(height/w); //number of rows
	//frameRate (10000000000)

	//creating all the cells

	for(var j= 0; j <rows; j++) {
	 	for (var i = 0; i< cols; i++){
			var cell = new Cell(i,j);
			grid.push(cell); //This measns make all the cell objects
			//and push them into the grid

		}

	}
	current = grid[0];

}

function draw() {
	background(51);
	//looping through all the cells and actually showing it in the draw
	for (var i=0; i< grid.length; i++){
		grid[i].show();
	}

	current.visited = true;
	current.highlight();
//STEP 1
var next = 	current.checkNeighbors(); //next cell
if (next){
	next.visted = true;
	//STEP 2
	stack.push(current);
	//STEP 3
	removewalls(current,next);

	//STEP 4
	current = next; //going to the next cell basically
} else if (stack.length > 0){
	current = stack.pop();
	}

}


function index(i,j){
	//edge cases
	if(i < 0 || j<0 || i> cols -1 || j > rows-1){
		return -1;
	}
	return i + j * cols;
}


// Constructor fucntion for the cell

function Cell(i,j){

	this.i = i;  //coloumn number
	this.j = j;  //row number
	this.walls = [true, true, true, true]; //boolean statement for the walls
	//of the the maze
	//Each boolean fucntion corresponds to a wall.
	//Top,Right, Bottom, Left
	this.visited = false;
	//this fucntion is to check the visited/unvisted neighbors
	this.checkNeighbors = function(){
		var neighbors = [];

		var top = grid[index(i, j-1)];
		var right = grid[index(i+1,j)];
		var bottom = grid[index(i,j+1)];
		var left = grid[index(i-1,j)];

		if (top && !top.visited){
			neighbors.push(top);
		}
		if (right && !right.visited){
			neighbors.push(right);
		}
		if (bottom && !bottom.visited){
			neighbors.push(bottom);
		}
		if (left && !left.visited){
			neighbors.push(left);
		}
		if (neighbors.length > 0){ //if neighbours is more than 0
			var r =floor(random(0, neighbors.length)); //this will pick a random neighbors to visit
			return neighbors[r];
		}else{
			return undefined;
		}


	}
//to highlight the current cell that is traversing on
	this.highlight = function(){
		var x = this.i*w;
		var y = this.j*w;
		noStroke();
		fill(190,2,6,200);
		rect(x,y,w,w);


	}



	var current; //This variable is the current cell that is being visited

//finding the location of the cell
	this.show = function(){
		var x = this.i*w; //finding the x coordinate
		var y = this.j*w; //finding the y coordinate
		stroke(255);
		if (this.walls[0]){ //top wall
			line(x  ,y  , x+w, y); //grid lines
		}

		if (this.walls[1]){ //right wall
			line(x+w,y  , x+w, y+w); //grid lines
		}
			if (this.walls[2]){ //bottom wall
			line(x+w,y+w, x  , y+w); //grid lines
		}
			if (this.walls[3]){ //left walll
				line(x  ,y+w, x  , y); //grid lines
			}
			//this just changes colour for every visted cell
		if (this.visited) {
			noStroke();
			fill(253, 190, 191, 100);
			rect(x,y,w,w); //drawing a square at the x y coordinate
			}
	}



}




// Read notes for this function functionality

function removewalls (a,b){

	var x = a.i - b.i;
	if(x === 1 ){
		a.walls[3] = false ;//left wall being removed
		b.walls[1] = false; //right wall being removed

	} else if (x === -1){
		a.walls[1]= false;
		b.walls[3] = false;
	}
	var y = a.j - b.j;
	if(y === 1 ){
		a.walls[0] = false ;//top wall being removed
		b.walls[2] = false; //bottom wall being removed

	} else if (y === -1){
		a.walls[2]= false;
		b.walls[0] = false;
	}

}
