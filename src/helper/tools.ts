import * as bcrypt from "bcrypt";

const errRes = (res, err,statusCode = 400) => {
    let response = { status: false, err };
    res.statusCode = statusCode;
    return res.json(response);
  };

  const okRes = (res, data, statusCode = 200) => {
    let response = { status: true, data };
    res.statusCode = statusCode;
    return res.json(response);
  };

  const getOTP = () => Math.floor(1000 + Math.random() * 9000);

  const hashMyPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(plainPassword, salt);
    return password;
  };

  const comparePassword = async (plainPassword, hash) =>
  await bcrypt.compare(plainPassword, hash);


  export { errRes,okRes,getOTP,hashMyPassword,comparePassword, };