function createTree(win, Memory, ObjectStoreModel, Tree){

    // Create test store, adding the getChildren() method required by ObjectStoreModel
    var myStore = new Memory({
        data: [
            {id: 'root'},
                { id: 'structure', name:'Structure', type: 'not link', parent: 'root'},
                { id: 'comps', name:'Companies', parent: 'structure', gridData: {url: "api/company/all", getMethod: setCompanyGridContent, delMethod: deleteCompany}},
                    { id: 'subvisions', name:'Subvisions', parent: 'comps', gridData: {url: "api/subvision/all", getMethod: setSubvisionGridContent, delMethod: deleteCompany}},
                        { id: 'empls', name:'Employees', parent: 'subvisions', gridData: {url: "api/employee/all", getMethod: setEmployeeGridContent, delMethod: deleteCompany}},
                { id: 'messages', name:'Tasks', type: 'not link', parent: 'root'},
                    { id: 'allMsgs', name:'All tasks', parent: 'messages', gridData: {url: "api/task/all", getMethod: setTaskGridContent, delMethod: deleteTask}},
                    { id: 'myMsgs', name:'Created tasks', parent: 'messages', gridData: {url: "api/task/created", getMethod: setTaskGridContent, delMethod: deleteTask}},
                    { id: 'msgsForMe', name:'My tasks', parent: 'messages', gridData: {url: "api/task/my", getMethod: setTaskGridContent, delMethod: deleteTask}}
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

function addTab(node, request) {
    if (!dojo.byId(node.id) && node.type != 'not link') {
        require([
            "dijit/registry", 
            "dijit/layout/ContentPane", 
            "dojo/on", 
            "dijit/form/Button", 
            "dojo/dom-construct", 
            "dojo/dom-style"
        ], function(registry, ContentPane, on, Button, domConstruct, style){
            var tabs = registry.byId("tabs");
            var pane = new ContentPane({ class: 'pane',title: node.name, closable: 'true', id: node.id, gridData: node.gridData, count: 0});
            var div1 = domConstruct.create('div', {id: pane.id + "_buttonDiv", style: 'text-align: center;'});
            var div2 = domConstruct.create('div', {id: pane.id + "_gridDiv"});
            
            var btn = new Button({
                label: "Create new",
                onclick: function() {
                }
            }, pane.id + "_createBtn");
            btn.startup();
            
            var updBtn = new Button({
                label: "Update",
                style: "display: none;",
                onclick: pane.delMethod
            }, pane.id + "_updateBtn");
            btn.startup();
            
            var delBtn = new Button({
                label: "Delete",
                style: "display: none;",
                onclick: pane.delMethod
            }, pane.id + "_deleteBtn");
            btn.startup();
            
            pane.set('content', [div1, div2]);
            
            domConstruct.place(btn.domNode, div1);
            domConstruct.place(delBtn.domNode, div1);
            domConstruct.place(updBtn.domNode, div1);
            //div1.appendChild(btn);
            //pane.setContent(btn);
            //pane.set("href", "test_ajax");
            //pane.own(on('onShow', pane.gridData.method));
            pane.connect(pane, 'onShow', pane.gridData.getMethod);
            tabs.addChild(pane);
        });
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

function setCompanyGridContent() {
    if (this.count == 1) return;
    var tab = this;
    require([
        "dojox/grid/DataGrid",
        "dojo/store/Memory",
        "dojo/data/ObjectStore",
        "dojo/request",
        "dojo/domReady!"
    ], function(DataGrid, Memory, ObjectStore, request) {
                var dataStore, grid;
                request.get(tab.gridData.url, {
                    handleAs: 'json'
                }).then(
                    function(resp) {
                        var gridData = {identifier: 'id', items: resp};
                        dataStore = new ObjectStore({ objectStore:new Memory({ data: gridData.items }) });
                        grid = new DataGrid({
                            store: dataStore,
                            query: { id: "*" },
                            queryOptions: {},
                            structure: [
                                { name: 'Id', field: 'id', width: '4%' },
                                { name: 'Name', field: 'name', width: '20%' },
                                { name: 'Physical adress', field: 'physicalAd', width: '30%' },
                                { name: 'Legal adress', field: 'legalAd', width: '30%' },
                                { name: 'Manager', field: 'manager', width: '16%',
                                  formatter: function(manager) {
                                      return manager.lastName + " " + manager.firstName + " " + manager.middleName;
                                  }
                                }
                            ]
                        }).placeAt(tab);
                        grid.startup();
                    },
                    function(error) {
                        console.log("not good");
                    }
                )
            }
    )
    this.count = 1;
}

function setSubvisionGridContent() {
    if (this.count == 1) return;
    var tab = this;
    require([
        "dojox/grid/DataGrid",
        "dojo/store/Memory",
        "dojo/data/ObjectStore",
        "dojo/request",
        "dojo/domReady!"
    ], function(DataGrid, Memory, ObjectStore, request) {
                var dataStore, grid;
                request.get(tab.gridData.url, {
                    handleAs: 'json'
                }).then(
                    function(resp) {
                        var gridData = {identifier: 'id', items: resp};
                        dataStore = new ObjectStore({ objectStore:new Memory({ data: gridData.items }) });
                        grid = new DataGrid({
                            store: dataStore,
                            query: { id: "*" },
                            queryOptions: {},
                            structure: [
                                { name: 'Id', field: 'id', width: '5%' },
                                { name: 'Name', field: 'name', width: '30%' },
                                { name: 'Contact data', field: 'phNumber', width: '30%' },
                                { name: 'Manager', field: 'manager', width: '35%',
                                  formatter: function(manager) {
                                      return manager.lastName + " " + manager.firstName + " " + manager.middleName;
                                  }
                                }
                            ]
                        }).placeAt(tab);
                        grid.startup();
                    },
                    function(error) {
                        console.log("not good");
                    }
                )
            }
    )
    this.count = 1;
}

function setEmployeeGridContent() {
    if (this.count == 1) return;
    var tab = this;
    require([
        "dojox/grid/DataGrid",
        "dojo/store/Memory",
        "dojo/data/ObjectStore",
        "dojo/request",
        "dojo/domReady!"
    ], function(DataGrid, Memory, ObjectStore, request) {
                var dataStore, grid;
                request.get(tab.gridData.url, {
                    handleAs: 'json'
                }).then(
                    function(resp) {
                        var gridData = {identifier: 'id', items: resp};
                        dataStore = new ObjectStore({ objectStore:new Memory({ data: gridData.items }) });
                        grid = new DataGrid({
                            store: dataStore,
                            query: { id: "*" },
                            queryOptions: {},
                            structure: [
                                { name: 'Id', field: 'id', width: '5%' },
                                { name: 'Last name', field: 'lastName', width: '24%' },
                                { name: 'First name', field: 'firstName', width: '24%' },
                                { name: 'Middle name', field: 'middleName', width: '24%' },
                                { name: 'Position', field: 'position', width: '24%' }
                            ]
                        }).placeAt(tab);
                        grid.startup();
                    },
                    function(error) {
                        console.log("not good");
                    }
                )
            }
    )
    this.count = 1;
}

function setTaskGridContent(elem, event, handler) {
    if (this.count == 1) return;
    var tab = this;
    require([
        "dojox/grid/DataGrid",
        "dojo/store/Memory",
        "dojo/data/ObjectStore",
        "dojo/request",
        "dijit/registry",
        "dojo/query",
        "dojo/dom-construct",
        "dojo/domReady!"
    ], function(DataGrid, Memory, ObjectStore, request, registry, query, domConstruct) {
                console.log(query("#allMsgs_buttonDiv"));
                var dataStore, grid;
                request.get(tab.gridData.url, {
                    handleAs: 'json'
                }).then(
                    function(resp) {
                        var gridData = {identifier: 'id', items: resp};
                        dataStore = new ObjectStore({ objectStore:new Memory({ data: gridData.items }) });
                        grid = new DataGrid({
                            store: dataStore,
                            query: { id: "*" },
                            queryOptions: {},
                            structure: [
                                { name: 'Id', field: 'id', width: '3%' },
                                { name: 'Author', field: 'taskAuthor', width: '10%',
                                  formatter: function(author) {
                                      return author.lastName + " " + author.firstName + " " + author.middleName;
                                  }
                                },
                                { name: 'Subject', field: 'subject', width: '10%' },
                                { name: 'Text', field: 'text', width: '28.5%' },
                                { name: 'Doers', field: 'doers', width: '23.5%',
                                  formatter: function(doers) {
                                      var result = "";
                                      for (var i = 0; i < doers.length; i++) {
                                          result += doers[i].lastName + " " + doers[i].firstName + " " + doers[i].middleName + ", " ;
                                      }
                                      return result;
                                  }
                                },
                                { name: 'Is controlled', field: 'controlled', width: '9%',
                                  formatter: function(bool) {
                                      return bool ? "Yes" : "No";
                                  }
                                },
                                { name: 'Is done', field: 'done', width: '6%',
                                  formatter: function(bool) {
                                      return bool ? "Yes" : "No";
                                  } 
                                },
                                { name: 'Time', field: 'executionTime', width: '10%' },
                            ]
                        }).placeAt(tab);
                        grid.startup();
                        grid.connect(grid, 'onRowClick', showButtons);
                    },
                    function(error) {
                        console.log("not good");
                    }
                )
            }
    )
    this.count = 1;
}

function deleteCompany() {
    
}

function deleteSubvision() {
    
}

function deleteEmployee() {
    
}

function deleteTask() {
    
}

function showButtons(evt) {
    
    require([
        "dojo/query",
        "dojo/dom-style",
        "dojo/registry",
        "dojo/NodeList-traverse",
        "dojo/domReady!"
    ], function(query, domStyle, registry) {
        var paneId = query(evt.grid.domNode).closest('.pane')[0].id;
        console.log(query("#" + paneId + "_deleteBtn"));
        domStyle.set(query("#" + paneId + "_deleteBtn"), 'display', 'block');
        domStyle.set(query("#" + paneId + "_updateBtn"), 'display', 'block');
        
        console.log(evt);
        console.log(query('.pane')[0].id);
        console.log(query(evt.grid.domNode).closest('.pane'));
    })
}


function selectTab(link) {
    var parentElementId = link.parentElement.id;
    dojo.query("#tabs li, div").removeClass("current"); 
    link.parentElement.setAttribute("class", "current"); 
    dojo.byId(parentElementId.substring(0, parentElementId.length - 4) + "_content").setAttribute("class", "current");
}
