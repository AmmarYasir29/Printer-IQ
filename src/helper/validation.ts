export default class Validator {
  static makeInvoice = (must = true) => ({
    fileurl: {
      type: "string",
    },
    note: {
      type: "string",
    },
    deadline: {
      type: Number,
    },
    total: {
      presence: must,
      type: "string",
    },
  });
    static register = (must = true) => ({
        name: {
          presence: must,
          type: "string",
        },
        phone: {
          presence: must,
          type: "string",
          length: { maximum: 15, minimum: 10 },
        },
        password: {
          presence: must,
          type: "string",
          length: { maximum: 15, minimum: 4 },
        },
      });

      static login = (must = true) => ({
        phone: {
          presence: must,
          type: "string",
          length: { maximum: 15, minimum: 10 },
        },
        password: {
          presence: must,
          type: "string",
          length: { maximum: 15, minimum: 4 },
        },
      });
}