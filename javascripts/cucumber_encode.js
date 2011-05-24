var scenario_collection = {};
var controls = {};
var features = [];

function addFeature(description){
    var id = description.replace(/\s/gi, "_").toLowerCase();
    //id = "feature_" + id;

    if(!document.getElementById(id)) {
        scenario_collection[id] = 0;

        var div = document.createElement("div");
        div.id = id;
        div.style.width = "98.5%";
        //div.style.border = "1px #666 solid";
        div.style.padding = "5px";
        div.style.minHeight = "130px";

        var feature_label = document.createElement("label");
        feature_label.innerHTML = "<i style='color: #666; font-size: 2em;'><b>Feature:</b> " + description + "</i><br />";
        feature_label.style.margin = "10px";

        div.appendChild(feature_label);

        var feature_description = document.createElement("textarea");
        feature_description.style.width = "80%";
        feature_description.style.height = "100px";
        feature_description.style.cssFloat = "right";
        feature_description.style.margin = "10px";
        feature_description.id = id + "_description"
        feature_description.innerHTML = "As a ...\nI would like to ...\nSo that ..."

        div.appendChild(feature_description);

        document.getElementById("output").appendChild(div);

        var add_scenario = document.createElement("button");
        add_scenario.innerHTML = "Add Scenario";
        add_scenario.id = id + "_add_scenario";
        add_scenario.style.width = "90%";
        add_scenario.style.marginLeft = "8.5%";
        add_scenario.onclick = function(){
            var parent_id = this.id.match(/(.+)_add_scenario$/i);

            if(parent_id){
                var response = prompt("Enter a Scenario:", "Test Scenario");

                if(response){
                    scenario_collection[parent_id[1]]++;

                    addScenario(parent_id[1], response);
                }
            }
        }

        div.appendChild(add_scenario);

        var br = document.createElement("br");
        document.getElementById("output").appendChild(br);

        features.push(id);

    } else {
        document.getElementById(id).style.backgroundColor = "red";
        alert("Sorry, can't create this feature. Another one with the same title exists.");
        document.getElementById(id).style.backgroundColor = "";
    }
}

function addScenario(id, desc){
    var scenario = document.createElement("div");
    scenario.id = id + "_scenario_" + scenario_collection[id];
    scenario.style.width = "90%";
    //scenario.style.border = "1px solid #666";
    scenario.style.minHeight = "60px";
    scenario.style.marginTop = "5px";
    scenario.style.marginLeft = "8.5%";

    document.getElementById(id).appendChild(scenario);

    var container = document.createElement("div");
    container.style.width = "100%";
    container.style.minHeight = "60px";

    scenario.appendChild(container);

    var remove_scenario = document.createElement("button");
    remove_scenario.innerHTML = "Remove Scenario";
    remove_scenario.id = scenario.id + "_remove_scenario";
    remove_scenario.style.width = "200px";
    remove_scenario.style.cssFloat = "right";
    remove_scenario.onclick = function(){
        var parent_id = this.id.match(/(.+)_remove_scenario$/i);

        var response = confirm("Are you sure you want to remove this scenario?");

        if(response){
            var scene_id = parent_id[1].match(/(.+)_scenario_\d+$/i);

            if(scene_id){
                if(document.getElementById(scene_id[1])){

                    document.getElementById(scene_id[1]).removeChild(document.getElementById(parent_id[1]));

                } else {
                    alert("Sorry, Scenario could not be removed.");
                }
            }

        }
    }

    container.appendChild(remove_scenario);

    var add_control = document.createElement("button");
    add_control.innerHTML = "Add Control";
    add_control.id = scenario.id + "_add_control";
    add_control.style.width = "200px";
    add_control.style.marginBottom = "20px";
    add_control.onclick = function(){
        var parent_id = this.id.match(/(.+)_add_control$/i);

        addControl(parent_id[1]);
    }

    container.appendChild(add_control);

    var description = document.createElement("label");
    description.innerHTML = "<i style='color: #666; font-size: 1.5em;'><b>Scenario:</b> <span id='" +
    scenario.id + "_label'>" + desc + "</span></i>";

    description.style.width = "100%";
    description.style.padding = "5px";

    scenario.appendChild(description);

    var brk = document.createElement("br");
    scenario.appendChild(brk);
}

