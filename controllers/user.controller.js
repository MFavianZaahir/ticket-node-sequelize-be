const userModel = require("../models/index").user;
const { response } = require("express");
const md5 = require("md5");
const Op = require("sequelize").Op;

exports.getAllUser = async (request, response) => {
  let users = await userModel.findAll();
  return response.json({
    success: true,
    data: users,
    message: "all users have been loaded",
  });
};

exports.findUser = async (request, response) => {
  /** define keyword to find data */
  let keyword = request.params.key;
  /** call findAll() within where clause and operation
   * to find data based on keyword */
  let users = await userModel.findAll({
    where: {
      [Op.or]: [
        { userID: { [Op.substring]: keyword } },
        { firstname: { [Op.substring]: keyword } },
        { lastname: { [Op.substring]: keyword } },
        { email: { [Op.substring]: keyword } },
        { role: { [Op.substring]: keyword } },
      ],
    },
  });
  return response.json({
    success: true,
    data: users,
    message: `All Users have been loaded`,
  });
};

exports.addUser = (request, response) => {
  /** prepare data from request */
  let newUser = {
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    email: request.body.email,
    password: md5(request.body.password),
    role: request.body.role,
  };
  /** execute inserting data to user's table */
  userModel
    .create(newUser)
    .then((result) => {
      /** if insert's process success */
      return response.json({
        success: true,
        data: result,
        message: `New user has been inserted`,
      });
    })
    .catch((error) => {
      /** if insert's process fail */
      return response.json({
        success: false,
        message: error.message,
      });
    });
};