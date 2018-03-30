Ext.define('Oms.main.NavStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'NavStore',

    constructor: function(config) {
        var me = this;
        me.callParent([Ext.apply({
            root: {
                text: '功能概览',
                id: 'all',
                expanded: true,
                iconCls: 'fa-home',
                children: me.getNavItems()
            }
        }, config)]);
    },

    getNavItems: function() {
        return [
            {
                text: '用户管理',
                id: 'user',
                expanded: true,
                iconCls: 'fa-users',
                children: [
                    { id: 'user-my', viewClass: 'Oms.user.MyView', iconCls: 'fa-user', text: '我的信息', leaf: true },
                    { id: 'user-my1', viewClass: 'Oms.user.MyView', iconCls: 'fa-user', text: '我的信息一', leaf: true },
                    { id: 'user-my2', viewClass: 'Oms.user.MyView', iconCls: 'fa-user', text: '我的信息二', leaf: true },
                    { id: 'user-my3', viewClass: 'Oms.user.MyView', iconCls: 'fa-user', text: '我的信息三', leaf: true },
                    { id: 'user-my4', viewClass: 'Oms.user.MyView', iconCls: 'fa-user', text: '我的信息四', leaf: true },
                    { id: 'user-my5', viewClass: 'Oms.user.MyView', iconCls: 'fa-user', text: '我的信息五', leaf: true },
                    { id: 'user-my6', viewClass: 'Oms.user.MyView', iconCls: 'fa-user', text: '我的信息六', leaf: true },
                    { id: 'user-my7', viewClass: 'Oms.user.MyView', iconCls: 'fa-user', text: '我的信息七', leaf: true },
                    { id: 'user-manager', iconCls: 'fa-user-plus', text: '用户管理', leaf: true }
                ]
            },
            {
                text: '权限管理',
                id: 'auth',
                iconCls: 'fa-cogs',
                expanded: true,
                children: [
                    { id: 'auth-role', iconCls: 'fa-male', text: '角色管理', leaf: true }
                ]
            }
        ];
    }
});
