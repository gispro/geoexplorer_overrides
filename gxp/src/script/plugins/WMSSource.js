(function() {
  Ext.apply(gxp.plugins.WMSSource.prototype, {

    //OVERRIDED fields added
    /** api: method[createLayerRecord]
     *  :arg config:  ``Object``  The application config for this layer.
     *  :returns: ``GeoExt.data.LayerRecord``
     *
     *  Create a layer record given the config.
     */
    createLayerRecord: function(config) {
        var record;
		var name;
		var splitted  = config.name.split(":");
		if (splitted.length>1) name = splitted[1]; 
		else name = config.name;
        var index=-1;
		this.store.each(function(record, idx){
			if ((record.get('name') == name)||(record.get('name') == config.name))
				index = idx;
		});		//= this.store.findExact("name", name);
        if (index > -1) {
            var original = this.store.getAt(index);

            var layer = original.getLayer().clone();

            /**
             * TODO: The WMSCapabilitiesReader should allow for creation
             * of layers in different SRS.
             */
            var projection = this.getMapProjection();
            
            // If the layer is not available in the map projection, find a
            // compatible projection that equals the map projection. This helps
            // us in dealing with the different EPSG codes for web mercator.
            var layerProjection = this.getProjection(original);

            var projCode = projection.getCode();
            var nativeExtent = original.get("bbox")[projCode];
            var swapAxis = layer.params.VERSION >= "1.3" && !!layer.yx[projCode];
            var maxExtent = 
                (nativeExtent && OpenLayers.Bounds.fromArray(nativeExtent.bbox, swapAxis)) || 
                OpenLayers.Bounds.fromArray(original.get("llbbox")).transform(new OpenLayers.Projection("EPSG:4326"), projection);
            
            // make sure maxExtent is valid (transform does not succeed for all llbbox)
            if (!(1 / maxExtent.getHeight() > 0) || !(1 / maxExtent.getWidth() > 0)) {
                // maxExtent has infinite or non-numeric width or height
                // in this case, the map maxExtent must be specified in the config
                maxExtent = undefined;
            }
            
            // use all params from original
            
			if (config.styles) 
				var params = Ext.applyIf({
					STYLES: config.styles,
					FORMAT: config.format,
					TRANSPARENT: config.transparent
				}, layer.params);
			else
				var params = Ext.applyIf({
					FORMAT: config.format,
					TRANSPARENT: config.transparent
				}, layer.params);	
			if (config.rubricatorNode) {
				params.rubricatorNode = config.rubricatorNode;
			}

            if(!this.viewMangerUsed){
              layer = new OpenLayers.Layer.WMS(
                  config.title || layer.name, 
                  layer.url, 
                  params, {
                      attribution: layer.attribution,
                      maxExtent: maxExtent,
                      restrictedExtent: maxExtent,
                      ratio: config.ratio || 1,
                      visibility: ("visibility" in config) ? config.visibility : true,
                      opacity: ("opacity" in config) ? config.opacity : 1,
                      buffer: ("buffer" in config) ? config.buffer : 1,
                      //projection: layerProjection,
                      singleTile: true
                  }
              );
            }else{
              layer = new OpenLayers.Layer.WMS(
                  config.title || layer.name, 
                  layer.url, 
                  params, {
                      attribution: layer.attribution,
                      ratio: config.ratio || 1,
                      visibility: ("visibility" in config) ? config.visibility : true,
                      opacity: ("opacity" in config) ? config.opacity : 1,
                      buffer: ("buffer" in config) ? config.buffer : 1,
                      singleTile: false//config.group!="background"
                  }
              );
            }

            var fileFormats = config.group == 'background' ? [] : this.getFileFormats(config.source);

            // data for the new record
            var data = Ext.applyIf({
                title: layer.name,
                group: config.group,
                source: config.source,
                properties: "gxp_wmslayerpanel",
                fixed: config.fixed,
                selected: "selected" in config ? config.selected : false,
                layer: layer,
                restUrl: this.restUrl,
                queryableFields: "queryableFields" in config ? config.queryableFields : null,
                queryable: "queryable" in config ? config.queryable : original.get('queryable'),
                singleTile: layer.singleTile,
                supportedProjections: [],
                fileFormats: fileFormats
            }, original.data);

            // add additional fields
            var fields = [
                {name: "source", type: "string"}, 
                {name: "group", type: "string"},
                {name: "properties", type: "string"},
                {name: "fixed", type: "boolean"},
                {name: "selected", type: "boolean"},
                {name: "queryableFields"}, //Array
                {name: "singleTile"}, //Boolean
                {name: "supportedProjections"}, //Array
                {name: "fileFormats"} //Array

            ];
            original.fields.each(function(field) {
                fields.push(field);
            });

            var Record = GeoExt.data.LayerRecord.create(fields);
            record = new Record(data, layer.id);

        }

        return record;
    },

    getFileFormats: function(source){
      var wfsCapabilitiesUrlArr = this.target.layerSources[source].url.split('/');
      wfsCapabilitiesUrlArr.splice(wfsCapabilitiesUrlArr.length - 1, 1);
      wfsCapabilitiesUrl = wfsCapabilitiesUrlArr.join('/') + '/wfs?request=getCapabilities';

      var menuItems = [];

      OpenLayers.Request.GET({
        url: wfsCapabilitiesUrl,
        async: false,
        callback: function(request){

          if(request.status == 200){

            var nodes = request.responseXML.firstChild.childNodes;
            for(var i=0; i<nodes.length; i++){
              if( nodes[i].nodeName == "ows:OperationsMetadata"){
                var operationsMetadataNode = nodes[i];
                for(var j=0; j<operationsMetadataNode.childNodes.length; j++){
                  if( operationsMetadataNode.childNodes[j].nodeName == 'ows:Operation' && operationsMetadataNode.childNodes[j].attributes.name && operationsMetadataNode.childNodes[j].attributes.name.value == 'GetFeature' ){
                    var getFeatureNode = operationsMetadataNode.childNodes[j];
                    for(var k=0; k<getFeatureNode.childNodes.length; k++){
                      if( getFeatureNode.childNodes[k].nodeName == 'ows:Parameter' && getFeatureNode.childNodes[k].attributes.name && getFeatureNode.childNodes[k].attributes.name.value == 'outputFormat' ){

                        var outputFormatNode = getFeatureNode.childNodes[k];

                        for(var m=0; m<outputFormatNode.childNodes.length; m++){
                          menuItems.push( outputFormatNode.childNodes[m].textContent );
                        }

                      }
                    }
                  }
                }
              }
            }

          }else{


          }

        },
        scope: this
      });
      return menuItems;

    },

    //OVERRIDED fields added
    /** api: method[getConfigForRecord]
     *  :arg record: :class:`GeoExt.data.LayerRecord`
     *  :returns: ``Object``
     *
     *  Create a config object that can be used to recreate the given record.
     */
    getConfigForRecord: function(record) {
        var config = gxp.plugins.WMSSource.superclass.getConfigForRecord.apply(this, arguments);
        var layer = record.getLayer();
        var params = layer.params;
        return Ext.apply(config, {
            format: params.FORMAT,
            styles: params.STYLES,
            transparent: params.TRANSPARENT,
            queryable: record.get('queryable'),
            queryableFields: record.get('queryableFields'),
            singleTile: record.get('singleTile')
        });
    },

	//OVERRIDED version
	/** api: method[getSchema]
     *  :arg rec: ``GeoExt.data.LayerRecord`` the WMS layer to issue a WFS
     *      DescribeFeatureType request for
     *  :arg callback: ``Function`` Callback function. Will be called with
     *      a ``GeoExt.data.AttributeStore`` containing the schema as first
     *      argument, or false if the WMS does not support DescribeLayer or the
     *      layer is not associated with a WFS feature type.
     *  :arg scope: ``Object`` Optional scope for the callback.
     *
     *  Gets the schema for a layer of this source, if the layer is a feature
     *  layer.
     */
    getSchema: function(rec, callback, scope) {
        if (!this.schemaCache) {
            this.schemaCache = {};
        }
        this.describeLayer(rec, function(r) {
            if (r && r.get("owsType") == "WFS") {
                var typeName = r.get("typeName");
                var schema = this.schemaCache[typeName];
                if (schema) {
                    if (schema.getCount() == 0) {
                        schema.on("load", function() {
                            callback.call(scope, schema);
                        }, this, {single: true});
                    } else {
                        callback.call(scope, schema);
                    }
                } else {
                    schema = new GeoExt.data.AttributeStore({
                        url: r.get("owsURL"),
                        baseParams: {
                            SERVICE: "WFS",
                            //TODO should get version from WFS GetCapabilities
                            VERSION: "1.1.1",
                            REQUEST: "DescribeFeatureType",
                            TYPENAME: typeName
                        },
                        autoLoad: true,
                        listeners: {
                            "load": function() {
                                callback.call(scope, schema);
                            },
                            scope: this
                        }
                    });
                    this.schemaCache[typeName] = schema;
                }
            } else {
                callback.call(scope, false);
            }
        }, this);
   },
	
  });

})();
