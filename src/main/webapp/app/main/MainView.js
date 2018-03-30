Ext.define('Oms.main.MainView', {
	extend : 'Ext.container.Viewport',
	controller: 'main',
	viewModel: 'main',
	layout : 'border',
	stateful : true,
	stateId : 'oms-viewport',
	requires : [
	            'Oms.main.HeaderView',
	            'Oms.main.NavStore',
	            'Oms.main.NavTreeView',
	            'Oms.main.ContentPanelView',
	            'Oms.main.MainController'
	],
	items : [ {
		region : 'north',
		xtype : 'appHeader'
	}, {
		region : 'west',
		reference : 'tree',
		xtype : 'navigation-tree'
	} , {
	        region: 'center',
	        xtype: 'contentPanel',
	        reference: 'contentPanel',
	        ariaRole: 'main'
	    }],
	
	applyState : function(state) {
		this.getController().applyState(state);

	},

	getState : function() {
		return this.getController().getState();
	},
	
	initComponent : function() {
        Ext.create('Oms.main.NavStore', {
            storeId: 'navigation'
        });		
		this.callParent();
	}
});

Ext.define('Oms.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        selectedView: false
    }
});