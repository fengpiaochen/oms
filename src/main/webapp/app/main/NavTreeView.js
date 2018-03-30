Ext.define('Oms.main.NavTreeView', {
    extend: 'Ext.tree.Panel',

    xtype: 'navigation-tree',
    id: 'navigation-tree',
    rootVisible: false,
    lines: false,
    useArrows: true,
    hideHeaders: true,
    collapseFirst: false,
    width: 250,
    minWidth: 100,
    height: 200,
    split: true,
    stateful: true,
    stateId: 'mainnav.west',
    collapsible: true,
    collapseToolText : '折叠此面板',
    expandToolText : '展开此面板',
    bufferedRenderer: true,
    title: {
    	text : '功能导航',
    	style : 'cursor:pointer',
    	listeners: {
    		click: {
                element: 'el',
                fn: 'navTreeTitleClick'
            }
    	}
    },
    tools: [{
        type: 'up',
        tooltip: '切换到简化模式',
        listeners: {
            click: 'showBreadcrumbNav'
        }
    }],

    columns: [{
        xtype: 'treecolumn',
        flex: 1,
        dataIndex: 'text',
        scope: 'controller',
        renderer: 'treeNavNodeRenderer'
    }],
    
    bind: {
        selection: '{selectedView}'
    },
    
    store: 'navigation',

    dockedItems: [{
        xtype: 'textfield',
        reference: 'navtreeFilter',
        dock: 'top',
        emptyText: '请输入关键字搜索',

        triggers: {
            clear: {
                cls: 'x-form-clear-trigger',
                handler: 'onNavFilterClearTriggerClick',
                hidden: true,
                scope: 'controller'
            },
            search: {
                cls: 'x-form-search-trigger',
                weight: 1,
                handler: 'onNavFilterSearchTriggerClick',
                scope: 'controller'
            }
        },

        listeners: {
            change: 'onNavFilterFieldChange',
            buffer: 300
        }
    }]
});
