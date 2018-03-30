Ext.define('Oms.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    control: {
        'navigation-tree': {
            selectionchange: 'onTreeNavSelectionChange'
        },
        'navigation-toolbar breadcrumb': {
            change: 'onBreadcrumbNavSelectionChange'
        },
        '#contentTabsView': {
        	beforetabchange: 'onTabchange'
        },
        'thumbnails': {
            itemclick: 'onThumbnailClick'
        }
    },
    
    navTreeTitleClick : function () {
    	this.redirectTo('all');
    },
    
    applyState: function(state) {
        var refs = this.getReferences();
        if (state.hasTreeNav == undefined) {
        	state.hasTreeNav = true;
        }
        if (!state.hasTreeNav) {
        	Ext.getCmp('contentTabsView').getTabBar().hide();
        	refs['navigation-toolbar'].show();
        	refs.tree.hide();
            this._hasTreeNav = false;
        }
    },

    getState: function() {
        return {
            hasTreeNav: this._hasTreeNav
        };
    },
    onTabchange : function(tabPanel, newCard, oldCard, eOpts) {
    	if (newCard.getItemId() == 'thumbnailsTab') {
    		this.redirectTo(newCard.treeNode.get('id'));
    	} else {
    		this.redirectTo(newCard.getItemId());
    	}
    },
    showBreadcrumbNav: function() {
        var refs = this.getReferences(),
            navToolbar = refs['navigation-toolbar'],
            treeNav = refs.tree;

        Ext.suspendLayouts();
        var contentTabs = Ext.getCmp('contentTabsView');
        contentTabs.getTabBar().hide();
        var activeTab = contentTabs.getActiveTab(); 
        contentTabs.items.each(function(item){
        	if (item.getItemId() == 'thumbnailsTab' || item.getItemId() == activeTab.getItemId()) {
        		return;
        	}
        	contentTabs.remove(item, true);
        });
        navToolbar.show();

        treeNav.hide();

        this._hasTreeNav = false;
        this.getView().saveState();
        Ext.resumeLayouts(true);

        // Ensure focus is not lost when treeNav panel is hidden
        refs.breadcrumb.child(':last').focus();
    },

    showTreeNav: function() {
        var refs = this.getReferences(),
            treeNav = refs.tree,
            navToolbar = refs['navigation-toolbar'],
            selection = refs.breadcrumb.getSelection();
        
        Ext.suspendLayouts();
        Ext.getCmp('contentTabsView').getTabBar().show();
        treeNav.show();

        navToolbar.hide();
        this._hasTreeNav = true;
        this.getView().saveState();
        Ext.resumeLayouts(true);

        // Ensure NavTree scrolls to show the selection and that focus is not lost
        if (selection) {
            treeNav.ensureVisible(selection.isRoot() ? treeNav.store.getAt(0) : selection, {
                focus: true
            });
        }
    },
    
    onTreeNavSelectionChange: function(selModel, records) {
        var record = records[0];
        // Ignore the initialize to the "all" node.
        if (record && !record.isRoot()) {
            this.redirectTo(record.getId());
        }
    },

    onBreadcrumbNavSelectionChange: function(breadcrumb, node) {
        if (node) {
            this.redirectTo(node.getId());
        }
    },
    onThumbnailClick: function(view, node, item, index, e) {
    	this.redirectTo(node.getId());
    },    
    treeNavNodeRenderer: function(value) {
        return this.rendererRegExp ? value.replace(this.rendererRegExp, '<span style="color:red;font-weight:bold">$1</span>') : value;
    },
    
    onNavFilterFieldChange: function(field, value) {
        var me = this,
            tree = me.getReferences().tree,
        	selectedView = me.getViewModel().get('selectedView');
        if (value) {
            me.preFilterSelection = selectedView;
            me.rendererRegExp = new RegExp( '(' + value + ')', "gi");
            field.getTrigger('clear').show();
            me.filterStore(value);
        } else {
            me.rendererRegExp = null;
            tree.store.clearFilter();
            field.getTrigger('clear').hide();
            if (!selectedView) {
            	selectedView = me.preFilterSelection;
            }
            // Ensure selection is still selected.
            // It may have been evicted by the filter
            if (selectedView) {
                    tree.ensureVisible(selectedView, {
                    select: true
                });
            }
        }
    },

    onNavFilterClearTriggerClick: function() {
        this.getReferences().navtreeFilter.setValue();
    },

    onNavFilterSearchTriggerClick: function() {
        var field = this.getReferences().navtreeFilter;

        this.onNavFilterFieldChange(field, field.getValue());
    },

    filterStore: function(value) {
        var me = this,
            tree = me.getReferences().tree,
            store = tree.store,
            searchString = value.toLowerCase(),
            filterFn = function(node) {
                var children = node.childNodes,
                    len      = children && children.length,
                    visible  = v.test(node.get('text')),
                    i;

                // If the current node does NOT match the search condition
                // specified by the user...
                if ( !visible ) {

                    // Check to see if any of the child nodes of this node
                    // match the search condition.  If they do then we will
                    // mark the current node as visible as well.
                    for (i = 0; i < len; i++) {
                        if ( children[i].isLeaf() ) {
                            visible = children[i].get('visible');
                        }
                        else {
                            visible = filterFn(children[i]);
                        }
                        if (visible) {
                            break;
                        }
                    }

                }

                else { // Current node matches the search condition...

                    // Force all of its child nodes to be visible as well so
                    // that the user is able to select an example to display.
                    for (i = 0; i < len; i++) {
                        children[i].set('visible', true );
                    }

                }

                return visible;
            }, v;

        if (searchString.length < 1) {
            store.clearFilter();
        } else {
            v = new RegExp(searchString, 'i');
            store.getFilters().replaceAll({
                filterFn: filterFn
            });
        }
    }
});