function addHomePageScenario(id, desc){
    var scenario = document.createElement("div");
    scenario.id = id + "_scenario_" + scenario_collection[id];
    scenario.style.width = "90%";
    //scenario.style.border = "1px solid #666";
    scenario.style.minHeight = "60px";
    scenario.style.marginTop = "5px";
    scenario.style.marginLeft = "8.5%";

    document.getElementById(id).appendChild(scenario);

    var container = document.createElement("div");
    container.style.width = "100%";
    container.style.minHeight = "60px";

    scenario.appendChild(container);

    var add_control = document.createElement("button");
    add_control.innerHTML = "Add Control";
    add_control.id = scenario.id + "_add_control";
    add_control.style.width = "200px";
    add_control.style.marginBottom = "20px";
    add_control.onclick = function(){
        var parent_id = this.id.match(/(.+)_add_control$/i);

        addHomePageControl(parent_id[1]);
    }

    container.appendChild(add_control);

    var description = document.createElement("label");
    description.innerHTML = "<i style='color: #666; font-size: 1.5em;'><b>Scenario:</b> <span id='" +
    scenario.id + "_label'>" + desc + "</span></i>";

    description.style.width = "100%";
    description.style.padding = "5px";

    scenario.appendChild(description);

    var brk = document.createElement("br");
    scenario.appendChild(brk);
}

function addPatientDashboardScenario(id, desc){
    var scenario = document.createElement("div");
    scenario.id = id + "_scenario_" + scenario_collection[id];
    scenario.style.width = "90%";
    //scenario.style.border = "1px solid #666";
    scenario.style.minHeight = "60px";
    scenario.style.marginTop = "5px";
    scenario.style.marginLeft = "8.5%";

    document.getElementById(id).appendChild(scenario);

    var container = document.createElement("div");
    container.style.width = "100%";
    container.style.minHeight = "60px";

    scenario.appendChild(container);

    var add_control = document.createElement("button");
    add_control.innerHTML = "Add Control";
    add_control.id = scenario.id + "_add_control";
    add_control.style.width = "200px";
    add_control.style.marginBottom = "20px";
    add_control.onclick = function(){
        var parent_id = this.id.match(/(.+)_add_control$/i);

        addPatientDashboardControl(parent_id[1]);
    }

    container.appendChild(add_control);

    var description = document.createElement("label");
    description.innerHTML = "<i style='color: #666; font-size: 1.5em;'><b>Scenario:</b> <span id='" +
    scenario.id + "_label'>" + desc + "</span></i>";

    description.style.width = "100%";
    description.style.padding = "5px";

    scenario.appendChild(description);

    var brk = document.createElement("br");
    scenario.appendChild(brk);
}

function addReportScenario(id, desc){
    var scenario = document.createElement("div");
    scenario.id = id + "_scenario_" + scenario_collection[id];
    scenario.style.width = "90%";
    //scenario.style.border = "1px solid #666";
    scenario.style.minHeight = "60px";
    scenario.style.marginTop = "5px";
    scenario.style.marginLeft = "8.5%";

    document.getElementById(id).appendChild(scenario);

    var container = document.createElement("div");
    container.style.width = "100%";
    container.style.minHeight = "60px";

    scenario.appendChild(container);

    var add_control = document.createElement("button");
    add_control.innerHTML = "Add Control";
    add_control.id = scenario.id + "_add_control";
    add_control.style.width = "200px";
    add_control.style.marginBottom = "20px";
    add_control.onclick = function(){
        var parent_id = this.id.match(/(.+)_add_control$/i);

        addReportField(parent_id[1]);
    }

    container.appendChild(add_control);

    var description = document.createElement("label");
    description.innerHTML = "<i style='color: #666; font-size: 1.5em;'><b>Scenario:</b> <span id='" +
    scenario.id + "_label'>" + desc + "</span></i>";

    description.style.width = "100%";
    description.style.padding = "5px";

    scenario.appendChild(description);

    var brk = document.createElement("br");
    scenario.appendChild(brk);
}

