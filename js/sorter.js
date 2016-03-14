/**
 * Created by kocahoctpa on 3/14/16.
 */



$(document).ready(function(){
    'use strict';

    var Adminka = document.adminkaInterpro;
    Adminka.init({});

    function SendSorter(block, id, sort){

        var dataobj = {};
        dataobj['block']    = block;
        dataobj['group_id'] = id;
        dataobj['sorter']   = sort
        dataobj['entity'] =  'groupitem';

        var messagecontainer = $('.message-container');
        messagecontainer.removeClass('success');
        messagecontainer.removeClass('alert');
        messagecontainer.text('');

        $(this).adminka(
            'savecontent',
            {
                type: 'POST',
                url: '/adm/update/groupitem',
                data: dataobj
            },
            {
                done_callback: function(data){
                    if (data.status === 'OK') {
                        messagecontainer.addClass('success');
                        messagecontainer.text('Страницы отсортированы');
                    }else{
                        messagecontainer.addClass('alert');
                        messagecontainer.text('Не удалось отсортировать страницы. Статус ошибки: ' + data.status);
                    }
                },
                fail_callback: function(data){
                    messagecontainer.addClass('alert');
                    messagecontainer.append('Что-то пошло не по плану: <br>' + JSON.stringify(data));
                },
                always_callback: function(data){
                    //Убрать индикатор загрузки, если появится
                }
            }
        );
    }








    $('.up-button').on('click',function(){

        var parent = $(this).parents('tr');
        var sorter = parent.data('sorter');
        var bef = $('tr[data-sorter='+(sorter-1)+']');

        if ( bef.data('sorter') != undefined ) {
            parent.insertBefore('tr[data-sorter='+(sorter-1)+']');
            bef.data('sorter',sorter).attr('data-sorter', sorter);
            parent.data('sorter', (sorter - 1)).attr('data-sorter', (sorter - 1));

            var block = parent.parents('tbody').data('block');
            var id = parent.data('id');
            var sorter = parent.data('sorter');
            SendSorter(block,id,sorter);
            var id = bef.data('id');
            var sorter = bef.data('sorter');
            SendSorter(block,id,sorter);
        }
    });

    $('.down-button').on('click',function(){

        var parent = $(this).parents('tr');
        var sorter = parent.data('sorter');
        var next = $('tr[data-sorter='+(sorter+1)+']');

        if ( next.data('sorter') != undefined ){

            parent.insertAfter('tr[data-sorter='+(sorter+1)+']');
            next.data('sorter',sorter).attr('data-sorter',sorter);
            parent.data('sorter',(sorter+1)).attr('data-sorter',(sorter+1));

            var block = parent.parents('tbody').data('block');
            var id = parent.data('id');
            var sorter = parent.data('sorter');
            SendSorter(block,id,sorter);
            var id = next.data('id');
            var sorter = next.data('sorter');
            SendSorter(block,id,sorter);

        }
    });
});