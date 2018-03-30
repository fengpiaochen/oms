Ext.define('Oms.main.HeaderView', {
	extend : 'Ext.container.Container',
	xtype : 'appHeader',
	id : 'app-header',
	title : '运营管理系统',
	height : 52,
	layout : {
		type : 'hbox',
		align : 'middle'
	},
	initComponent : function() {
		document.title = this.title;
		this.items = [ {
			xtype : 'component',
			id : 'app-header-logo'
		}, {
			xtype : 'component',
			id : 'app-header-title',
			html : this.title,
			flex : 1
		}, {
			xtype : 'profileSwitcher'
		}];
		this.callParent();
	}
});

Ext.define('Oms.main.ProfileSwitcher', {
    extend: 'Ext.Component',
    xtype: 'profileSwitcher',
    cls: 'ks-profile-switcher',

    initComponent: function() {
        var me = this,
            menuItems = [],
            classicProfiles = {
                triton: 'Triton',
                neptune: 'Neptune',
                'neptune-touch': 'Neptune Touch',
                crisp: 'Crisp',
                'crisp-touch': 'Crisp Touch',
                classic: 'Classic',
                gray: 'Gray'
            },
            menu;

        function makeItem(value, text, paramName) {
        	var profileCookie = Ext.util.Cookies.get("profile");
            return {
            	profile : value,
                text: text,
                checked : (profileCookie == value),
                group: 'profile',
                handler: function () {
                	Ext.util.Cookies.set("profile", value, new Date(9999, 11));
                	window.location.reload();
                }
            };
        }

        for (profileId in classicProfiles) {
            menuItems.push(makeItem(profileId, classicProfiles[profileId]));
        }

        menu = new Ext.menu.Menu({
            items: menuItems
        });

        this.on({
            scope: this,
            click: function (e) {
                menu.showBy(this);
            },
            element: 'el'
        });

        this.callParent();
    }
});