/** api: constructor
 *  .. class:: ChartEditor(config)
 *
 *    Plugin for removing a selected layer from the map.
 *    TODO Make this plural - selected layers
 */
gxp.plugins.ChartEditor = Ext.extend(gxp.plugins.Tool, {
    
    /** api: ptype = gxp_ChartEditor */
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
	chartNameText: "Chart name",
    
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
	nameRequiredErrorText: "Please enter chart name",
	
	/** api: config[isDefaultText]
     *  ``String``
     *  Text for an error message when there are no layers in chart.
     */
	isDefaultText: "Default",
	
	/** api: config[xAxisText]
     *  ``String``
     *  Text for an error message when there are no layers in chart.
     */
	xAxisText: "X Label",
	
	/** api: config[yAxisText]
     *  ``String``
     *  Text for an error message when there are no layers in chart.
     */
	yAxisText: "Y Label",
	
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
    selectSourceText: "Layers source",
    
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
    windowTitle: "Chart editor",

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
    windowsWidth: 550,
	
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
    
    /** api: method[showChartWindow]
     * Shows the window with a capabilities grid.
     */
    showChartWindow: function(options) {
        var valid = true;
		if(!this.chartWin) {
            this.initCharts();
        }
        if (options.chartId) {
			valid = this.setFields(options.chartId, this);
			this.chartId = options.chartId;
		}
		if (options.updateCallback) this.updateCallback = options.updateCallback;
		if (valid) this.chartWin.show();		
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
					Ext.getCmp("xAxis").setValue(rec.get("x_axis"));
					Ext.getCmp("yAxis").setValue(rec.get("y_axis"));
					Ext.getCmp("isDefault").setValue(rec.get("isDefault"));
					valid = setSource(rec, scope);										
				}
			});
		}
		return valid;
	},
	
	/**
     * private: method[initCharts]
     * Constructs a window with a capabilities grid.
     */
    initCharts: function() {
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

        var chartWinPanel = new Ext.grid.GridPanel({
            id: "chartWinPanel",
			store: this.target.layerSources[data[idx][0]].store,
            autoScroll: true,
			title: this.availableLayersText,
			autoHeight: true,
			split: true,
			/*width:'50%',
			height: '100%',
            flex: 1,*/
			//height: 0.8 * Ext.lib.Dom.getViewHeight(),
			//region: "west",
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
																		
								}
							}]
				}
            ]),
            listeners: {
                scope: this,				
				afterrender: function() {
					var menu = chartWinPanel.getView().hmenu.items;				
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
				fields: ['title', 'name', 'x_axis', 'server'],
				reader: new Ext.data.JsonReader(
					{root:'chartLayers'},
					['title', 'name', 'x_axis', 'server']	// server - current server name, used to filter layers by source
				)
			},
            autoScroll: true,
			title: this.chosenLayersText,
            autoHeight: true,
			split: true,
			/*flex: 1,
			width:'50%',*/
			//height: 0.8 * Ext.lib.Dom.getViewHeight(),
			//region: 'east',
			clicksToEdit:1,
            autoExpandColumn: "title",
            colModel: new Ext.grid.ColumnModel([
                {header: this.panelTitleText, dataIndex: "title", sortable: true, id: "title"},
                {header: "Id", dataIndex: "name", width: 120, sortable: true},
				{header: this.panelLabelText, dataIndex: "x_axis", width: 120, sortable: true,	// user-editable text field to define x-axis label
						editor: {
						xtype:'textfield',
					}
				},
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
								}
							},
							{
								// manage layers order
								iconCls: "gxp-icon-moveup",
								tooltip: this.moveUpBtnText,
								handler: function(grid, rowIndex, colIndex) {
									var record = grid.getStore().getAt(rowIndex);
									moveRecord(record,grid.getStore(),true);
								}
							},
							{
								// manage layers order
								iconCls: "gxp-icon-movedown",
								tooltip: this.moveDownBtnText,
								handler: function(grid, rowIndex, colIndex) {
									var record = grid.getStore().getAt(rowIndex);
									moveRecord(record,grid.getStore(),false);									
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
					name   : record.name,
					chartId  : record.chartId,
					url   	: record.url+"?service=WMS&request=GetMap",
					x_axis  : record.x_axis,
					y_axis  : record.y_axis,
					isDefault : record.isDefault
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
				this.chartWin.hide();
				chartName.setValue("");
				xAxis.setValue("");
				yAxis.setValue("");
				isDefault.setValue(false);
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
		checkFields = function (sc) {
			var res = true;
			if (chartName.getValue()=="") {
				Ext.Msg.alert(this.errorTitleText, this.nameRequiredErrorText);
				res = false;	
			}
			return res;
		};
		
		saveChart = function(scope) {	// save chart method
			if (!checkFields.call(scope||this, scope)) return;
			// prepare record
			//[ 'name' 'chartId', 'url', 'x_axis', 'y_axis', 'isDefault'],
			var record = {
				name : Ext.getCmp("chartName").getValue(),
				url: scope.target.layerSources[sourceComboBox.getValue()].url,
				chartId: scope.chartId ? scope.chartId : Date.now(),
				title: chartName.getValue(),	
				x_axis: Ext.getCmp("xAxis").getValue(),
				y_axis: Ext.getCmp("yAxis").getValue(),
				isDefault: Ext.getCmp("isDefault").getValue()
			}
			sendData(record, scope);	
		};
		
        var sourceComboBox = new Ext.form.ComboBox({
            id: "sourceComboBox",
			store: sources,
            fieldLabel: this.selectSourceText,
			valueField: "id",
            displayField: "title",
            triggerAction: "all",
            editable: false,
            allowBlank: false,
            forceSelection: true,
            mode: "local",
            width: 265,
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
					//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					chartLayersPanel.getStore().filter("server",sourceComboBox.getValue());  // set selected layers filter					
					if (record.get("id") === 'rss')
					{
						var source = this.target.layerSources['rss'];
						if (!source)
							source = new gxp.plugins.RssSource();
						if (source)
						{
							chartWinPanel.reconfigure(source.getLayersStore(), chartWinPanel.getColumnModel());
							chartWinPanel.getView().focusRow(0);
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
							chartWinPanel.reconfigure(source.getLayersStore(), chartWinPanel.getColumnModel());
							chartWinPanel.getView().focusRow(0);
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
							chartWinPanel.reconfigure(source.getLayersStore(url), chartWinPanel.getColumnModel());
							chartWinPanel.getView().focusRow(0);
						}
					}
					//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					else
					{
						var source = this.target.layerSources[record.get("id")];
						chartWinPanel.reconfigure(source.store, chartWinPanel.getColumnModel());
						// TODO: remove the following when this Ext issue is addressed
						// http://www.extjs.com/forum/showthread.php?100345-GridPanel-reconfigure-should-refocus-view-to-correct-scroller-height&p=471843
						chartWinPanel.getView().focusRow(0);
						this.setSelectedSource(source);
					}
                },
                scope: this
            }
        });
        

	   

        
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
				},
				scope: this
			});
				
			return true;
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
        
		
       
        var bbarItems = [
            "->",            
            new Ext.Button({
                text: this.cancelText,
				iconCls: "cancel",
                handler: function() {
					this.chartWin.hide();
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

				
		var chartName = new Ext.form.TextField({
			fieldLabel: this.chartNameText,
			width:		400,
			id: 		'chartName',
			name:       'chartName',
			grow:        false
		  });		      
		

       var layersSource = new Ext.form.CompositeField({
			fieldLabel: this.selectSourceText,			
			items: [
				sourceComboBox,
				{
					xtype: 'button',
					iconCls: "gxp-icon-addserver",
					text: this.addServerText,
					width: 130,
					handler: function() {
						newSourceWindow.show();
					},
					visible: this.target.proxy!=null
				}
			]
		});
		
		var xAxis = new Ext.form.TextField({
			fieldLabel: this.xAxisText,
			width:		400,
			id: 		'xAxis',
			name:       'xAxis',
			grow:        false
		});	
		
		var yAxis = new Ext.form.TextField({
			fieldLabel: this.yAxisText,
			width:		400,
			id: 		'yAxis',
			name:       'yAxis',
			grow:        false
		});			
		
		var isDefault = new Ext.form.Checkbox({
			fieldLabel: this.isDefaultText,
			id: 		'isDefault',
			name:       'isDefault',
			grow:        false
		});	
		
        //TODO use addOutput here instead of just applying outputConfig
        this.chartWin = new Ext.Window(Ext.apply({
            title: this.windowTitle,
            layout: 'fit',   			
			bodyPadding: 5,
			closeAction: "hide",
            height: 250,
            width: this.windowsWidth,			
            modal: true,
			split: true,
			resizable: false,
            items: [
					new Ext.Panel({
						plain: true,
						border: 0,
						bodyPadding: 5,
						bodyStyle: 'padding: 5px;',
						layout: 'form',
						items: [ layersSource, chartName,  xAxis, yAxis, isDefault] 
					})
				],
            //tbar: chartWinToolbar,
            bbar: bbarItems,
            defaults: {
				columnWidth: 0.5
			},
			listeners: {
                hide: function(win) {                   
//					chartLayersPanel.getStore().removeAll();
					chartName.setValue("");
					xAxis.setValue("");
					yAxis.setValue("");
					isDefault.setValue(false);
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
