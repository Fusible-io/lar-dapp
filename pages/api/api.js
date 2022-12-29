// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ListData } from "../../components/Data/Data";

export default function handler(req, res) {
  res.status(200).json(ListData);
}
