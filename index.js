module.exports = robot => {
  robot.on(['issues.opened','issue_comment.created'], async context => {
    
    

    if(!context.isBot){

      
      

      const params = context.issue({body: 'Hello World!'})
      return context.github.issues.createComment(params);
    }else{
      return;
    }


  });

  

  //Gets and logs all issue names, not needed just wanted to test it.
  function logIssueNames(context) {

    console.log('owner: ' + context.payload.repository.owner.login);
    console.log('repo: ' + context.payload.repository.name);

    context.github.issues.getForRepo({
      owner: context.payload.repository.owner.login, 
      repo: context.payload.repository.name
    }, (error, result) => {
      if(error) console.log('Error' + error)
      else{
        console.log('Result' + JSON.stringify(result, null, 4))
        result.data.forEach(element => {
          console.log('#' + element.number + ' ' + element.title + '\n\n' + element.body + '\n');
        });
      }
    })

  }

  function createBotIssue (context){
    
    context.github.issues.create({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      title: 'BOT: Issues Summary: Welcome Newcomers!',
      body: 'Hey everyone: stuff would go here.....'
    });
  }
}