function addControl(id){
    if(!controls[id]){
        if(controls[id] == 0){
            controls[id]++;
        } else {
            controls[id] = 0;
        }
    } else {
        controls[id]++;
    }

    var div = document.createElement("div");
    div.id = "ctrl_container_" + controls[id];
    div.style.width = "98%";
    div.style.minHeight = "50px";
    div.style.borderBottom = "1px solid #eee";
    div.style.margin = "5px";

    document.getElementById(id).appendChild(div);

    var removeinput = document.createElement("input");
    removeinput.style.width = "5%";
    removeinput.type = "button";
    removeinput.style.padding = "5px";
    removeinput.style.marginTop = "6px";
    removeinput.value = "-";
    removeinput.id = id + "_remove_" + controls[id];
    removeinput.onclick = function(){
        this.parentNode.parentNode.removeChild(this.parentNode);
    }
    div.appendChild(removeinput);

    var input = document.createElement("input");
    input.style.width = "40%";
    input.type = "text";
    input.style.padding = "5px";
    input.style.marginTop = "6px";
    input.value = "<Enter Field Label>";
    input.className = "initial";
    input.id = id + "_ctrl_" + controls[id];
    input.onclick = function(){
        if(this.value.match(/<Enter Field Label>/)){
            this.className = "actual";
            this.value = "";
        }
    }
    input.onmouseout = function(){
        if(this.value.length <= 0){
            this.className = "initial";
            this.value = "<Enter Field Label>";
        }
    }

    div.appendChild(input);

    var control_type = document.createElement("select");
    control_type.style.width = "30%";
    control_type.style.padding = "4px";
    control_type.style.marginTop = "6px";
    control_type.id = id + "_ctrl_type_" + controls[id];
    control_type.onchange = function(){
        if(this[this.selectedIndex].value == "select"){
            if(!document.getElementById(this.id + "_select_options")){
                var selectoptions = document.createElement("input");
                selectoptions.type = "text";
                selectoptions.id = this.id + "_select_options";
                selectoptions.style.width = "100%";
                selectoptions.style.padding = "5px";
                selectoptions.style.marginTop = "6px";
                selectoptions.style.marginBottom = "6px";
                selectoptions.value = "<Enter options separated by semicolons (e.g. Yes; No; Unknown)>";
                selectoptions.className = "initial";
                selectoptions.onclick = function(){
                    if(this.value.match(/<Enter\soptions\sseparated\sby\ssemicolons/)){
                        this.className = "actual";
                        this.value = "";
                    }
                }
                selectoptions.onmouseout = function(){
                    if(this.value.length <= 0){
                        this.className = "initial";
                        this.value = "<Enter options separated by semicolons (e.g. Yes; No; Unknown)>";
                    }
                }

                this.parentNode.appendChild(selectoptions);

            }
        } else if(document.getElementById(this.id + "_select_options")) {
            document.getElementById(this.id +
                "_select_options").parentNode.removeChild(document.getElementById(this.id + "_select_options"))
        }
    }

    div.appendChild(control_type);

    var options = {
        "&lt;Select Control Type&gt;":"",
        "Text":"text",
        "Dropdown Selection":"select",
        "Date":"date",
        "Time":"time",
        "Datetime":"datetime",
        "Number":"number"
    }

    for(var option in options){
        var opt = document.createElement("option");
        opt.value = options[option];
        opt.innerHTML = option;

        control_type.appendChild(opt);
    }

    var conditionlabel = document.createElement("label");
    conditionlabel.innerHTML = "Condition? ";
    conditionlabel.id = id + "_condition_" + controls[id];
    ;
    conditionlabel.style.cssFloat = "right";
    conditionlabel.style.marginTop = "13px";

    div.appendChild(conditionlabel);

    var conditioncheck = document.createElement("input");
    conditioncheck.type = "checkbox";
    conditioncheck.id = id + "_check_" + controls[id];
    conditioncheck.onclick = function(){
        if(this.checked == true){
            if(!document.getElementById(this.id + "_condition")){
                var conditionoption = document.createElement("textarea");
                conditionoption.id = this.id + "_condition";
                conditionoption.style.width = "100%";
                conditionoption.style.padding = "5px";
                conditionoption.style.marginTop = "6px";
                conditionoption.style.marginBottom = "6px";
                conditionoption.innerHTML = "<Enter condition making reference " +
                "to target control using the label you used exactly as you use it \n\te.g.\n" +
                "\tGiven we entered a control before with label \"Select Gender\" and then " +
                "we need to put a condition that the current field is only shown when the former " +
                "field has value \"Female\" selected, the condition for the current control will be\n" +
                "\"Select Gender\" = \"Female\">";
                conditionoption.className = "initial";
                conditionoption.onclick = function(){
                    if(this.innerHTML.match(/Enter\scondition\s/)){
                        this.className = "actual";
                        this.innerHTML = "";
                    }
                }
                conditionoption.onmouseout = function(){
                    if(this.value.length <= 0){
                        this.className = "initial";
                        this.innerHTML = "<Enter condition making reference " +
                    "to target control using the label you used exactly as you use it \n\te.g.\n" +
                    "\tGiven we entered a control before with label \"Select Gender\" and then " +
                    "we need to put a condition that the current field is only shown when the former " +
                    "field has value \"Female\" selected, the condition for the current control will be\n" +
                    "\"Select Gender\" = \"Female\">"
                    }
                }

                this.parentNode.parentNode.appendChild(conditionoption);
            }
        } else {
            if(document.getElementById(this.id + "_condition")){
                document.getElementById(this.id + "_condition").parentNode.removeChild(
                    document.getElementById(this.id + "_condition"))
            }
        }
    }

    conditionlabel.appendChild(conditioncheck);
}

