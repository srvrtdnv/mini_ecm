function createTree(win, Memory, ObjectStoreModel, Tree){

    // Create test store, adding the getChildren() method required by ObjectStoreModel
    var myStore = new Memory({
        data: [
            { id: 'root', name:'root', type:'root'},
                { id: 'structure', name:'Structure', type:'structure', parent: 'root'},
                { id: 'orgs', name:'Organisations', type:'orgs', parent: 'structure'},
                    { id: 'subvisions', name:'Subvisions', type:'subvisions', parent: 'orgs'},
                        { id: 'empls', name:'Employees', type:'empls', parent: 'subvisions' },
                { id: 'messages', name:'Messages', type:'messages', parent: 'root'},
                    { id: 'allMsgs', name:'All messages', type:'allMsgs', parent: 'messages'},
                    { id: 'myMsgs', name:'My messages', type:'myMsgs', parent: 'messages'},
                    { id: 'msgsForMe', name:'Messages for me', type:'msgsForMe', parent: 'messages'}
        ],
        getChildren: function(object){
            return this.query({parent: object.id});
        }
    });

    // Create the model
    var myModel = new ObjectStoreModel({
        store: myStore,
        query: {id: 'root'}
    });
    
    require(["dojo"]);
    
    var div = dojo.byId("tree"); 
    
    // Create the Tree.
    var tree = new Tree({
        model: myModel,
        showRoot: false,
        onClick: addTab
    });
    tree.placeAt(div);
    tree.startup();
    
    
}


function destroyTab(link) {
    var parentElementId = link.parentElement.id;
    dojo.destroy(dojo.byId(parentElementId.substring(0, parentElementId.length - 4) + "_content"));  
    dojo.destroy(link.parentElement); 
    if (dojo.query("#content div").length > 0 && dojo.query("#content .current").length == 0) {
        dojo.query("#content div")[0].setAttribute("class", "current"); 
        dojo.query("#tabss li")[0].setAttribute("class", "current");
    }
}

function addTab(link, request) {
    console.log(link.id);
    if (!dojo.byId(link.id + "_tab")) {
        require(["dijit/registry", "dijit/layout/ContentPane"], function(registry, ContentPane){
            var tabs = registry.byId("tabs");
            var pane = new ContentPane({ title:"Remote Content", closable: 'true'});
            tabs.addChild(pane);
        });
        //dojo.place('<div data-dojo-type="dijit/layout/ContentPane" title="My last tab" data-dojo-props="closable:true">New tab<div>', 'tabs', 'into');
    } 
    
    require(["dojo/request"], 
            function(request) {
                request.get("test_ajax").then(
                    function(response) {
                        console.log("good: " + response.getAttribute);
                    },
                    function(error) {
                        console.log("not good");
                    }
                )
            }
    )
}

function selectTab(link) {
    var parentElementId = link.parentElement.id;
    dojo.query("#tabs li, div").removeClass("current"); 
    link.parentElement.setAttribute("class", "current"); 
    dojo.byId(parentElementId.substring(0, parentElementId.length - 4) + "_content").setAttribute("class", "current");
}
