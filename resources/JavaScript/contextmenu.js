
var clickedNode;
var nodeMenuIsOpen = false;
var clickedEdge;
var edgeMenuIsOpen = false;
var markedNode
var markedEdge
var lastMarkedNode;
var lastMarkedEdge;

//eventhandler for normal leftclick, deaktivates the contextmenu for nodes
$("html").on("click", function(e){
    closeAllContextmenus();
});
//eventhandler for rightclick, closes the contextmenu for nodes(not in .div_node)
$("html:not(.div_node)").on("contextmenu",function(e){
    closeEdgeContextmenu();
});
//on rightclick in .div_node calls nodeContextmenu and deactivates normal contextmenu
// $(".div_node").contextmenu(function(e) {
$("body").on("contextmenu",".div_node",function (e) {
    closeAllContextmenus();
    clickedNode = this;

    createNodeContextmenu(e);
    return false;
});
$("body").on("contextmenu","svg path",function (e) {
    closeAllContextmenus();
    clickedEdge = this;
    createEdgeContextmenu(e);
    return false;
});
$("body").on("contextmenu","html:not(path)",function () {
    closeEdgeContextmenu();
});

//mark last clicked
$("body").on("click",".div_node",function () {
    markedNode = this;
    if(lastMarkedNode !== markedNode){
        markLastClickedNode();
    }
});
$("body").on("click","svg path",function () {
    markedEdge = this;
    if(lastMarkedEdge !== markedEdge){
        markLastClickedEdge();
    }
});




//loads rightclickmenu.html on current mouse position
function createNodeContextmenu(e) {


    let x = e.pageX + "px";     // Get the horizontal coordinate
    let y = e.pageY + "px";     // Get the vertical coordinate
    //let link = "https://raw.githubusercontent.com/MartinKem/Call-Graph-Exploration/developer's/eingelesener%20Graph/rightclickmenu.html?token=gAYfhzzRW1xhwgU-GLzFnB5r3gtbBHuFpks5cRbzjwA%3D%3D";
   // let counter = 0;
    /*try{
        //$("body").append($("<div id='main-rightclick'></div>").load(link +" #main-rightclick>"));

    }catch (e) {*/
       // counter = 1;
       // if(counter > 0)console.log("contextmenu nicht mehr aktuell");
        $("body").append($("<div id='contextmenuNode'>        <div class=\"menuelement\" onclick=\"deleteNodes()\">Ausblenden</div>" +
            "        <div class=\"menuelement\" onclick=\"colorChosen(this)\">Red<div class=\"color\" style=\"background-color: #ffc6c6 \"></div></div>" +
            "        <div class=\"menuelement\" onclick=\"colorChosen(this)\">Green<div class=\"color\" style=\"background-color: #beffbe\"></div></div>" +
            "        <div class=\"menuelement\" onclick=\"colorChosen(this)\">Blue<div class=\"color\" style=\"background-color: #abd3ff\"></div></div>" +
            "        <div class=\"menuelement\" onclick=\"colorChosen(this)\">Yellow<div class=\"color\" style=\"background-color: #ffff9f\"></div></div>" +
            "        <div class=\"menuelement\" onclick=\"colorChosen(this)\">White<div class=\"color\" style=\"background-color: #ffffff\"></div></div>" +
            "        <div class=\"menuelement\" onclick=\"switchContent()\">Details</div><div>"));

    $("#contextmenuNode").css({
        "position":"absolute",
        "top":y,
        "left":x,});


    nodeMenuIsOpen = true;

}
//changes color to the backgroundcolor of elem
function colorChosen(elem) {
    var color = $(elem).find(".color").css('backgroundColor');
    $(clickedNode).css('background-color', color);
}

function deleteNodes() {
    var nodeId= $(clickedNode).attr('id');
	var nodeInstance = nodeMap.get(nodeId);
	nodeInstance.hideNode();
}
function switchContent() {
    let nodeName= $(clickedNode).attr('id');
    let node = nodeMap.get(nodeName);
    $(clickedNode).children(".node_inhalt").toggleClass("invis");
    if($(clickedNode).children(".node_inhalt").hasClass("invis")){ node.toggleToAbstract(); }
    else{ node.toggleToDetailed(); }
    // for(var i = 0; i < node.parents.length; i++){		// first all edges to this node become hidden
    //     var edge = document.getElementById(node.parents[i].node.getName() + "#" + node.parents[i].index + '->' + nodeName);
    //     if(edge) edge.style.display = "none";
        //method2nodeEdge(node.parents[i].getName() + "#"+ node.parents[i].getMethodIndex(nodeName),nodeName);
    // }

}
function createEdgeContextmenu(e) {
    let x = e.pageX + "px";     // Get the horizontal coordinate
    let y = e.pageY + "px";     // Get the vertical coordinate



    $("body").append("<div id='contextmenuEdge'>" +
        " <div class=\"menuelement\" onclick=\"changeColorEdge(this)\">Red<div class=\"color\" style=\"background-color: #c24e4c \"></div></div>" +
        " <div class=\"menuelement\" onclick=\"changeColorEdge(this)\">Green<div class=\"color\" style=\"background-color: #429c44\"></div></div>" +
        " <div class=\"menuelement\" onclick=\"changeColorEdge(this)\">Blue<div class=\"color\" style=\"background-color: #3076b4\"></div></div>" +
        " <div class=\"menuelement\" onclick=\"changeColorEdge(this)\">Yellow<div class=\"color\" style=\"background-color: #c4c931\"></div></div>" +
        " <div class=\"menuelement\" onclick=\"changeColorEdge(this)\">Default<div class=\"color\" style=\"background-color: #000000\"></div></div>" +
        " <div class=\"menuelement\" onclick=\"nodeMap.get(clickedEdge.getAttribute('id').split('->')[1]).focus()\" style=\"white-space: nowrap\">focus Target</div>" +
    "</div>");

    $("#contextmenuEdge").css({
        "position":"absolute",
        "top":y,
        "left":x,});

    edgeMenuIsOpen = true;

}

function changeColorEdge(elem) {
    var color = $(elem).find(".color").css('backgroundColor');
    if(color === "rgb(0, 0, 0)"){
        $(clickedEdge).css('opacity', 0.5);
    }else{
        $(clickedEdge).css('opacity', 1);
    }
    $(clickedEdge).css('stroke', color);
}

function closeAllContextmenus() {
    closeNodeContextmenu();
    closeEdgeContextmenu();
}
function closeNodeContextmenu() {
    if(nodeMenuIsOpen){
        $("#contextmenuNode").remove();
        nodeMenuIsOpen = false;
    }
}
function closeEdgeContextmenu() {
    if(edgeMenuIsOpen){
        $("#contextmenuEdge").remove();
        edgeMenuIsOpen = false;
    }
}
function markLastClickedNode() {
    if(lastMarkedNode !== null){
        $(lastMarkedNode).removeClass("lastClickedNode");
    }
    $(markedNode).addClass("lastClickedNode");
    lastMarkedNode = markedNode;
}
function markLastClickedEdge() {
    $(markedEdge).addClass("lastClickedEdge");
    if(lastMarkedEdge !== null || lastMarkedEdge === markedEdge){
        $(lastMarkedEdge).removeClass("lastClickedEdge");
    }
    lastMarkedEdge = markedEdge;
}
