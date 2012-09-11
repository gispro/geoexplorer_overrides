/** api: constructor
 *  .. class:: AnimationGrid(config)
 *
 *    Plugin for removing a selected layer from the map.
 *    TODO Make this plural - selected layers
 */
gxp.plugins.AnimationGrid = Ext.extend(gxp.plugins.Tool, {
    
    /** api: ptype = gxp_animationGrid */
    ptype: "gxp_animationGrid",
    	
	/** api: config[saveText]
     *  ``String``
     *  Text for save message header
     */
	saveText: "Save",
	
	/** api: config[windowTitle]
     *  ``String``
     *  Text for windows header
     */
	windowTitle: "Animation Manager",
	
	/** api: config[addAnimationText]
     *  ``String``
     *  Text for windows header
     */
	addAnimationText: "Add",
	
	/** api: config[animationTitleText]
     *  ``String``
     *  Text for column header
     */
	animationTitleText: "Title",
	
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
    
    /** private: property[selectedSource]
     *  :class:`gxp.plugins.LayerSource`
     *  The currently selected layer source.
     */
    selectedSource: null,

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
	askForDeleteHeaderText: "Delete animation",
	
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
             *  * tool - :class:`gxp.plugins.AnimationGrid` This tool.
             *  * source - :class:`gxp.plugins.LayerSource` The selected source.
             */
            "sourceselected"
        );
        gxp.plugins.AnimationGrid.superclass.constructor.apply(this, arguments);        
    },
    
    
    /** api: method[showAnimationWindow]
     * Shows the window with a animation grid.
     */
    showAnimationGrid: function() {
        if(!this.animGrid) {
            this.initCapGrid();
        }
        this.animGrid.show();
    },

    /**
     * private: method[initCapGrid]
     * Constructs a window with a animation grid.
     */
    initCapGrid: function() {
        var source = new gxp.plugins.AnimationSource();
		var animationStore = source.getLayersStore();
		
        var animGridPanel = new Ext.grid.GridPanel({
            id: "animGridPanel",
			store: animationStore,
            autoScroll: true,
            flex: 1,
			region: "west",
            autoExpandColumn: "url",
            colModel: new Ext.grid.ColumnModel([
                {id: "title", header: this.animationTitleText, dataIndex: "title", sortable: true, width: 200},
				{id: "url", header: "URL", dataIndex: "url", sortable: false},
				{
					// this action column allow to include chosen layer to animation
					header: this.actionText,
					xtype:'actioncolumn',
					width:80,
					items: [{
								iconCls: "gxp-icon-edit",	//	new class in all.css
								tooltip: this.editBtnText,
								handler: function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
									editAnimation(rec.get("animId"));																		
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
					var menu = animGridPanel.getView().hmenu.items;				
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
						deleteAnimation(rec.get("animId"));
					}
				}
			});
		};
		
		var deleteAnimation = function  (animId) {
			OpenLayers.Request.issue({
				method: "GET",
				url: "save",
				async: true,
				params:{
					service : "animation",
					action  : "remove",
					animId  : animId
				},
				callback: function(request) 
				{					
					refreshGrid();
				}					
			});
		};		
		
		var editAnimation = function (id) {
			app.tools.gxp_animationManager_ctl.showAnimationWindow({layerId:id, updateCallback: refreshGrid});
		};		
		
		var refreshGrid = function() {
			Ext.getCmp("animGridPanel").getStore().reload();
		}
		
        var animGridToolbar = null;
        if (this.target.proxy || data.length > 1) {
            animGridToolbar = [ 
				{
					xtype: 'button',
					text : this.addAnimationText,
					iconCls: 'add',
					leaf : true,
					listeners: {
						click: function(n) {
						  return app.tools.gxp_animationManager_ctl.showAnimationWindow({updateCallback: refreshGrid});
						  
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
            items: [animGridPanel]
        };
		
		// ready btn
        var bbarItems = [
            "->",            
            new Ext.Button({
                text: this.doneText,
				iconCls: "save",
                handler: function() {
					this.animGrid.hide();
                },
                scope: this
            })
        ];
             
        //TODO use addOutput here instead of just applying outputConfig
        this.animGrid = new Ext.Window(Ext.apply({
            title: this.windowTitle,
            closeAction: "hide",
            layout: "border",
            width: this.windowsWidth,						
			height: this.windowsHeight,
            modal: true,
            items: items,
            tbar: animGridToolbar,
            bbar: bbarItems,
            listeners: {
                hide: function(win) {
                    animGridPanel.getSelectionModel().clearSelections();
                },                
                scope: this
            }
        }, this.initialConfig.outputConfig));

	},	
    //ADDED from 354723574e
    /** private: method[AnimationGrid]
     *  :arg records: ``Array`` the layer records to add
     *  :arg source: :class:`gxp.plugins.LayerSource` The source to add from
     *  :arg isUpload: ``Boolean`` Do the layers to add come from an upload?
     */   
   AnimationGrid: function(records, source, isUpload) {
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
Ext.preg(gxp.plugins.AnimationGrid.prototype.ptype, gxp.plugins.AnimationGrid);
