// Question position weighting factors for multiple question interface
var position = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
"a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "i2", "j2", "k2", "l2", "m2",
"n2", "o2", "p2", "q2", "r2", "s2", "t2", "u2", "v2", "w2", "x2", "y2", "z2",
"a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3", "i3", "j3", "k3", "l3", "m3",
"n3", "o3", "p3", "q3", "r3", "s3", "t3", "u3", "v3", "w3", "x3", "y3", "z3",
"a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4", "i4", "j4", "k4", "l4", "m4",
"n4", "o4", "p4", "q4", "r4", "s4", "t4", "u4", "v4", "w4", "x4", "y4", "z4",
"a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5", "i5", "j5", "k5", "l5", "m5",
"n5", "o5", "p5", "q5", "r5", "s5", "t5", "u5", "v5", "w5", "x5", "y5", "z5",
"a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6", "i6", "j6", "k6", "l6", "m6",
"n6", "o6", "p6", "q6", "r6", "s6", "t6", "u6", "v6", "w6", "x6", "y6", "z6",
"a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7", "i7", "j7", "k7", "l7", "m7",
"n7", "o7", "p7", "q7", "r7", "s7", "t7", "u7", "v7", "w7", "x7", "y7", "z7"];

var actualControls = [];

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

function interpret(){
    //try{

    document.getElementById("txtoutput").value = "";

    var headerlinks = "<meta http-equiv='content-type' content='text/html;charset=UTF-8' />\n" +
    "<script language='javascript' type='text/javascript' src='javascripts/include.js' defer><\/script>\n" +
    "<script language=\"javascript\">\n" +
    "tstUsername = \"\";\n" +
    "tstCurrentDate = \"2010/03/12\";\n" +
    "tt_cancel_destination = '';\n" +
    "tt_cancel_show = '';\n" +
    "<\/script>\n" ;

    var bodytop = "</head>\n<body><div id='content'>\n" +
    "<div id='description' style='color:#777;position:absolute;margin-top:-70px;'></div>";

    var r = document.getElementById("txtinput").value;

    var s = r.split("\n");

    for(var i =0; i < s.length; i++){
        if(s[i].trim().match(/^Feature:/i)) {
            /*
            var css = "<link href=\"stylesheets/" + (s[i].trim().substring(9).match(/Home\sPage/) ||
                s[i].trim().substring(9).match(/Patient\sDashboard/) ? "dashboard" : "form") +
            ".css?1266397276\" media=\"screen\" rel=\"stylesheet\" type=\"text/css\" />\n";

            var js = "\n<script type=\"text/javascript\" language=\"javascript\" src=\"javascripts/" +
            (s[i].trim().substring(9).match(/Home\sPage/) ||
                s[i].trim().substring(9).match(/Patient\sDashboard/) ? "dashboard" : "touchscreen") +
            ".js\" " + (s[i].trim().substring(9).match(/Home\sPage/) ||
                s[i].trim().substring(9).match(/Patient\sDashboard/) ? "" : "defer") +
            "></script>\n";
        */
       
            var idrequired = (s[i].trim().substring(9).match(/Home\sPage/) ? "id = 'home'" : "") ||
            (s[i].trim().substring(9).match(/Patient\sDashboard/) ? "id = 'dashboard'" : "");

            document.getElementById("txtoutput").value += "<html>\n<head>\n<title>" +
            s[i].trim().substring(9).toProperCase() + "</title>\n" + headerlinks + bodytop + "<center>\n";
            document.getElementById("txtoutput").value += "<form " + idrequired +
            " action=''>\n<table cellpadding=10>\n<tr>\n<th colspan=2>" +
            s[i].trim().substring(9).toProperCase() + "</th>\n</tr>\n";

            document.getElementById("hiddenoutput").value += "<html>\n<head>\n<title>" +
            s[i].trim().substring(9).toProperCase() + "</title>\n" + bodytop + "<center>\n";
            document.getElementById("hiddenoutput").value += "<form " + idrequired +
            " action=''>\n<table cellpadding=10>\n<tr>\n<th colspan=2>" +
            s[i].trim().substring(9).toProperCase() + "</th>\n</tr>\n";

        } else if(s[i].trim().match(/^Scenario:/i)){

        } else if(s[i].trim().match(/^Then\s+I\s+should\s+see\s+an\s+alert(\s+)?|^And\s+I\s+should\s+see\s+an\s+alert(\s+)?/i)){

        } else if(s[i].trim().match(/^Then\sI\sshould\ssee\s"Project\sName"\swith\svalue\s/i)){
            i = generateProjectName(s, i);
        } else if(s[i].trim().match(/^Then\sI\sshould\ssee\sa\stab\s/i)){
            i = generateTab(s, i);
        } else if(s[i].trim().match(/^Then\sI\sshould\ssee\sa\sbutton\s/i)){
            i = generateLinks(s, i);
        } else if(s[i].trim().toLowerCase().match(/^Then\s+I\s+should\s+see(\s+)?".+"\sif\s|^And\s+I\s+should\s+see(\s+)?".+"\sif\s/i)){
            actualControls.push(i);
            i = fillWithIf(s, i);
        } else if(s[i].trim().match(/^Then\s+I\s+should\s+see(\s+)?|^And\s+I\s+should\s+see(\s+)?/i)){
            actualControls.push(i);
            if(s[i+1].trim().match(/^Then\s+I\s+fill\s+in(\s+)?|^And\s+I\s+fill\s+in(\s+)?/i)){
                var result = s[i+1].trim().substring(15).match(/.+with\s(a\snumber\s|text\s|a\sdate\s|a\sdatetime\s|time\s)?"(.+)?"$/);

                if(result){
                    var token = "";

                    switch(result[1]){
                        case "a number ":
                            token = "number";
                            break;
                        case "a date ":
                            token = "date";
                            break;
                        case "a datetime ":
                            token = "datetime";
                            break;
                        case "time ":
                            token = "time";
                            break;
                        case "text ":
                        default:
                            token = "text";
                            break;
                    }

                    document.getElementById("txtoutput").value += "<tr>\n<td>" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
                    "</td>\n<td>\n<input type='text' position='" + position[actualControls.length] + "' value='" +
                    (result[2] ? result[2] : "") + (result[1] ? "' field_type='" + token : "") + "' name='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "' id='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "' helptext='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
                    "' />\n</td>\n</tr>\n";
                    document.getElementById("hiddenoutput").value += "<tr>\n<td>" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
                    "</td>\n<td>\n<input type='text' position='" + position[actualControls.length] + "' value='" +
                    (result[2] ? result[2] : "") + (result[1] ? "' field_type='" + token : "") + "' name='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "' id='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "' helptext='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
                    "' />\n</td>\n</tr>\n";
                } else {
                    document.getElementById("txtoutput").value += "<tr>\n<td>" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
                    "</td>\n<td>\n<input type='text' position='" + position[actualControls.length] + "' value='" +
                    (s[i+1].trim().substring(15).match(/.+with\s"(.+)"$/) ? s[i+1].trim().substring(15).match(/.+with.+"(.+)"$/)[1] : "") +
                    "' name='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "' id='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "' helptext='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
                    "' />\n</td>\n</tr>\n";
                    document.getElementById("hiddenoutput").value += "<tr>\n<td>" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
                    "</td>\n<td>\n<input type='text' position='" + position[actualControls.length] + "' value='" +
                    (s[i+1].trim().substring(15).match(/.+with\s"(.+)"$/) ? s[i+1].trim().substring(15).match(/.+with.+"(.+)"$/)[1] : "") +
                    "' name='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "' id='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "' helptext='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
                    "' />\n</td>\n</tr>\n";
                }

            } else {
                if(s[i+1].trim().match(/^Then\s+I\s+should\s+see(\s+)?|^And\s+I\s+should\s+see(\s+)?/i)){
                    document.getElementById("txtoutput").value += "<tr>\n<td>" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").toProperCase() +
                    "</td>\n<td>\n<select position='" + position[actualControls.length] + "' style='width: 100%' name='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "' id='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "' helptext='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
                    "'>\n";

                    document.getElementById("hiddenoutput").value += "<tr>\n<td>" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").toProperCase() +
                    "</td>\n<td>\n<select position='" + position[actualControls.length] + "' style='width: 100%' name='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "' id='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "' helptext='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
                    "'>\n";

                    var j = i+1;

                    while(j < s.length && !s[j].trim().match(/^Then\s+I\s+select(\s+)?|^And\s+I\s+select(\s+)?/i)){
                        if(!s[j].trim().match(/^And\s+i\s+should\s+see\s+the\s+following\s+list/)){
                            document.getElementById("txtoutput").value += "<option>" +
                            s[j].trim().substring("Then I should see ".length).replace(/"/g, "").trim() +
                            "</option>\n";
                            document.getElementById("hiddenoutput").value += "<option>" +
                            s[j].trim().substring("Then I should see ".length).replace(/"/g, "").trim() +
                            "</option>\n";
                        }
                        j++;
                        i++;
                    }
                    document.getElementById("txtoutput").value += "</select>\n</td>\n</tr>\n";
                    document.getElementById("hiddenoutput").value += "</select>\n</td>\n</tr>\n";

                } else {
                    document.getElementById("txtoutput").value += "<tr>\n<td>" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
                    "</td>\n<td>\n<input type='text' position='" + position[actualControls.length] + "' value='' name='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "' id='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "' helptext='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
                    "' />\n</td>\n</tr>\n";
                    document.getElementById("hiddenoutput").value += "<tr>\n<td>" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
                    "</td>\n<td>\n<input type='text' position='" + position[actualControls.length] + "' value='' name='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "' id='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                    "' helptext='" +
                    s[i].trim().substring("Then I should see ".length).replace(/"/g, "").trim().toProperCase() +
                    "' />\n</td>\n</tr>\n";
                }
            }
        } else if(s[i].trim().match(/^And\s+I\s+press(\s+)?"finish"/i)){
            document.getElementById("txtoutput").value +=
            "<tr>\n<td align='center'>\n<input type='submit' value='Finish' />\n</td>\n</tr>\n" +
            "</table>\n<span id='facility'>Facility Name</span>\n<span id='user'>Current User</span>" +
            "<span id='location'>Location Name</span>\n<span id='date'><span style='color: #f00;'>" +
            "15-Dec-2010</span></span>\n</form>\n</center>\n</div>\n</body>\n</html>";

            document.getElementById("hiddenoutput").value +=
            "<tr>\n<td align='center'>\n<input type='submit' value='Finish' />\n</td>\n</tr>\n" +
            "</table>\n</form>\n</center>\n</div>\n</body>\n</html>";
            break;
        }
    }
    var testFrame = document.getElementById("main");
    var doc = testFrame.contentDocument;

    if (doc == undefined || doc == null)
        doc = testFrame.contentWindow.document;
    doc.open();
    doc.write(document.getElementById("hiddenoutput").value);
    doc.close();

    var previewFrame = document.getElementById("preview");
    var doc = previewFrame.contentDocument;

    if (doc == undefined || doc == null)
        doc = previewFrame.contentWindow.document;
    doc.open();
    doc.write(document.getElementById("txtoutput").value);
    doc.close();
/*} catch(e){
                    alert(e);
                }*/
}

function fillWithIf(s, i){
    var condition = s[i].trim().substring(s[i].trim().toLowerCase().indexOf('" if "') + '" if "'.length - 1).split("&&");
    var conditionstring = "";

    if(condition.length > 0){
        for(var k = 0; k < condition.length; k++){

            if(condition[k].match(/(".+")(\s+)?(==|<|>|!=|<>|>=|<=)(\s+)?("(.+)?")/)){
                var terms = condition[k].match(/(".+")(\s+)?(==|<|>|!=|<>|>=|<=)(\s+)?("(.+)?")/);

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

    console.log(conditionstring);

    if(s[i+1].trim().match(/^Then\s+I\s+should\s+see(\s+)?|^And\s+I\s+should\s+see(\s+)?/i)){
        document.getElementById("txtoutput").value += "<tr>\n<td>" +
        s[i].trim().substring("Then I should see ".length,
            s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").toProperCase() +
        "</td>\n<td>\n<select position='" + position[actualControls.length] + "' style='width: 100%' name='" +
        s[i].trim().substring("Then I should see ".length,
            s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
        "' id='" +
        s[i].trim().substring("Then I should see ".length,
            s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
        "' helptext='" +
        s[i].trim().substring("Then I should see ".length,
            s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").trim().toProperCase() +
        "' condition='" + conditionstring + "'>\n";

        document.getElementById("hiddenoutput").value += "<tr>\n<td>" +
        s[i].trim().substring("Then I should see ".length,
            s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").toProperCase() +
        "</td>\n<td>\n<select position='" + position[actualControls.length] + "' style='width: 100%' name='" +
        s[i].trim().substring("Then I should see ".length,
            s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
        "' id='" +
        s[i].trim().substring("Then I should see ".length,
            s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
        "' helptext='" +
        s[i].trim().substring("Then I should see ".length,
            s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").trim().toProperCase() +
        "' condition='" + conditionstring + "'>\n";

        var j = i+1;

        while(j < s.length && !s[j].trim().match(/^Then\s+I\s+select(\s+)?|^And\s+I\s+select(\s+)?/i)){
            if(!s[j].trim().match(/^And\s+i\s+should\s+see\s+the\s+following\s+list/)){
                document.getElementById("txtoutput").value += "<option>" +
                s[j].trim().substring("Then I should see ".length).replace(/"/g, "").trim() +
                "</option>\n";
                document.getElementById("hiddenoutput").value += "<option>" +
                s[j].trim().substring("Then I should see ".length).replace(/"/g, "").trim() +
                "</option>\n";
            }
            j++;
            i++;
        }
        document.getElementById("txtoutput").value += "</select>\n</td>\n</tr>\n";
        document.getElementById("hiddenoutput").value += "</select>\n</td>\n</tr>\n";
    } else {
        /*
        document.getElementById("txtoutput").value += "<tr>\n<td>" +
        s[i].trim().substring("Then I should see ".length,
            s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").trim().toProperCase() +
        "</td>\n<td>\n<input type='text' position='" + position[actualControls.length] + "' value='' name='" +
        s[i].trim().substring("Then I should see ".length,
            s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").replace(/\s/g, "_").trim().toLowerCase() +
        "' id='" +
        s[i].trim().substring("Then I should see ".length,
            s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").replace(/\s/g, "_").trim().toLowerCase() +
        "' helptext='" +
        s[i].trim().substring("Then I should see ".length,
            s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").trim().toProperCase() +
        "' condition='" + conditionstring + "' />\n</td>\n</tr>\n";

        document.getElementById("hiddenoutput").value += "<tr>\n<td>" +
        s[i].trim().substring("Then I should see ".length,
            s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").trim().toProperCase() +
        "</td>\n<td>\n<input type='text' position='" + position[actualControls.length] + "' value='' name='" +
        s[i].trim().substring("Then I should see ".length,
            s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").replace(/\s/g, "_").trim().toLowerCase() +
        "' id='" +
        s[i].trim().substring("Then I should see ".length,
            s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").replace(/\s/g, "_").trim().toLowerCase() +
        "' helptext='" +
        s[i].trim().substring("Then I should see ".length,
            s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").trim().toProperCase() +
        "' condition='" + conditionstring + "' />\n</td>\n</tr>\n";
        */
        if(s[i+1].trim().match(/^Then\s+I\s+fill\s+in(\s+)?|^And\s+I\s+fill\s+in(\s+)?/i)){
            var result = s[i+1].trim().substring(15).match(/.+with\s(a\snumber\s|text\s|a\sdate\s|a\sdatetime\s|time\s)?"(.+)?"$/);

            if(result){
                var token = "";

                switch(result[1]){
                    case "a number ":
                        token = "number";
                        break;
                    case "a date ":
                        token = "date";
                        break;
                    case "a datetime ":
                        token = "datetime";
                        break;
                    case "time ":
                        token = "time";
                        break;
                    case "text ":
                    default:
                        token = "text";
                        break;
                }

                document.getElementById("txtoutput").value += "<tr>\n<td>" +
                s[i].trim().substring("Then I should see ".length,
                    s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").trim().toProperCase() +
                "</td>\n<td>\n<input type='text' position='" + position[actualControls.length] + "' value='" +
                (result[2] ? result[2] : "") + (result[1] ? "' field_type='" + token : "") + "' name='" +
                s[i].trim().substring("Then I should see ".length,
                    s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                "' id='" +
                s[i].trim().substring("Then I should see ".length,
                    s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                "' helptext='" +
                s[i].trim().substring("Then I should see ".length,
                    s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").trim().toProperCase() +
                "' condition='" + conditionstring + "' />\n</td>\n</tr>\n";

                document.getElementById("hiddenoutput").value += "<tr>\n<td>" +
                s[i].trim().substring("Then I should see ".length,
                    s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").trim().toProperCase() +
                "</td>\n<td>\n<input type='text' position='" + position[actualControls.length] + "' value='" +
                (result[2] ? result[2] : "") + (result[1] ? "' field_type='" + token : "") + "' name='" +
                s[i].trim().substring("Then I should see ".length,
                    s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                "' id='" +
                s[i].trim().substring("Then I should see ".length,
                    s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                "' helptext='" +
                s[i].trim().substring("Then I should see ".length,
                    s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").trim().toProperCase() +
                "' condition='" + conditionstring + "' />\n</td>\n</tr>\n";

            } else {
                document.getElementById("txtoutput").value += "<tr>\n<td>" +
                s[i].trim().substring("Then I should see ".length,
                    s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").trim().toProperCase() +
                "</td>\n<td>\n<input type='text' position='" + position[actualControls.length] + "' value='' name='" +
                s[i].trim().substring("Then I should see ".length,
                    s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                "' id='" +
                s[i].trim().substring("Then I should see ".length,
                    s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                "' helptext='" +
                s[i].trim().substring("Then I should see ".length,
                    s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").trim().toProperCase() +
                "' condition='" + conditionstring + "' />\n</td>\n</tr>\n";

                document.getElementById("hiddenoutput").value += "<tr>\n<td>" +
                s[i].trim().substring("Then I should see ".length,
                    s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").trim().toProperCase() +
                "</td>\n<td>\n<input type='text' position='" + position[actualControls.length] + "' value='' name='" +
                s[i].trim().substring("Then I should see ".length,
                    s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                "' id='" +
                s[i].trim().substring("Then I should see ".length,
                    s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/\s/g, "_").trim().toLowerCase() +
                "' helptext='" +
                s[i].trim().substring("Then I should see ".length,
                    s[i].trim().toLowerCase().indexOf('" if "')).replace(/"/g, "").trim().toProperCase() +
                "' condition='" + conditionstring + "' />\n</td>\n</tr>\n";
            }

        }
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
    document.getElementById("hiddenoutput").value += "<h1 id='project_name'>\n" + name + "</h1>\n" +
    "<span id='patient_name'>Test Patient</span><span id='patient_id'>P00002</span>" +
    "<span id='patient_residence'>18/1453</span><span id='patient_age'>34</span>" +
    "<span id='patient_gender'>Female</span>";

    return i;
}

function generateTab(s, i){
    document.getElementById("txtoutput").value += "<select position='" + position[actualControls.length] + "' id=\"tabs\">\n";
    document.getElementById("hiddenoutput").value += "<select position='" + position[actualControls.length] + "' id=\"tabs\">\n";

    var j = i;

    while(j < s.length && s[j].trim().match(/^Then\sI\sshould\ssee\sa\stab\s/i)){
        var tab = s[j].trim().match(/^Then\sI\sshould\ssee\sa\stab\s"(.+)"\slinking\sto\s"(.+)"/i);

        document.getElementById("txtoutput").value += "<option value='" +
        tab[2] + "'>" + tab[1].toProperCase() + "</option>\n";
        document.getElementById("hiddenoutput").value += "<option value='" +
        tab[2] + "'>" + tab[1].toProperCase() + "</option>\n";
        j++;
        i++;
    }
    document.getElementById("txtoutput").value += "</select>\n";
    document.getElementById("hiddenoutput").value += "</select>\n";
    return i - 1;
}

function generateLinks(s, i){
    document.getElementById("txtoutput").value += "<select position='" + position[actualControls.length] + "' id=\"links\">\n";
    document.getElementById("hiddenoutput").value += "<select position='" + position[actualControls.length] + "' id=\"links\">\n";

    var j = i;

    while(j < s.length && s[j].trim().match(/^Then\sI\sshould\ssee\sa\sbutton\s/i)){
        var tab = s[j].trim().match(/^Then\sI\sshould\ssee\sa\sbutton\s"(.+)"\slinking\sto\s"(.+)"/i);

        document.getElementById("txtoutput").value += "<option value='" +
        tab[2] + "'>" + tab[1].toProperCase() + "</option>\n";
        document.getElementById("hiddenoutput").value += "<option value='" +
        tab[2] + "'>" + tab[1].toProperCase() + "</option>\n";
        j++;
        i++;
    }
    document.getElementById("txtoutput").value += "</select>\n";
    document.getElementById("hiddenoutput").value += "</select>\n";
    return i - 1;
}

function cleanUp(){
    document.getElementById("txtinput").value = document.getElementById("txtinput").value.replace(/”/g, "\"");
    document.getElementById("txtinput").value = document.getElementById("txtinput").value.replace(/“/g, "\"");
}