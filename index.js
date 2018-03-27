module.exports = robot => {
  robot.on(['issues.opened','issue_comment.created'], async context => {
    
    
    // context.log("Hello \n" + JSON.stringify(context, null, 4));
    const params = context.issue({body: 'Hello World!'})
    context.log('hello');
    context.github.getForRepo({
      owner: context.payload.repository.owner.id, 
      repo: context.payload.repository.id
    }, (error, result) => {
      if(error) context.log(error)
      context.log(JSON.stringify(result, null, 4))
    })

    if(!context.isBot){
      return context.github.issues.createComment(params);
    }else{
      return;
    }


  });
}