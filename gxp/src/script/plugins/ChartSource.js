
Ext.namespace("gxp.plugins");


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var chartStore = new Ext.data.JsonStore({ 
	//url       : OVROOT+'charts.json?mode=items',
	url       : OVROOT+'services?service=charts&action=getList&mode=items',
	root      : 'charts',
	fields    : [ 'title', 'chart_id', 'url', 'x_axis', 'y_axis', 'is_default', 'layers'],
	listeners :
    {
   		load : function(options)
   		{
			this.data.items.every(function(el){
				if (typeof( el.data.is_default)=="boolean") return true;
				el.data.is_default =  el.data.is_default=="t" ? true : false
				return true;
			})
			chartRoot.load(options);
   		},
		loadexception : function(o, arg, nul, e)
		{
			//alert("chartStore.listeners - LoadException : " + e);         
		} 
	}  
});

var chartRoot = new Ext.data.JsonStore({ 
	//url       : OVROOT+'charts.json?mode=root',
	url       : OVROOT+'services?service=charts&action=getList&mode=root',
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
			if (chartStore.data.items[i].json.is_default=="t" || chartStore.data.items[i].json.is_default===true) {
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
