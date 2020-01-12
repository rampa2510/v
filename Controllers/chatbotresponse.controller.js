//========================================================================================
/*                                                                                      *
 *                                Import all dependencies                               *
 *                                                                                      */
//========================================================================================
const BotReply = require('../Helpers/chatbotCon');
const {insertOne,incrementCounter} = require('../Helpers/queryHandler')
//########################################################################################

module.exports = async (req,res)=>{
  const Result = await BotReply(req.body.MSG);

  // get all the values here if the intent is the end intent
  if(Result.intent.displayName==="policebot.confirm.yes"){
    
    // in the locals we have the jwt data decode with all the details
    const {data} = res.locals

    const date = Result.parameters.fields.date.stringValue;
    const crime =  Result.parameters.fields.CrimeType.stringValue;
    const personObj = Result.parameters.fields.person.listValue.values;

    let personArr = []

    personObj.forEach(personData=>{
      personArr.push(personData.structValue.fields.name.stringValue)
    })
    
    try {
      const caseNo =  await incrementCounter();

      await insertOne('crimeRegister',{name:data.name,date,crime,personArr,caseNo:caseNo.count,status:'pending',investigatingOfficer:'none'})
  
      res.status(201).send({reply:"Crime registered case No - "+caseNo.count})
  
    } catch (error) {
      console.log(error);
      res.status(200).send({reply:"lol"})
    }
    // get the case number from the mongodb database

  }else res.status(200).send({reply:Result.fulfillmentText})
}