function addHomePageControl(id){
    if(!controls[id]){
        if(controls[id] == 0){
            controls[id]++;
        } else {
            controls[id] = 0;
        }
    } else {
        controls[id]++;
    }

    var div = document.createElement("div");
    div.id = "ctrl_container_" + controls[id];
    div.style.width = "98%";
    div.style.minHeight = "50px";
    div.style.borderBottom = "1px solid #eee";
    div.style.margin = "5px";

    document.getElementById(id).appendChild(div);

    var removeinput = document.createElement("input");
    removeinput.style.width = "5%";
    removeinput.type = "button";
    removeinput.style.padding = "5px";
    removeinput.style.marginTop = "6px";
    removeinput.value = "-";
    removeinput.id = id + "_remove_" + controls[id];
    removeinput.onclick = function(){
        this.parentNode.parentNode.removeChild(this.parentNode);
    }
    div.appendChild(removeinput);

    var input = document.createElement("input");
    input.style.width = "40%";
    input.type = "text";
    input.style.padding = "5px";
    input.style.marginTop = "6px";
    input.value = "<Enter Field Label>";
    input.className = "initial";
    input.id = id + "_ctrl_" + controls[id];
    input.onclick = function(){
        if(this.value.match(/<Enter Field Label>/)){
            this.className = "actual";
            this.value = "";
        }
    }
    input.onmouseout = function(){
        if(this.value.length <= 0){
            this.className = "initial";
            this.value = "<Enter Field Label>";
        }
    }

    div.appendChild(input);

    var control_type = document.createElement("select");
    control_type.style.width = "30%";
    control_type.style.padding = "4px";
    control_type.style.marginTop = "6px";
    control_type.id = id + "_ctrl_type_" + controls[id];
    control_type.onchange = function(){
        if(this[this.selectedIndex].value == "tab"){
            if(!document.getElementById(this.id + "_select_options")){
                var selectoptions = document.createElement("input");
                selectoptions.type = "text";
                selectoptions.id = this.id + "_select_options";
                selectoptions.style.width = "100%";
                selectoptions.style.padding = "5px";
                selectoptions.style.marginTop = "6px";
                selectoptions.style.marginBottom = "6px";
                selectoptions.value = "<Enter relative path of the page the tab will be linked to e.g. 'visit_history.html'>";
                selectoptions.className = "initial";
                selectoptions.onclick = function(){
                    if(this.value.match(/<Enter\srelative\spath\sof\sthe/)){
                        this.className = "actual";
                        this.value = "";
                    }
                }
                selectoptions.onmouseout = function(){
                    if(this.value.length <= 0){
                        this.className = "initial";
                        this.value = "<Enter relative path of the page the tab will be linked to e.g. 'visit_history.html'>";
                    }
                }

                this.parentNode.appendChild(selectoptions);

            }
        } else if(document.getElementById(this.id + "_select_options")) {
            document.getElementById(this.id +
                "_select_options").parentNode.removeChild(document.getElementById(this.id + "_select_options"))
        }
    }

    div.appendChild(control_type);

    var options = {
        "&lt;Select Control Type&gt;":"",
        "Project Name":"project",
        "Tab":"tab"
    }

    for(var option in options){
        var opt = document.createElement("option");
        opt.value = options[option];
        opt.innerHTML = option;

        control_type.appendChild(opt);
    }

}

