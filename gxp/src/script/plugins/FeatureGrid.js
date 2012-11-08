(function() {
  Ext.apply(gxp.plugins.FeatureGrid.prototype, {
    
    zoomToFeaturesTip: 'Zoom',

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
	
	getFeatureInfoPanelFieldNameHeader: 'Name',
    getFeatureInfoPanelFieldTranslateHeader: 'Translate',
    getFeatureInfoPanelFieldShowHeader: 'Show',
    getFeatureInfoPanelFieldStatisticWindowTitle: 'Statistic',
    getFeatureInfoPanelFieldStatisticHeader: 'Statistic',
    wpsLiterals: {
      Count: 'Count',
      Average: 'Average',
      Max: 'Max',
      Median: 'Median',
      Min: 'Min',
      StandardDeviation: 'StdDev',
      Sum: 'Sum'
    },

    statisticNotAvailableText: 'Statistic not available',
	
	statisticsText: 'Statistic',
	
    //OVERRIDED zoom to features botton added
    /** api: method[addOutput]
     */
    addOutput: function(config) {
        var featureManager = this.target.tools[this.featureManager];
        var map = this.target.mapPanel.map, smCfg;
        // a minimal SelectFeature control - used just to provide select and
        // unselect, won't be added to the map unless selectOnMap is true
        this.selectControl = new OpenLayers.Control.SelectFeature(
            featureManager.featureLayer, this.initialConfig.controlOptions
        );
        if (this.selectOnMap) {
             if (featureManager.paging) {
                this.selectControl.events.on({
                    "activate": function() {
                        map.events.register(
                            "click", this, this.noFeatureClick
                        );
                    },
                    "deactivate": function() {
                        map.events.unregister(
                            "click", this, this.noFeatureClick
                        );
                    },
                    scope: this
                });
            }
            map.addControl(this.selectControl);
            smCfg = {
                selectControl: this.selectControl
            };
        } else {
            smCfg = {
                selectControl: this.selectControl,
                singleSelect: false,
                autoActivateControl: false,
                listeners: {
                    "beforerowselect": function() {
                        if(this.selectControl.active || featureManager.featureStore.getModifiedRecords().length) {
                            return false;
                        }
                    },
                    scope: this
                }
            };
        }
        this.displayItem = new Ext.Toolbar.TextItem({});
        config = Ext.apply({
            xtype: "gxp_featuregrid",
            sm: new GeoExt.grid.FeatureSelectionModel(smCfg),
            autoScroll: true,
            bbar: (featureManager.paging ? [{
                iconCls: "x-tbar-page-first",
                ref: "../firstPageButton",
                tooltip: this.firstPageTip,
                disabled: true,
                handler: function() {
                    featureManager.setPage({index: 0});
                }
            }, {
                iconCls: "x-tbar-page-prev",
                ref: "../prevPageButton",
                tooltip: this.previousPageTip,
                disabled: true,
                handler: function() {
                    featureManager.previousPage();
                }
            }, {
                iconCls: "gxp-icon-zoom-to",
                ref: "../zoomToPageButton",
                tooltip: this.zoomPageExtentTip,
                disabled: true,
                hidden: featureManager.autoZoomPage,
                handler: function() {
                    var extent = featureManager.getPageExtent();
                    if (extent !== null) {
                        map.zoomToExtent(extent);
                    }
                }
            }, {
                iconCls: "x-tbar-page-next",
                ref: "../nextPageButton",
                tooltip: this.nextPageTip,
                disabled: true,
                handler: function() {
                    featureManager.nextPage();
                }
            }, {
                iconCls: "x-tbar-page-last",
                ref: "../lastPageButton",
                tooltip: this.lastPageTip,
                disabled: true,
                handler: function() {
                    featureManager.setPage({index: "last"});
                }
            },

            {xtype: 'tbspacer', width: 10}, this.displayItem] : []).concat(["->"].concat(!this.alwaysDisplayOnMap ? [
              //{
                  //iconCls: "gxp-icon-removelayers",
                  //tooltip: 'clear',
                  //handler: function() {
                    //featureManager.clearFeatureStore()
                  //}
              //},
              {
                  iconCls: "gxp-icon-zoom-to",
                  tooltip: this.zoomToFeaturesTip,
                  handler: function() {
                    var e = featureManager.featureLayer.getDataExtent();
                    if(e)featureManager.target.mapPanel.map.zoomToExtent( e );
                  }
              },
              {
                  text: this.displayFeatureText,
                  enableToggle: true,
                  toggleHandler: function(btn, pressed) {
                      this.selectOnMap && this.selectControl[pressed ? "activate" : "deactivate"]();
                      //Gispro.Utils.moveLayerOnTop(this.target.mapPanel.map,featureManager.featureLayer)
                      featureManager[pressed ? "showLayer" : "hideLayer"](this.id, this.displayMode);
                  },
                  scope: this
              }
            ] : [])),
            listeners: {
				scope: this,				
				afterrender: function() {
					var menu = featureGrid.getView().hmenu;
					var menuitems = menu.items;				
 					for (var i in menuitems.items) {
						if (menuitems.items[i].itemId=="asc") menuitems.items[i].text = this.ascText;
						else if (menuitems.items[i].itemId=="desc") menuitems.items[i].text = this.descText;
						else if (menuitems.items[i].itemId=="columns") menuitems.items[i].text = this.colText;
					}
					menu.addSeparator();
					menu.addMenuItem({ 
						text: this.statisticsText, 
						handler : function(e) {
							var url = app.layerSources[ featureManager.layerRecord.get("source") ].restUrl.replace("rest", "wps");

							OpenLayers.Request.POST({
								url: url,
								data: '<?xml version="1.0" encoding="UTF-8"?>' +
								'<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">' +
								'<ows:Identifier>gs:Aggregate</ows:Identifier>' +
								'<wps:DataInputs>' +
								'<wps:Input>' +
								'<ows:Identifier>features</ows:Identifier>' +
								'<wps:Reference mimeType="text/xml; subtype=wfs-collection/1.0" xlink:href="http://geoserver/wfs" method="POST">' +
								'<wps:Body>' +
								'<wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2">' +
								'<wfs:Query typeName="' +featureManager.layerRecord.get('name') + '"/>' +
								'</wfs:GetFeature>' +
								'</wps:Body>' +
								'</wps:Reference>' +
								'</wps:Input>' +
								'<wps:Input>' +
								'<ows:Identifier>aggregationAttribute</ows:Identifier>' +
								'<wps:Data>' +
								'<wps:LiteralData>' + featureGrid.getColumns()[featureGrid.getView().activeHdIndex].dataIndex + '</wps:LiteralData>' +
								'</wps:Data>' +
								'</wps:Input>' +

								'<wps:Input>' +
								'<ows:Identifier>function</ows:Identifier>' +
								'<wps:Data>' +
								'<wps:LiteralData>Count</wps:LiteralData>' +
								'</wps:Data>' +
								'</wps:Input>' +

								'<wps:Input>' +
								'<ows:Identifier>function</ows:Identifier>' +
								'<wps:Data>' +
								'<wps:LiteralData>Average</wps:LiteralData>' +
								'</wps:Data>' +
								'</wps:Input>' +

								'<wps:Input>' +
								'<ows:Identifier>function</ows:Identifier>' +
								'<wps:Data>' +
								'<wps:LiteralData>Max</wps:LiteralData>' +
								'</wps:Data>' +
								'</wps:Input>' +

								'<wps:Input>' +
								'<ows:Identifier>function</ows:Identifier>' +
								'<wps:Data>' +
								'<wps:LiteralData>Median</wps:LiteralData>' +
								'</wps:Data>' +
								'</wps:Input>' +

								'<wps:Input>' +
								'<ows:Identifier>function</ows:Identifier>' +
								'<wps:Data>' +
								'<wps:LiteralData>Min</wps:LiteralData>' +
								'</wps:Data>' +
								'</wps:Input>' +

								'<wps:Input>' +
								'<ows:Identifier>function</ows:Identifier>' +
								'<wps:Data>' +
								'<wps:LiteralData>StdDev</wps:LiteralData>' +
								'</wps:Data>' +
								'</wps:Input>' +

								'<wps:Input>' +
								'<ows:Identifier>function</ows:Identifier>' +
								'<wps:Data>' +
								'<wps:LiteralData>Sum</wps:LiteralData>' +
								'</wps:Data>' +
								'</wps:Input>' +

								'<wps:Input>' +
								'<ows:Identifier>singlePass</ows:Identifier>' +
								'<wps:Data>' +
								'<wps:LiteralData>false</wps:LiteralData>' +
								'</wps:Data>' +
								'</wps:Input>' +
								'</wps:DataInputs>' +
								'<wps:ResponseForm>' +
								'<wps:RawDataOutput mimeType="text/xml">' +
								'<ows:Identifier>result</ows:Identifier>' +
								'</wps:RawDataOutput>' +
								'</wps:ResponseForm>' +
								'</wps:Execute>'
								,headers: {
								  "Content-Type": "text/xml; subtype=gml/3.1.1"
								},
								callback: function(request){
								  if(request.status == 200){

									if(request.responseXML.firstChild.nodeName == 'AggregationResults'){
									  var t = '';
									  var responseArr = request.responseXML.firstChild.childNodes;
									  for(var i = 0, len = responseArr.length; i<len; i++){
										t += gxp.plugins.FeatureGrid.prototype.wpsLiterals[ responseArr[i].nodeName ] + ': ' + responseArr[i].firstChild.data + '<br/>';
									  }

									  Ext.MessageBox.show({
										title : gxp.plugins.FeatureGrid.prototype.getFeatureInfoPanelFieldStatisticWindowTitle,
										msg : t,
										buttons: Ext.MessageBox.OK,
										minWidth: 300
									  });
									} else {
									  Ext.MessageBox.show({
										title : gxp.plugins.FeatureGrid.prototype.getFeatureInfoPanelFieldStatisticWindowTitle,
										msg : gxp.plugins.FeatureGrid.prototype.statisticNotAvailableText,
										buttons: Ext.MessageBox.OK,
										minWidth: 300
									  });
									}

								  } else {
									  Ext.MessageBox.show({
										title : gxp.plugins.FeatureGrid.prototype.getFeatureInfoPanelFieldStatisticWindowTitle,
										msg : gxp.plugins.FeatureGrid.prototype.statisticNotAvailableText,
										buttons: Ext.MessageBox.OK,
										minWidth: 300
									  });

								  }
								},
								scope: this,
								proxy: app.proxy
							});

						}
					});
				},
			
                "added": function(cmp, ownerCt) {
                    function onClear() {
                        this.displayTotalResults();
                        this.selectOnMap && this.selectControl.deactivate();
                        this.autoCollapse && typeof ownerCt.collapse == "function" &&
                            ownerCt.collapse();
                    }
                    function onPopulate() {
                        this.displayTotalResults();
                        this.selectOnMap && this.selectControl.activate();
                        this.autoExpand && typeof ownerCt.expand == "function" &&
                            ownerCt.expand();
                    }
                    featureManager.on({
                        "query": function(tool, store) {
                            if (store && store.getCount()) {
                                onPopulate.call(this);
                            } else {
                                onClear.call(this);
                            }
                        },
                        "layerchange": onClear,
                        "clearfeatures": onClear,
                        scope: this
                    });
                },
                contextmenu: function(event) {
                    if (featureGrid.contextMenu.items.getCount() > 0) {
                        var rowIndex = featureGrid.getView().findRowIndex(event.getTarget());
                        if (rowIndex !== false) {
                            featureGrid.getSelectionModel().selectRow(rowIndex);
                            featureGrid.contextMenu.showAt(event.getXY());
                            event.stopEvent();
                        }
                    }
                },
                scope: this
            },
            contextMenu: new Ext.menu.Menu({items: [
				{
					text: this.statisticsText,
					handler: function() { alert ('123'); }
				}
			]})
        }, config || {});
        var featureGrid = gxp.plugins.FeatureGrid.superclass.addOutput.call(this, config);
        
        if (this.alwaysDisplayOnMap || this.selectOnMap) {
            featureManager.showLayer(this.id, this.displayMode);
        }        
       
        featureManager.paging && featureManager.on({
            "beforesetpage": function() {
                featureGrid.zoomToPageButton.disable();
            },
            "setpage": function(mgr, condition, callback, scope, pageIndex, numPages) {
                var paging = (numPages > 0);
                featureGrid.zoomToPageButton.setDisabled(!paging);
                var prev = (paging && (pageIndex !== 0));
                featureGrid.firstPageButton.setDisabled(!prev);
                featureGrid.prevPageButton.setDisabled(!prev);
                var next = (paging && (pageIndex !== numPages-1));
                featureGrid.lastPageButton.setDisabled(!next);
                featureGrid.nextPageButton.setDisabled(!next);
            },
            scope: this
        });
                
        function onLayerChange() {
            var schema = featureManager.schema,
                ignoreFields = ["feature", "state", "fid"];
            //TODO use schema instead of store to configure the fields
            schema && schema.each(function(r) {
                r.get("type").indexOf("gml:") === 0 && ignoreFields.push(r.get("name"));
            });
            featureGrid.ignoreFields = ignoreFields;
            featureGrid.setStore(featureManager.featureStore, schema);
        }

        if (featureManager.featureStore) {
            onLayerChange.call(this);
        }
        featureManager.on("layerchange", onLayerChange, this);

        return featureGrid;
    }

  });
})();
