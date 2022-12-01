import MCPdata from "../constants/MCPs.js"

$(function() {
  
    (function(data) {
      var container = $('#pagination-demo1');
      container.pagination({
        dataSource: data,
        locator: 'items',
        totalNumber: 120,
        pageSize: 20,
        ajax: {
          beforeSend: function() {
            container.prev().html('Loading data from flickr.com ...');
          }
        },
        callback: function(response, pagination) {
          window.console && console.log(22, response, pagination);
          var dataHtml = '<ul>';
  
          $.each(response, function (index, item) {
            dataHtml += '<li>' + item.status + '</li>';
          });
  
          dataHtml += '</ul>';
  
          container.prev().html(dataHtml);
        }
      })
    })(MCPdata);
  })