function addPatientDashboardControl(id){
    if(!controls[id]){
        if(controls[id] == 0){
            controls[id]++;
        } else {
            controls[id] = 0;
        }
    } else {
        controls[id]++;
    }

    var div = document.createElement("div");
    div.id = "ctrl_container_" + controls[id];
    div.style.width = "98%";
    div.style.minHeight = "50px";
    div.style.borderBottom = "1px solid #eee";
    div.style.margin = "5px";

    document.getElementById(id).appendChild(div);

    var removeinput = document.createElement("input");
    removeinput.style.width = "5%";
    removeinput.type = "button";
    removeinput.style.padding = "5px";
    removeinput.style.marginTop = "6px";
    removeinput.value = "-";
    removeinput.id = id + "_remove_" + controls[id];
    removeinput.onclick = function(){
        this.parentNode.parentNode.removeChild(this.parentNode);
    }
    div.appendChild(removeinput);

    var input = document.createElement("input");
    input.style.width = "40%";
    input.type = "text";
    input.style.padding = "5px";
    input.style.marginTop = "6px";
    input.value = "<Enter Field Label>";
    input.className = "initial";
    input.id = id + "_ctrl_" + controls[id];
    input.onclick = function(){
        if(this.value.match(/<Enter Field Label>/)){
            this.className = "actual";
            this.value = "";
        }
    }
    input.onmouseout = function(){
        if(this.value.length <= 0){
            this.className = "initial";
            this.value = "<Enter Field Label>";
        }
    }

    div.appendChild(input);

    var control_type = document.createElement("select");
    control_type.style.width = "30%";
    control_type.style.padding = "4px";
    control_type.style.marginTop = "6px";
    control_type.id = id + "_ctrl_type_" + controls[id];
    control_type.onchange = function(){
        if(this[this.selectedIndex].value == "tab" || this[this.selectedIndex].value == "button_link"){
            if(!document.getElementById(this.id + "_select_options")){
                var selectoptions = document.createElement("input");
                selectoptions.type = "text";
                selectoptions.id = this.id + "_select_options";
                selectoptions.style.width = "100%";
                selectoptions.style.padding = "5px";
                selectoptions.style.marginTop = "6px";
                selectoptions.style.marginBottom = "6px";
                selectoptions.value = "<Enter relative path of the page the tab will be linked to e.g. 'visit_history.html'>";
                selectoptions.className = "initial";
                selectoptions.onclick = function(){
                    if(this.value.match(/<Enter\srelative\spath\sof\sthe/)){
                        this.className = "actual";
                        this.value = "";
                    }
                }
                selectoptions.onmouseout = function(){
                    if(this.value.length <= 0){
                        this.className = "initial";
                        this.value = "<Enter relative path of the page the tab will be linked to e.g. 'visit_history.html'>";
                    }
                }

                this.parentNode.appendChild(selectoptions);

            }
        } else if(document.getElementById(this.id + "_select_options")) {
            document.getElementById(this.id +
                "_select_options").parentNode.removeChild(document.getElementById(this.id + "_select_options"))
        }
    }

    div.appendChild(control_type);

    var options = {
        "&lt;Select Control Type&gt;":"",
        "Project Name":"project",
        "Tab":"tab",
        "Menu Item":"button_link"
    }

    for(var option in options){
        var opt = document.createElement("option");
        opt.value = options[option];
        opt.innerHTML = option;

        control_type.appendChild(opt);
    }

}

