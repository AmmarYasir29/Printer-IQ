import { Request, Response } from "express";
import validate = require("validate.js");
import { User } from "../entity/User";
import PhoneFormat from "../helper/phone.helper";
import {
  comparePassword,
  errRes,
  getOTP,
  hashMyPassword,
  okRes,
} from "../helper/tools";
import validator from "../helper/validation";
import * as jwt from "jsonwebtoken";
//import config from "../config";
import { Invoice } from "./../entity/Invoice";
import * as fs from "fs";
import * as filestack from "filestack-js";
const path = require("path");
const pdf = require("pdf-parse");
const client = filestack.init("AF8xivEiOQ0O6W5QWImByz");
require("dotenv").config();

export default class controller {
  static async getuser(req, res) {
    let id = req.params.id;

    try {
      let data = await User.find({
        where: { id },
      });
      return okRes(res, { data });
    } catch (error) {
      return errRes(res, error);
    }
  }
  static async receiveInvoice(req, res) {
    //FIXME: just for testing
    // from make invoice set the id with req
    req.id = 4;
    console.log(req.id);

    try {
      let data = await Invoice.find({
        where: { id: req.id },
        relations: ["user"],
      });
      return okRes(res, { data });
    } catch (error) {
      return errRes(res, error);
    }
  }

  static async makeUserInvoice(req, res) {
    //user upload pdf & some info
    let notValid = validate(req.body, validator.makeInvoice());
    if (notValid) return errRes(res, notValid);
    if (!req.files) return errRes(res, `file is missing`);
    let image = req.files.file;
    let filenamf = image.name;

    //save pdf to DB
    let pathpdf = path.join(__dirname, `../../public/${filenamf}`);
    let url: any;
    let pages: number;

    // let d = new Date();
    // let deadline = d.getDay() + req.body.deadline;
    // console.log(deadline);

    await image.mv(pathpdf, async function (err) {
      if (err) return errRes(res, err);
      client.upload(pathpdf).then((data) => {
        url = data.url;
        let dataBuffer = fs.readFileSync(pathpdf);
        pdf(dataBuffer).then(async function (data) {
          pages = data.numpages;

          let papers: any;
          try {
            papers = await Invoice.create({
              ...req.body,
              countPainter: pages,
              fileurl: url,
              userId: req.user.id,
            });
            await papers.save();
            req.id = papers.id; //return id of the recored file
          } catch (error) {
            return errRes(res, error);
          }
          return okRes(res, { "The paper": papers });
        });
      });
    });
  }

  static async register(req: Request, res: Response): Promise<object> {
    //FIXME: not work becuase retirn object
    let notValid = validate(req.body, validator.register());
    if (notValid) return errRes(res, notValid);

    let phoneObj = PhoneFormat.getAllFormats(req.body.phone);
    if (!phoneObj.isNumber)
      return errRes(res, `phone Invalid ${req.body.phone}`);
    let phone = phoneObj.globalP;
    let user: any;
    try {
      user = await User.findOne({ where: { phone } });
      if (user) return errRes(res, `Phone ${req.body.phone} already exists`);
    } catch (error) {
      return errRes(res, error);
    }
    const password = await hashMyPassword(req.body.password);
    user = await User.create({
      ...req.body,
      active: true,
      complete: true,
      otp: getOTP(),
      password,
      phone,
    });
    await user.save();
    user.password = null;
    //sendSMS(` Your OTP: ${user.otp}`, user.phone);

    user.otp = null;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return okRes(res, { dataLastUpdate: { user, token } });
  }

  static async login(req, res): Promise<object> {
    // validation FIXME: not work becuase retirn object
    let notValid = validate(req.body, validator.login());
    if (notValid) return errRes(res, notValid);

    // phone format
    let phoneObj = PhoneFormat.getAllFormats(req.body.phone);
    if (!phoneObj.isNumber)
      return errRes(res, `Phone ${req.body.phone} is not a valid`);
    const phone = phoneObj.globalP;

    // findOne user from DB using phone
    let user = await User.findOne({ where: { phone } });
    if (!user) return errRes(res, `Phone ${phone} is not registered`);
    // compare the password
    let validPassword = await comparePassword(req.body.password, user.password);
    if (!validPassword) return errRes(res, `Please check your data`);

    // create token
    const token = jwt.sign({ id: user.id }, "12345");

    // return
    return okRes(res, { data: { token } });
  }

  static order(req, res) {
    console.log("worked!");
  }
}
