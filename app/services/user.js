const jsonwebtoken = require('jsonwebtoken'); 
const User = require('../models/user'); 

class UserService {
  /**
   *  创建一个用户
   * @param {*} title
   * @param {*} content
   * @param {*} thumbnail
   * @param {*} isWeekly
   */
  static create(username, password, email, avatar) {
    return new Promise((resolve, reject) => {
      User.create({
        username,
        password,
        email,
        avatar,
        type: 2,
        gmtCreate: new Date(),
      })
        .then((result) => {
          console.log("result===",result)
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  /**
   * 更新用户信息
   * @param {*} id
   * @param {*} obj
   */
  static async update(id, obj) {
    return new Promise((resolve, reject) => {
      User.update(obj, {
        where: {
          id,
        },
      })
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  /**
   * 查询某一篇文章的详细内容
   * @param {*} id
   */
  static async getOne(username) {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          username,
        },
      })
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  /**
   * 根据Id查询用户信息
   * @param {*} id
   */
  static async getById(userId) {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          id: userId,
        },
      })
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  /**
   * 从Token中获取用户数据
   * @param {*} token
   */
  static getUserDataFromToken(token) {
    const userData = jsonwebtoken.decode(token)

    return userData.data
  }
}

module.exports = {
  create: UserService.create,
  update: UserService.update,
  getOne: UserService.getOne,
  getById: UserService.getById,
  getUserDataFromToken: UserService.getUserDataFromToken
}