function addReportField(id){
    if(!controls[id]){
        if(controls[id] == 0){
            controls[id]++;
        } else {
            controls[id] = 0;
        }
    } else {
        controls[id]++;
    }

    var div = document.createElement("div");
    div.id = "ctrl_container_" + controls[id];
    div.style.width = "98%";
    div.style.minHeight = "50px";
    div.style.borderBottom = "1px solid #eee";
    div.style.margin = "5px";

    document.getElementById(id).appendChild(div);

    var removeinput = document.createElement("input");
    removeinput.style.width = "5%";
    removeinput.type = "button";
    removeinput.style.padding = "5px";
    removeinput.style.marginTop = "6px";
    removeinput.value = "-";
    removeinput.id = id + "_remove_" + controls[id];
    removeinput.onclick = function(){
        this.parentNode.parentNode.removeChild(this.parentNode);
    }
    div.appendChild(removeinput);

    var input = document.createElement("input");
    input.style.width = "40%";
    input.type = "text";
    input.style.padding = "5px";
    input.style.marginTop = "6px";
    input.value = "<Enter Field Label>";
    input.className = "initial";
    input.id = id + "_ctrl_" + controls[id];
    input.onclick = function(){
        if(this.value.match(/<Enter Field Label>/)){
            this.className = "actual";
            this.value = "";
        }
    }
    input.onmouseout = function(){
        if(this.value.length <= 0){
            this.className = "initial";
            this.value = "<Enter Field Label>";
        }
    }

    div.appendChild(input);

    var control_type = document.createElement("select");
    control_type.style.width = "30%";
    control_type.style.padding = "4px";
    control_type.style.marginTop = "6px";
    control_type.id = id + "_ctrl_type_" + controls[id];
    control_type.onchange = function(){
        if(this[this.selectedIndex].value == "group"){
            if(!document.getElementById(this.id + "_select_options")){
                var selectoptions = document.createElement("input");
                selectoptions.type = "text";
                selectoptions.id = this.id + "_select_options";
                selectoptions.style.width = "100%";
                selectoptions.style.padding = "5px";
                selectoptions.style.marginTop = "6px";
                selectoptions.style.marginBottom = "6px";
                selectoptions.value = "<Enter child concepts to report on separated by semicolons>";
                selectoptions.className = "initial";
                selectoptions.onclick = function(){
                    if(this.value.match(/<Enter\schild\sconcepts\sto\sreport/)){
                        this.className = "actual";
                        this.value = "";
                    }
                }
                selectoptions.onmouseout = function(){
                    if(this.value.length <= 0){
                        this.className = "initial";
                        this.value = "<Enter child concepts to report on separated by semicolons>";
                    }
                }

                this.parentNode.appendChild(selectoptions);

            }
        } else if(this[this.selectedIndex].value == "group_encounter"){
            if(!document.getElementById(this.id + "_select_options")){
                var selectoptions = document.createElement("input");
                selectoptions.type = "text";
                selectoptions.id = this.id + "_select_options";
                selectoptions.style.width = "100%";
                selectoptions.style.padding = "5px";
                selectoptions.style.marginTop = "6px";
                selectoptions.style.marginBottom = "6px";
                selectoptions.value = "<Enter child concepts to report on separated by semicolons>";
                selectoptions.className = "initial";
                selectoptions.onclick = function(){
                    if(this.value.match(/<Enter\schild\sconcepts\sto\sreport/)){
                        this.className = "actual";
                        this.value = "";
                    }
                }
                selectoptions.onmouseout = function(){
                    if(this.value.length <= 0){
                        this.className = "initial";
                        this.value = "<Enter child concepts to report on separated by semicolons>";
                    }
                }

                this.parentNode.appendChild(selectoptions);

            }
        } else if(document.getElementById(this.id + "_select_options")) {
            document.getElementById(this.id +
                "_select_options").parentNode.removeChild(document.getElementById(this.id + "_select_options"))
        }
    }

    div.appendChild(control_type);

    var options = {
        "&lt;Select Control Type&gt;":"",
        "Group Concept":"group",
        "Concept":"concept",
        "Encounter":"encounter",
        "Group Encounter":"group_encounter"
    }

    for(var option in options){
        var opt = document.createElement("option");
        opt.value = options[option];
        opt.innerHTML = option;

        control_type.appendChild(opt);
    }

}

