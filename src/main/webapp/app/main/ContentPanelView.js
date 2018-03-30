Ext.define('Oms.main.ContentPanelView', {
    extend: 'Ext.panel.Panel',
    xtype: 'contentPanel',
    id: 'content-panel',
    layout: 'center',
    dockedItems: [{
        xtype: 'navigation-toolbar'
    }],
    header: {
        hidden: true
    },
    items : [{
    	xtype : 'contentTabs'
    }],
	initComponent : function() {
        Ext.create('Oms.main.ThumbnailsStore', {
            storeId: 'Thumbnails'
        });		
		this.callParent();
	}
});

Ext.define('Oms.main.Breadcrumb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'navigation-toolbar',
    reference: 'navigation-toolbar',
    hidden : true,
    items: [{
        xtype: 'tool',
        type: 'down',
        tooltip: '切换到完整模式',
        listeners: {
            click: 'showTreeNav'
        }
    }, {
        xtype: 'breadcrumb',
        id: 'navigation-breadcrumb',
        reference: 'breadcrumb',
        bind: {
            selection: '{selectedView}'
        },
        flex: 1,
        showIcons: true,
        store: 'navigation'
    }]
});

Ext.define('Oms.main.ThumbnailsStore', {
    extend: 'Ext.data.Store',
    // even though this is not a tree store, it uses a TreeModel because it contains
    // records from the navigation tree.
    model: 'Ext.data.TreeModel',
    proxy: 'memory'
});


Ext.define('Oms.main.Thumbnails', {
    extend: 'Ext.view.View',
    id :'thumbnailsView',
    xtype: 'thumbnails',
    cls: 'thumbnails',
    reference: 'contentView',
    store: 'Thumbnails',
    itemSelector: '.thumbnail-item',
    initComponent: function() {
    	var profileCookie = Ext.util.Cookies.get("profile");
        var backgrounds = {
            crisp: 'border-circle',
            'crisp-touch': 'circle',
            neptune: 'border-square',
            'neptune-touch': 'square',
            classic: 'rounded-square',
            gray: 'rounded-square',
            triton: 'square'
        };
        
        this.tpl =
            '<tpl for=".">' +
                '<div class="thumbnail-item">' +
                    '<div class="thumbnail-icon-wrap bg-' + backgrounds[profileCookie] + '">' +
                        '<div class="thumbnail-icon {iconCls}"></div>' +
                    '</div>' +
                    '<div class="thumbnail-text">{text}</div>' +
                '</div>' +
            '</tpl>';
        
        this.callParent();
    }
});

Ext.define('Oms.main.ContentTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'contentTabs',
    id:'contentTabsView',
    reference: 'contentTabsView',
    width : '100%',
    height : '100%',
    defaults: {
    	bodyPadding: 10,
    	bodyCls : 'oms-panel-body',
        closable: true,
        layout: 'center',
    	scrollable: true
    },
    plugins: ['tabreorderer','tabclosemenu_zh'],
    items : [
			{
				itemId : 'thumbnailsTab',
				reference: 'thumbnailsTab',
			    items : [{
		        	selector: 'thumbnails',
		        	xtype: 'thumbnails',
		        	reference: 'thumbnails'
		        }],
		        closable: false,
		        listeners: {
		        	render: function(tab){
			        	var navStore = Ext.StoreMgr.get('navigation');
			            var node = navStore.getNodeById('all');
		        		var thumbnailsStore = Ext.StoreMgr.get('Thumbnails');
		                thumbnailsStore.removeAll();
		                thumbnailsStore.add(node.childNodes);
		                tab.setTitle(node.get('text'));
		                tab.setIconCls(node.get('iconCls')); 
		                tab.treeNode = node;
		            }
		        }
			}  
    ]
});

Ext.define('Oms.main.TabCloseMenu', {
    extend: 'Ext.ux.TabCloseMenu',
    alias: 'plugin.tabclosemenu_zh',
    closeTabText : '关闭当前',
    closeOthersTabsText : '关闭其他',
    closeAllTabsText : '关闭所有'
});