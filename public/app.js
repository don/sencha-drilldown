Ext.setup({
    onReady: function() {
        Ext.regModel('Company', {
            fields: [
                {name: 'ticker', type: 'string'},    
                {name: 'name', type: 'string'},    
                {name: 'sector', type: 'string'},    
            ]
        });

        var itemTemplate = new Ext.XTemplate(
            '<tpl for=".">',
                '{name}',
            '</tpl>');

        var detailTemplate = new Ext.XTemplate(
            '<div class="detail">',
                'Ticker:<br/> <b>{ticker}</b><br/>',            
                'Company:<br/> <b>{name}</b><br/>',
                'Sector:<br/> <b>{sector}</b><br/>',
            '</div>'
        );

        var jsonStore = new Ext.data.Store({
            model: "Company",
            proxy: {
                type: 'ajax',
                url: 'sp500.json',
                reader: {
                    type: 'json',
                }               
            },
            autoLoad: true
        });
        
        // scrolling is too sluggish with 500 items
        // filter to stocks with 1 and 2 letter ticker symbols (71 items)
        jsonStore.filter('ticker', /^[A-Z]{1,2}$/)
        
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
            navBar.setTitle(record.get('ticker'));
            detailPanel.update(record.data); 
            panel.setActiveItem(1);         
        }
        
        var listPanel = {
            dockedItems: [
                {
                    title: 'Companies',
                    xtype: 'toolbar',
                    ui: 'light',
                    dock: 'top'
                }
            ],
            layout: 'fit',
            scroll: 'vertical',            
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