/** api: constructor
 *  .. class:: UploadPlugin(config)
 *
 *    Plugin for removing a selected layer from the map.
 *    TODO Make this plural - selected layers
 */
gxp.plugins.UploadPlugin = Ext.extend(gxp.plugins.Tool, {
    
    /** api: ptype = gxp_uploadplugin */
    ptype: "gxp_uploadplugin",
	
	uploadText: "Uploading data",
	addActionTip: "Upload data",

    /** private: method[constructor]
     */
    constructor: function(config) {
        this.addEvents(
            /** api: event[sourceselected]
             *  Fired when a new source is selected.
             *
             *  Listener arguments:
             *
             *  * tool - :class:`gxp.plugins.UploadPlugin` This tool.
             *  * source - :class:`gxp.plugins.LayerSource` The selected source.
             */
            "sourceselected"
        );
        gxp.plugins.UploadPlugin.superclass.constructor.apply(this, arguments);        
    },
    
    /** api: method[addActions]
     */
    addActions: function() {
        var actions = gxp.plugins.UploadPlugin.superclass.addActions.apply(this, [{
            tooltip : this.addActionTip,
            menuText: this.addActionMenuText,
            disabled: true,
            iconCls: "gxp-icon-filebrowse",
            handler : this.showImporterWindow,
            scope: this
        }]);
        
        this.target.on("ready", function() {actions[0].enable();});
        return actions;
    },
        

    showImporterWindow: function() {
        var panel = new gxp.LayerUploadPanel(Ext.apply({
			url: this.target.uploadUrl,
			width: 350,
			border: false,
			bodyStyle: "padding: 10px 10px 0 10px;",
			frame: true,
			labelWidth: 65,
			defaults: {
				anchor: "95%",
				allowBlank: false,
				msgTarget: "side"
			}
		}));
		
		this.window = new Ext.Window({
			title: this.uploadText,
			modal: true,
			resizable: false,
			items: [panel]
		});
		this.window.show();
    },


	
});

Ext.preg(gxp.plugins.UploadPlugin.prototype.ptype, gxp.plugins.UploadPlugin);
