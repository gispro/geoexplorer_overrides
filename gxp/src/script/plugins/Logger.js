/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the BSD license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

/**
 * @requires plugins/Tool.js
 */

/** api: (define)
 *  module = gxp.plugins
 *  class = Logger
 */

/** api: (extends)
 *  plugins/Tool.js
 */
Ext.namespace("gxp.plugins");

/** api: constructor
 *  .. class:: Logger(config)
 *
 *    Provides an action to logger the map.
 */
gxp.plugins.Logger = Ext.extend(gxp.plugins.Tool, {
    
	LOG_LEVEL_INFO : 2, // сообщения об успешных запросах
	LOG_LEVEL_NETWORK_LOCAL_ERRORS : 1, // все ошибки
	//LOG_LEVEL_NETWORK_ERRORS : 0, // выводятся только сообщения о неверных запросах
	
    /** api: ptype = gxp_logger */
    ptype: "gxp_logger",

    /** api: config[loggerService]
     *  ``String``
     *  URL of the logger service.
     */
    loggerService: null,

    /** api: config[customParams]
     *  ``Object`` Key-value pairs of custom data to be sent to the logger
     *  service. Optional. This is e.g. useful for complex layout definitions
     *  on the server side that require additional parameters.
     */
    customParams: null,

    /** api: config[menuText]
     *  ``String``
     *  Text for logger menu item (i18n).
     */
    menuText: "Log",

    /** api: config[tooltip]
     *  ``String``
     *  Text for logger action tooltip (i18n).
     */
    tooltip: "Show log",

    /** private: method[constructor]
     */
    constructor: function(config) {
        gxp.plugins.Logger.superclass.constructor.apply(this, arguments);
    },

    /** api: method[addActions]
     */
    addActions: function() {

		var me = this;		
		
		
        var actions = gxp.plugins.Logger.superclass.addActions.call(this, [{
                menuText: this.menuText,
                tooltip: this.tooltip,
				id: "loggerButton",
                iconCls: "gxp-icon-logger",                
                handler: function() {
					var store = new Ext.data.ArrayStore ({
						fields: [
						   {name: 'time'},
						   {name: 'message'},
						   {name: 'level'}
						],
						data: log
					});
					
					var levels = new Ext.data.ArrayStore({
						fields: ["level", "description"],
						data: [
								[-1, "Без фильтрации"],
								[gxp.plugins.Logger.prototype.LOG_LEVEL_INFO, "Информационные сообщения"],
								[gxp.plugins.Logger.prototype.LOG_LEVEL_NETWORK_LOCAL_ERRORS, "Ошибки приложения"],
								//[gxp.plugins.Logger.prototype.LOG_LEVEL_NETWORK_ERRORS, "Ошибки получения данных"]
						]
					});				
					
					var filter = new Ext.form.ComboBox({
						id: "logFilterCombobox",
						store: levels,
						valueField: "level",
						value: -1,
						displayField: "description",
						triggerAction: "all",						
						mode: "local",
						width: 300,
						listeners: {
							select: function(combo, record, index)
							{								
								if (filter.getValue()==-1) Ext.getCmp('logGrid').getStore().clearFilter();
								else Ext.getCmp('logGrid').getStore().filter("level",filter.getValue());  // set selected layers filter
							}
						}
					});
					new Ext.Window ({
						title: me.menuText,
						height: 400,
						width: 700,
						maximizable: true,
						layout: 'fit',
						tbar : {
							items: [								
								{
									xtype: 'label',
									html: 'Фильтр логирования:'
								},
								{
									xtype: 'tbspacer',
									width: 5
								},
								filter,
								{
									xtype: 'button',
									text: 'Обновить',
									onClick: function() {
										Ext.getCmp('logGrid').getStore().removeAll();
										Ext.getCmp('logGrid').getStore().add(new Ext.data.ArrayStore ({
											fields: [
											   {name: 'time'},
											   {name: 'message'},
											   {name: 'level'}
											],
											data: log
										}).getRange());
										if (filter.getValue()==-1) Ext.getCmp('logGrid').getStore().clearFilter();
										else Ext.getCmp('logGrid').getStore().filter("level",filter.getValue());  // set selected layers filter
									}
								},
								{
									xtype: 'tbspacer',
									width: 5
								}
									
							]							
						},
						items: {
							xtype: 'grid',
							id : 'logGrid',
							autoExpandColumn: "log-message-column",							
							store: store,
							stateful: true,							
							columns: [
								{
									header     : 'Время',									
									sortable : true,
									dataIndex: 'time',
									renderer: Ext.util.Format.dateRenderer('H:i:s'),
									id: 'log-time-column'
								}, 
								{
									header     : 'Сообщение ',
									flex     : 1,									
									dataIndex: 'message',
									id: 'log-message-column'									
								}
							]
						}
					}).show();
                },
                scope: this                
		}]);
          
        return actions;
        
    }

});

