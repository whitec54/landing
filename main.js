
var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
x = w.innerWidth || e.clientWidth || g.clientWidth,
y = w.innerHeight|| e.clientHeight|| g.clientHeight;

var width = x,
height = y;

var nodes = [{id:0}]
foci=[{x:width*(1/5),y:(height*.26)},{x:width*(1/5),y:(height*.73)},{x:width*.12,y:(height*.4)},{x:width*.12,y:(height*.6)},{x:width*.12,y:(height*.5)},{x:.16*width,y:height*.28},{x:.16*width,y:height*.72},{x:.25*width,y:height*.25},{x:.25*width,y:height*.75},{x:.745*width,y:height*.3},{x:.895*width,y:height*.3},{x:.82*width,y:.6*height},{x:.77*width,y:.75*height},{x:.87*width,y:.75*height},{x:.795*width,y:.675*height},{x:.845*width,y:.675*height},{x:.895*width,y:.4*height},{x:.745*width,y:.4*height},{x:1000,y:1000},{x:.75*width,y:.5*height},{x:.89*width,y:.5*height},{x:.755*width,y:.62*height},{x:.875*width,y:.62*height},{x:-1000,y:-1000},{x:-1000,y:1000},{x:1000,y:-1000},{x:1000,y:1000},{x:-1000,y:-1000},{x:-1000,y:1000},{x:1000,y:-1000},{x:-1000,y:-1000},{x:-1000,y:1000},{x:1000,y:-1000},{x:-1000,y:-1000},{x:-1000,y:1000},{x:1000,y:-1000},{x:-1000,y:-1000},{x:-1000,y:1000},{x:1000,y:-1000},{x:1000,y:1000},{x:1000,y:1000},{x:1000,y:1000},{x:-1000,y:-1000},{x:-1000,y:1000},{x:1000,y:-1000},{x:1000,y:1000},{x:-1000,y:-1000},{x:-1000,y:1000},{x:1000,y:-1000},{x:1000,y:1000},{x:-1000,y:-1000},{x:-1000,y:1000},{x:1000,y:-1000},{x:1000,y:1000},{x:-1000,y:-1000},{x:-1000,y:-1000},{x:1000,y:1000},{x:1000,y:1000},{x:1000,y:1000},{x:1000,y:1000},{x:1000,y:1000},{x:1000,y:1000},{x:1000,y:1000},{x:1000,y:1000},{x:1000,y:1000},{x:1000,y:1000},{x:1000,y:1000},{x:1000,y:1000},{x:1000,y:1000},{x:1000,y:1000},{x:1000,y:1000},{x:1000,y:1000},{x:1000,y:1000},],
root = nodes[0];

root.fixed = true;

var svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height)
.attr("class","animation")

var force = d3.layout.force()
.charge(-100)
.gravity(0)
.size([width, height])
.nodes(nodes)
.on("tick", tick)
.start();

var cleared = false;

d3.select("body").on("mousemove", function() {
  var p1 = d3.mouse(this);
  console.log(root.x = p1[0]);
  console.log(root.y = p1[1]);
	console.log(root);
  force.resume();
});

function tick(e) {

var k = .05 * e.alpha;

if(cleared){
	nodes.forEach( function(node){
		node.y += (foci[node.id].y - node.y) * k;
		node.x += (foci[node.id].x - node.x) * k;


		force.charge(function(d, i) { return i ? -10 : -200; }).start();
	})
}

svg.selectAll("circle")
		.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; });
}


var count = 0;

var interval = setInterval(function() {
var d = {
x: width / 2 + 2 * Math.random() - 1,
y: height / 2 + 2 * Math.random() - 1,
id: Math.floor(count/5)
};

svg.append("circle")
	.data([d])
	.attr("r", 1e-6)
	.attr("fill","#fffff8")
	.attr("opacity",".5")
.transition()
	.ease(Math.sqrt)
	.attr("r", 3);

if (nodes.push(d) > 115){
clearInterval(interval);
cleared = true;
}
force.start();
count += 1;
}, 30);