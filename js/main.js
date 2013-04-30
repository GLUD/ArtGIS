require([
    "dojo/ready",
    "dojo/parser", 
    "dojo/domReady",
    "dojo/dom-construct",
    "dijit/layout/BorderContainer", 
    "dijit/layout/ContentPane",
    "dijit/layout/AccordionContainer",
    "dijit/form/DropDownButton",
    "dijit/DropDownMenu", 
    "dijit/MenuItem",
    "dijit/Toolbar",
    "dijit/form/Button"
            ], function(ready) {
    ready(function(){console.log("Estas usando Dojo Toolkit "+dojo.version.major + "." + dojo.version.minor + "." + dojo.version.patch+" en "+document.URL);
                     createMap();
                     resizeElements();
                     window.onresize=function(){resizeElements();};
                    })
});
       
function createMap(){
    console.firebug=true;//fix the openlayer problem
    //http://acuriousanimal.com/blog/2012/01/23/dojo-openlayers-new-challenges/ 
    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    
    var extent = new OpenLayers.Bounds(-74.64,4.246,-73.522,4.972).transform(fromProjection,toProjection);
                                      //[left, bottom, right, top]


    var position       = new OpenLayers.LonLat(-74.083333,4.6).transform( fromProjection, toProjection);
    var zoom           = 11; 
    
    var options ={
      restrictedExtent : extent,
      controls : [
       new OpenLayers.Control.Navigation(),   /*noverse con el raton*/
       new OpenLayers.Control.PanZoomBar(),   
       new OpenLayers.Control.Attribution()
      ]
    };

    map = new OpenLayers.Map("map", options);
    var mapnik = new OpenLayers.Layer.OSM();
    map.addLayer(mapnik);

    //--Markers
    var markers = new OpenLayers.Layer.Markers( "Marcas" );
    map.addLayer(markers);
    markers.addMarker(new OpenLayers.Marker(position));
    
    map.setCenter(position, zoom);
    //convertir la attribucion a artgis
    dojo.query(".olControlAttribution.olControlNoSelect")[0].innerHTML = "";
   	dojo.addClass(dojo.query(".olControlAttribution.olControlNoSelect")[0],"logo");
}

function isMobile()
{
	if (document.body.offsetWidth<=720 || document.body.offsetHeight<=450)
	{
		return true
	}
	else
	{
		return false
	}
}
function resizeElements(){
	if(isMobile())
	{
		dojo.byId("header").style.display = "none"; 	
		dojo.byId("rightPane").style.display = "none";
		dojo.byId("map").style.width="100%";
		dojo.byId("switcher").style.display = "block";
	}
	else
	{
		dojo.byId("header").style.display = "block";
		dojo.byId("rightPane").style.display = "block";
		dojo.byId("switcher").style.display = "none";	
	}
	dijit.registry.byId("bc").resize();
	map.updateSize();
}

function consoleLog(){
    OpenLayers.Console.log("This is the result of an OpenLayers.Console.log() call");
}
function consoleWarn(){
    OpenLayers.Console.warn("This is the result of an OpenLayers.Console.warn() call");
}
function consoleError(){
    OpenLayers.Console.error("This is the result of an OpenLayers.Console.error() call");
}
function consoleDir(){
    OpenLayers.Console.dir(OpenLayers);
}
function consoleDirxml(){
    OpenLayers.Console.dirxml(document.getElementsByTagName('body')[0]);
}
