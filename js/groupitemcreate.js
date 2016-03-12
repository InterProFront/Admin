(function( $ ) {
    $(function(){

        'use strict';

        var Adminka = document.adminkaInterpro;
        Adminka.init({});


        var groupitemCreate = function (){

            var $this = $(this);

            var block_name    = $this.data('block');
            var group_name    = $this.data('group');
            var owner_id      = $this.data('owner-id');
            var description   = $this.data('descr');//Описание элемента группы для сообщения

            if (owner_id === undefined){
                owner_id = 0;
            }

            //Информатор:
            var messagecontainer = $('.message-container');

            //Контейнер, куда добавлять вьюшки новых категорий, отрисованных на сервере:
            var container = $('.group_container[data-block="'+block_name+'"][data-group="'+group_name+'"][data-owner-id="'+owner_id+'"]');

            //Сброс информатора:
            messagecontainer.removeClass('success');
            messagecontainer.removeClass('alert');
            messagecontainer.text('');
            //-------------------------------------------

            $(this).adminka(
                'getcontent',
                {
                    type: 'GET',
                    url: '/adm/create/groupitem/'+block_name+'/'+group_name+'/'+owner_id
                },
                {
                    done_callback: function(data){
                        if (data.status === 'OK') {
                            container.append(data.complhtml);
                            messagecontainer.addClass('success');
                            messagecontainer.text('элемент ' + description + ' создан.');
                            document.pickDateAll(); //Потом переделать на вызов только для добавленного
                        }else{
                            messagecontainer.addClass('alert');
                            messagecontainer.text('элемент ' + description + ' НЕ создан. Статус ошибки: ' + data.status);
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

            return this;
        };


        $.fn.gicreate = function (button_selector){

            this.on('click', button_selector, groupitemCreate);

            return this.first();
        };

        $(document).gicreate('.any_create');



    });
})(jQuery);