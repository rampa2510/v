//========================================================================================
/*                                                                                      *
 *             Import dependencies and configure express router                         *
 *                                                                                      */
//========================================================================================
const express = require("express"),
  router = express.Router(),
  { celebrate,Segments } = require("celebrate");
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                            Import all the Controllers                                *
 *                                                                                      */
//========================================================================================
let controllerPath = "./Controllers";
const registrationController = require(`./Controllers/registration.controller`);
const loginController = require(`./Controllers/login.controller`);
const {registerCrime,getCrimeDetails} = require(`./Controllers/userCrimeRegistration.controller`);
const chatBotRoute = require(`./Controllers/chatbotresponse.controller.js`);
const {getMyCrimes,getAllCrimes,startInvestigation,deleteCrimeData} = require(`./Controllers/policemanActions.controller.js`)
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                                 Import all the models                                *
 *                                                                                      */
//========================================================================================
const registrationModel = require(`./Models/regestration.model`);
const {body} = require(`./Models/login.model`);
const CrimeRegistrationModel = require(`./Models/userCrimeRegistration.model`)
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                             Configure all the routes here                            *
 *                                                                                      */
//========================================================================================

router.post("/register", celebrate(registrationModel), registrationController);
router.post("/login", celebrate({[Segments.BODY]:body}), loginController);
router.post('/crime-register',celebrate(CrimeRegistrationModel),registerCrime)
router.get('/crime-register/:id',getCrimeDetails);
router.get('/get-crime-register',getAllCrimes);
router.get('/get-my-crimes',getMyCrimes);
router.post('/bot-reply',chatBotRoute);
router.patch('/investigation',startInvestigation);
router.delete('/investigation/:caseNo',deleteCrimeData)
//########################################################################################

module.exports = router;
