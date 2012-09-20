/** api: constructor
 *  .. class:: ChartManager(config)
 *
 *    Plugin for removing a selected layer from the map.
 *    TODO Make this plural - selected layers
 */
gxp.plugins.ChartManager = Ext.extend(gxp.plugins.Tool, {
    
    /** api: ptype = gxp_chartManager */
    ptype: "gxp_chartManager",
    	
	/** api: config[saveText]
     *  ``String``
     *  Text for save message header
     */
	saveText: "Save",
	
	/** api: config[windowTitle]
     *  ``String``
     *  Text for windows header
     */
	windowTitle: "Chart manager",
	
	/** api: config[addChartText]
     *  ``String``
     *  Text for windows header
     */
	addChartText: "Add",
	
	/** api: config[chartTitleText]
     *  ``String``
     *  Text for column header
     */
	chartTitleText: "Title",
	
	/** api: config[ownerTitleText]
     *  ``String``
     *  Text for column header
     */
	ownerTitleText: "Owner",
	
	/** api: config[editBtnText]
     *  ``String``
     *  Text for column header
     */
	editBtnText: "Edit",
	
	/** api: config[deleteBtnText]
     *  ``String``
     *  Text for column header
     */
	deleteBtnText: "Delete",
	
	/** api: config[doneText]
     *  ``String``
     *  Text for column header
     */
	doneText: "Done",
	
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
	

	/** private: property[windowsWidth]  
	 * ``Integer``
     */
    windowsWidth: 1000,
	
	/** private: property[windowsHeight]  
	 * ``Integer``
     */
    windowsHeight: 500,
	
	/** private: property[askForDeleteHeaderText]  
	 * ``String``
     */
	askForDeleteHeaderText: "Delete chart",
	
	/** private: property[askForDeleteText]  
	 * ``String``
     */
	askForDeleteText: "Are you sure?",
	
	/** private: property[yesText]  
	 * ``String``
     */
	yesText: "Yes",
	
	/** private: property[noText]  
	 * ``String``
     */
	noText: "No",
	
    /** private: method[constructor]
     */
    constructor: function(config) {
        this.addEvents(
            /** api: event[sourceselected]
             *  Fired when a new source is selected.
             *
             *  Listener arguments:
             *
             *  * tool - :class:`gxp.plugins.ChartManager` This tool.
             *  * source - :class:`gxp.plugins.LayerSource` The selected source.
             */
            "sourceselected"
        );
        gxp.plugins.ChartManager.superclass.constructor.apply(this, arguments);        
    },
    
    
    /** api: method[showChartWindow]
     * Shows the window with a chart grid.
     */
    showChartWindow: function() {
        if(!this.chartGrid) {
            this.initChartGrid();
        }
        this.chartGrid.show();
    },

    /**
     * private: method[initChartGrid]
     * Constructs a window with a chart grid.
     */
    initChartGrid: function() {
        var source = new gxp.plugins.ChartSource();
		var chartStore = source.getLayersStore();
		
        var chartGridPanel = new Ext.grid.GridPanel({
            id: "chartGridPanel",
			store: chartStore,
            autoScroll: true,
            flex: 1,
			region: "west",
            autoExpandColumn: "url",
            colModel: new Ext.grid.ColumnModel([
                {id: "title", header: this.chartTitleText, dataIndex: "title", sortable: true, width: 200},
				{id: "url", header: "URL", dataIndex: "url", sortable: false},
				{
					// this action column allow to include chosen layer to chart
					header: this.actionText,
					xtype:'actioncolumn',
					width:80,
					items: [{
								iconCls: "gxp-icon-edit",	//	new class in all.css
								tooltip: this.editBtnText,
								handler: function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
									editChart(rec.get("chartId"));																		
								}
							},
							{
								iconCls: "gxp-icon-exclude",	//	new class in all.css
								tooltip: this.deleteBtnText,
								scope: this,
								handler: function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
									askForDelete(rec, this);
								}
							}]
				}
            ]),					
            listeners: {
                scope: this,				
				afterrender: function() {
					var menu = chartGridPanel.getView().hmenu.items;				
 					for (var i in menu.items) {
						if (menu.items[i].itemId=="asc") menu.items[i].text = this.ascText;
						else if (menu.items[i].itemId=="desc") menu.items[i].text = this.descText;
						else if (menu.items[i].itemId=="columns") menu.items[i].text = this.colText;
					}
				}
            }
        });

		var askForDelete = function (rec,scope) {
			Ext.Msg.show({
				title: scope.askForDeleteHeaderText,
				msg: scope.askForDeleteText,
				buttons: {
					yes: scope.yesText,
					no:  scope.noText
				},
				fn: function (btn){
					if(btn=='yes'){     
						deleteChart(rec.get("chartId"));
					}
				}
			});
		};
		
		var deleteChart = function  (chartId) {
			OpenLayers.Request.issue({
				method: "GET",
				url: "save",
				async: true,
				params:{
					service : "chart",
					action  : "remove",
					chartId  : chartId
				},
				callback: function(request) 
				{					
					refreshGrid();
				}					
			});
		};		
		
		var editChart = function (id) {
			app.tools.gxp_chartWin_ctl.showChartWindow({layerId:id, updateCallback: refreshGrid});
		};		
		
		var refreshGrid = function() {
			Ext.getCmp("chartGridPanel").getStore().reload();
		}
		
        var chartGridToolbar = null;
        if (this.target.proxy || data.length > 1) {
            chartGridToolbar = [ 
				{
					xtype: 'button',
					text : this.addChartText,
					iconCls: 'add',
					leaf : true,
					listeners: {
						click: function(n) {
						  return app.tools.gxp_chartWin_ctl.showChartWindow({updateCallback: refreshGrid});
						  
						}
					}
				}
            ];
        }

        var items = {
            xtype: "container",
            region: "center",
            layout: "vbox",
            layoutConfig: {
                align: 'stretch'
            },
            items: [chartGridPanel]
        };
		
		// ready btn
        var bbarItems = [
            "->",            
            new Ext.Button({
                text: this.doneText,
				iconCls: "save",
                handler: function() {
					this.chartGrid.hide();
                },
                scope: this
            })
        ];
             
        //TODO use addOutput here instead of just applying outputConfig
        this.chartGrid = new Ext.Window(Ext.apply({
            title: this.windowTitle,
            closeAction: "hide",
            layout: "border",
            width: this.windowsWidth,						
			height: this.windowsHeight,
            modal: true,
            items: items,
            tbar: chartGridToolbar,
            bbar: bbarItems,
            listeners: {
                hide: function(win) {
                    chartGridPanel.getSelectionModel().clearSelections();
                },                
                scope: this
            }
        }, this.initialConfig.outputConfig));

	},	
    //ADDED from 354723574e
    /** private: method[ChartManager]
     *  :arg records: ``Array`` the layer records to add
     *  :arg source: :class:`gxp.plugins.LayerSource` The source to add from
     *  :arg isUpload: ``Boolean`` Do the layers to add come from an upload?
     */   
   ChartManager: function(records, source, isUpload) {
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
    }
    
	});
Ext.preg(gxp.plugins.ChartManager.prototype.ptype, gxp.plugins.ChartManager);
