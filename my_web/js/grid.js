var filter = {
    cell: {
        showOperators: false
    }
};

$(document).ready(function () {
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://localhost:8080/weavingMachineRaw",
                dataType: "json",
                type: "GET"
            }
        },
        schema: {
            data: 'response',
        }
    });

    var grid = $("#grid").kendoGrid({
        toolbar: [
            { name: "create" },
            { name: "save" },
            { name: "cancel" }
        ],
        batch: true,
        dataSource: dataSource,
        height: 550,
        sortable: true,
        editable: true,
        pageSize: 20,
        serverPaging: true,
        serverFiltering: true,
        pageable: true,
        columns: [
            { field: "machineId", title: "machineId", width: 100 },
            { field: "picknoa", title: "picknoa" },
            { field: "picknob", title: "picknob", width: 10 },
            { field: "clothbeam", title: "clothbeam" },
            { field: "lenostop", title: "lenostop" },
            { field: "warpstop", title: "warpstop" },
            { field: "weftstop", title: "weftstop" },
            { field: "mchfail", title: "mchfail" },
            { field: "totalstop", title: "totalstop" },
            { field: "rpm", title: "rpm" },
            { field: "state", title: "state" }
        ],
        filterable: {
            mode: "row"
        },
        
        columns: [{
            field: "machineId",
            width: 10,
            filterable: filter
        },
        {
            field: "picknoa",
            width: 10,
            filterable: filter
        },
        {
            field: "picknob",
            width: 10,
            filterable: filter
        },
        {
            field: "clothbeam",
            width: 10,
            filterable: filter
        }, {
            field: "lenostop",
            width: 10,
            filterable: filter
        },
        {
            field: "warpstop",
            width: 10,
            filterable: filter
        },
        {
            field: "weftstop",
            width: 10,
            filterable: filter
        },
        {
            field: "mchfail",
            width: 10,
            filterable: filter
        },
        {
            field: "totalstop",
            width: 10,
            filterable: filter
        },
        {
            field: "rpm",
            width: 10,
            filterable: filter
        },
        {
            field: "state",
            width: 10,
            filterable: filter
        }
        ],
        
    });

    $("#export").click(function (e) {
        var gri = $("#grid").data("kendoGrid");
        gri.saveAsExcel();
        gri.addRow();
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
}); //$function

