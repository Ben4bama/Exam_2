function Menuchoice()
{
    if (document.getElementById("menu").value == "Display Category List")    
    {
        document.getElementById("sec_1").style.visibility = "visible";
        document.getElementById("sec_2").style.visibility = "hidden";
        document.getElementById("sec_3").style.visibility = "hidden";
        document.getElementById("sec_4").style.visibility = "hidden";
        document.getElementById("sec_5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Create a Category")
    {
        document.getElementById("sec_1").style.visibility = "hidden";
        document.getElementById("sec_2").style.visibility = "visible";
        document.getElementById("sec_3").style.visibility = "hidden";
        document.getElementById("sec_4").style.visibility = "hidden";
        document.getElementById("sec_5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Change Category Description")
    {
        document.getElementById("sec_1").style.visibility = "hidden";
        document.getElementById("sec_2").style.visibility = "hidden";
        document.getElementById("sec_3").style.visibility = "visible";
        document.getElementById("sec_4").style.visibility = "hidden";
        document.getElementById("sec_5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Delete a Category")
    {
        document.getElementById("sec_1").style.visibility = "hidden";
        document.getElementById("sec_2").style.visibility = "hidden";
        document.getElementById("sec_3").style.visibility = "hidden";
        document.getElementById("sec_4").style.visibility = "visible";
        document.getElementById("sec_5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "About Me")
    {
        document.getElementById("sec_1").style.visibility = "hidden";
        document.getElementById("sec_2").style.visibility = "hidden";
        document.getElementById("sec_3").style.visibility = "hidden";
        document.getElementById("sec_4").style.visibility = "hidden";
        document.getElementById("sec_5").style.visibility = "visible";
    }
    else if (document.getElementById("menu").value == "Please select an option")
    {
        document.getElementById("sec_1").style.visibility = "hidden";
        document.getElementById("sec_2").style.visibility = "hidden";
        document.getElementById("sec_3").style.visibility = "hidden";
        document.getElementById("sec_4").style.visibility = "hidden";
        document.getElementById("sec_5").style.visibility = "hidden";
    }
    
}

// SECTION ONE

function GetCustList()
{
    var objRequest = new XMLHttpRequest();  
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput(output);
        }
    }
            objRequest.open("GET", url, true);
            objRequest.send();
}
function GenerateOutput(result)
{   var count = 0;
    var displaytext = "";
    displaytext += "<table>" + "<th>Category ID</th>" + "<th>Category Name</th>" + "<th>Category Description</th>";
    for (count = 0; count < result.GetAllCategoriesResult.length; count++)
    {
        
        displaytext += "<tr>";
            displaytext += "<td>" + result.GetAllCategoriesResult[count].CID + "</td>";
            displaytext += "<td>" + result.GetAllCategoriesResult[count].CName + "</td>";
            displaytext += "<td>" + result.GetAllCategoriesResult[count].CDescription + "</td>";
        displaytext += "</tr>";
    }
    displaytext += "</table>";
    document.getElementById("custlistdisplay").innerHTML = displaytext;
}

// SECTION TWO

function CreateCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    
    //Collect Customer data from web page
    var catname = document.getElementById("CatName").value;
    var catedesc = document.getElementById("CatDesc").value;
    
    //Create the parameter string
    var newcat = '{"CName":"' + catname + '","CDescription":"' + catedesc +'"}';
    
    //Checking for AJAx operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult_1(result);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcat);
}

function OperationResult_1(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("result_1").innerHTML = "The Category was added!"
    }
    else
    {
        document.getElementById("result_1").innerHTML = "There was an error with your entry" + "<br>" + output.Exception;
    }
}

// SECTION THREE

function ChangeCategoryDescription()
{
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    var cat_id = document.getElementById("CatID").value;
    var catedesc2 = document.getElementById("NewCatDesc").value;
    
    var newcatdesc = '{"CID":"' + cat_id + '","CDescription":"' + catedesc2 +'"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult_2(result);
        }
    }
    
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcatdesc);
}

function OperationResult_2(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("result_2").innerHTML = "The Category Description was changed!"
    }
    else if (output.WasSuccessful == 0)
    {
        document.getElementById("result_2").innerHTML = "There was an unexpected error with your entry."
    }
    else if (output.WasSuccessful == -2)
    {
        document.getElementById("result_2").innerHTML = "The Description was not entered properly."
    }
    else if (output.WasSuccessful == -3)
    {
        document.getElementById("result_2").innerHTML = "The Category ID you entered does not exist."
    }
}

// SECTION FOUR

function DeleteCatID()
{
    confirm("Are you sure you want to delete this category?");
    var objRequest = new XMLHttpRequest();  
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    url += document.getElementById("DelcstID").value;
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput_2(output);
        }
    }
            objRequest.open("GET", url, true);
            objRequest.send();
}


function GenerateOutput_2(result)
{
    if ( result.DeleteCategoryResult.WasSuccessful == 1)
    {
        document.getElementById("result_3").innerHTML = "The Category was deleted from the database."
    }
    else if (result.DeleteCategoryResult.WasSuccessful == 0) 
    {
        document.getElementById("result_3").innerHTML = "The Category was not deleted." + "<br>" + output.Exception;
    }
}