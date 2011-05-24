var concepts = [];
var encounter_types = [];

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

function ajaxRequest(aElement, aUrl) {
    for(var i = 0; i < aElement.length; i++){
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            handleResult(httpRequest);
        };
        try {
            httpRequest.open('GET', aUrl + aElement[i], true);
            httpRequest.send(null);
        } catch(e){
        }
    }
}

function handleResult(aXMLHttpRequest) {
    if (!aXMLHttpRequest) return;
   
    if (aXMLHttpRequest.readyState == 4 && aXMLHttpRequest.status == 200) {
        alert(aXMLHttpRequest.responseText);
    }
}

function interpret(model, action){
    concepts = [];
    encounter_types = [];

    document.getElementById("txtoutput").value = "";

    var r = document.getElementById("txtinput").value;

    var s = r.split("\n");
    var feature_name = "";

    for(var i =0; i < s.length; i++){
        var tag = "text_field";
        var concept = "";
        var term = "";

        if(s[i].trim().match(/^Feature:/i)) {

            feature_name = s[i].trim().substring(9).toLowerCase();

            encounter_types.push(feature_name.toUpperCase());

            document.getElementById("txtoutput").value += "# " + feature_name.toLowerCase().replace(/"/g, "").replace(/\s/g, "_") +
            ".rhtml\n\n" + "<script type=\"text/javascript\" language=\"javascript\">\n\t" +
            "<!--\n\t\ttt_cancel_show = \"/patients/show/<%= @patient.id %>\";\n\t\t" +
            "tt_cancel_destination = \"/patients/show/<%= @patient.id %>\";\n\t//-->\n</script>\n\n" +
            "<% form_tag :controller => \"" + model.replace(/"/g, "").replace(/\s/g, "_").toLowerCase() +
            "\", :action => \"" + action.replace(/"/g, "").replace(/\s/g, "_").toLowerCase() + "\" do |f| %>\n\t";

            document.getElementById("txtoutput").value += "<%= hidden_field_tag \"encounter[encounter_type_name]\", \"" +
            feature_name.toUpperCase() + "\" %>\n\t<%= hidden_field_tag \"encounter[patient_id]\", @patient.id %>\n\t" +
            "<%= hidden_field_tag \"encounter[encounter_datetime]\", DateTime.now() %>\n\t" +
            "<%= hidden_field_tag \"encounter[provider_id]\", session[:user_id] %>\n\t" +
            "<%session_date = session[:datetime] || Time.now() %>\n\n";

        } else if(s[i].trim().match(/^Scenario:/i)){

        } else if(s[i].trim().match(/^Then\s+I\s+should\s+see\s+an\s+alert(\s+)?|^And\s+I\s+should\s+see\s+an\s+alert(\s+)?/i)){

        } else if(s[i].trim().match(/^Then\sI\sshould\ssee\s"Project\sName"\swith\svalue\s/i)){
            i = generateProjectName(s, i);
        } else if(s[i].trim().match(/^Then\sI\sshould\ssee\sa\stab\s/i)){
            i = generateTab(s, i);
        } else if(s[i].trim().match(/^Then\sI\sshould\ssee\sa\sbutton\s/i)){
            i = generateLinks(s, i);
        } else if(s[i].trim().toLowerCase().match(/^Then\s+I\s+should\s+see(\s+)?".+"\sif\s|^And\s+I\s+should\s+see(\s+)?".+"\sif\s/i)){
            i = fillWithIf(s, i, model);
        } else if(s[i].trim().match(/^Then\s+I\s+should\s+see(\s+)?|^And\s+I\s+should\s+see(\s+)?/i)){
            if(s[i+1].trim().match(/^Then\s+I\s+fill\s+in(\s+)?|^And\s+I\s+fill\s+in(\s+)?/i)){
                var result = s[i+1].trim().substring(15).match(/.+with\s(a\snumber\s|text\s|a\sdate\s|a\sdatetime\s|time\s)?"(.+)?"$/);

                if(result){
                    switch(result[1]){
                        case "a number ":
                            tag = "numeric";
                            break;
                        case "a date ":
                            tag = "date";
                            break;
                        case "a datetime ":
                            tag = "date";
                            break;
                        case "time ":
                            tag = "date";
                            break;
                        case "text ":
                        default:
                            tag = "text_field";
                            break;
                    }

                    term = s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toUpperCase();

                    if(term.match(/^enter\s(.+)/i)){
                        concept = term.substring(6).trim().toUpperCase();
                    } else {
                        concept = term.toUpperCase();
                    }

                    concepts.push(concept);

                    document.getElementById("txtoutput").value += "\t<%= touch_" + tag + "_tag \"" + concept +
                    "\", @patient, nil, \n\t\t{:id => \"" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "\", \n\t\t :helptext => \"" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
                    "\" } %>\n";
                } else {

                    term = s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toUpperCase();

                    if(term.match(/^enter\s(.+)/i)){
                        concept = term.substring(6).trim().toUpperCase();
                    } else {
                        concept = term.toUpperCase();
                    }

                    concepts.push(concept);

                    document.getElementById("txtoutput").value += "\t<%= touch_" + tag + "_tag \"" + concept +
                    "\", @patient, nil, \n\t\t{:id => \"" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "\", \n\t\t :helptext => \"" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
                    "\" } %>\n";
                }

            } else {
                if(s[i+1].trim().match(/^Then\s+I\s+should\s+see(\s+)?|^And\s+I\s+should\s+see(\s+)?/i)){
                    var options = "";
                    var j = i+1;
                    var label = s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toUpperCase();

                    term = label;

                    if(term.match(/^enter\s(.+)/i)){
                        concept = term.substring(6).trim().toUpperCase();
                    } else {
                        concept = term.toUpperCase();
                    }

                    concepts.push(concept);

                    tag = "select";
                    
                    while(j < s.length && !s[j].trim().match(/^Then\s+I\s+select(\s+)?|^And\s+I\s+select(\s+)?/i)){
                        if(!s[j].trim().match(/^And\s+i\s+should\s+see\s+the\s+following\s+list/)){
                            var value = s[j].trim().substring("Then I should see ".length).replace(/"/g, "").trim();
                            
                            if(options.trim().length > 0){
                                options += ", [\"" + value + "\", \"" + value + "\"]";
                            } else {
                                options += "[\"" + value + "\", \"" + value + "\"]";
                            }

                            if(value.trim().length > 0)
                                concepts.push(value.toUpperCase());
                        }
                        j++;
                        i++;
                    }

                    document.getElementById("txtoutput").value += "\t<%= touch_" + tag + "_tag \"" +
                    concept + "\", @patient, options_for_select([" + options + "]), \n\t\t{:id => \"" +
                    label.replace(/"/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "\", \n\t\t :helptext => \"" + label.toProperCase() + "\" } %>\n";
                } else {

                    term = s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toUpperCase();

                    if(term.match(/^enter\s(.+)/i)){
                        concept = term.substring(6).trim().toUpperCase();
                    } else {
                        concept = term.toUpperCase();
                    }

                    concepts.push(concept);

                    document.getElementById("txtoutput").value += "\t<%= touch_" + tag + "_tag \"" + concept +
                    "\", @patient, nil, \n\t\t{:id => \"" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "\", \n\t\t :helptext => \"" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
                    "\" } %>\n";
                }
            }
        } else if(s[i].trim().match(/^And\s+I\s+press(\s+)?"finish"/i)){
            document.getElementById("txtoutput").value += "\n\t<%= submit_tag 'Finish' %>\n<% end %>\n";
            break;
        }
    }

    document.getElementById("controller").value = "";

    document.getElementById("controller").value = "# app/controllers/" + model.toLowerCase() +
    "_controller.rb\n\nclass " + model.trim().toProperCase() +
    "Controller < ApplicationController\n\n\tdef " +
    action.replace(/"/g, "").replace(/\s/g, "_") + "\n\t\t# Code for processing the input from the form goes here.\n\tend\n\nend\n";

    for(i = 0; i < concepts.length; i++){
        document.getElementById("concepts").value += concepts[i] + "\n";
    }

    for(i = 0; i < encounter_types.length; i++){
        document.getElementById("encounter_types").value += encounter_types[i] + "\n";
    }
}

function fillWithIf(s, i, model){
    var condition = s[i].trim().substring(s[i].trim().toLowerCase().indexOf('" if "') + '" if "'.length - 1).split("&&");
    var conditionstring = "";
    var tag = "text_field";
    var concept = "";
    var term = "";

    if(condition.length > 0){
        for(var k = 0; k < condition.length; k++){
            if(condition[k].match(/(".+")(\s+)?(==|<|>|!=|<>|>=|<=)(\s+)?(".+")/)){
                var terms = condition[k].match(/(".+")(\s+)?(==|<|>|!=|<>|>=|<=)(\s+)?(".+")/);

                if(conditionstring.trim().length > 0){
                    conditionstring += " && $(" + terms[1].toLowerCase().replace(/\s/gi, "_") + ").value " +
                    terms[3] + " " + terms[5];
                } else {
                    conditionstring += "$(" + terms[1].toLowerCase().replace(/\s/gi, "_") + ").value " +
                    terms[3] + " " + terms[5];
                }
            } else {
                if(conditionstring.trim().length > 0){
                    conditionstring += " && " + condition[k]
                } else {
                    conditionstring += condition[k]
                }
            }
        }
    }

    if(s[i+1].trim().match(/^Then\s+I\s+should\s+see(\s+)?|^And\s+I\s+should\s+see(\s+)?/i)){
        var options = "";
        var j = i+1;
        var label = s[i].trim().substring("Then I should see ".length, s[i].trim().indexOf("If")).replace(/"/g, "").trim().toUpperCase();

        term = label;

        if(term.match(/^enter\s(.+)/i)){
            concept = term.substring(6).trim().toUpperCase();
        } else {
            concept = term.toUpperCase();
        }

        concepts.push(concept);

        tag = "select";

        while(j < s.length && !s[j].trim().match(/^Then\s+I\s+select(\s+)?|^And\s+I\s+select(\s+)?/i)){
            if(!s[j].trim().match(/^And\s+i\s+should\s+see\s+the\s+following\s+list/)){
                var value = s[j].trim().substring("Then I should see ".length).replace(/"/g, "").trim();

                if(options.trim().length > 0){
                    options += ", [\"" + value + "\", \"" + value + "\"]";
                } else {
                    options += "[\"" + value + "\", \"" + value + "\"]";
                }

                if(value.trim().length > 0)
                    concepts.push(value.toUpperCase());
            }
            j++;
            i++;
        }
        document.getElementById("txtoutput").value += "\t<%= touch_" + tag + "_tag \"" +
        concept + "\", @patient, options_for_select([" + options + "]), \n\t\t{:id => \"" +
        label.replace(/"/g, "").replace(/\s/g, "_").trim().toLowerCase() +
        "\", \n\t\t :helptext => \"" + label.toProperCase() +
        "\", \n\t\t:condition => '" + conditionstring +
        "' } %>\n";

    } else {

        term = s[i].trim().substring("Then I should see ".length, s[i].trim().indexOf("If")).replace(/"/g, "").trim().toUpperCase();

        if(term.match(/^enter\s(.+)/i)){
            concept = term.substring(6).trim().toUpperCase();
        } else {
            concept = term.toUpperCase();
        }

        concepts.push(concept);

        document.getElementById("txtoutput").value += "\t<%= touch_" + tag + "_tag \"" + concept +
        "\", @patient, nil, \n\t\t{:id => \"" +
        s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\s/g, "_").trim().toLowerCase() +
        "\", \n\t\t :helptext => \"" +
        s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
        "\", \n\t\t:condition => '" + conditionstring +
        "' } %>\n";

    }
    return i;
}

function generateProjectName(s, i){
    var name = s[i].trim().trim().substring(s[i].trim().toLowerCase().indexOf('value "') + 'value "'.length,
        s[i].trim().length - 1);

    document.getElementById("txtoutput").value += "<h1 id='project_name'>\n" + name + "</h1>\n" +
    "<span id='patient_name'>Test Patient</span><span id='patient_id'>P00002</span>" +
    "<span id='patient_residence'>18/1453</span><span id='patient_age'>34</span>" +
    "<span id='patient_gender'>Female</span>";

    return i;
}

function generateTab(s, i){
    document.getElementById("txtoutput").value += "<select id=\"tabs\">\n";

    var j = i;

    while(j < s.length && s[j].trim().match(/^Then\sI\sshould\ssee\sa\stab\s/i)){
        var tab = s[j].trim().match(/^Then\sI\sshould\ssee\sa\stab\s"(.+)"\slinking\sto\s"(.+)"/i);

        document.getElementById("txtoutput").value += "<option value='" +
        tab[2] + "'>" + tab[1] + "</option>\n";
        j++;
        i++;
    }
    document.getElementById("txtoutput").value += "</select>\n";
    return i - 1;
}

function generateLinks(s, i){
    document.getElementById("txtoutput").value += "<select id=\"links\">\n";

    var j = i;

    while(j < s.length && s[j].trim().match(/^Then\sI\sshould\ssee\sa\sbutton\s/i)){
        var tab = s[j].trim().match(/^Then\sI\sshould\ssee\sa\sbutton\s"(.+)"\slinking\sto\s"(.+)"/i);

        document.getElementById("txtoutput").value += "<option value='" +
        tab[2] + "'>" + tab[1] + "</option>\n";
        j++;
        i++;
    }
    document.getElementById("txtoutput").value += "</select>\n";
    return i - 1;
}

function cleanUp(){
    document.getElementById("txtinput").value = document.getElementById("txtinput").value.replace(/”/g, "\"");
    document.getElementById("txtinput").value = document.getElementById("txtinput").value.replace(/“/g, "\"");
}