(function() {

  Ext.apply(gxp.plugins.LayerProperties.prototype, {

	// OVERRIDED cmpId added
	addActions: function() {
        var actions = gxp.plugins.LayerProperties.superclass.addActions.apply(this, [{
            menuText: this.menuText,
            iconCls: "gxp-icon-layerproperties",
			id: 'layerPropertiesButton',
            disabled: true,
            tooltip: this.toolTip,
            handler: function() {
                this.removeOutput();
                this.addOutput();
            },
            scope: this
        }]);
        var layerPropertiesAction = actions[0];

        this.target.on("layerselectionchange", function(record) {
            layerPropertiesAction.setDisabled(
                !record || !record.get("properties")
            );
        }, this);
        return actions;
    },
  
    //OVERRIDED featureManager added (for WMSLayerPanel)
    addOutput: function(config) {
        //additional output setting
        this.outputConfig.width = 420;

        config = config || {};
        var record = app.selectedLayer;
        var origCfg = this.initialConfig.outputConfig || {};
        this.outputConfig.title = origCfg.title ||
            this.menuText + ": " + record.get("title");
        
        //TODO create generic gxp_layerpanel
        var xtype = record.get("properties") || "gxp_layerpanel";
        var panelConfig = this.layerPanelConfig;
        var featureManager = app.tools[this.featureManager];
        if (panelConfig && panelConfig[xtype]) {
            Ext.apply(config, panelConfig[xtype]);
        }
        return gxp.plugins.LayerProperties.superclass.addOutput.call(this, Ext.apply({
            xtype: xtype,
            authorized: app.isAuthorized(),
            layerRecord: record,
            source: app.getSource(record),
            featureManager: featureManager,
            defaults: {
                style: "padding: 10px",
                autoHeight: this.outputConfig.autoHeight
            },
            listeners: {
                added: function(cmp) {
                    if (!this.outputTarget) {
                        cmp.on("afterrender", function() {
                            cmp.ownerCt.ownerCt.center();
                        }, this, {single: true});
                    }
                },
                scope: this
            }
        }, config));
    }

  });
})();