String.prototype.toProperCase = function() {
    var elements = this.split(" ");
    var output = "";

    for(var i = 0; i < elements.length; i++){
        if(output.trim().length > 0){
            output += " " + elements[i].substring(0, 1).toUpperCase() + elements[i].substring(1).toLowerCase();
        } else {
            output = elements[i].substring(0, 1).toUpperCase() + elements[i].substring(1).toLowerCase();
        }

    }
    return output;
}

function generate_spec(){
    document.getElementById("txtoutput").value = "";

    for(var i = 0; i < features.length; i++){
        var title = features[i].replace(/_/gi, " ").toProperCase();

        title = "Feature: " + title + "\n";

        document.getElementById("txtoutput").value += title;

        document.getElementById("txtoutput").value +=
        document.getElementById(features[i] + "_description").value + "\n\n";

        getScenarios(features[i]);

        document.getElementById("txtoutput").value += "\n";
    }

}

function getScenarios(feature){
    if(document.getElementById(feature)){
        var scenarios = document.getElementById(feature).getElementsByTagName("span");
        var page = feature.replace(/_/gi, " ").toProperCase();

        for(var i = 0; i < scenarios.length; i++){
            document.getElementById("txtoutput").value += "\tScenario: " +
            scenarios[i].innerHTML + "\n";

            document.getElementById("txtoutput").value += "\t\tGiven I am on the \"" + page + "\" page\n"

            var id = scenarios[i].id.substring(0, scenarios[i].id.trim().length - 6)

            getControls(id);

            document.getElementById("txtoutput").value += "\t\tAnd I press \"Finish\"\n" +
        "\t\tThen I should be on the next page\n\n";
        }
    }
}

