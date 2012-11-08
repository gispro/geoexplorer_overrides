
Ext.namespace("gxp.plugins");


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var chartStore = new Ext.data.JsonStore({ 
	url       : 'charts.json',
	root      : 'charts',
	fields    : [ 'name', 'chartId', 'url', 'x_axis', 'y_axis', 'isDefault', 'layers'],
	listeners :
    {
   		load : function(options)
   		{
			chartRoot.load(options);
   		},
		loadexception : function(o, arg, nul, e)
		{
			//alert("chartStore.listeners - LoadException : " + e);         
		} 
	}  
});

var chartRoot = new Ext.data.JsonStore({ 
	url       : 'charts.json',
	fields    : [ 'charts', 'lastUpdate'],
	listeners :
    {
   		load : function(options)
   		{
			if ((options)&&(options.callback)) options.callback.call(options.scope||this);
   		},
		loadexception : function(o, arg, nul, e)
		{
			//alert("chartStore.listeners - LoadException : " + e);         
		} 
	}  
});


gxp.plugins.ChartSource = Ext.extend(gxp.plugins.LayerSource,
{
    ptype  : "gxp_chartsource",
	chartStore : chartStore,
	
	getChartsStore : function () 
	{
		this.init();
		return this.chartStore;
	},
	
	getDefaultChart : function() {
		for (var i=0; i< this.chartStore.data.length; i++) {
			if (chartStore.data.items[i].json.isDefault) {
				return chartStore.data.items[i].json;
			}
		}		
	},
	
	getLastUpdate: function() {
		return chartRoot.reader.jsonData.lastUpdate;
	},
	
	init : function(options) {
		chartStore.load(options);		
	}
});

Ext.preg(gxp.plugins.ChartSource.prototype.ptype, gxp.plugins.ChartSource);
