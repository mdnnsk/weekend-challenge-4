$(document).ready(function(){
  // ajax call on page load to get current tasks
  $.ajax({
    type: 'POST',
    url: '/getTasks',
    success: function( data ){
      showTask(data);
    } // end success
  }); //end ajax

  $('body').on('click', '.compButton', function(){
    var compTask={
      "id": $(this).attr('data-id')
    };
     $.ajax({
       type: 'POST',
       url: '/completeTask',
       data: compTask,
       success: function( data ){
         showTask(data);
       } // end success
     }); //end ajax
  });

  $('body').on('click', '.delButton', function(){
    var compTask={
      "id": $(this).attr('data-id')
    };
     $.ajax({
       type: 'POST',
       url: '/deleteTask',
       data: compTask,
       success: function( data ){
         showTask(data);
       } // end success
     }); //end ajax
  });

  $('#taskSub').on('click', function(){
    console.log("submit button clicked");
    var newTaskName=$('#taskIn').val();
    console.log("thank you for submitting your task to " + newTaskName);
    // create new object
    var newTask={
      "todo": newTaskName,
      "complete": false
    };//end object
    console.log(newTask);
    //start ajax call
    $.ajax({
      type: 'POST',
      url: '/submitTask',
      data: newTask,
      success: function( data ){
        showTask(data);
      } // end success
    }); //end ajax
  }); //end on animal submit click

  //function to display animals on the dom
  function showTask( tasks ){
    //clear the outputDiv
    $('#outputDiv').children().remove();
    //start the loop with the imported data
    for( i=0; i<tasks.length; i++ )
    {
        var checkDiv = document.createElement('div');
        checkDiv.id='checkDiv-'+tasks[i].id;
        checkDiv.className='container';

        $('#outputDiv').append( checkDiv );
        var completeButton = "<button class='compButton' id='completeButton-" + tasks[i].id + "' data-id='"+tasks[i].id+"'>Complete Task</button>";
        var deleteButton = "<button class='delButton' id='deleteButton-" + tasks[i].id + "' data-id='"+tasks[i].id+"'>Delete Task</button>";
        var tasksOut = tasks[i].task_name;

        if (tasks[i].completed === true) {
          $('#checkDiv-'+tasks[i].id).addClass( "completed" );
        }

        $('#checkDiv-'+tasks[i].id).append(tasksOut + deleteButton + completeButton);
    }//end loop
  }//end showTask



}); //end on document ready
