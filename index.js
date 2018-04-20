module.exports = robot => {
  robot.on(['issues.opened','issue_comment.created'], async context => {
    
    

    if(!context.isBot){

      
      getIssues(context, function(issues){
        var summaryExists = false;
        var issueNumber = 0;
        issues.forEach(element => {
          console.log(element.title);

          if(element.title === 'BOT: Issues Summary: Welcome Newcomers!' && element.state == 'open'){
            summaryExists = true;
            issueNumber = element.number;
          }
        });
        if(!summaryExists){
          console.log('create issue');
          createBotIssue(context, issues);
        }else {
          console.log("edit current issue");
          editBotIssue(context, issues, issueNumber);
        }
      });

      const params = context.issue({body: 'Hello World!'})
      return context.github.issues.createComment(params);
    }else{
      return;
    }


  });

  

  //Gets and logs all issue names, not needed just wanted to test it.
  function getIssues(context, callback) {

    console.log('owner: ' + context.payload.repository.owner.login);
    console.log('repo: ' + context.payload.repository.name);

    context.github.issues.getForRepo({
      owner: context.payload.repository.owner.login, 
      repo: context.payload.repository.name
    }, (error, result) => {
      if(error) console.log('Error' + error)
      else{
        // console.log('Result' + JSON.stringify(result, null, 4))
        // result.data.forEach(element => {
        //   console.log('#' + element.number + ' ' + element.title + ': ' + element.user.login + '\n' + element.body + '\n');
        // });
        callback(result.data);
      }
    })

  }

  //create the central issue
  function createBotIssue (context, issues){

    var issuesString = '';
    issues.forEach(element => {
      issuesString += element.title + '\n'
    });


    console.log('CREATING')
    context.github.issues.create({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      title: 'BOT: Issues Summary: Welcome Newcomers!',
      body: 'Hey everyone: These are the issues that are currently open!.....\n\n' + issuesString
    });
  }
}

function editBotIssue (context, issues, issueNumber){

  var issuesString = '';
  issues.forEach(element => {
    if (element.title != 'BOT: Issues Summary: Welcome Newcomers!')
      issuesString += element.title + '\n'
  });

  console.log('CREATING')
  context.github.issues.edit({
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    number: issueNumber,
    body: 'Hey everyone: These are the issues that are currently open!.....\n\n' + issuesString
  });
}

