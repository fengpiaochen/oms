Ext.enableAriaButtons = false;
Ext.Loader.setPath('Oms', 'app');
Ext.Loader.setConfig({
	disableCaching: false
});

Ext.define('Oms.Application', {
	extend : 'Ext.app.Application',

    controllers: [
                  'Oms.main.GlobalController'
              ],
              
	init : function() {
		this.setDefaultToken('all');
		Ext.tip.QuickTipManager.init();
		Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
	},

	launch : function() {
		Ext.get("loading").hide();
		Ext.create('Oms.main.MainView');
	}
});

Ext.application({
	extend : 'Oms.Application',
	name : 'Oms'
});