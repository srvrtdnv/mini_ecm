function createTree(win, Memory, ObjectStoreModel, Tree){

    var myStore = new Memory({
        data: [
            {id: 'root'},
                { id: 'structure', name:'Structure', type: 'not link', parent: 'root'},
                { id: 'comps', name:'Companies', parent: 'structure', paneData: {getAllUrl: "api/company/all", deleteUrl: "api/company/delete", getMethod: setCompanyGridContent, delMethod: deleteItem, createMethod: createNewCompanyPane, updMethod: updCompany}},
                    { id: 'subvisions', name:'Subvisions', parent: 'comps', paneData: {getAllUrl: "api/subvision/all", deleteUrl: "api/subvision/delete", getMethod: setSubvisionGridContent, delMethod: deleteItem, createMethod: createNewSubvisionPane, updMethod: updSubvision}},
                        { id: 'empls', name:'Employees', parent: 'subvisions', paneData: {getAllUrl: "api/employee/all", deleteUrl: "api/employee/delete", getMethod: setEmployeeGridContent, delMethod: deleteItem, createMethod: createNewEmployeePane, updMethod: updEmployee}},
                { id: 'messages', name:'Tasks', type: 'not link', parent: 'root'},
                    { id: 'allMsgs', name:'All tasks', parent: 'messages', paneData: {getAllUrl: "api/task/all", deleteUrl: "api/task/delete", getMethod: setTaskGridContent, delMethod: deleteItem, createMethod: createNewTaskPane, updMethod: updTask}},
                    { id: 'myMsgs', name:'Created tasks', parent: 'messages', paneData: {getAllUrl: "api/task/created", deleteUrl: "api/task/delete", getMethod: setTaskGridContent, delMethod: deleteItem, createMethod: createNewTaskPane, updMethod: updTask}},
                    { id: 'msgsForMe', name:'My tasks', parent: 'messages', paneData: {getAllUrl: "api/task/my", deleteUrl: "api/task/delete", getMethod: setTaskGridContent, delMethod: deleteItem, createMethod: createNewTaskPane, updMethod: updTask}}
        ],
        getChildren: function(object){
            return this.query({parent: object.id});
        }
    });

    var myModel = new ObjectStoreModel({
        store: myStore,
        query: {id: 'root'}
    });
    
    require(["dojo"]);
    
    var div = dojo.byId("tree"); 
    
    var tree = new Tree({
        model: myModel,
        showRoot: false,
        onClick: addTab
    });
    tree.placeAt(div);
    tree.startup();
    
    
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
            var pane = new ContentPane({ class: 'pane',title: node.name, closable: 'true', id: node.id, paneData: node.paneData, count: 0});
            var div1 = domConstruct.create('div', {id: pane.id + "_buttonDiv", style: 'text-align: center;'});
            var div2 = domConstruct.create('div', {id: pane.id + "_gridDiv"});
            
            var btn = new Button({
                id: pane.id + "_createBtn",
                label: "Create new",
                onClick: pane.paneData.createMethod
            });
            btn.startup();
            
            pane.set('content', [div1, div2]);
            
            domConstruct.place(btn.domNode, div1);
            
            pane.connect(pane, 'onShow', pane.paneData.getMethod);
            tabs.addChild(pane);
        });
    }
}

