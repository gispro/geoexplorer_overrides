/**
 * @requires plugins/LayerSource.js
 */

/** api: (extends)
 *  plugins/LayerSource.js
 */
Ext.namespace("gxp.plugins");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var chartStore = new Ext.data.JsonStore({ 
	url       : 'chart.json',
	root      : 'charts',
	fields    : [ {name: 'name', mapping: 'owner'}, 'chartId', 'url', 'title', 'x_axis', 'y_axis', 'default'],
	listeners :
    {
   		load : function()
   		{
			chartVar.chartLoaded   = true;
			chartVar.chartDownload = false;
			parseChartStore();
   		},
		loadexception : function(o, arg, nul, e)
		{
			alert("chartStore.listeners - LoadException : " + e);         
		} 
	}  
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function parseChartStore()
{
	chartLayers = new Array(chartStore.getRange().length);
	for (var row = 0; row < chartStore.getRange().length; row++)
	{
   		var x_axis = chartStore.getAt(row).get('x_axis');
 		var object = chartStore.getAt(row).get('layers');
		var chart = {title  : chartStore.getAt(row).get('title'),
		               url    : chartStore.getAt(row).get('url'  ),
					   chartId    : chartStore.getAt(row).get('chartId'  ),
					   names  : new Array(object.length),
					   layers : new Array(object.length),
					   scale  : new Array(object.length)};
 		for (items = 0; items < object.length; items++)
		{
			chart.scale  [items] = x_axis[items];
			chart.names  [items] = object[items];
			chart.layers [items] = null;
		}
		chartServices.push (chart)
	}
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function downloadChart()
{
	if (!chartVar.chartLoaded && !chartVar.chartDownload)
	{
		chartStore.load();
		chartVar.chartDownload = true;
	}
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// extend GeoExt.data.LayerStore.onAdd
function chartOnAdd(store, records, index)
 {
	if(!this._adding)
	{
		this._adding = true;
		var layer;
		for(var i=records.length-1; i>=0; --i)
		{
			layer = records[i].getLayer();
			if (layer)                         //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			{
				this.map.addLayer(layer);
				if(index !== this.map.layers.length-1)
				{
					this.map.setLayerIndex(layer, index);
				}
			}                                  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		}
		delete this._adding;
	}
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// extend GeoExt.tree.LayerNode.onStoreAdd
function chartOnStoreAdd(store, records, index)
{
	var l;
	for(var i=0; i<records.length; ++i)
	{
		if (records[i].getLayer())              //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		{
			l = records[i].getLayer();
			if(this.layer == l)
			{
				this.getUI().show();
				break;
			} else if (this.layer == l.name) {
				// layer is a string, which means the node has not yet
				// been rendered because the layer was not found. But
				// now we have the layer and can render.
				this.render();
				break;
			}
		}                                     //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	}
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// extend GeoExt.tree.LayerLoader.onStoreAdd
function chartLayerLoaderOnStoreAdd(store, records, index, node)
{
	if(!this._reordering && node)
	{
		var nodeIndex = node.recordIndexToNodeIndex(index+records.length-1);
		for(var i=0; i<records.length; ++i)
		{
			if ((nodeIndex >= 0) && (records[i].data.group !== 'chart'))      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
				this.addLayerNode(node, records[i], nodeIndex);
			else if ((nodeIndex >= 0) && (records[i].data.group === 'chart'))
			{
				isAdded = false;
				for(var j = 0; j < chartVar.chartNode.childNodes.length; ++j)
				{
					if (chartVar.chartNode.childNodes[j].text == records[i].data.title)
					{
						isAdded = true;
						break;
					}
				}
				if ((chartVar.chartNode.childNodes.length === 0) || !isAdded)
					this.addLayerNode(chartVar.chartNode, records[i], nodeIndex);
			}                                                                    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		}
	}
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
gxp.plugins.ChartSource = Ext.extend(gxp.plugins.LayerSource,
{
    ptype  : "gxp_chartsource",
	layersStore : chartStore,
	
	getLayersStore : function () // url)
	{
		downloadChart();
		return this.layersStore;
	},

	createLayer : function(name)
	{
		layer = new OpenLayers.Layer (name, 
		{
			transparent   : 'true'
		},
		{
			isBaseLayer   : false
		});
		return layer;
	},
	
    createLayerRecord: function(config)
	{
		downloadChart();
		var record = new GeoExt.data.LayerRecord();
		record.setLayer (this.createLayer(config.title));
		record.set ("title"    , config.title );
		record.set ("name"     , config.name  );
		record.set ("source"   , 'chart'  );
		record.set ("group"    , 'chart'  );
		record.set ("selected" , false        );
		record.commit();
		
		return record;
    },
    createRecord: function(title, owner, curl, scale, layer_names)
	{
		var record = new GeoExt.data.LayerRecord();
		record.setLayer (this.createLayer(title));
		
		record.set ("title"     , title             );
		record.set ("name"      , owner             );
		record.set ("source"    , 'chart'       );
		record.set ("group"     , 'chart'       );
		record.set ("selected"  , false             );
		record.commit();

		return record;
    },
    getConfigForRecord: function(record) {
        var layer = record.getLayer();
        return {
            source     : record.get("source"  ),
            name       : record.get("name"    ),
            title      : record.get("title"   ),
            group      : record.get("group"   ),
            selected   : record.get("selected")
        };
    }
});

Ext.preg(gxp.plugins.ChartSource.prototype.ptype, gxp.plugins.ChartSource);
