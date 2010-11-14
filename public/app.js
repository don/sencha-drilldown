Ext.setup({
    onReady: function() {
        Ext.regModel('Person', {
            fields: [
                {name: 'id', type: 'string'},    
                {name: 'name', type: 'string'}
            ]
        });

        var itemTemplate = new Ext.XTemplate(
            '<tpl for=".">',
                '{name}',
            '</tpl>');

        var detailTemplate = new Ext.XTemplate(
            '<div class="detail">',
                'id: {id}<br/>',            
                'name: {name}<br/>',
                '<p>Show some other details here</p>',
            '</div>'
        );

        var jsonStore = new Ext.data.Store({
            model: "Person",
            proxy: {
                type: 'ajax',
                url: 'data.json',
                reader: {
                    type: 'json',
                    record: 'person'
                }               
            },
            autoLoad: true
        });
        
        var navBar = new Ext.Toolbar({
            itemId: 'navBar',               
            ui: 'light',
            dock: 'top',
            items: [
                {
	               text: 'Back',
				   ui: 'back',
	               handler: function(){
	                   panel.layout.prev({type: 'slide', direction: 'right'});
                   }
               }
            ]
        });
        
        var detailPanel = new Ext.Panel({
            tpl: detailTemplate,
            dockedItems: [ navBar ]
        });
                
        // TODO what's the right way to do events? on...
        var showDetail = function(record, btn, index) {
            navBar.setTitle(record.get('name'));
            detailPanel.update(record.data); 
            panel.setActiveItem(1);         
        }
        
        var listPanel = {
            dockedItems: [
                {
                    title: 'People',
                    xtype: 'toolbar',
                    ui: 'light',
                    dock: 'top'
                }
            ],
            items: [
                {
                    xtype: 'list',
                    store: jsonStore,
                    itemTpl:itemTemplate,
                    singleSelect: true,
                    onItemDisclosure: showDetail
                }
            ]           
        };
        
        // TODO fix global
        panel = new Ext.Panel({
           fullscreen: true,
           layout: 'card',
		   cardSwitchAnimation: 'slide',		
           items: [ listPanel, detailPanel ] 
        });
    }
});