function setCompanyGridContent() {
    if (this.count == 1) return;
    var pane = this;
    require([
        "dojox/grid/DataGrid",
        "dojo/store/Memory",
        "dojo/data/ObjectStore",
        "dojo/request",
        "dojo/domReady!"
    ], function(DataGrid, Memory, ObjectStore, request) {
                var dataStore, grid;
                request.get(pane.paneData.getAllUrl, {
                    handleAs: 'json'
                }).then(
                    function(resp) {
                        var gridData = {identifier: 'id', items: resp};
                        dataStore = new ObjectStore({ objectStore:new Memory({ data: gridData.items }) });
                        grid = new DataGrid({
                            paneId: pane.id,
                            id: pane.id + "_grid",
                            store: dataStore,
                            query: { id: "*" },
                            queryOptions: {},
                            structure: [
                                { name: 'Id', field: 'id', width: '5%' },
                                { name: 'Name', field: 'name', width: '20%' },
                                { name: 'Physical adress', field: 'physicalAdd', width: '30%' },
                                { name: 'Legal adress', field: 'legalAdd', width: '30%' },
                                { name: 'Manager', field: 'manager', width: '15%',
                                  formatter: function(manager) {
                                      
                                      var result = "Vacant";
                                      if (manager) result = manager.lastName + " " + manager.firstName + " " + manager.middleName;
                                      return result;
                                  }
                                }
                            ]
                        }).placeAt(pane);
                        grid.startup();
                        grid.connect(grid, 'onRowClick', createButtons);
                        grid.connect(grid, 'onDeselected', removeButtons);
                        grid.connect(grid, 'onDblClick', updCompany);
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
    var pane = this;
    require([
        "dojox/grid/DataGrid",
        "dojo/store/Memory",
        "dojo/data/ObjectStore",
        "dojo/request",
        "dojo/domReady!"
    ], function(DataGrid, Memory, ObjectStore, request) {
                var dataStore, grid;
                request.get(pane.paneData.getAllUrl, {
                    handleAs: 'json'
                }).then(
                    function(resp) {
                        var gridData = {identifier: 'id', items: resp};
                        dataStore = new ObjectStore({ objectStore:new Memory({ data: gridData.items }) });
                        grid = new DataGrid({
                            paneId: pane.id,
                            id: pane.id + "_grid",
                            store: dataStore,
                            query: { id: "*" },
                            queryOptions: {},
                            structure: [
                                { name: 'Id', field: 'id', width: '5%' },
                                { name: 'Name', field: 'name', width: '30%' },
                                { name: 'Contact data', field: 'phNumber', width: '30%' },
                                { name: 'Manager', field: 'manager', width: '35%',
                                  formatter: function(manager) {
                                      var result = "Vacant";
                                      if (manager) result = manager.lastName + " " + manager.firstName + " " + manager.middleName;
                                      return result;
                                  }
                                }
                            ]
                        }).placeAt(pane);
                        grid.startup();
                        grid.connect(grid, 'onRowClick', createButtons);
                        grid.connect(grid, 'onDeselected', removeButtons);
                        grid.connect(grid, 'onDblClick', updSubvision);
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
    var pane = this;
    require([
        "dojox/grid/DataGrid",
        "dojo/store/Memory",
        "dojo/data/ObjectStore",
        "dojo/request",
        "dojo/domReady!"
    ], function(DataGrid, Memory, ObjectStore, request) {
                var dataStore, grid;
                request.get(pane.paneData.getAllUrl, {
                    handleAs: 'json'
                }).then(
                    function(resp) {
                        var gridData = {identifier: 'id', items: resp};
                        dataStore = new ObjectStore({ objectStore:new Memory({ data: gridData.items }) });
                        grid = new DataGrid({
                            paneId: pane.id,
                            id: pane.id + "_grid",
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
                        }).placeAt(pane);
                        grid.startup();
                        grid.connect(grid, 'onRowClick', createButtons);
                        grid.connect(grid, 'onDeselected', removeButtons);
                        grid.connect(grid, 'onDblClick', updEmployee);
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
    var pane = this;
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
                request.get(pane.paneData.getAllUrl, {
                    handleAs: 'json'
                }).then(
                    function(resp) {
                        var gridData = {identifier: 'id', items: resp};
                        dataStore = new ObjectStore({ objectStore:new Memory({ data: gridData.items }) });
                        grid = new DataGrid({
                            paneId: pane.id,
                            id: pane.id + "_grid",
                            store: dataStore,
                            query: { id: "*" },
                            queryOptions: {},
                            structure: [
                                { name: 'Id', field: 'id', width: '5%' },
                                { name: 'Author', field: 'taskAuthor', width: '10%',
                                  formatter: function(author) {
                                      return author.lastName + " " + author.firstName + " " + author.middleName;
                                  }
                                },
                                { name: 'Subject', field: 'subject', width: '10%' },
                                { name: 'Text', field: 'text', width: '27.5%' },
                                { name: 'Doers', field: 'doers', width: '22.5%',
                                  formatter: function(doers) {
                                      var result = "";
                                      for (var i = 0; i < doers.length; i++) {
                                          result += doers[i].lastName + " " + doers[i].firstName + " " + doers[i].middleName + ", " ;
                                      }
                                      if (result.length > 0) result = result.substring(0, result.length - 2);
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
                        }).placeAt(pane);
                        grid.startup();
                        grid.connect(grid, 'onRowClick', createButtons);
                        grid.connect(grid, 'onDeselected', removeButtons);
                        grid.connect(grid, 'onDblClick', updTask);
                    },
                    function(error) {
                        console.log("not good");
                    }
                )
            }
    )
    this.count = 1;
}


function updCompany() {

    
    var btn = this;
        require([
            "dijit/registry", 
            "dijit/layout/ContentPane",
            "dijit/form/Button",
            "dijit/form/ValidationTextBox",  
            "dijit/form/Form", 
            "dojo/dom-construct"
        ], function(registry, ContentPane, Button, ValidationTextBox, Form, domConstruct){
            
            if (registry.byId("updateCompany")) return;
            
            var tabs = registry.byId("tabs");
            var pane = new ContentPane({ class: 'pane',title: "Update company", closable: 'true', id: "updateCompany", count: 0});
            
            var grid = registry.byId(btn.paneId + "_grid");
            
            var row = grid.selection.getSelected()[0];
            
            var form = createCompanyForm(pane, "/mini_ecm/api/company/update/" + row.id, "updateComp");
            
            var name = row.name;
            var physicalAdd = row.physicalAdd;
            var legalAdd = row.legalAdd;
            var managerId = row.manager ? row.manager.id : "";
            
            form.setValues({name: name, phAdress: physicalAdd, legAdress: legalAdd, manager: managerId});
            
            form.placeAt(pane);
            
            tabs.addChild(pane);
        });
    
}

function updSubvision() {
    
    var btn = this;
        require([
            "dijit/registry", 
            "dijit/layout/ContentPane",
            "dijit/form/Button",
            "dijit/form/ValidationTextBox",  
            "dijit/form/Form", 
            "dojo/dom-construct"
        ], function(registry, ContentPane, Button, ValidationTextBox, Form, domConstruct){
            
            if (registry.byId("updateSubvision")) return;
            
            var tabs = registry.byId("tabs");
            var pane = new ContentPane({ class: 'pane',title: "Update subvision", closable: 'true', id: "updateSubvision", count: 0});
            
            var grid = registry.byId(btn.paneId + "_grid");
            
            var row = grid.selection.getSelected()[0];
            
            var form = createSubvisionForm(pane, "/mini_ecm/api/subvision/update/" + row.id, "updateSubv");
            
            var name = row.name;
            var phNumber = row.phNumber;
            var managerId = row.manager ? row.manager.id : "";
            
            form.setValues({name: name, phNumber: phNumber, manager: managerId});
            
            form.placeAt(pane);
            
            tabs.addChild(pane);
        });
    
}

function updEmployee() {
    
    var btn = this;
        require([
            "dijit/registry", 
            "dijit/layout/ContentPane",
            "dijit/form/Button",
            "dijit/form/ValidationTextBox",  
            "dijit/form/Form", 
            "dojo/dom-construct"
        ], function(registry, ContentPane, Button, ValidationTextBox, Form, domConstruct){
            
            if (registry.byId("updateEmployee")) return;
            
            var tabs = registry.byId("tabs");
            var pane = new ContentPane({ class: 'pane',title: "Update employee", closable: 'true', id: "updateEmployee", count: 0});
            
            var grid = registry.byId(btn.paneId + "_grid");
            
            var row = grid.selection.getSelected()[0];
            
            var form = createEmployeeForm(pane, "/mini_ecm/api/employee/update/" + row.id, "updateEmpl");
            
            var fName = row.firstName;
            var lName = row.lastName;
            var mName = row.middleName;
            var position = row.position;
            
            form.setValues({position : position, fName: fName, lName: lName, mName: mName});
            
            form.placeAt(pane);
            
            tabs.addChild(pane);
        });
    
}

function updTask() {
    
    var btn = this;
        require([
            "dijit/registry", 
            "dijit/layout/ContentPane",
            "dijit/form/Button",
            "dijit/form/ValidationTextBox",  
            "dijit/form/Form", 
            "dojo/dom-construct"
        ], function(registry, ContentPane, Button, ValidationTextBox, Form, domConstruct){
            
            if (registry.byId("updateTask")) return;
            
            var tabs = registry.byId("tabs");
            var pane = new ContentPane({ class: 'pane',title: "Update task", closable: 'true', id: "updateTask", count: 0});
            
            var grid = registry.byId(btn.paneId + "_grid");
            
            var row = grid.selection.getSelected()[0];
            
            var form = createTaskForm(pane, "/mini_ecm/api/task/update/" + row.id, "updateTsk");
            
            var subject = row.subject;
            var text = row.text;
            var taskAuthorId = row.taskAuthor.id;
            var controlled = row.controlled;
            var doers = "";
            
            for(var i = 0; i < row.doers.length; i++) {
                doers += row.doers[i].id;
                doers += ","
            }
            
            if (doers.length > 0) doers = doers.substring(0, doers.length - 1);
            
            var time = row.executionTime;
            
            form.setValues({subject: subject, text: text, doers: doers, controlled: "" + controlled, exTime: time});
            
            form.placeAt(pane);
            
            tabs.addChild(pane);
        });
    
}



function createNewCompanyPane() {
    
    var btn = this;
        require([
            "dijit/registry", 
            "dijit/layout/ContentPane",
            "dijit/form/Button",
            "dijit/form/ValidationTextBox",  
            "dijit/form/Form", 
            "dojo/dom-construct"
        ], function(registry, ContentPane, Button, ValidationTextBox, Form, domConstruct){
            
            if (registry.byId("createCompany")) return;
            
            var tabs = registry.byId("tabs");
            var pane = new ContentPane({ class: 'pane',title: "New company", closable: 'true', id: "createCompany", count: 0});
            
            var form = createCompanyForm(pane, "/mini_ecm/api/company/create", "createComp");
            
            form.placeAt(pane);
            
            tabs.addChild(pane);
        });
    
}

function createNewSubvisionPane() {
    
    var btn = this;
        require([
            "dijit/registry", 
            "dijit/layout/ContentPane",
            "dijit/form/Button",
            "dijit/form/ValidationTextBox",  
            "dijit/form/Form", 
            "dojo/dom-construct"
        ], function(registry, ContentPane, Button, ValidationTextBox, Form, domConstruct){
            
            if (registry.byId("createSubvision")) return;
            
            var tabs = registry.byId("tabs");
            var pane = new ContentPane({ class: 'pane',title: "New subvision", closable: 'true', id: "createSubvision", count: 0});
            
            var form = createSubvisionForm(pane, "/mini_ecm/api/subvision/create", "createSubv");
            
            form.placeAt(pane);
            
            tabs.addChild(pane);
        });
    
}

function createNewEmployeePane() {
        
        var btn = this;
        require([
            "dijit/registry", 
            "dijit/layout/ContentPane",
            "dijit/form/Button",
            "dijit/form/ValidationTextBox",  
            "dijit/form/Form", 
            "dojo/dom-construct"
        ], function(registry, ContentPane, Button, ValidationTextBox, Form, domConstruct){
            
            if (registry.byId("createEmployee")) return;
            
            var tabs = registry.byId("tabs");
            var pane = new ContentPane({ class: 'pane',title: "New employee", closable: 'true', id: "createEmployee", count: 0});
            
            var form = createEmployeeForm(pane, "/mini_ecm/api/employee/create", "createEmpl");
            
            form.placeAt(pane);
            
            tabs.addChild(pane);
        });
    
}


function createNewTaskPane() {
    
    var btn = this;
        require([
            "dijit/registry", 
            "dijit/layout/ContentPane",
            "dijit/form/Button",
            "dijit/form/ValidationTextBox",  
            "dijit/form/Form", 
            "dojo/dom-construct"
        ], function(registry, ContentPane, Button, ValidationTextBox, Form, domConstruct){
            
            if (registry.byId("createTask")) return;
            
            var tabs = registry.byId("tabs");
            var pane = new ContentPane({ class: 'pane',title: "New task", closable: 'true', id: "createTask", count: 0});
            
            var form = createTaskForm(pane, "/mini_ecm/api/task/create", "createTsk");
            
            form.placeAt(pane);
            
            tabs.addChild(pane);
        });
    
}



function createCompanyForm(pane, url, formId) {
    
    var form;
    
    require([
            "dijit/registry", 
            "dijit/layout/ContentPane",
            "dijit/form/Button",
            "dijit/form/ValidationTextBox",  
            "dijit/form/Form", 
            "dojo/dom-construct"
        ], function(registry, ContentPane, Button, ValidationTextBox, Form, domConstruct){
            
            var name = domConstruct.create('div', {id: pane.id + "_name"});
            var phAdress = domConstruct.create('div', {id: pane.id + "_phAdress"});
            var legAdress = domConstruct.create('div', {id: pane.id + "_legAdress"});
            var manager = domConstruct.create('div', {id: pane.id + "_manager"});
            var btns = domConstruct.create('div', {id: pane.id + "_btns"});
            
            form = new Form({
                method: "POST",
                id: formId
            });
            
            domConstruct.place(name, form.domNode);
            domConstruct.place(phAdress, form.domNode);
            domConstruct.place(legAdress, form.domNode);
            domConstruct.place(manager, form.domNode);
            domConstruct.place(btns, form.domNode);
            
            var nameText = new ValidationTextBox({
                placeHolder: "Company name",
                required: true,
                name: "name",
                promptMessage: "Company name here.",
                missingMessage: "It's required field.",
                invalidMessage: "Invalid name."
            });
            
            var phAdressText = new ValidationTextBox({
                placeHolder: "Physical adress",
                required: true,
                name: "phAdress",
                promptMessage: "Physical adress here.",
                missingMessage: "It's required field.",
                invalidMessage: "Invalid adress."
            });
            
            var legAdressText = new ValidationTextBox({
                placeHolder: "Legal adress",
                required: true,
                name: "legAdress",
                promptMessage: "Legal adress here.",
                missingMessage: "It's required field.",
                invalidMessage: "Invalid adress."
            });
            
            var managerText = new ValidationTextBox({
                placeHolder: "Manager id",
                required: true,
                name: "manager",
                validator: onlyDigitsVldtr,
                promptMessage: "Manager here.",
                missingMessage: "It's required field.",
                invalidMessage: "It's only digits required."
            });

            var confirm = new Button({
                label: "Confirm",
                formId: form.id,
                paneId: "createCompany",
                actionUrl: url,
                onClick: function() { if (registry.byId(this.formId).validate()) sendForm(this); }
            });
            
            domConstruct.place(nameText.domNode, name);
            domConstruct.place(phAdressText.domNode, phAdress);
            domConstruct.place(legAdressText.domNode, legAdress);
            domConstruct.place(managerText.domNode, manager);
            domConstruct.place(confirm.domNode, btns);
            
            form.startup();
            
        });
    
    return form;
    
}

function createSubvisionForm(pane, url, formId) {
    
    var form;
    
    require([
            "dijit/registry", 
            "dijit/layout/ContentPane",
            "dijit/form/Button",
            "dijit/form/ValidationTextBox",  
            "dijit/form/Form", 
            "dojo/dom-construct"
        ], function(registry, ContentPane, Button, ValidationTextBox, Form, domConstruct){
            
            var name = domConstruct.create('div', {id: pane.id + "_name"});
            var phNumber = domConstruct.create('div', {id: pane.id + "_phNumber"});
            var manager = domConstruct.create('div', {id: pane.id + "_manager"});
            var btns = domConstruct.create('div', {id: pane.id + "_btns"});
            
            form = new Form({
                method: "POST",
                id: formId
            });
            
            domConstruct.place(name, form.domNode);
            domConstruct.place(phNumber, form.domNode);
            domConstruct.place(manager, form.domNode);
            domConstruct.place(btns, form.domNode);
            
            var nameText = new ValidationTextBox({
                placeHolder: "Subvision name",
                required: true,
                name: "name",
                promptMessage: "Subvision name here.",
                missingMessage: "It's required field.",
                invalidMessage: "Invalid name."
            });
            
            var phNumberText = new ValidationTextBox({
                placeHolder: "Phone number",
                required: true,
                name: "phNumber",
                validator: ruPhNumberVldtr,
                promptMessage: "Phone number here.",
                missingMessage: "It's required field.",
                invalidMessage: "Invalid number."
            });
            
            var managerText = new ValidationTextBox({
                placeHolder: "Manager id",
                required: true,
                name: "manager",
                validator: onlyDigitsVldtr,
                promptMessage: "Manager here.",
                missingMessage: "It's required field.",
                invalidMessage: "It's only digits required."
            });

            var confirm = new Button({
                label: "Confirm",
                formId: form.id,
                paneId: "createSubvision",
                actionUrl: url,
                onClick: function() { if (registry.byId(this.formId).validate()) sendForm(this); }
            });
            
            domConstruct.place(nameText.domNode, name);
            domConstruct.place(phNumberText.domNode, phNumber);
            domConstruct.place(managerText.domNode, manager);
            domConstruct.place(confirm.domNode, btns);
            
            form.startup();
            
        });
    
    return form;
    
}

function createEmployeeForm(pane, url, formId) {
    
    var form;
    
    require([
            "dijit/registry", 
            "dijit/layout/ContentPane",
            "dijit/form/Button",
            "dijit/form/ValidationTextBox",  
            "dijit/form/Form", 
            "dojo/dom-construct"
        ], function(registry, ContentPane, Button, ValidationTextBox, Form, domConstruct){
            
            var lName = domConstruct.create('div', {id: pane.id + "_lName"});
            var fName = domConstruct.create('div', {id: pane.id + "_fName"});
            var mName = domConstruct.create('div', {id: pane.id + "_mName"});
            var position = domConstruct.create('div', {id: pane.id + "_position"});
            var btns = domConstruct.create('div', {id: pane.id + "_btns"});
            
            form = new Form({
                method: "POST",
                id: formId
            });
            
            domConstruct.place(lName, form.domNode);
            domConstruct.place(fName, form.domNode);
            domConstruct.place(mName, form.domNode);
            domConstruct.place(position, form.domNode);
            domConstruct.place(btns, form.domNode);
            
            var lNameText = new ValidationTextBox({
                placeHolder: "Last name",
                name: "lName",
                validator: oneWordVldtr,
                promptMessage: "Last name here.",
                missingMessage: "It's required field.",
                invalidMessage: "It's only one word required."
            });
            
            var fNameText = new ValidationTextBox({
                placeHolder: "First name",
                required: true,
                name: "fName",
                validator: oneWordVldtr,
                promptMessage: "First name here.",
                missingMessage: "It's required field.",
                invalidMessage: "It's only one word required."
            });
            
            var mNameText = new ValidationTextBox({
                placeHolder: "Middle name",
                required: true,
                name: "mName",
                validator: oneWordVldtr,
                promptMessage: "Middle name here.",
                missingMessage: "It's required field.",
                invalidMessage: "It's only one word required."
            });
            
            var positionText = new ValidationTextBox({
                placeHolder: "Position",
                required: true,
                name: "position",
                promptMessage: "Position here.",
                missingMessage: "It's required field."
            });

            var confirm = new Button({
                label: "Confirm",
                formId: form.id,
                paneId: "createEmployee",
                actionUrl: url,
                onClick: function() { if (registry.byId(this.formId).validate()) sendForm(this); }
            });
            
            domConstruct.place(lNameText.domNode, lName);
            domConstruct.place(fNameText.domNode, fName);
            domConstruct.place(mNameText.domNode, mName);
            domConstruct.place(positionText.domNode, position);
            domConstruct.place(confirm.domNode, btns);
            
            form.startup();
            
        });
    
    return form;
    
}

function createTaskForm(pane, url, formId) {
    var form;
    
    require([
            "dijit/registry", 
            "dijit/layout/ContentPane",
            "dijit/form/Button",
            "dijit/form/RadioButton",
            "dijit/form/ValidationTextBox",  
            "dijit/form/Form", 
            "dojo/dom-construct"
        ], function(registry, ContentPane, Button, RadioButton, ValidationTextBox, Form, domConstruct){
            
            var subj = domConstruct.create('div', {id: pane.id + "_subj"});
            var text = domConstruct.create('div', {id: pane.id + "_text"});
            var doers = domConstruct.create('div', {id: pane.id + "_doers"});
            var exTime = domConstruct.create('div', {id: pane.id + "_exTime"});
            var labelControlled = domConstruct.create('label', {innerHTML: 'Controlled:'});
            var controlled = domConstruct.create('div', {id: pane.id + "_controlled"});
            var btns = domConstruct.create('div', {id: pane.id + "_btns"});
            
            form = new Form({
                method: "POST",
                id: formId
            });
            
            domConstruct.place(subj, form.domNode);
            domConstruct.place(text, form.domNode);
            domConstruct.place(doers, form.domNode);
            domConstruct.place(exTime, form.domNode);
            domConstruct.place(labelControlled, form.domNode);
            domConstruct.place(controlled, form.domNode);
            domConstruct.place(btns, form.domNode);
            
            var subjText = new ValidationTextBox({
                placeHolder: "Subject",
                required: true,
                name: "subject",
                promptMessage: "Subject here.",
                missingMessage: "It's required field.",
                invalidMessage: "Invalid subject."
            });
            
            var taskText = new ValidationTextBox({
                placeHolder: "Task text",
                required: true,
                name: "text",
                promptMessage: "Task text here.",
                missingMessage: "It's required field.",
                invalidMessage: "Invalid task text."
            });
            
            var doerText = new ValidationTextBox({
                placeHolder: "Doers",
                required: true,
                name: "doers",
                validator: doersVldtr,
                promptMessage: "IDs list here with ',' as separator.",
                missingMessage: "It's required field.",
                invalidMessage: "Invalid value."
            });
            
            var exTimeText = new ValidationTextBox({
                placeHolder: "Execution time",
                required: true,
                name: "exTime",
                promptMessage: "Execution time here.",
                missingMessage: "It's required field.",
                invalidMessage: "Invalid value."
            });
        
            var controlledRBYes = new RadioButton({
                id: formId + "yesRB",
                value: 'true',
                name: 'controlled',
                showLabel: true
            });
            var labelYes = domConstruct.create('label', {for: 'yesRB', innerHTML: 'Yes '});
        
            var controlledRBNo = new RadioButton({
                id: formId + "noRB",
                value: 'false',
                checked: true,
                name: 'controlled'
            });
            var labelNo = domConstruct.create('label', {for: 'noRB', innerHTML: 'No'});

            var confirm = new Button({
                label: "Confirm",
                formId: formId,
                paneId: "createTask",
                actionUrl: url,
                onClick: function() { if (registry.byId(this.formId).validate()) sendForm(this); }
            });
        
            domConstruct.place(subjText.domNode, subj);
            domConstruct.place(taskText.domNode, text);
            domConstruct.place(doerText.domNode, doers);
            domConstruct.place(exTimeText.domNode, exTime);
            domConstruct.place(controlledRBYes.domNode, controlled);
            domConstruct.place(labelYes, controlled);
            domConstruct.place(controlledRBNo.domNode, controlled);
            domConstruct.place(labelNo, controlled);
            domConstruct.place(confirm.domNode, btns);
            
            controlledRBYes.startup();
            
            form.startup();
            
        });
    
    return form;
}


function createButtons(evt) {
    
    require([
        "dojo/query",
        "dijit/registry",
        "dojo/dom-style",
        "dojo/dom-construct",
        "dijit/form/Button",
        "dojo/NodeList-traverse"
    ], function(query, registry, domStyle, domConstruct, Button) {
        var paneId = query(evt.grid.domNode).closest('.pane')[0].id;
        var pane = registry.byId(paneId);
        
        if (!registry.byId(paneId + "_updateBtn")) {
            var updBtn = new Button({
                id: pane.id + "_updateBtn",
                label: "Update",
                paneId: pane.id,
                onClick: pane.paneData.updMethod
            });
            updBtn.startup();
            domConstruct.place(updBtn.domNode, dojo.byId(paneId + "_buttonDiv"));
        }
        
        if (!registry.byId(paneId + "_deleteBtn")) {
            var delBtn = new Button({
                id: pane.id + "_deleteBtn",
                label: "Delete",
                onClick: pane.paneData.delMethod
            });
            delBtn.startup();
            domConstruct.place(delBtn.domNode, dojo.byId(paneId + "_buttonDiv"));
        }
    })
}


function removeButtons() {
    
    var grid = this;
    
    require([
        "dojo/query",
        "dijit/registry",
        "dojo/dom-style",
        "dojo/dom-construct",
        "dijit/form/Button",
        "dojo/NodeList-traverse"
    ], function(query, registry, domStyle, domConstruct, Button) {
        var paneId = query(grid.domNode).closest('.pane')[0].id;
        
        var upd = registry.byId(paneId + "_updateBtn");
        var del = registry.byId(paneId + "_deleteBtn");
        
        if (upd) upd.destroy();
        if (del) del.destroy();
    })
    
}

function oneWordVldtr() {
    var regex = /(?:^[a-zA-z]+$)|(?:^[а-яА-Я]+$)/;
    return regex.test(("" + this.value).trim());
}

function onlyDigitsVldtr() {
    if (("" + this.value).trim().length < 1) return false;
    var regex = /^\d*$/;
    return regex.test(("" + this.value).trim());
}

function doersVldtr() {
    if (("" + this.value).trim().length < 1) return false;
    var regex = /^(?:\d*(?:,\d+)*)$/;
    return regex.test(("" + this.value).trim());
}

function ruPhNumberVldtr() {
    if (this.value.trim().length < 1) return false;
    var regex = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    return regex.test(this.value.trim());
}

function sendForm(btn) {
    console.log("SENDING FORM");
    dojo.xhrPost({
        url: btn.actionUrl,
        form: dojo.byId(btn.formId),
        load: function(resp) {
            require(["dijit/Dialog", "dojo/domReady!"], function(Dialog,){
                var myDialog = new Dialog({
                    title: "Server responded:",
                    style: "width: 300px"
                });
                myDialog.set("content", resp);
                myDialog.show();
            });
        }
    })
}



function deleteItem(evt, a, b) {
    
    var btn = this;
    
    require([
        "dojo/request",
        "dojo/query",
        "dijit/registry",
        "dojo/dom-style",
        "dojo/dom-construct",
        "dijit/form/Button",
        "dojo/NodeList-traverse"
    ], function(request, query, registry, domStyle, domConstruct, Button) {
        var paneId = query(btn.domNode).closest('.pane')[0].id;
        var pane = registry.byId(paneId);
        var grid = registry.byId(paneId + "_grid");
        var row = grid.selection.getSelected()[0];
        var selectedRows = grid.selection.getSelected();
        
        console.log(selectedRows);
        
        for (var i = 0; i < selectedRows.length; i++) {
            request.post(pane.paneData.deleteUrl + "/" + selectedRows[i].id).then(function() {
                
            });
        }
        grid.removeSelectedRows();
        grid.store.save();
        alert("Selected items has been deleted.");
        
    })
    
}

function selectTab(link) {
    var parentElementId = link.parentElement.id;
    dojo.query("#tabs li, div").removeClass("current"); 
    link.parentElement.setAttribute("class", "current"); 
    dojo.byId(parentElementId.substring(0, parentElementId.length - 4) + "_content").setAttribute("class", "current");
    
}