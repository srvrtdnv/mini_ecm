<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>JUST FOR TEST</title>
        <script src="dojo/dojo.js"></script>
        <script src="script.js"></script>
        <style>
            #tabss li {
                display:inline-block;
                border: 1px solid #aaa;
                padding: 3px;
                margin-right: 5px;
            }
            
            #tabss li a { 
                color:#aaa; 
                text-decoration:none; 
            }
            
            #tabs, #tree {
                border: 1px solid #aaa;
            }
            
            #content div {
                display: none;
                visibility: hidden;
            }
            
            #content .current {
                display: block;
                visibility: visible;
            }
            
            #tabss .current {
                background: #eee;
            }
                
        </style>
    </head>
    <body>
        <div style="display: flex;">
            <div id="tree" style="width:25%; float:left;">
                <div style="text-align: center;">Дерево<br><hr></div>
                <a id="link1" href="#">Ссылка</a><br>
                <a id="link2" href="#">Ссылка</a><br>
                <a id="link3" href="#">Ссылка</a><br>
                <a id="link4" href="#">Ссылка</a><br>
                <a id="link5" href="#">Ссылка</a><br>
                <a id="link6" href="#">Ссылка</a><br>
                <a href="#">Ссылка</a><br>
                <a href="#">Ссылка</a><br>
                <a href="#">Ссылка</a><br>
                <a href="#">Ссылка</a>
            </div>
            <div id="tabs" style="width:75%; float:right;">
                <div style="text-align: center;">Вкладки<br><hr></div>
                <ul id="tabss">

                <!-- Tabs go here -->
                </ul>
                <div id="content">
                <!-- Tab content goes here -->
                </div>
            </div>
        </div>
        <script>
            dojo.connect(dojo.byId("tree"), "a:click", function() {addTab(this)});
            dojo.connect(dojo.byId("tabss"), "li a.remove:click", function() {destroyTab(this)});
            dojo.connect(dojo.byId("tabss"), "li a.select:click", function() {selectTab(this)});
        </script>
    </body>
</html>
