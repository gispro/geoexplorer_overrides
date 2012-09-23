
Ext.namespace("gxp.plugins");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var chartStore = new Ext.data.JsonStore({ 
	url       : 'charts.json',
	root      : 'charts',
	fields    : [ 'name', 'chartId', 'url', 'x_axis', 'y_axis', 'isDefault'],
	listeners :
    {
   		load : function()
   		{
			//parseChartStore();
   		},
		loadexception : function(o, arg, nul, e)
		{
			alert("chartStore.listeners - LoadException : " + e);         
		} 
	}  
});

gxp.plugins.ChartSource = Ext.extend(gxp.plugins.LayerSource,
{
    ptype  : "gxp_chartsource",
	chartStore : chartStore,
	
	getChartsStore : function () 
	{
		chartStore.load();
		return this.chartStore;
	}
});

Ext.preg(gxp.plugins.ChartSource.prototype.ptype, gxp.plugins.ChartSource);