Ext.preg(gxp.plugins.Logger.prototype.ptype, gxp.plugins.Logger);
gxp.plugins.Logger.log = function(message, level) {
	var formatDateTime = function(a, format) {			
		format = format || "HH:MM:SS";
		var day = ((a.getDate()).toString().length == 1 ? "0" + (a.getDate()) : a.getDate());			
		//var month = "02" ; // force february
		var month = ((a.getMonth()+1).toString().length == 1 ? "0" + (a.getMonth()+1) : a.getMonth()+1) ;
		var fullYear = a.getFullYear();
		var year= a.getYear();
		var hours = ((a.getHours()).toString().length == 1 ? "0" + (a.getHours()) : a.getHours());
		var mins = ((a.getMinutes()).toString().length == 1 ? "0" + (a.getMinutes()) : a.getMinutes()); 
		var seconds = ((a.getSeconds()).toString().length == 1 ? "0" + (a.getSeconds()) : a.getSeconds());
		return format
			.replace(/dd/g,day)
			.replace(/mm/g,month)
			.replace(/yyyy/g,fullYear)
			.replace(/yy/g,year)				
			.replace(/HH/g,hours)
			.replace(/MM/g,mins)
			.replace(/SS/g,seconds);
	}
	
	log.push ([ new Date(), message, level]);
	//"[" + formatDateTime(new Date())  + "]: " + message + "\r\n");
	
}

