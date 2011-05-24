var concepts = [];
var encounter_types = [];

var queries = "";
var methods = "";

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
        
        if(s[i].trim().match(/^Feature:/i)) {

            feature_name = s[i].trim().substring(9).toLowerCase();

            encounter_types.push(feature_name.toUpperCase());

            document.getElementById("txtoutput").value += "<%# " + feature_name.toLowerCase().replace(/"/g, "").replace(/\s/g, "_") +
            ".rhtml %>\n\n" + "\n\n<table>\n";

        } else if(s[i].trim().match(/^Scenario:/i)){

        } else if(s[i].trim().match(/^Then\s+I\s+should\s+see\s+a\s+group\s+concept(\s+)?|^And\s+I\s+should\s+seea\s+group\s+concept(\s+)?/i)){
            i = generateGroupConceptSet(s, i);
        } else if(s[i].trim().match(/^Then\s+I\s+should\s+see\s+a\s+group\s+encounter(\s+)?|^And\s+I\s+should\s+seea\s+group\s+encounter(\s+)?/i)){
            i = generateGroupEncounterSet(s, i);
        } else if(s[i].trim().match(/^And\s+I\s+press(\s+)?"finish"/i)){
            document.getElementById("txtoutput").value += 
            "\n</table>\n<% form_tag :action => \"select\" do |f| %>\n\t<%= submit_tag 'Finish' %>\n<% end %>\n";
            break;
        }
    }

    document.getElementById("controller").value = "";

    /*
     * @start_date = nil
    @end_date = nil
    @start_age = params[:startAge]
    @end_age = params[:endAge]
    @type = params[:selType]

    case params[:selSelect]
    when "day"
      @start_date = params[:day]
      @end_date = params[:day]

    when "week"

      @start_date = (("#{params[:selYear]}-01-01".to_date) + (params[:selWeek].to_i * 7)) -
        ("#{params[:selYear]}-01-01".to_date.strftime("%w").to_i)

      @end_date = (("#{params[:selYear]}-01-01".to_date) + (params[:selWeek].to_i * 7)) +
        6 - ("#{params[:selYear]}-01-01".to_date.strftime("%w").to_i)

    when "month"
      @start_date = ("#{params[:selYear]}-#{params[:selMonth]}-01").to_date.strftime("%Y-%m-%d")

      @end_date = ("#{params[:selYear]}-#{params[:selMonth]}-#{ (params[:selMonth].to_i != 12 ?
        ("#{params[:selYear]}-#{params[:selMonth].to_i + 1}-01".to_date - 1).strftime("%d") : "31") }").to_date.strftime("%Y-%m-%d")

    when "year"
      @start_date = ("#{params[:selYear]}-01-01").to_date.strftime("%Y-%m-%d")
      @end_date = ("#{params[:selYear]}-12-31").to_date.strftime("%Y-%m-%d")

    when "quarter"
      day = params[:selQtr].to_s.match(/^min=(.+)&max=(.+)$/)

      @start_date = (day ? day[1] : Date.today.strftime("%Y-%m-%d"))
      @end_date = (day ? day[2] : Date.today.strftime("%Y-%m-%d"))

    when "range"
      @start_date = params[:start_date]
      @end_date = params[:end_date]

    end

    report = Reports::Cohort.new(@start_date, @end_date, @start_age, @end_age, @type)

     */

     var header = "@start_date = nil\n\t\t" +
    "@end_date = nil\n\t\t" +
    "@start_age = params[:startAge]\n\t\t" +
    "@end_age = params[:endAge]\n\t\t" +
    "@type = params[:selType]\n\n\t\t" +
    "case params[:selSelect]\n\t\t" +
    "when \"day\"\n\t\t" +
      "@start_date = params[:day]\n\t\t" +
      "@end_date = params[:day]\n\t\t" +
    "when \"week\"\n\t\t" +
      "@start_date = ((\"#{params[:selYear]}-01-01\".to_date) + (params[:selWeek].to_i * 7)) -\n\t\t" +
        "(\"#{params[:selYear]}-01-01\".to_date.strftime(\"%w\").to_i)\n\t\t" +
      "@end_date = ((\"#{params[:selYear]}-01-01\".to_date) + (params[:selWeek].to_i * 7)) +\n\t\t" +
        "6 - (\"#{params[:selYear]}-01-01\".to_date.strftime(\"%w\").to_i)\n\t\t" +
    "when \"month\"\n\t\t\t" +
      "@start_date = (\"#{params[:selYear]}-#{params[:selMonth]}-01\").to_date.strftime(\"%Y-%m-%d\")\n\t\t\t" +
      "@end_date = (\"#{params[:selYear]}-#{params[:selMonth]}-#{ (params[:selMonth].to_i != 12 ?\n\t\t" +
        "(\"#{params[:selYear]}-#{params[:selMonth].to_i + 1}-01\".to_date - 1).strftime(\"%d\") : \"31\") }\").to_date.strftime(\"%Y-%m-%d\")\n\t\t" +
    "when \"year\"\n\t\t\t" +
      "@start_date = (\"#{params[:selYear]}-01-01\").to_date.strftime(\"%Y-%m-%d\")\n\t\t\t" +
      "@end_date = (\"#{params[:selYear]}-12-31\").to_date.strftime(\"%Y-%m-%d\")\n\t\t" +
    "when \"quarter\"\n\t\t\t" +
      "day = params[:selQtr].to_s.match(/^min=(.+)&max=(.+)$/)\n\t\t\t" +
      "@start_date = (day ? day[1] : Date.today.strftime(\"%Y-%m-%d\"))\n\t\t\t" +
      "@end_date = (day ? day[2] : Date.today.strftime(\"%Y-%m-%d\"))\n\t\t" +
    "when \"range\"\n\t\t\t" +
      "@start_date = params[:start_date]\n\t\t\t" +
      "@end_date = params[:end_date]\n\t\tend\n\n\t\t" +
    "report = Reports.new(@start_date, @end_date, @start_age, @end_age, @type)\n\n\t\t";

    document.getElementById("controller").value = "# app/controllers/" + model.toLowerCase() +
    "_controller.rb\n\nclass " + model.trim().toProperCase() +
    "Controller < ApplicationController\n\n\tdef " +
    feature_name.toLowerCase().replace(/"/g, "").replace(/\s/g, "_") + "\n\t\t" + header + queries +
    "\n\tend\n\n\tdef select\n\tend\n\nend\n";

    document.getElementById("modelclass").value = "# app/models/report.rb\n\nclass Reports\n\n\t" +
        "# Initialize class\n\t\t" +
          "def initialize(start_date, end_date, start_age, end_age, type)\n\t\t\t" + 
            "# @start_date = start_date.to_date - 1\n\t\t\t" +
            "@start_date = \"#{start_date} 00:00:00\"\n\t\t\t" +
            "@end_date = \"#{end_date} 23:59:59\"\n\t\t\t" +
            "@start_age = start_age\n\t\t\t" +
            "@end_age = end_age\n\t\t\t" +
            "@type = type\n\t\t" +
          "end\n\t\t" + methods + "\n\nend\n";
}

