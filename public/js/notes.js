        $('[data-toggle="tooltip"]').tooltip;

        function loadData() {
            $('.noteTitle').prop('readonly', true);
            $('.notesArea').prop('readonly', true);

            $.get('/api/notes', function (data) {
                console.log(data);

                for (let i = 0; i < data.length; i++) {


                    let noteDiv = $('<div>');
                    let noteTitle = $('<h4>');
                    let iconSpan = $('<span>');
                    let clearDiv = $('<div>');

                    noteTitle.attr('id', 'note' + i);
                    noteDiv.attr('class', 'notesDiv');
                    noteTitle.attr('class', 'notesTitle');
                    noteTitle.attr('href', data[i].body);
                    noteTitle.text(data[i].title);
                    iconSpan.attr('class', 'deleteIconClass');
                    iconSpan.html('<i class="fa fa-trash"></i>');
                    clearDiv.attr('class', 'clear');

                    noteTitle.on('click',
                        function () {
                            $('.noteTitle').val(data[i].title);
                            $('.notesArea').text(data[i].body);
                            $('.noteTitle').prop('readonly', true);
                            $('.notesArea').prop('readonly', true);
                            // alert( + "  : " + );
                        });

                    iconSpan.on('click', function () {
                        var id = data[i].id;
                        // Send the DELETE request.
                        $.ajax("/api/notes/" + id, {
                            type: "DELETE"
                        }).then(
                            function () {
                                console.log("deleted id ", id);
                                // Reload the page 
                                location.reload();
                            }
                        );
                    });

                    $('.saveBtn').hide();

                    noteDiv.append(noteTitle, iconSpan, clearDiv);
                    $('#leftDiv').append(noteDiv);
                }

            })
        }

        $('.newBtn').on('click', function () {
            $('.saveBtn').show();
            $('.noteTitle').prop('readonly', false);
            $('.notesArea').prop('readonly', false);
            $('.noteTitle').val('');
            $('.notesArea').val('');
            $('.noteTitle').attr('placeholder', 'Note Title');
            $('.notesArea').attr('placeholder', 'Notes');
        });

        $('.saveBtn').on('click', function () {


            $('.noteTitle').prop('readonly', true);
            $('.notesArea').prop('readonly', true);


            var newNote = {
                title: $('.noteTitle').val().trim(),
                body: $('.notesArea').val().trim()
            };


            // console.log(newNote);
            if (($('.noteTitle').val().length) < 3) {
                alert('Give proper Title...');
            } else {
                $.post('/api/notes', newNote, (data) => {
                    // loadData();
                    location.reload();
                });
            }
            $('.saveBtn').hide();
        });

        loadData();

        // $('[data-toggle="tooltip"]').tooltip();   