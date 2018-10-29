const promotionsMdl = require('../models/promotions');

class PromotionsCtrl {
  constructor() {
    this.getAll = this.constructor.getAll.bind(this);
    this.getPromotionbyUser = this.constructor.getPromotionbyUser.bind(this);
    this.createPromotion = this.constructor.createPromotion.bind(this);
    this.editPromotion = this.constructor.editPromotion.bind(this);
  }

  /**
 * [getAll -Fuction to get all the promotions]
 * @param  {[type]}  req [client´s request ]
 * @param  {[type]}  res [response that status to the fuction]
 * @return {Promise}     [return a message when status is 400 becase it has syntax error]
 */

  static async getAll(req, res) {
    let data;
    try {
      data = await promotionsMdl.findAllPromotions();
      if (data.length === 0) {
        res.status(400).send({ message: 'Promotions not found' });
        return;
      }
    } catch (e) {
      res.status(400).send({ message: e });
      return;
    }
    res.status(201).send({ data });
  }

  /**
     * [getPromotionbyUser is a fuction for get to promotions per id of user ]
     * @param  {[type]}   req  [client´s request ]
     * @param  {[type]}   res  [response that status to the fuction]
     * @param  {Function} next [The function nerby or next funcion]
     * @return {Promise}       [Return a next function ]
     */

  static async getPromotionbyUser(req, res, next) {
    try {
      const data = await promotionsMdl.findByUserID(req.params.id);
      if (data.length === 0) {
        res.status(400).send({ message: 'User not found' });
        return;
      }
      res.status(200).send({ data });
    } catch (e) {
      next(e);
    }
  }

  /**
 * [createPromotion Add a new object Promotion ]
 * @param  {[body]}   req  [client´s request for create a new object, id identicador]
 * @param  {[status]}   res  [response that status to the fuction]
 * @param  {createPromotion} next [Continuos to the next fuction the middlewear]
 * @return {Promise}       [The method to the next fuction]
 */

  static async createPromotion(req, res, next) {
    try {
      const data = await promotionsMdl.create(req.body);
      res.status(201).send({ message: `ID: ${data}` });
    } catch (e) {
      next(e);
    }
  }

  /**
 * [editPromotion Modify data in a object previusly created ]
 * @param  {[int]}   req  [id, identicador the promotions client´s request]
 * @param  {[type]}   res  [reponse the status of the function 200 its successful]
 * @param  {Function} next [Continue whith The next funtion ]
 * @return {Promise}       [Message when the data is send ]
 */

  static async editPromotion(req, res, next) {
    try {
      const data = await promotionsMdl.update(req.body, req.params.id);
      // In case the promotion isn´t found
      if (data.length === 0) {
        res.status(400).send({ message: 'Promotions could not be updated' });
        return;
      }
      res.status(200).send({ data: 'Promotions updated' });
    } catch (e) {
      next(e);
    }
  }
}

/**
 * [exports funtions in a object for use in the other files]
 * @type {PromotionsCtrl}
 */
module.exports = new PromotionsCtrl();
