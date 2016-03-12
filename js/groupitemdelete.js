(function( $ ) {
    $(function(){

        'use strict';

        var Adminka = document.adminkaInterpro;
        Adminka.init({});



        var anyDelete = function anyDelete(){

            var block_name    = $(this).data('block');
            var group_name    = $(this).data('group');

            var messagecontainer = $('.message-container');

            messagecontainer.removeClass('success');
            messagecontainer.removeClass('alert');
            messagecontainer.text('');

            $(this).adminka(
                'deletecontent',
                {
                    type: 'delete',
                    url: '/adm/delete/groupitem/'+$(this).data('item-id')
                },
                {
                    done_callback: function(data){
                        if (data.status === 'OK') {

                            var deleted;
                            var del_string = '';

                            if (data.deleted !== undefined && data.deleted instanceof Array){
                                data.deleted.forEach(function(id, index) {
                                    var deleted =  $('li[data-item-id="'+id+'"]').remove();
                                    deleted.remove();
                                    del_string += ' удален элемент группы ' + group_name + ', id = ' + id + ';';
                                });
                            }

                            messagecontainer.addClass('success');
                            messagecontainer.text(del_string);
                        }else{
                            messagecontainer.addClass('alert');
                            messagecontainer.text('Ошибка. Статус ошибки: ' + data.status);
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
        };


        $.fn.gidelete = function (button_selector){

            this.on('click', button_selector, function(){
                anyDelete.call(this);
            });

            return this.first();
        };



        $(document).gidelete('.any_delete');

    });

})(jQuery);