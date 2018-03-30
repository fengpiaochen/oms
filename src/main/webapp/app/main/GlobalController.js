Ext.define('Oms.main.GlobalController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.global',

    routes  : {
        ':id': {
            action: 'handleRoute',
            before: 'beforeHandleRoute'
        }
    },

    beforeHandleRoute: function(id, action) {
        var me = this,
            node = Ext.StoreMgr.get('navigation').getNodeById(id);

        if (node) {
            //resume action
            action.resume();
        } else {
            Ext.Msg.alert(
                '错误',
                '您访问的页面不存在！',
                function() {
                    me.redirectTo(me.getApplication().getDefaultToken());
                }
            );

            //stop action
            action.stop();
        }
    },

    refs: {
        viewport: 'viewport',
        navigationTree: 'navigation-tree',
        navigationBreadcrumb: '#navigation-breadcrumb',
        contentPanel: 'contentPanel',
        contentTabsView: '#contentTabsView',
        thumbnailsTab: '#thumbnailsTab',
        thumbnails: 'thumbnails'
    },
    
    handleRoute: function(id) {
        var me = this,
            navigationTree = me.getNavigationTree(),
            navigationBreadcrumb = me.getNavigationBreadcrumb(),
            store = Ext.StoreMgr.get('navigation'),
            node = store.getNodeById(id),
            contentPanel = me.getContentPanel(),
            contentTabs = me.getContentTabsView();
        	thumbnailsTab = me.getThumbnailsTab(),
            thumbnails = me.getThumbnails(),
            hasTree = navigationTree && navigationTree.isVisible();
        Ext.suspendLayouts();
        if (node.isLeaf()) {
        	//简化模式
        	if (!hasTree) {
                contentTabs.items.each(function(item){
                	if (item.getItemId() == 'thumbnailsTab') {
                		return;
                	}
                	contentTabs.remove(item, true);
                });
        	}
        	var tab = contentTabs.items.get(node.get('id'));
    		if (!tab) {
    			tab = contentTabs.add({
        			itemId : node.get('id'),
        	        title: node.get('text'),
        	        iconCls: node.get('iconCls'),
        	        items : [this.createTabItem(node)]
        	    });
    		}
        	contentTabs.setActiveTab(tab);
        } else {
        	thumbnailsTab.treeNode = node;
        	thumbnailsTab.setTitle(node.get('text'));
    		thumbnailsTab.setIconCls(node.get('iconCls'));
    		contentTabs.setActiveTab(thumbnailsTab);
    		var thumbnailsStore = Ext.StoreMgr.get('Thumbnails');
            thumbnailsStore.removeAll();
            thumbnailsStore.add(node.childNodes);
        }
    	this.updateTitle(node);
    	Ext.resumeLayouts(true);
        // Keep focus available and selections synchronized.
        // If navigation was through thumbnails, the view will have hidden and focus will go to document
        if (hasTree) {
        	navigationTree.setSelection(node);
            if (node.isRoot()) {
                navigationTree.ensureVisible(0, {
                    focus: true
                });
            } else {
                navigationTree.ensureVisible(node, {
                    focus: true,
                    select: true
                });
            }
        } else if (navigationBreadcrumb) {
            navigationBreadcrumb.setSelection(node);
            navigationBreadcrumb.child(':last').focus();
        }
    },
    
    createTabItem : function(node) {
    	return {
    		xtype: 'panel',
    		html : node.get('text'),
    		bodyCls : 'oms-panel-body'
    	}
    },
    
    updateTitle: function(node) {
        var text = node.get('text');
        document.title = document.title.split(' - ')[0] + ' - ' + text;
    }
});