function generateGroupConceptSet(s, i){
    var j = i+1;
    var concept = s[i].trim().substring("Then I should see a group concept ".length).replace(/"/g, "").trim().toUpperCase();

    document.getElementById("txtoutput").value += "<tr>\n<th colspan=2 align='left'>" + concept + "</th>\n</tr>";

    var k = i;
    
    while(j < s.length && s[j].trim().match(/^Then\s+I\s+should\s+see\s+a\s+child\s+concept(\s+)?|^And\s+I\s+should\s+see\s+a\s+child\s+concept(\s+)?/i)){
        var value = s[j].trim().substring("Then I should see a child concept ".length).replace(/"/g, "").trim();

        document.getElementById("txtoutput").value += "<tr>\n<td>" + value +
        "</td>\n<td><%= @" + clean(concept).toLowerCase() + "_" + (j-k) + ".length %></td>\n</tr>";

        methods += "\n\n\tdef " + clean(concept).toLowerCase() + "_" + (j-k) +
            "\n\t\tcase @type\n\t\t\twhen 'cohort'\n\t\t\t\t@cases = " +
            "Patient.find_by_sql(\"SELECT * FROM patient WHERE patient_id IN (SELECT person_id " +
            "FROM obs LEFT OUTER JOIN encounter ON encounter.encounter_id = obs.encounter_id " + 
            "WHERE concept_id = (SELECT concept_id FROM concept_name WHERE name = '" + concept.toUpperCase() +"') " +
            "AND (value_coded IN (SELECT concept_id FROM concept_name WHERE name = '" + value.toUpperCase() + "') OR " +
            "value_numeric = '" + value.toUpperCase() + "' OR value_boolean = '" + value.toUpperCase() +
            "' OR value_datetime = '" + value.toUpperCase() + "' OR value_text = '" + value.toUpperCase() + "') " +
            "AND DATE_FORMAT(encounter_datetime, '%Y-%m-%d') >= '#{@start_date}' AND " +
            "DATE_FORMAT(encounter_datetime, '%Y-%m-%d') <= '#{@end_date}')\"" + ")\n\t\t\telse\n\t\t\t\t";

        methods += "@cases = Patient.find_by_sql(\"SELECT * FROM patient WHERE patient_id IN (SELECT person_id " +
            "FROM obs LEFT OUTER JOIN encounter ON encounter.encounter_id = obs.encounter_id " +
            "WHERE concept_id = (SELECT concept_id FROM concept_name WHERE name = '" + concept.toUpperCase() +"') " +
            "AND (value_coded IN (SELECT concept_id FROM concept_name WHERE name = '" + value.toUpperCase() + "') OR " +
            "value_numeric = '" + value.toUpperCase() + "' OR value_boolean = '" + value.toUpperCase() +
            "' OR value_datetime = '" + value.toUpperCase() + "' OR value_text = '" + value.toUpperCase() + "') " +
            "AND DATE_FORMAT(encounter_datetime, '%Y-%m-%d') >= '#{@start_date}' AND " +
            "DATE_FORMAT(encounter_datetime, '%Y-%m-%d') <= '#{@end_date}')\"" + ")\n\t\tend\n\tend\n";

        queries += "@" + clean(concept).toLowerCase() + "_" + (j-k) + " = report." +
            clean(concept).toLowerCase() + "_" + (j-k) + "\n\n\t\t";

        j++;
        i++;
    }
    return i;
}

function generateGroupEncounterSet(s, i){
    var j = i+1;
    var encounter = s[i].trim().substring("Then I should see a group encounter ".length).replace(/"/g, "").trim().toUpperCase();

    document.getElementById("txtoutput").value += "<tr>\n<th colspan=2 align='left'>" + encounter + "</th>\n</tr>";

    var k = i;

    while(j < s.length && s[j].trim().match(/^Then\s+I\s+should\s+see\s+a\s+child\s+concept(\s+)?|^And\s+I\s+should\s+see\s+a\s+child\s+concept(\s+)?/i)){
        var value = s[j].trim().substring("Then I should see a child concept ".length).replace(/"/g, "").trim();

        document.getElementById("txtoutput").value += "<tr>\n<td>" + value +
        "</td>\n<td><%= @" + clean(encounter).toLowerCase() + "_" + (j-k) + ".length %></td>\n</tr>";

        methods += "\n\n\tdef " + clean(encounter).toLowerCase() + "_" + (j-k) +
            "\n\t\tcase @type\n\t\t\twhen 'cohort'\n\t\t\t\t@cases = " +
            "Patient.find_by_sql(\"SELECT * FROM patient LEFT OUTER JOIN (SELECT patient_id, " +
            "COUNT(patient_id) AS pcount FROM encounter WHERE encounter_type = " +
            "(SELECT encounter_type_id FROM encounter_type WHERE name = '" + encounter + "') AND voided = 0 " +
            "AND DATE_FORMAT(encounter_datetime, '%Y-%m-%d') >= '#{@start_date}' AND " +
            "DATE_FORMAT(encounter_datetime, '%Y-%m-%d') <= '#{@end_date}' GROUP BY patient_id) AS view " +
            "ON view.patient_id = patient.patient_id WHERE view.patient_id = patient.patient_id AND " +
            "view.pcount " + value + "\"" + ")\n\t\t\telse\n\t\t\t\t";

        methods += "@cases = Patient.find_by_sql(\"SELECT * FROM patient LEFT OUTER JOIN (SELECT patient_id, " +
            "COUNT(patient_id) AS pcount FROM encounter WHERE encounter_type = " +
            "(SELECT encounter_type_id FROM encounter_type WHERE name = '" + encounter + "') AND voided = 0 " +
            "AND DATE_FORMAT(encounter_datetime, '%Y-%m-%d') >= '#{@start_date}' AND " +
            "DATE_FORMAT(encounter_datetime, '%Y-%m-%d') <= '#{@end_date}' GROUP BY patient_id) AS view " +
            "ON view.patient_id = patient.patient_id WHERE view.patient_id = patient.patient_id AND " +
            "view.pcount " + value + "\"" + ")\n\t\tend\n\tend\n";

        queries += "@" + clean(encounter).toLowerCase() + "_" + (j-k) + " = report." +
            clean(encounter).toLowerCase() + "_" + (j-k) + "\n\n\t\t";

/*
        queries += "@" + clean(encounter).toLowerCase() + "_" + (j-k) +
            " = Patient.find_by_sql(\"SELECT * FROM patient LEFT OUTER JOIN " +
            "(SELECT patient_id, COUNT(patient_id) AS pcount FROM encounter WHERE " +
            "encounter_type = (SELECT encounter_type_id FROM encounter_type WHERE name = " +
            "'" + encounter + "') AND voided = 0 AND DATE_FORMAT(encounter_datetime, '%Y-%m-%d') >= " +
            "'#{@start_date}' AND DATE_FORMAT(encounter_datetime, '%Y-%m-%d') <= '#{@end_date}' " +
            "GROUP BY patient_id) AS view ON view.patient_id = patient.patient_id " +
            "WHERE view.patient_id = patient.patient_id AND view.pcount " + value + "\"" + ")\n\n\t\t";
*/
        j++;
        i++;
    }
    return i;
}

function clean(string){
    out = string.replace(/\s/g, "_")
    out = out.replace(/\(/g, "_")
    out = out.replace(/\)/g, "_")
    out = out.replace(/\./g, "_")
    out = out.replace(/\:/g, "_")
    out = out.replace(/\-/g, "_")
    out = out.replace(/\?/g, "_")

    return out
}

function cleanUp(){
    document.getElementById("txtinput").value = document.getElementById("txtinput").value.replace(/”/g, "\"");
    document.getElementById("txtinput").value = document.getElementById("txtinput").value.replace(/“/g, "\"");
}