gxp.plugins.Logger.logRequest = function (config) {
	var level = config.status == "failure" ? gxp.plugins.Logger.prototype.LOG_LEVEL_NETWORK_LOCAL_ERRORS : gxp.plugins.Logger.prototype.LOG_LEVEL_INFO
	var date = new Date();
	var message = config.url;
	var serverError = "";
	if (config.status=="failure" && config.httpStatus) {
		serverError = "(Ответ сервера: "+config.httpStatus+": " + config.statusText + ")";
	}
	
	if (config.url.indexOf("etCapabilities")+1) {
		if (config.status=="start") message =  "Отправлен запрос на информацию о слоях к серверу " + config.url;
		if (config.status=="success") message =  "Информация о слоях получена от сервера " + config.url;
		if (config.status=="failure") message =  "Ошибка! Не получена информация о слоях от сервера " + config.url + (serverError ? ". " + serverError : "") ;
	} else if (config.url.indexOf("getMap")+1) {
		if (config.status=="start") message =  "Отправлен запрос на получение участка карты к серверу " + config.url;
		if (config.status=="success") message =  "Участок карты получен от сервера " + config.url;
		if (config.status=="failure") message =  "Ошибка! Участок карты не получен от сервера " + config.url + (serverError ? ". " + serverError : "") ;
	} else if (config.url.indexOf("getFeatureInfo")+1) {
		if (config.status=="start") message =   "Отправлен запрос на информацию в точке $координаты к серверу " + config.url;
		if (config.status=="success") message =   "Информация в точке $координаты получена от сервера $url " + config.url;
		if (config.status=="failure") message =   "Ошибка! Информация в точке $координаты не получена от сервера " + config.url + (serverError ? ". " + serverError : "") ;
	} else if (config.url.indexOf("getLegendGraphic")+1) {
		if (config.status=="start") message =  "Отправлен запрос на информацию о легенде к серверу " + config.url;
		if (config.status=="success") message =  "Информация о легенде получена от сервера " + config.url;
		if (config.status=="failure") message =  "Ошибка! Не получена информация о легенде от сервера " + config.url + (serverError ? ". " + serverError : "") ;
	} else if (config.url.indexOf("charts.json?mode=items")+1) {
		if (config.status=="start") message =  "Отправлен запрос на получение списка сохраненных графиков";
		if (config.status=="success") message =  "Список сохраненных графиков получен от сервера";
		if (config.status=="failure") message =  "Ошибка! Список сохраненных графиков не получен от сервера" + (serverError ? ". " + serverError : "") ;
	} else if (config.url.indexOf("charts.json?mode=root")+1) {
		if (config.status=="start") message =  "Отправлен запрос на получение метаданных графиков";
		if (config.status=="success") message =  "Метаданные графиков получены от сервера";
		if (config.status=="failure") message =  "Ошибка! Метаданные графиков не получены от сервера" + (serverError ? ". " + serverError : "") ;
	} else if (config.url.indexOf("animation.js")+1) {
		if (config.status=="start") message =  "Отправлен запрос на получение списка сохраненных анимаций";
		if (config.status=="success") message =  "Список сохраненных анимаций получен от сервера";
		if (config.status=="failure") message =  "Ошибка! Список сохраненных анимаций не получен от сервера" + (serverError ? ". " + serverError : "") ;
	} else if (config.url.indexOf("wms.js")+1) {
		if (config.status=="start") message =  "Отправлен запрос на получение списка сохраненных сервисов WMS";
		if (config.status=="success") message =  "Список сохраненных сервисов WMS получен от сервера";
		if (config.status=="failure") message =  "Ошибка! Список сохраненных сервисов WMS не получен от сервера" + (serverError ? ". " + serverError : "") ;
	} else if (config.url.indexOf("arcgis")+1) {
		if (config.status=="start") message =  "Отправлен запрос на получение списка сохраненных сервисов ArcGIS";
		if (config.status=="success") message =  "Список сохраненных сервисов ArcGIS получен от сервера";
		if (config.status=="failure") message =  "Ошибка! Список сохраненных сервисов ArcGIS не получен от сервера" + (serverError ? ". " + serverError : "") ;
	} else if (config.url.indexOf("rss")+1) {
		if (config.status=="start") message =  "Отправлен запрос на получение списка сохраненных сервисов RSS";
		if (config.status=="success") message =  "Список сохраненных сервисов RSS получен от сервера";
		if (config.status=="failure") message =  "Ошибка! Список сохраненных сервисов RSS не получен от сервера" + (serverError ? ". " + serverError : "") ;
	}else if (config.url.indexOf("aqua")+1) {
		if (config.status=="start") message =  "Отправлен запрос на получение списка акваторий";
		if (config.status=="success") message =  "Список акваторий получен от сервера";
		if (config.status=="failure") message =  "Ошибка! Список акваторий не получен от сервера" + (serverError ? ". " + serverError : "") ;
	} else if (config.url.indexOf("rubricator")+1) { // рубрикатор, таблица toc
		if (config.status=="start") message =  "Отправлен запрос на получение данных рубрикатора";
		if (config.status=="success") message =  "Данные рубрикатора получены от сервера";
		if (config.status=="failure") message =  "Ошибка! Данные рубрикатора не получены от сервера" + (serverError ? ". " + serverError : "") ;
	} else if (config.url.indexOf("getFeature")+1) { // WFS выборка
		if (config.status=="start") message =   "Отправлен запрос на выборку объектов к серверу " + config.url;
		if (config.status=="success") message =   "Выборка объектов получена от сервера $url " + config.url;
		if (config.status=="failure") message =   "Ошибка! Выборка объектов не получена от сервера " + config.url + (serverError ? ". " + serverError : "") ;
	}  else if (config.url.indexOf("styles")+1) { // WFS выборка
		if (config.status=="start") message =   "Отправлен запрос на получение стилей к серверу " + config.url;
		if (config.status=="success") message =   "Стили получены получены от сервера $url " + config.url;
		if (config.status=="failure") message =   "Ошибка! Стили не получены от сервера " + config.url + (serverError ? ". " + serverError : "") ;
	} else {
		if (config.status=="start") message =   "Отправлен запрос к серверу " + config.url;
		if (config.status=="success") message =   "Данные получены от сервера $url " + config.url;
		if (config.status=="failure") message =   "Ошибка! Данные не получены от сервера " + config.url + (serverError ? ". " + serverError : "") ;
	}
	log.push ([ date, message, level]);
}