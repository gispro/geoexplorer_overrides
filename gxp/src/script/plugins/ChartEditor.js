/** api: constructor
 *  .. class:: ChartEditor(config)
 *
 *    Plugin for removing a selected layer from the map.
 *    TODO Make this plural - selected layers
 */
gxp.plugins.ChartEditor = Ext.extend(gxp.plugins.Tool, {
    
    /** api: ptype = gxp_chartEditor */
    ptype: "gxp_chartEditor",
    
    /** api: config[addActionMenuText]
     *  ``String``
     *  Text for add menu item (i18n).
     */
    addActionMenuText: "Add layers",

    /** api: config[addActionTip]
     *  ``String``
     *  Text for add action tooltip (i18n).
     */
    addActionTip: "Add layers",
    
	/** api: config[includeBtnText]
     *  ``String``
     *  Text for add action tooltip (i18n).
     */
    includeBtnText: "Include",
	
	/** api: config[errorTitleText]
     *  ``String``
     *  Text for error alerts title(i18n).
     */
	errorTitleText: "Error",
	
	XText: "X axis",
	YText: "Y axis",
	
	/** api: config[excludeBtnText]
     *  ``String``
     *  Text for add action tooltip (i18n).
     */
	excludeBtnText: "Exclude",
	
	/** api: config[moveUpBtnText]
     *  ``String``
     *  Text for add action tooltip (i18n).
     */
	moveUpBtnText: "Up",
	
	/** api: config[moveDownBtnText]
     *  ``String``
     *  Text for add action tooltip (i18n).
     */
	moveDownBtnText: "Down",
	
	/** api: config[chosenLayersText]
     *  ``String``
     *  Text for add action tooltip (i18n).
     */
	chosenLayersText: "Chosen layers",

	/** api: config[actionText]
     *  ``String``
     *  Text for add action tooltip (i18n).
     */
	actionText: "Actions",
	
    /** api: config[addActionText]
     *  ``String``
     *  Text for the Add action. None by default.
     */
   
    /** api: config[addServerText]
     *  ``String``
     *  Text for add server button (i18n).
     */
    addServerText: "Add a New Server",

    /** api: config[addButtonText]
     *  ``String``
     *  Text for add layers button (i18n).
     */
    addButtonText: "Add layers",
	
	/** api: config[chartNameText]
     *  ``String``
     *  Text for chart name label (i18n).
     */
	chartNameText: "Chart name:",
    
    /** api: config[untitledText]
     *  ``String``
     *  Text for an untitled layer (i18n).
     */
    untitledText: "Untitled",

    /** api: config[addLayerSourceErrorText]
     *  ``String``
     *  Text for an error message when WMS GetCapabilities retrieval fails (i18n).
     */
    addLayerSourceErrorText: "Error getting WMS capabilities ({msg}).\nPlease check the url and try again.",

	/** api: config[addLayerSourceErrorText]
     *  ``String``
     *  Text for an error message when name wasn't entered (i18n).
     */
	nameRequiredErrorText: "Please enter animaion's name",
		
	errorText: "Error",
	
	wrongAxisRequest: "Can not get metadata",
	
	/** api: config[addLayerSourceErrorText]
     *  ``String``
     *  Text for an error message when there are no layers in chart.
     */
	layersRequiredErrorText: "Please include at least one layer to this chart",
	
	/** api: config[addLayerSourceErrorText]
     *  ``String``
     *  Text for an error message when there are no names for x-axis labels
     */
	xaxisRequiredErrorText: "Please enter x-axis labels",
	
	/** api: config[aimationInvalidErrorText]
     *  ``String``
     *  Text for an error message when there are no names for x-axis labels
     */
	aimationInvalidErrorText: "Can't open the chart. It doesn't consist of WMS-layers of has been corrupted",
	
	/** api: config[errorText]
     *  ``String``
     *  Text for an error message when there are no names for x-axis labels
     */
	errorText: "Error",
	
    /** api: config[availableLayersText]
     *  ``String``
     *  Text for the available layers (i18n).
     */
    availableLayersText: "Available Layers",

    /** api: config[availableLayersText]
     *  ``String``
     *  Text for the grid expander (i18n).
     */
    expanderTemplateText: "<p><b>Abstract:</b> {abstract}</p>",
    
    /** api: config[availableLayersText]
     *  ``String``
     *  Text for the layer title (i18n).
     */
    panelTitleText: "Title",
	
	/** api: config[availableLayersText]
     *  ``String``
     *  Text for the layer chart x-axis label (i18n).
     */
    panelLabelText: "Label",	

    /** api: config[availableLayersText]
     *  ``String``
     *  Text for the layer selection (i18n).
     */
    layerSelectionText: "View available data from:",
    
    /** api: config[instructionsText]
     *  ``String``
     *  Text for additional instructions at the bottom of the grid (i18n).
     *  None by default.
     */
    
    /** api: config[doneText]
     *  ``String``
     *  Text for Done button (i18n).
     */
    doneText: "Done",
	
	/** api: config[cancelText]
     *  ``String``
     *  Text for Done button (i18n).
     */
    cancelText: "Cancel",
	
	/** api: config[ascText]
     *  ``String``
     *  Text for asc header menu button (i18n).
     */
    ascText: "Sort ascenging",
	
	/** api: config[descText]
     *  ``String``
     *  Text for desc header menu button  (i18n).
     */
    descText: "Sort descending",
	
	/** api: config[colText]
     *  ``String``
     *  Text for column header menu button  (i18n).
     */
    colText: "Columns",
	
	/** api: config[windowTitle]
     *  ``String``
     *  Windows title (i18n).
     */
    windowTitle: "Chart wizard",

    /** api: config[upload]
     *  ``Object | Boolean``
     *  If provided, a :class:`gxp.LayerUploadPanel` will be made accessible
     *  from a button on the Available Layers dialog.  This panel will be 
     *  constructed using the provided config.  By default, no upload 
     *  functionality is provided.
     */
    
    /** api: config[uploadText]
     *  ``String``
     *  Text for upload button (only renders if ``upload`` is provided).
     */
    uploadText: "Upload Data",
	
	/** api: config[saveSucceedText]
     *  ``String``
     *  Text for success message.
     */
	saveSucceedText: "Save succeed",
	
	/** api: config[saveFailedText]
     *  ``String``
     *  Text for fail message
     */
	saveFailedText: "Save failed",
	
	/** api: config[doubledRecordText]
     *  ``String``
     *  Text for fail message
     */
	doubledRecordText: "Such chart already exists",
	
	/** api: config[saveText]
     *  ``String``
     *  Text for save message header
     */
	saveText: "Save",

    /** api: config[nonUploadSources]
     *  ``Array``
     *  If ``upload`` is enabled, the upload button will not be displayed for 
     *  sources whose identifiers or URLs are in the provided array.  By 
     *  default, the upload button will make an effort to be shown for all 
     *  sources with a url property.
     */

    /** api: config[relativeUploadOnly]
     *  ``Boolean``
     *  If ``upload`` is enabled, only show the button for sources with relative
     *  URLs (e.g. "/geoserver").  Default is ``true``.
     */
    relativeUploadOnly: true,

    /** api: config[startSourceId]
     * ``Integer``
     * The identifier of the source that we should start with.
     */
    startSourceId: null,
    
	/** private: property[chartId]
	*  Editing layers
	*/
    chartId: null,
	
	/** private: property[selectedSource]
     *  :class:`gxp.plugins.LayerSource`
     *  The currently selected layer source.
     */
    selectedSource: null,

	/** private: property[windowsWidth]  
	 * ``Integer``
     */
    windowsWidth: 1000,
	
	/** private: property[updateCallback]  
	 * invokes after saving the chart
     */
	updateCallback: null,
	
	
    /** private: method[constructor]
     */
    constructor: function(config) {
        this.addEvents(
            /** api: event[sourceselected]
             *  Fired when a new source is selected.
             *
             *  Listener arguments:
             *
             *  * tool - :class:`gxp.plugins.ChartEditor` This tool.
             *  * source - :class:`gxp.plugins.LayerSource` The selected source.
             */
            "sourceselected"
        );
        gxp.plugins.ChartEditor.superclass.constructor.apply(this, arguments);        
    },
        
		
	rec : null,
    /** api: method[showChartWindow]
     * Shows the window with a capabilities grid.
     */
    showChartWindow: function(options) {
        var valid = true;
		if(!this.capGrid) {
            this.initCapGrid();
        }
        if (options.chartId) {
			valid = this.setFields(options.chartId, this);
			this.chartId = options.chartId;
		}
		if (options.updateCallback) this.updateCallback = options.updateCallback;
		if (valid) {
			this.capGrid.show();			
			this.capGrid.refreshAxis(); 
		}
    },

    /**
     * private: method[setFields]
     * Constructs a window with a capabilities grid.
     */
    setFields: function(chartId, scope) {
		var valid = false;
		if (chartId) {
			var source = new gxp.plugins.ChartSource();
			var store = source.getChartsStore();
			store.each(function(rec) {
				if(rec.get("chartId")==chartId){
					Ext.getCmp("chartName").setValue(rec.get("name"));
					valid = setSource(rec, scope);															
				}
			});
			scope.rec = store.data.items[0].data;			
		}		
		return valid;
	},
	
	/**
     * private: method[initCapGrid]
     * Constructs a window with a capabilities grid.
     */
    initCapGrid: function() {
        var source, data = [];        
        for (var id in this.target.layerSources) {
            source = this.target.layerSources[id];
			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            if (source.store && (id != 'rss') && (id != 'arcgis93') && ((id != 'chart')))
			{
                data.push([id, source.title || id]);
            }
        }
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// RSS
		data.push(['rss'      , 'RSS'     ]);
		data.push(['chart', 'Анимация']);
		// ArcGIS
		if (arcgisStore && arcgisStore.reader.jsonData.arcgis.servers.length > 0)
		{
			for (var idx=0; idx < arcgisStore.reader.jsonData.arcgis.servers.length; ++idx) 
			{
				title = arcgisStore.reader.jsonData.arcgis.servers[idx].title;
				data.push(['arcgis93_' + idx, title]);
//				console.log ('arcgis93_' + idx + ', ' + title);
			}
		}
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        var sources = new Ext.data.ArrayStore({
            fields: ["id", "title"],
            data: data
        });


		
        var expander = this.createExpander();       
        var idx = 0;
        if (this.startSourceId !== null) {
            sources.each(function(record) {
                if (record.get("id") === this.startSourceId) {
                    idx = sources.indexOf(record);
                }
            }, this);
        }

        var capGridPanel = new Ext.grid.GridPanel({
            id: "capGridPanel",
			store: this.target.layerSources[data[idx][0]].store,
            autoScroll: true,
			title: this.availableLayersText,
			width: this.windowsWidth/2,
            flex: 1,			
			region: "west",
            autoExpandColumn: "title",
            plugins: [expander],
            colModel: new Ext.grid.ColumnModel([
                expander,
                {id: "title", header: this.panelTitleText, dataIndex: "title", sortable: true},
                {header: "Id", dataIndex: "name", width: 120, sortable: true},
				{
					// this action column allow to include chosen layer to chart
					header: this.actionText,
					xtype:'actioncolumn',
					width:80,
					items: [{
								iconCls: "gxp-icon-include",	//	new class in all.css
								tooltip: this.includeBtnText,
								handler: function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
																	
									var store = chartLayersPanel.getStore();
									
									chartRec = Ext.data.Record.create([
										{name: "title", type: "string"},
										{name: "name", type: "string"},
										{name: "x_axis", type: "string"},
										{name: "server", type: "string"}
									]);

									var record = new chartRec({
										title: rec.get('title'),
										name: rec.get('name'),
										x_axis: store.getCount()+1,
										server: sourceComboBox.getValue()
									});									
									
									// not 'store.add(rec);' because of changing metadata
									
									
									store.add(record);
									store.commitChanges();
												
									if (Ext.getCmp("chartLayersPanel").getStore().getCount()==1) refreshFieldsStores();
								}
							}]
				}
            ]),
            listeners: {
                scope: this,				
				afterrender: function() {
					var menu = capGridPanel.getView().hmenu.items;				
 					for (var i in menu.items) {
						if (menu.items[i].itemId=="asc") menu.items[i].text = this.ascText;
						else if (menu.items[i].itemId=="desc") menu.items[i].text = this.descText;
						else if (menu.items[i].itemId=="columns") menu.items[i].text = this.colText;
					}
				}
            }
        });					
		
		var chartLayersPanel = new Ext.grid.EditorGridPanel({	// right gridpanel
            id: "chartLayersPanel",
			store: {
				storeId: 'chartLayersStore',
				fields: ['title', 'name', 'server'],
				reader: new Ext.data.JsonReader(
					{root:'chartLayers'},
					['title', 'name', 'server']	// server - current server name, used to filter layers by source
				)
			},
            autoScroll: true,
			title: this.chosenLayersText,
			flex: 1,
			width: this.windowsWidth/2,
			region: 'center',
			clicksToEdit:1,
            autoExpandColumn: "title",
            colModel: new Ext.grid.ColumnModel([
                {header: this.panelTitleText, dataIndex: "title", sortable: true, id: "title"},
                {header: "Id", dataIndex: "name", width: 120, sortable: true},				
				{
					header: this.actionText,
					xtype:'actioncolumn',
					width: 80,
					items: [{
								// exclude layer from chart
								iconCls: "gxp-icon-exclude",
								tooltip: this.excludeBtnText,
								handler: function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
									var store = chartLayersPanel.getStore();
									store.remove(rec);
									if (rowIndex==0) refreshFieldsStores();
								}
							},
							{
								// manage layers order
								iconCls: "gxp-icon-moveup",
								tooltip: this.moveUpBtnText,
								handler: function(grid, rowIndex, colIndex) {
									var record = grid.getStore().getAt(rowIndex);
									moveRecord(record,grid.getStore(),true);
									if (rowIndex==1) refreshFieldsStores();
								}
							},
							{
								// manage layers order
								iconCls: "gxp-icon-movedown",
								tooltip: this.moveDownBtnText,
								handler: function(grid, rowIndex, colIndex) {
									var record = grid.getStore().getAt(rowIndex);
									moveRecord(record,grid.getStore(),false);
									if (rowIndex==0) refreshFieldsStores();
								}
							}
							]
				}
            ]),
            listeners: {
                scope: this,				
				afterrender: function() {
					var menu = chartLayersPanel.getView().hmenu.items;				
 					for (var i in menu.items) {
						if (menu.items[i].itemId=="asc") menu.items[i].text = this.ascText;
						else if (menu.items[i].itemId=="desc") menu.items[i].text = this.descText;
						else if (menu.items[i].itemId=="columns") menu.items[i].text = this.colText;
					}
				}
			}
            
        });
		
		// read: "move record up in store? - true/false"
		function moveRecord(record, store, up) {
			if (!record) {
				return;
			}
			var index = store.indexOf(record);
			if (up) {
				index--;
				if (index <0) {
					return;
				}									
			}
			else
			{
				index++;
				if (index >= store.getCount()) {
					return;
				}									
			}
			// change records order
			store.remove(record);
			store.insert(index, record);
		}
				
		sendData = function (record, scope) {	// commit 
			OpenLayers.Request.issue({
				method: "GET",
				url: "save",
				async: true,
				params:{
					service : "charts",
					action  : scope.chartId ? "update" : "add",
					name    : record.name,
					chartId  : record.chartId,
					url   	: record.url+"?service=WMS&request=GetMap",
					x_axis  : record.x_axis,
					y_axis  : record.y_axis,
					layers  : record.layers
				},
				callback: function(request) 
				{					
					handleClose.call(scope||this, request.status, scope);
				}					
			});
		};
		
		handleClose = function (code) {
			if (code===200) {
				if (this.updateCallback) this.updateCallback.call();
				this.capGrid.hide();
				chartLayersPanel.getStore().removeAll(true);
				chartLayersPanel.getView().refresh();
				chartName.setValue("");
				Ext.Msg.alert(this.saveText, this.saveSucceedText);				
			}
			else if (code==409) {
				Ext.Msg.alert(this.saveText, this.doubledRecordText);
			}
			else if (code==500) {
				Ext.Msg.alert(this.saveText, this.saveFailedText);
			}
		};
		
		// param b: boolean
		checkFields = function (b, sc) {
			var res = true;
			if (chartName.getValue()!="") {
				if (chartLayersPanel.getStore().getCount()>0) {
					if (!b) { Ext.Msg.alert(this.errorTitleText, this.xaxisRequiredErrorText); res = false;}
				}
				else {
					Ext.Msg.alert(this.errorTitleText, this.layersRequiredErrorText);
					res = false;
				}
			}
			else {
				Ext.Msg.alert(this.errorTitleText, this.nameRequiredErrorText);
				res = false;
			}
			return res;
		};
		
		 getLayers = function(layersArr){
			var store = chartLayersPanel.getStore();	
			var valid = true;	// is x_axis not null?
			store.each(
				function(record){  
					layersArr.push(record.data.name);
				}				
			);
			return valid;
		};
		
		saveChart = function(scope) {	// save chart method
			var layersArr = new Array();
			if (!checkFields.call(scope||this, getLayers(layersArr), scope)) return;
			// prepare record
			var record = {
				url: scope.target.layerSources[sourceComboBox.getValue()].url,
				chartId: scope.chartId ? scope.chartId : Date.now(),
				name: chartName.getValue(),	
				x_axis: fieldXvar.getValue(),
				y_axis: fieldYvar.getValue(),
				layers: layersArr
			}
			sendData(record, scope);	
		};
		
        var sourceComboBox = new Ext.form.ComboBox({
            id: "sourceComboBox",
			store: sources,
            valueField: "id",
            displayField: "title",
            triggerAction: "all",
            editable: false,
            allowBlank: false,
            forceSelection: true,
            mode: "local",
            width: 200,
            value: data[idx][0],
			isServiceLoaded : function (title)
			{
				var result = false;
				for (var i = 0; i < this.store.data.length; i++)
				{
					if (this.store.data.items[i].data.title === title)
					{
						result = true;
						break;
					}
				}
				return result;
			},
			setSelection : function (idx)                       //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			{
				this.setValue (this.store.data.items[idx].data.title);
				this.fireEvent("select", this, this.store.data.items[idx]);
			},                                                  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			getServiceIDX : function (title, group)
			{
				var result = -1;
				if (title)
				{
					for (var i = 0; i < this.store.data.length; i++)
					{
						if (this.store.data.items[i].data.title === title)
						{
							result = i;
							break;
						}
					}
				}
				if ((result === -1) && group)
				{
				for (var i = 0; i < this.store.data.length; i++)
				{
					if (this.store.data.items[i].data.id.indexOf(group) === 0)
					{
						result = i;
						break;
					}
				}
				}
				return result;
			},
			getServiceRecord : function (idx)
			{
				return this.store.data.items[idx];
			},                                                  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            listeners: {
                select: function(combo, record, index)
				{
					
					if (app.layerSources[sourceComboBox.getValue()]) {
						
						capGridPanel.enable();
						chartLayersPanel.enable();
					}
					else {
						Ext.Msg.alert("Ошибка", "Невозможно получить информацию от данного источника");
						capGridPanel.disable();
						chartLayersPanel.disable();
					}	
					//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					chartLayersPanel.getStore().filter("server",sourceComboBox.getValue());  // set selected layers filter					
					if (record.get("id") === 'rss')
					{
						var source = this.target.layerSources['rss'];
						if (!source)
							source = new gxp.plugins.RssSource();
						if (source)
						{
							capGridPanel.reconfigure(source.getLayersStore(), capGridPanel.getColumnModel());
							capGridPanel.getView().focusRow(0);
						}						
					}
					//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					else if (record.get("id") === 'chart')
					{
						var source = this.target.layerSources['chart'];
						if (!source)
							source = new gxp.plugins.ChartSource();
						if (source)
						{
							capGridPanel.reconfigure(source.getLayersStore(), capGridPanel.getColumnModel());
							capGridPanel.getView().focusRow(0);
						}						
					}
					//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					else if (record.get("id").indexOf ('arcgis93_') == 0)
					{
						var source = this.target.layerSources['arcgis93'];
						if (!source)
							source = new gxp.plugins.ArcGIS93Source();
						if (source)
						{
							var url = source.getLayersURL(record.get("title"));
							capGridPanel.reconfigure(source.getLayersStore(url), capGridPanel.getColumnModel());
							capGridPanel.getView().focusRow(0);
						}
					}
					//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					else
					{
						var source = this.target.layerSources[record.get("id")];
						capGridPanel.reconfigure(source.store, capGridPanel.getColumnModel());
						// TODO: remove the following when this Ext issue is addressed
						// http://www.extjs.com/forum/showthread.php?100345-GridPanel-reconfigure-should-refocus-view-to-correct-scroller-height&p=471843
						capGridPanel.getView().focusRow(0);
						this.setSelectedSource(source);
					}
					
                },
                scope: this
            }
        });
        
		var chartName = new Ext.form.TextField({
			fieldLabel: this.chartNameText,
			id: 		'chartName',
			name:       'chartName',
			anchor:     '100%',
			grow:        false
		  });
		  

		var fieldXvar = new Ext.form.ComboBox({
            id: "fieldX",
			store: Ext4.create('Ext.data.Store', {
				fields: [{name: 'id', type: 'string'},{name: 'name',  type: 'string'}]
			}),
			mode: 'local',
			editable: false,
            valueField: "id",
            displayField: "name",
			triggerAction: 'all',
            width: 100
		});
		
		var fieldYvar = new Ext.form.ComboBox({
            id: "fieldY",
			store: Ext4.create('Ext.data.Store', {
				fields: [{name: 'id', type: 'string'},{name: 'name',  type: 'string'}]
			}),
			mode: 'local',
			editable: false,
            valueField: "id",
            displayField: "name",
			triggerAction: 'all',
            width: 100
		});
		
		var refreshFieldsStores = function() {
			layer = app.layerSources[sourceComboBox.getValue()].url.split("resources/")[1].split("/wms")[0] + ":" + Ext.getCmp("chartLayersPanel").getStore().data.items[0].data.name;
			
			var params = {
				BBOX: "-30545459.490957,-11016716.011152,30545459.490957,11016716.011152"
				,FEATURE_COUNT: 1
				,HEIGHT: 563
				,INFO_FORMAT: "text/plain"				
				,REQUEST: "GetFeatureInfo"
				,SERVICE: "WMS"
				,VERSION: "1.1.1"
				,WIDTH: 1561
				,X: 919
				,Y: 299
				,srs: "EPSG:900913"	
				,QUERY_LAYERS : layer
				,LAYERS : layer
			}
			
			var xFields, yFields;
			var parser = new GeoExt.PrickerParser("translate");			
			parser.doOnParce(setComboBoxes, this);
			
			var r = OpenLayers.Request.POST({
			  url: app.layerSources[sourceComboBox.getValue()].url.split(layer.split(":")[0])[0]+"wms",
			  data: OpenLayers.Util.getParameterString(params),
			  headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			  },
			  callback: function(respond){
				if(respond.status == 200){
					parser.parse([respond.responseText]);
				}
				else {
					Ext.Msg.alert(this.errorText, this.wrongAxisRequest);
				}
			  }
			});
						
		}
		
		new Ext.Button({
			text: this.addServerText,
			id: "refreshBtn",
			hidden: true,
			handler: function() {
				refreshFieldsStores();
			}
		})
		
		var setComboBoxes = function(json) {
			var fieldXStoreData = json.fieldsXData;
			fieldXvar.store.loadData(fieldXStoreData);
			this.fieldYStoreData = json.fieldsYData;
			fieldYvar.store.loadData(fieldYStoreData);
			Ext.getCmp("capGrid").refreshAxis();
		}
		
        var capGridToolbar = null;
        if (this.target.proxy || data.length > 1) {
            capGridToolbar = [
				new Ext.Toolbar.TextItem({
					text: this.layerSelectionText
				}),
				sourceComboBox,			
				new Ext.Button({
					text: this.addServerText,
					iconCls: "gxp-icon-addserver",
					handler: function() {
						newSourceWindow.show();
					}
				})
            ];
        }
        
        if (this.target.proxy) {
            capGridToolbar.push( "->",[		
				new Ext.Toolbar.TextItem({
					text: this.chartNameText
				}),
				chartName,  
				new Ext.Toolbar.TextItem({
					text: this.XText
				}),
				fieldXvar,
				new Ext.Toolbar.TextItem({
					text: this.YText
				}),
				fieldYvar			
			]);
        }
			
        
		setSource = function(rec, scope) {
			var url = rec.get("url").split("?")[0]
			var title, restUrl;
			var found = false;
			// try to find server
			wmsStore.each(function(wmsRec) {
				if (wmsRec.get("url") == url) { 
					title = wmsRec.get("serverName");
					restUrl = wmsRec.get("restUrl"); 	
					found = true;
				}
			});
			
			if (!found) {				
				Ext.Msg.alert(scope.errorText, scope.aimationInvalidErrorText);
				return false;
			}
			
			var conf = {url: url, restUrl: restUrl};
			if (title) {
				conf.title = title;
			}
						
			app.addLayerSource({                // !!!!!!! target !!!!!!!!
				config: conf, // assumes default of gx_wmssource
				callback: function(id) {
					// add to combo and select
					var record = new sources.recordType({
						id: id,
						title: app.layerSources[id].title || this.untitledText
					});
					sources.insert(0, [record]);
					sourceComboBox.onSelect(record, 0);
					populateSelectedLayers(rec, id);
				},
				scope: this
			});
				
			return true;
		}
		
		var populateSelectedLayers = function(rec, server) {
			var chartStore = Ext.getCmp("chartLayersPanel").getStore();
			var layersStore = Ext.getCmp("capGridPanel").getStore();
			
			chartRec = Ext.data.Record.create([
				{name: "title", type: "string"},
				{name: "name", type: "string"},
				{name: "x_axis", type: "string"},
				{name: "server", type: "string"}
			]);

			rec.data.names = new Array();
			
			for (var i = 0; i < rec.data.layers.length; i++){
				for (var j=0; j<layersStore.data.items.length; j++) {
					if (layersStore.data.items[j].data.name==rec.data.layers[i])
						rec.data.names[i] = layersStore.data.items[j].data.title;
				}
			}
			
			chartStore.removeAll();
			for (var i = 0; i < rec.data.layers.length; i++) {
				var record = new chartRec({
					title: rec.data.names[i],
					name: rec.data.layers[i],
					x_axis: rec.data.x_axis[i],
					server: server
				});	
				chartStore.add(record);
			}								
			chartStore.commitChanges();
			
			if (rec) {
				Ext.getCmp("fieldX").setValue(rec.data.x_axis, 0);
				Ext.getCmp("fieldY").setValue(rec.data.y_axis, 0);
				refreshFieldsStores();														
			}
		}		
		
        var newSourceWindow = new gxp.NewSourceWindow({
            modal: true,
            listeners: {
                "server-added": function(url, restUrl, titleCustom, icon) {
					if (newSourceWindow.getServiceIDX() === 0)          //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					{
						var idx = sourceComboBox.getServiceIDX (titleCustom);
						if (idx === -1)
						{
							newSourceWindow.setLoading();
                    
							var conf = {url: url, restUrl: restUrl};
							if(titleCustom){
								conf.title = titleCustom;
							}
                    
							this.target.addLayerSource({                // !!!!!!! target !!!!!!!!
								config: conf, // assumes default of gx_wmssource
								callback: function(id) {
									// add to combo and select
									var record = new sources.recordType({
										id: id,
										title: this.target.layerSources[id].title || this.untitledText
									});
									sources.insert(0, [record]);
									sourceComboBox.onSelect(record, 0);
									newSourceWindow.hide();
								},
								fallback: function(source, msg) {
									newSourceWindow.setError(
										new Ext.Template(this.addLayerSourceErrorText).apply({msg: msg})
									);
								},
								scope: this
							});
						} else {                                         //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
							newSourceWindow.hide();
							sourceComboBox.setSelection (idx);
							sourceComboBox.onSelect(sourceComboBox.getServiceRecord(idx), idx);
						}
					} else if (newSourceWindow.getServiceIDX() === 1) {
						if (!sourceComboBox.isServiceLoaded(titleCustom))
						{
							arcgisStore.reader.jsonData.arcgis.servers.push({'title': titleCustom, 'url' : url});
							var record = new sources.recordType({
								id: 'arcgis93_' + arcgisStore.reader.jsonData.arcgis.servers.length,
								title: titleCustom
							});
							sources.insert(sourceComboBox.store.data.length, [record]);
							sourceComboBox.store.data.items[sourceComboBox.store.data.length - 1].json = ['arcgis', titleCustom];

							var idx = sourceComboBox.getServiceIDX (titleCustom);
//							if ((idx >= 0) && (sourceComboBox.lastSelectionText != titleCustom))
							if (idx >= 0)
							{
								newSourceWindow.setLoading();
								sourceComboBox.setSelection (idx);
								sourceComboBox.onSelect(record, idx);
							}
							OpenLayers.Request.issue({
								method: "POST",
								url: "save",
								async: true,
								params:{
								    service : "arcgis"   ,
									title   : titleCustom,
									url     : url
								}
							});
						}
					} else if (newSourceWindow.getServiceIDX() === 2) {
//						console.log ('newSourceWindow.listeners : RSS - titleCustom = ' + titleCustom + ', url = ' + url);
						var idx = sourceComboBox.getServiceIDX ('', 'rss');
						if (idx >= 0)
						{
							var fname;
							var parts = url.split("/");
							if (parts)
								fname = parts[parts.length-1];
							else
								fname = 'Unreachable';
							if (fname.indexOf(".") > 0)
								fname = fname.substring (0, fname.indexOf("."));

							if (!rssStore.isRecordPresent (url))
							{
								var record = Ext.data.Record.create([
									{name: "timer", type: "integer"},
									{name: "name" , type: "string" },
									{name: "title", type: "string" },
									{name: "icon" , type: "string" },
									{name: "url"  , type: "string" }
								]); 
								var data = new record({
									timer: 0,
									name: fname,
									title: titleCustom,
									icon: icon,
									url : url
								}); 
							
								rssStore.add(data);
								// send to server => write to file
								OpenLayers.Request.issue({
									method: "POST",
									url: "save",
									async: true,
									params:{
									    service : "rss"      ,
										name    : fname      ,
										title   : titleCustom,
										icon    : icon       ,
										url     : url
									}
								});
							}
							sourceComboBox.onSelect (sourceComboBox.store.data.items[idx], idx);
						}
					}                                                     //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                },
                scope: this
            }
        });
        
		var items = {
            xtype: "container",
            layout:'border',
			region: 'center',
			defaults: {
				split: true,
			},
            items: [capGridPanel, chartLayersPanel]
        };
        
        if (this.instructionsText) {
            items.items.push({
                xtype: "box",
                autoHeight: true,
                autoEl: {
                    tag: "p",
                    cls: "x-form-item",
                    style: "padding-left: 5px; padding-right: 5px"
                },
                html: this.instructionsText
            });
        }
        
        var bbarItems = [
            "->",            
            new Ext.Button({
                text: this.cancelText,
				iconCls: "cancel",
                handler: function() {
					this.capGrid.hide();
                },
                scope: this
            }),
			new Ext.Button({
                text: this.doneText,
				iconCls: "save",
                handler: function() {
					saveChart(this);					
                },
                scope: this
            })
        ];

        //TODO use addOutput here instead of just applying outputConfig
        this.capGrid = new Ext.Window(Ext.apply({
            title: this.windowTitle,
            layout: 'border',   
			closeAction: "hide",
			id: 'capGrid',
            height: 450,
            width: this.windowsWidth,			
            modal: true,
			split: true,
			maximizable: true,
            items: items,
            tbar: capGridToolbar,
            bbar: bbarItems,
            defaults: {
				columnWidth: 0.5
			},
			refreshAxis: function() {
				if (Ext.getCmp("fieldX").value) Ext.getCmp("fieldX").setValue(Ext.getCmp("fieldX").value);
				if (Ext.getCmp("fieldY").value) Ext.getCmp("fieldY").setValue(Ext.getCmp("fieldY").value);
			},
			listeners: {
				afterRender: function() {					
					if (Ext.getCmp("fieldX").value) Ext.getCmp("fieldX").selectByValue(Ext.getCmp("fieldX").value, true);
					if (Ext.getCmp("fieldY").value) Ext.getCmp("fieldY").selectByValue(Ext.getCmp("fieldY").value, true);
				},
                hide: function(win) {                   
					chartLayersPanel.getStore().removeAll();
					Ext.getCmp("chartName").setValue("");
					this.chartId = null;
					this.updateCallback = null;
                },
                show: function(win) {
                    this.setSelectedSource(this.target.layerSources[data[idx][0]]);
                },
                scope: this
            }
        }, this.initialConfig.outputConfig));        
    },
    
    /** private: method[setSelectedSource]
     *  :arg: :class:`gxp.plugins.LayerSource`
     */
    setSelectedSource: function(source) {
        this.selectedSource = source;
        this.fireEvent("sourceselected", this, source);
    },

    //ADDED
    selectOrAddSource: function(detail, callback){
      var serverUrl = this.target.uploadUrl.split('/rest')[0]
      var workspace = detail.import.targetWorkspsace.workspace.name
      var sourceFound = false
      for(key in this.target.layerSources){
        var source = this.target.layerSources[key]
        if( source.url == serverUrl + '/wms' || source.url == serverUrl + '/' + workspace + '/wms' ){

          this.setSelectedSource( source )
          callback()
          sourceFound = true

        }

      }

      if(!sourceFound) this.target.addLayerSource( {
        config: {
          url: serverUrl + '/' + workspace + '/wms',
          restUrl: serverUrl + '/rest',
          title: workspace
        },
        callback: function(key){
          this.setSelectedSource(this.target.layerSources[key])
          callback.apply(this);
        },
        scope: this
      } )

    },

    //ADDED from 354723574e
    /** private: method[ChartEditor]
     *  :arg records: ``Array`` the layer records to add
     *  :arg source: :class:`gxp.plugins.LayerSource` The source to add from
     *  :arg isUpload: ``Boolean`` Do the layers to add come from an upload?
     */
    ChartEditor: function(records, source, isUpload) {
        source = source || this.selectedSource;
        var layerStore = this.target.mapPanel.layers,
            extent, record, layer;
        for (var i=0, ii=records.length; i<ii; ++i) {
            record = source.createLayerRecord({
                name: records[i].get("name"),
                source: source.id
            });
            if (record) {
                layer = record.getLayer();
                if (layer.maxExtent) {
                    if (!extent) {
                        extent = record.getLayer().maxExtent.clone();
                    } else {
                        extent.extend(record.getLayer().maxExtent);
                    }
                }
                if (record.get("group") === "background") {
                    layerStore.insert(0, [record]);
                } else {
                    layerStore.add([record]);
                }
            }
        }
        if (extent) {
            this.target.mapPanel.map.zoomToExtent(extent);
        }
        if (isUpload && this.postUploadAction && records.length === 1 && record) {
            // show LayerProperties dialog if just one layer was added
            this.target.selectLayer(record);
            var outputConfig,
                actionPlugin = this.postUploadAction;
            if (!Ext.isString(actionPlugin)) {
                outputConfig = actionPlugin.outputConfig;
                actionPlugin = actionPlugin.plugin;
            }
            this.target.tools[actionPlugin].addOutput(outputConfig);
        }
    },
    
    /** private: method[isEligibleForUpload]
     *  :arg source: :class:`gxp.plugins.LayerSource`
     *  :returns: ``Boolean``
     *
     *  Determine if the provided source is eligible for upload given the tool
     *  config.
     */
    isEligibleForUpload: function(source) {
        return (
            source.url &&
            (this.relativeUploadOnly ? (source.url.charAt(0) === "/") : true) &&
            (this.nonUploadSources || []).indexOf(source.id) === -1
        );
    },
    
    /** api: config[createExpander]
     *  ``Function`` Returns an ``Ext.grid.RowExpander``. Can be overridden
     *  by applications/subclasses to provide a custom expander.
     */
    createExpander: function() {
        return new Ext.grid.RowExpander({
            tpl: new Ext.Template(this.expanderTemplateText)
        });
    }
	
	});
Ext.preg(gxp.plugins.ChartEditor.prototype.ptype, gxp.plugins.ChartEditor);
