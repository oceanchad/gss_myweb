var filter = {
    cell: {
        showOperators: false
    }
};

$(document).ready(function () {
    var crudServiceBaseUrl = "http://localhost:8080/weavingMachineRaw",
        dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: crudServiceBaseUrl,
                    dataType: "json",
                    type: "GET"
                },
            },
            schema: {
                data: "response"
            },
            parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                    return { models: kendo.stringify(options.models) };
                }
            }
        });

    var grid = $("#grid").kendoGrid({
        dataSource: dataSource,
        batch: true,
        pageSize: 20,
        pageable: true,
        height: 550,
        toolbar: ["create", "cancel"],
        serverPaging: true,
        serverFiltering: true,
        columns: [
            { field: "machineId", title: "machineId"},
            { field: "picknoa", title: "picknoa" },
            { field: "picknob", title: "picknob" },
            { field: "clothbeam", title: "clothbeam" },
            { field: "lenostop", title: "lenostop" },
            { field: "warpstop", title: "warpstop" },
            { field: "weftstop", title: "weftstop" },
            { field: "mchfail", title: "mchfail" },
            { field: "totalstop", title: "totalstop" },
            { field: "rpm", title: "rpm" },
            { field: "state", title: "state" },
            {
                command: ["destroy",
                    {
                        name: "Confirm",
                        click: function (e) {
                            e.preventDefault();
                            var tr = $(e.target).closest("tr");
                            this.editRow(tr)
                            var validator = $(tr).kendoValidator().data("kendoValidator");
                            validator.validate()
                        }
                    }], width: "200px"
            }],
        sortable: true,
        editable: true,
        filterable: true,

        // columns: [{
        //     field: "machineId",
        //     width: 10,
        //     filterable: filter
        // },
        // {
        //     field: "picknoa",
        //     width: 10,
        //     filterable: filter
        // },
        // {
        //     field: "picknob",
        //     width: 10,
        //     filterable: filter
        // },
        // {
        //     field: "clothbeam",
        //     width: 10,
        //     filterable: filter
        // }, {
        //     field: "lenostop",
        //     width: 10,
        //     filterable: filter
        // },
        // {
        //     field: "warpstop",
        //     width: 10,
        //     filterable: filter
        // },
        // {
        //     field: "weftstop",
        //     width: 10,
        //     filterable: filter
        // },
        // {
        //     field: "mchfail",
        //     width: 10,
        //     filterable: filter
        // },
        // {
        //     field: "totalstop",
        //     width: 10,
        //     filterable: filter
        // },
        // {
        //     field: "rpm",
        //     width: 10,
        //     filterable: filter
        // },
        // {
        //     field: "state",
        //     width: 10,
        //     filterable: filter
        // }
        // ],
    });


    
    $("#export").click(function (e) {
        var gri = $("#grid").data("kendoGrid");
        gri.saveAsExcel();
    });

    $.ajax({
        url: "http://localhost:8080/weavingMachineRaw/description",
        method: "get",
        dataType: "json",

        success: function (data) {
            var content = "";
            var form = data.response;
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
});

function customBoolEditor(container, options) {
    var guid = kendo.guid();
    $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
    $('<label class="k-checkbox-label" for="' + guid + '">​</label>').appendTo(container);
}