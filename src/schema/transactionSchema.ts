import * as yup from "yup";

type NewTransactionSchemas = {
  name: string;
  amount: number;
  connection: string;
};

export const NewTransactionSchema =
  yup.object({
    amount: yup.number().required("Amount is required"),
    receiver: yup.string().required("Please choose a sender"),
  });
// .required();