function getControls(id){
    var types = document.getElementById(id).getElementsByTagName("select");

    for(var i = 0; i < types.length; i++){
        var root = types[i].id.match(/\d+$/g)[0];
        var d = new Date();

        switch(types[i].value.toLowerCase()){
            case "select":
                if(document.getElementById(id + "_check_" + root + "_condition")){
                    document.getElementById("txtoutput").value += "\t\t" + "Then I should see \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\" If " +
                    document.getElementById(id + "_check_" + root + "_condition").value.trim() + "\n";
                } else {
                    document.getElementById("txtoutput").value += "\t\t" + "Then I should see \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\"\n";
                }

                var options = document.getElementById(id + "_ctrl_type_" + root + "_select_options").value.split(";");

                for(var j = 0; j < options.length; j++){
                    document.getElementById("txtoutput").value += "\t\t" + "And I should see \""
                    + options[j] + "\"\n";
                }
                document.getElementById("txtoutput").value += "\t\t" + "And I select \""
                + options[0] + "\"\n";

                break;
            case "group":
                document.getElementById("txtoutput").value += "\t\t" + "Then I should see a group concept \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\"\n";                

                var options = document.getElementById(id + "_ctrl_type_" + root + "_select_options").value.split(";");

                for(var j = 0; j < options.length; j++){
                    document.getElementById("txtoutput").value += "\t\t" + "And I should see a child concept \""
                    + options[j] + "\"\n";
                }
                
                break;
            case "group_encounter":
                document.getElementById("txtoutput").value += "\t\t" + "Then I should see a group encounter \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\"\n";

                var options = document.getElementById(id + "_ctrl_type_" + root + "_select_options").value.split(";");

                for(var j = 0; j < options.length; j++){
                    document.getElementById("txtoutput").value += "\t\t" + "And I should see a child concept \""
                    + options[j] + "\"\n";
                }

                break;
            case "concept":
                document.getElementById("txtoutput").value += "\t\t" + "Then I should see a concept \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\"\n";

                break;
            case "encounter":
                document.getElementById("txtoutput").value += "\t\t" + "Then I should see an encounter \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\"\n";

                break;
            case "date":
                if(document.getElementById(id + "_check_" + root + "_condition")){
                    document.getElementById("txtoutput").value += "\t\t" + "Then I should see \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\" If " +
                    document.getElementById(id + "_check_" + root + "_condition").value.trim() + "\n";
                } else {
                    document.getElementById("txtoutput").value += "\t\t" + "Then I should see \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\"\n";
                }

                document.getElementById("txtoutput").value += "\t\t" + "Then I fill in \""
                + document.getElementById(id + "_ctrl_" + root).value + "\" with a date \"" +
                "\"\n";

                break;
            case "time":
                if(document.getElementById(id + "_check_" + root + "_condition")){
                    document.getElementById("txtoutput").value += "\t\t" + "Then I should see \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\" If " +
                    document.getElementById(id + "_check_" + root + "_condition").value.trim() + "\n";
                } else {
                    document.getElementById("txtoutput").value += "\t\t" + "Then I should see \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\"\n";
                }

                document.getElementById("txtoutput").value += "\t\t" + "Then I fill in \""
                + document.getElementById(id + "_ctrl_" + root).value + "\" with time \"" +
                "\"\n";

                break;
            case "datetime":
                if(document.getElementById(id + "_check_" + root + "_condition")){
                    document.getElementById("txtoutput").value += "\t\t" + "Then I should see \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\" If " +
                    document.getElementById(id + "_check_" + root + "_condition").value.trim() + "\n";
                } else {
                    document.getElementById("txtoutput").value += "\t\t" + "Then I should see \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\"\n";
                }

                document.getElementById("txtoutput").value += "\t\t" + "Then I fill in \""
                + document.getElementById(id + "_ctrl_" + root).value + "\" with a datetime \"" +
                "\"\n";

                break;
            case "number":
                if(document.getElementById(id + "_check_" + root + "_condition")){
                    document.getElementById("txtoutput").value += "\t\t" + "Then I should see \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\" If " +
                    document.getElementById(id + "_check_" + root + "_condition").value.trim() + "\n";
                } else {
                    document.getElementById("txtoutput").value += "\t\t" + "Then I should see \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\"\n";
                }

                document.getElementById("txtoutput").value += "\t\t" + "Then I fill in \""
                + document.getElementById(id + "_ctrl_" + root).value + "\" with a number \"" +
                "\"\n";

                break;
            case "project":
                document.getElementById("txtoutput").value += "\t\t" + "Then I should see \"Project Name\" with value \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\"\n";
                
                break;
            case "tab":
                document.getElementById("txtoutput").value += "\t\t" + "Then I should see a tab \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\" linking to \"" +
                    document.getElementById(id + "_ctrl_type_" + root + "_select_options").value + "\"\n";
                
                break;
            case "button_link":
                document.getElementById("txtoutput").value += "\t\t" + "Then I should see a button \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\" linking to \"" +
                    document.getElementById(id + "_ctrl_type_" + root + "_select_options").value + "\"\n";

                break;
            case "text":
            default:
                if(document.getElementById(id + "_check_" + root + "_condition")){
                    document.getElementById("txtoutput").value += "\t\t" + "Then I should see \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\" If " +
                    document.getElementById(id + "_check_" + root + "_condition").value.trim() + "\n";
                } else {
                    document.getElementById("txtoutput").value += "\t\t" + "Then I should see \""
                    + document.getElementById(id + "_ctrl_" + root).value + "\"\n";
                }

                document.getElementById("txtoutput").value += "\t\t" + "Then I fill in \""
                + document.getElementById(id + "_ctrl_" + root).value + "\" with text \"Text\"\n";

                break;
        }
    //document.getElementById("txtoutput").value += "\t\t" + types[i].id + ": " + types[i].value + "\n";
    }
}
