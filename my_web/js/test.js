var filter = {
    cell: {
        showOperators: false
    }
};

var keys, wnd, detailsTemplate, form;

var normal = {
    type: "number",
    defaultValue: 1,
    validation: { required: true, min: 1 }
};


$(function () {
    var crudServiceBaseUrl = "http://localhost:8080/weavingMachineRaw";
    var wnd = $("#details")
        .kendoWindow({
            title: "Description",
            modal: true,
            width: 300,
            visible: false,
        }).data("kendoWindow");
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: crudServiceBaseUrl,
                dataType: "json",
                type: "GET"
            },
            update: {
                url: crudServiceBaseUrl,
                dataType: "json",
                contentType: "application/json",
                method: "POST"
            },
            create: {
                url: crudServiceBaseUrl,
                dataType: "json",
                contentType: "application/json",
                method: "POST"
            },
            parameterMap: function (data, operation) {
                if ("update,create".search(operation) > -1) {
                    return JSON.stringify(data);
                }
                if (operation !== "read" && data.models) {
                    return { models: kendo.stringify(data.models) };
                }
            }
        },
        schema: {
            data: "response",
            model: {
                id: "machineId",
                fields: {
                    "machineId": {
                        editable: true,
                    },
                    "picknoa": normal,
                    "picknob": normal,
                    "clothbeam": normal,
                    "lenostop": normal,
                    "warpstop": normal,
                    "weftstop": normal,
                    "mchfail": normal,
                    "totalstop": normal,
                    "rpm": normal,
                    "state": normal
                }
            }
        },
    });


    $("#grid").kendoGrid({
        dataSource: dataSource,
        batch: true,
        pageSize: 20,
        pageable: true,
        height: 550,
        toolbar: ["create", "cancel"],
        serverPaging: true,
        serverFiltering: true,
        editable: "popup",
        sortable: true,
        filterable: true,
        // usual_setting
        columns: [
            {
                field: "machineId",
                width: "140px",
                template: function (e) {
                    return `<button class="showDetail")">${e.machineId}</button>`
                },
                filterable: filter
            },
            { field: "picknoa", width: "140px" },
            { field: "picknob", width: "140px" },
            { field: "clothbeam", width: "140px" },
            { field: "lenostop", width: "140px" },
            { field: "warpstop", width: "140px" },
            { field: "weftstop", width: "140px" },
            { field: "mchfail", width: "140px" },
            { field: "totalstop", width: "140px" },
            { field: "rpm", width: "140px" },
            { field: "state", width: "140px" },
            {
                command: ["edit"], title: "&nbsp;", width: "250px"
            }
        ],
    });

    $("body").on("click", ".showDetail", function () {
        var dataItem = $("#grid").data("kendoGrid").dataItem($(this).closest("tr"));
        var content = "";
        console.log(dataItem)
        for (i in form) {
            var type = (form[i].type == "Integer") ? "class ='number'" : "";
            content += `
            <div>
            ${form[i].description}&emsp13;<input type="text" ${type} name="${i}" value="${dataItem[i]}">
            </div>
            `;
        } //for
        $("#details").html(content);
        // wnd.content(detailsTemplate(dataItem));
        wnd.center().open();
        // detailsTemplate = kendo.template($("#template").html());
    });


    $("#export").click(function (e) {
        var grid = $("#grid").data("kendoGrid");
        grid.saveAsExcel();
    });


    $.ajax({
        url: "http://localhost:8080/weavingMachineRaw/description",
        method: "get",
        dataType: "json",
        success: function (data) {
            var content = "";
            form = data.response;
            for (i in form) {
                var type = (form[i].type == "Integer") ? "class ='number'" : "";
                content += `
                <div>
                ${form[i].description}&emsp13;<input type="text" ${type} name="${i}">
                </div>
                `;
            } //for
            $("#form").html(content);
            $("#form input.number").kendoNumericTextBox();
        },
        error: function (thrownError) {
            console.log(thrownError)
        }
    }); //ajax
});//$function
