function getMyLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var lnglat = new OpenLayers.LonLat(lng,lat).transform(
          new OpenLayers.Projection("EPSG:4326"),
          map.getProjectionObject())
      map.setCenter(lnglat, 14);
     
      var markers = new OpenLayers.Layer.Markers( "Marcas" );
      markers.addMarker(new OpenLayers.Marker(lnglat));
      map.addLayer(markers);
         
      });
    }
}